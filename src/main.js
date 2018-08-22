const arDrone = require('ar-drone');
const { handleVideo } = require('./lib/video');
const movement = require('./lib/movement');
const client = arDrone.createClient();
client.config('control:altitude_max', 3000);

const state = { moving: false };

// set to true to simulate flying (camera still on)
let simulation = false;

movement.arClient(simulation ? movement.model : client);

try {
  console.log('[INFO] Taking off')
  if (!simulation) {
    client.takeoff();

    client
    .after(5000, function() {
      this.up(0.5);
    })
    .after(2000, function() {
      this.stop();
    })
    .after(100, function() {
      handleVideo(client, state, (rect) => {
        movement.push(rect, state);
      });
    });
  } else {
    handleVideo(client, state, (rect) => {
      movement.push(rect, state);
    });
  }
} catch (e) {
    console.log('[ERROR]')
    console.log(e);
    client.stop();
    client.land();
}
