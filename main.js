const arDrone = require('ar-drone');
const client = arDrone.createClient();
client.config('control:altitude_max', 3000);

try {
  client.takeoff();
  
  client.on('navdata', data => {
    console.log('[INFO] Navdata');
    console.log(data);
  });
  
  const pngStream = client.getPngStream();
  pngStream.on('data', data => {
    console.log('[INFO] PNG Stream');  
    console.log(data);
  });
  
  client
    .after(5000, function() {
      this.clockwise(0.5);
    })
    .after(3000, function() {
      this.animate('flipLeft', 15);
    })
    .after(1000, function() {
      this.stop();
      this.land();
    });
} catch (e) {
    console.log('[ERROR]')
    console.log(e);
    client.stop();
    client.land();
}
