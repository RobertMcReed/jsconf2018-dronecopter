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
  sampleSize: 7, // We get about 14 data samples per second from the drone.
  neutralZone: 10 // in size units (px?)
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

function instructClient(result) {
  if (!config.arClient) return;
  recordHistory(result);

  var midX = result.w / 2;
  var midY = result.h / 2;
  var deltaX = result.x - midX;
  var deltaY = result.y - midY;
  var moving = false;
  var movementTolerance = config.neutralZone / 2;

  if (deltaX < 0 && Math.abs(deltaX) > movementTolerance) {
    config.arClient.left(0.2);
    console.log('Drone, move left!');
    moving = true;
  }

  if (deltaX > 0 && Math.abs(deltaX) > movementTolerance) {
    config.arClient.right(0.2);
    console.log('Drone, move right!');
    moving = true;
  }

  if (deltaY > 0 && Math.abs(deltaY) > movementTolerance) {
    config.arClient.up(0.2);
    console.log('Drone, move up!');
    moving = true;
  }

  if (deltaY < 0 && Math.abs(deltaY) > movementTolerance) {
    config.arClient.down(0.2);
    console.log('Drone, move down!');
    moving = true;
  }

  if (!moving) {
    config.arClient.stop();
    console.log('Drone, stop!');
  }
}

// Rect { height: 160, width: 160, y: 131, x: 219 }
function receiveData(rect) {
  dataCounter += 1;
  xBuffer += rect.x;
  yBuffer += rect.y;
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
    instructClient(result);

    // Reset
    dataCounter = xBuffer = yBuffer = hBuffer = wBuffer = 0;
  }
}


module.exports = {
  arClient: setArClient,
  setDataHandler: setDataHandler,
  setSampleSize: setSampleSize,
  push: receiveData
};
