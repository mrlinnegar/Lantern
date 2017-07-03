

import mqtt from 'mqtt';
import LightMediator from './LightMediator';


export default class LightingController {
  constructor(){
    this._lights = new Map();
    this._init();
  }

  _init(){
    this._client = mqtt.connect("mqtt://192.168.1.22");

    this._client.on('connect', ()=>{
      this._client.subscribe('/connect')
    });

    this._client.on('message', (topic, message)=>{
      this.handleMessage(topic, message);
    });

  }

  handleMessage(topic, message) {
    const id =  message.toString();

    if(!this._lights.has(id)){
      this.registerLight(id);
    } else {
      this._lights.get(id).light.lastUpdated = new Date();
    }
  }

  registerLight(id){
    const mediator = new LightMediator(id);
    mediator.addObserver('on', (mediator)=> {
      this.lightOn(mediator._address, mediator.light.color);
    })

    mediator.addObserver('color', (mediator) => {
      this.lightOn(mediator._address, mediator.light.color);
    });
    mediator.addObserver('off', (mediator) => {
      this.lightOff(mediator._address)
    });


    this._lights.set(id, mediator);
    mediator.off();
  }

  lightOn(address, color){
    this._client.publish(address, color);
  }

  lightOff(address){
    this._client.publish(address, '000000');
  }

  allColor(color){
    this._lights.forEach((mediator)=> {
      mediator.setColor(color);
    });
  }

  allLightsOff(){
    this._client.publish('/color', '000000');
  }

  allLightsOn(){
    this._lights.forEach((mediator)=>{
      this.lightOn(mediator._address, mediator.light.color);
    });
  }

  getLights(){
    return this._lights;
  }

}
