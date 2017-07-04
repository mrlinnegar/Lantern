
import mqtt from 'mqtt';
import LightMediator from '../mediators/LightMediator';


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
      this._lights.get(id)._light.lastUpdated = new Date();
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


  onById(id){
    return new Promise((resolve, reject)=>{
      let mediator = this._lights.get(id);

      if(mediator){
        this.lightOn(mediator._address, mediator._light.color);
        resolve();
      } else {
        reject();
      }
    })
  }

  offById(id){
    return new Promise((resolve, reject)=>{
      let mediator = this._lights.get(id);

      if(mediator){
        this.lightOff(mediator._address, mediator._light.color);
        resolve();
      } else {
        reject();
      }
    })
  }

  allColor(color){
    return new Promise((resolve, reject)=>{
      this._lights.forEach((mediator)=> {
        mediator.setColor(color);
      });
      resolve();
    });
  }

  allLightsOff(){
    return new Promise((resolve, reject)=>{
      this._client.publish('/color', '000000');
      resolve();
    });
  }

  allLightsOn(){
    return new Promise((resolve, reject)=>{
      this._lights.forEach((mediator)=>{
        this.lightOn(mediator._address, mediator._light.color);
      });
      resolve();
    });
  }

  getLights(){
    return new Promise((resolve, reject)=> {
      let lights = [];
      this._lights.forEach((lightMediator)=> {
        lights.push(lightMediator.getLight());
      });
      resolve(lights);
    });
  }

  getLightById(id){
    return new Promise((resolve, reject)=>{
      let mediator = this._lights.get(id);
      if(mediator){
        resolve(mediator.getLight());
      } else {
        reject();
      }
    });
  }

}
