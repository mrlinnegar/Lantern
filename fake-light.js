const mqtt = require('mqtt');

class Light {
  constructor(id = '12345') {
    this.connection = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`);
    this.ID = id;
    this.color = '';
    this.status = '0';
    this.timer = null;

    this.connection.on('connect', () => {
      this.connection.subscribe('/color');
      this.connection.subscribe(`/${this.ID}`);

      this.connection.on('message', (topic, message) => {
        console.log(this.ID, 'recieved instruction: ', `'${message.toString()}'`);
        const data = message.toString().split('|');
        switch(data[0]){
            case 'ANIM':
              this.status = 1;
              break;
            case 'STOP':
              this.status = 2;
              break;
            case 'START':
              this.status = 1;
              break;
            case 'OFF':
              this.status = 0;
              break;
        }
      });

      this.connection.on('error', () => {
        console.log('connection error');
      });
    });

    this.enable();
  }

  enable() {
    this.timer = setInterval(() => {
      const message = `${this.ID}|888888|${this.status}`;
      console.log(this.ID, "Light heartbeat", message);
      this.connection.publish('/connect', message);
    }, 5000);
  }

}

new Light('12345');
new Light('54321');
