const mqtt = require('mqtt');

const connection = mqtt.connect('mqtt://localhost');
const ID = '12345';
let color = '';

connection.on('connect', () => {
  connection.subscribe('/color');
  connection.subscribe(`/${ID}`);

  connection.on('message', (topic, message) => {
    color = message.toString();
  });
});


setInterval(() => {
  const message = `${ID}|${color}`;
  connection.publish('/connect', message);
}, 5000);
