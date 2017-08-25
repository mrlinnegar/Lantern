const mqtt = require('mqtt');

class Light {
  constructor(id = '12345') {
    this.connection = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`);
    this.ID = id;
    this.color = '';

    this.connection.on('connect', () => {
      this.connection.subscribe('/color');
      this.connection.subscribe(`/${this.ID}`);

      this.connection.on('message', (topic, message) => {
        console.log('recieved instruction: ', message);
        this.color = message.toString();
      });

      this.connection.on('error', () => {
        console.log('connection error');
      });
    });

    this.enable();
  }

  enable() {
    this.timer = setInterval(() => {
      const message = `${this.ID}|888888`;
      console.log(message);
      this.connection.publish('/connect', message);
    }, 5000);
  }

  disable() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}

new Light();
new Light('54321');
