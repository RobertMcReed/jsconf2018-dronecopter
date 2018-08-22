var arDrone = require('ar-drone');
var client  = arDrone.createClient();
client.config('control:altitude_max', 3000);
client.createRepl();
