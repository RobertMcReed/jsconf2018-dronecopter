const arDrone = require('ar-drone');
const { handleVideo } = require('./video');
const movement = require('./lib/movement');
const client = arDrone.createClient();
client.config('control:altitude_max', 3000);
let moving = false;

let simulation = true;

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

movement.arClient(simulation ? model : client);


try {
  console.log('[INFO] Taking off')
  if (!simulation) {
    client.takeoff();

    client
    .after(5000, function() {
      this.up(0.2);
    })
    .after(1500, function() {
      this.stop();
    })
    .after(500, function() {
      handleVideo(client, moving, (rect, moving) => {
        moving = movement.push(rect, moving);
      });
    });
  } else {
    handleVideo(client, moving, (rect, moving) => {
      moving = movement.push(rect, moving);
    });
  }
} catch (e) {
    console.log('[ERROR]')
    console.log(e);
    client.stop();
    client.land();
}
