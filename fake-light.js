const mqtt = require('mqtt');

class Light {
  constructor(id = '12345') {
    this.connection = mqtt.connect('mqtt://192.168.0.1');
    this.ID = id;
    this.color = '';

    this.connection.on('connect', () => {
      this.connection.subscribe('/color');
      this.connection.subscribe(`/${this.ID}`);

      this.connection.on('message', (topic, message) => {
        this.color = message.toString();
      });
    });

    this.enable();
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

new Light();
