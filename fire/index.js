import mqtt from 'mqtt';
const tinycolor = require("tinycolor2");

const client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`);
let i = true;
const fireColor = 'ff6f00';
const fireColor2 = 'ff510c';

let data = [];

for( let i = 0; i < 5; i++ ){
  data[i] = fireColor;
}

client.on('connect', () => {
  console.log('connected');
});

function broadcast(message) {
  client.publish('/color', message);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function getColor(){

  let color = (Math.random() > 0.5)? fireColor: fireColor2;
  if(Math.random() > 0.25) {
    return tinycolor(color).darken(getRandomInt(0,50)).toHex();
  } else {
    return tinycolor(color).lighten(getRandomInt(0,2)).toHex();
  }
}

setInterval(() => {
  let colorString = "";
  for(let i = 0; i < 5; i++ ){
    data[i] = getColor(data[i]);
  }
  broadcast(data.join(''));
}, 100);
