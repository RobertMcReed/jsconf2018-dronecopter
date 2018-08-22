var assert = require('assert');
var movement = require('../src/lib/movement');

describe('Movement', function() {
  describe('#push()', function() {
    it('should tell the drone to move left', function() {
      movement.arClient({
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
        }
      });
      movement.push({ height: 160, width: 160, y: 80, x: 80 });
      movement.push({ height: 160, width: 160, y: 80, x: 78 });
      movement.push({ height: 160, width: 160, y: 80, x: 76 });
      movement.push({ height: 160, width: 160, y: 80, x: 74 });
      movement.push({ height: 160, width: 160, y: 80, x: 72 });
      movement.push({ height: 160, width: 160, y: 80, x: 70 });
      movement.push({ height: 160, width: 160, y: 80, x: 68 });
    });
    it('should tell the drone to move right', function() {
      movement.arClient({
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
        }
      });
      movement.push({ height: 160, width: 160, y: 80, x: 80 });
      movement.push({ height: 160, width: 160, y: 80, x: 82 });
      movement.push({ height: 160, width: 160, y: 80, x: 84 });
      movement.push({ height: 160, width: 160, y: 80, x: 86 });
      movement.push({ height: 160, width: 160, y: 80, x: 88 });
      movement.push({ height: 160, width: 160, y: 80, x: 90 });
      movement.push({ height: 160, width: 160, y: 80, x: 92 });
    });

    it('should tell the drone to move up', function() {
      movement.arClient({
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
        }
      });
      movement.push({ height: 160, width: 160, y: 80, x: 80 });
      movement.push({ height: 160, width: 160, y: 82, x: 80 });
      movement.push({ height: 160, width: 160, y: 84, x: 80 });
      movement.push({ height: 160, width: 160, y: 86, x: 80 });
      movement.push({ height: 160, width: 160, y: 88, x: 80 });
      movement.push({ height: 160, width: 160, y: 90, x: 80 });
      movement.push({ height: 160, width: 160, y: 92, x: 80 });
    });

    it('should tell the drone to move down', function() {
      movement.arClient({
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
        }
      });
      movement.push({ height: 160, width: 160, y: 80, x: 80 });
      movement.push({ height: 160, width: 160, y: 78, x: 80 });
      movement.push({ height: 160, width: 160, y: 76, x: 80 });
      movement.push({ height: 160, width: 160, y: 74, x: 80 });
      movement.push({ height: 160, width: 160, y: 72, x: 80 });
      movement.push({ height: 160, width: 160, y: 70, x: 80 });
      movement.push({ height: 160, width: 160, y: 68, x: 80 });
    });

    it('should tell the drone to stop', function() {
      movement.arClient({
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
        }
      });
      movement.push({ height: 160, width: 160, y: 80, x: 80 });
      movement.push({ height: 160, width: 160, y: 81, x: 80 });
      movement.push({ height: 160, width: 160, y: 82, x: 80 });
      movement.push({ height: 160, width: 160, y: 83, x: 80 });
      movement.push({ height: 160, width: 160, y: 84, x: 80 });
      movement.push({ height: 160, width: 160, y: 85, x: 80 });
      movement.push({ height: 160, width: 160, y: 86, x: 80 });
    });

  });
});
