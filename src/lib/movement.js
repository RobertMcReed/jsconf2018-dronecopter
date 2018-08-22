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

function instructClient(result, moving) {
  if (!config.arClient) return;
  recordHistory(result);

  var left = 213;
  var right = 426;
  var up = 120;
  var down = 240;

  // var midX = 320;
  // var midY = 180;
  // var deltaX = result.x - midX;
  // var deltaY = result.y - midY;
  // var moving = false;
  // var movementTolerance = config.neutralZone / 2;

  if (result.x > right) {
    config.arClient.right(0.2);
    console.log('Drone, move right!');
    moving = true;
  } else if (result.x < left) {
    config.arClient.left(0.2);
    console.log('Drone, move left!');
    moving = true;
  } else {
    config.arClient.stop();
    console.log('Drone, stop!');
    moving = false;
  }

  return moving;
}

// Rect { height: 160, width: 160, y: 131, x: 219 }
function receiveData(rect, moving) {
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
    moving = instructClient(result, moving);

    // Reset
    dataCounter = xBuffer = yBuffer = hBuffer = wBuffer = 0;
  }

  return moving;
}


module.exports = {
  arClient: setArClient,
  setDataHandler: setDataHandler,
  setSampleSize: setSampleSize,
  push: receiveData
};
