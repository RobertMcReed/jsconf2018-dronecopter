var dataCounter = 0;
var xBuffer = 0;
var yBuffer = 0;
var hBuffer = 0;
var wBuffer = 0;
var resultHistory = [];

var config = {
  arClient: null,
  dataHandler: function(result) {
    console.log('Result:', result);
  },
  sampleSize: 3, // We get about 14 data samples per second from the drone.
  neutralZone: 10, // in size units (px?)
  speedX: 0.1
};

function setDataHandler(handler) {
  config.dataHandler = handler;
}

function setArClient(client) {
  config.arClient = client;
}

function setSampleSize(size) {
  config.sampleSize = size;
}

function recordHistory(result) {
  resultHistory.push(result);

  // Limit the history to config.sampleSize elements.
  if (resultHistory.size > config.sampleSize) {
    resultHistory.shift();
  }
}

function instructClient(result, state) {
  if (!config.arClient) return;
  recordHistory(result);

  var left = 213;
  var right = 426;
  var up = 120;
  var down = 240;

  if (result.x > right) {
    config.arClient.right(config.speedX);
    console.log('Drone, move right!');
    state.moving = true;
  } else if (result.x < left) {
    config.arClient.left(config.speedX);
    console.log('Drone, move left!');
    state.moving = true;
  } else if (state.moving) {
    config.arClient.stop();
    console.log('Drone, stop!');
    state.moving = false;
  }
}

// Rect { height: 160, width: 160, y: 131, x: 219 }
function receiveData(rect, state) {
  dataCounter += 1;
  xBuffer += rect.x + rect.width / 2;
  yBuffer += rect.y + rect.height / 2;
  hBuffer += rect.height;
  wBuffer += rect.width;

  if (dataCounter >= config.sampleSize) {
    // Calculate averages
    var result = {
      x: parseFloat(xBuffer) / config.sampleSize,
      y: parseFloat(yBuffer) / config.sampleSize,
      h: parseFloat(hBuffer) / config.sampleSize,
      w: parseFloat(wBuffer) / config.sampleSize
    }

    // Perform callback
    config.dataHandler(result);

    // Emit client instructions
    instructClient(result, state);

    // Reset
    dataCounter = xBuffer = yBuffer = hBuffer = wBuffer = 0;
  }
}

const model = {
  left: function (speed) {
    console.log('Moving left at:', speed);
  },
  right: function (speed) {
    console.log('Moving right at:', speed);
  },
  up: function (speed) {
    console.log('Moving up at:', speed);
  },
  down: function (speed) {
    console.log('Moving down at:', speed);
  },
  stop: function () {
    console.log('Stopping!');
  },
  land: function () {
    console.log('Landing!')
  }
};

module.exports = {
  arClient: setArClient,
  setDataHandler: setDataHandler,
  setSampleSize: setSampleSize,
  push: receiveData,
  model
};
