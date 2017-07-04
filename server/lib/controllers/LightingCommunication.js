import mqtt from 'mqtt';

export default class Comms {

  constructor(){

  }

  init(callback){
    this._client = mqtt.connect("mqtt://192.168.1.22");

    this._client.on('connect', ()=>{
      this._client.subscribe('/connect')
    });

    this._client.on('message', (topic, message)=>{
      callback(topic, message);
    });
  }

  handleMessage(topic, message) {
    const id =  message.toString();

    if(!this._lightMediators.has(id)){
      this.registerLight(id);
    } else {
      this._lightMediators.get(id)._light.lastUpdated = new Date();
    }
  }

  publish(address, color){
    this._client.publish(address, color);
  }
  broadcast(color){
    this._client.publish('/color', color);
  }
}
