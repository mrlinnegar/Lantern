import mqtt from 'mqtt';

export default class LightBroker {

  init(callback) {
    this.client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`);

    this.client.on('connect', () => {
      this.client.subscribe('/connect');
    });

    this.client.on('message', (topic, message) => {
      callback(topic, message);
    });
  }

  publish(address, message) {
    console.log(address, message);
    this.client.publish(address, message);
  }

  broadcast(message) {
    this.client.publish('/color', message);
  }

}
