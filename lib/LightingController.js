

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
      const id =  message.toString();
      console.log(id);
      if(!this._lights.has(id)){
        const l = new LightMediator(id);
        l.addObserver('on', (address)=> {
          this.lightOn(address)
        })
        l.addObserver('off', (address) => {
          this.lightOff(address)
        });
        this._lights.set(id, l);
      }
    });
  }

  lightOn(address){
    this._client.publish(address, 'ffffff');
  }

  lightOff(address){
    this._client.publish(address, '000000');
  }

  getLights(){
    return this._lights;
  }

}
