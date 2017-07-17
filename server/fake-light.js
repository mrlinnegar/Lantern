const mqtt = require('mqtt');

class Light {
  constructor() {
    this.connection = mqtt.connect('mqtt://192.168.1.22');
    this.ID = '12345';
    this.color = '';

    this.connection.on('connect', () => {
      this.connection.subscribe('/color');
      this.connection.subscribe(`/${this.ID}`);

      this.connection.on('message', (topic, message) => {
        this.color = message.toString();
      });
    });
  }

  enable() {
    this.timer = setInterval(() => {
      const message = `${this.ID}|${this.color}`;
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

const light = new Light();
light.enable();
