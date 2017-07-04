
import mqtt from 'mqtt';
import LightMediator from '../mediators/LightMediator';
import Comms from './LightingCommunication';

export default class LightingController {
  constructor(){
    this._lightMediators = new Map();
    this._comms = new Comms();
    this._comms.init((topic, message)=>{
      this.handleMessage(topic, message)
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

  registerLight(id){
    const mediator = new LightMediator(id);
    mediator.addObserver('on', (mediator)=> {
      this._comms.publish(mediator._address, mediator._light.color);
    })

    mediator.addObserver('color', (mediator) => {
      this._comms.publish(mediator._address, mediator._light.color);
    });

    mediator.addObserver('off', (mediator) => {
      this._comms.publish(mediator._address, '000000');
    });

    this._lightMediators.set(id, mediator);
    mediator.off();
  }

  onById(id){
    return new Promise((resolve, reject)=>{
      let mediator = this._lightMediators.get(id);

      if(mediator){
        mediator.on();
        resolve(mediator.getLight());
      } else {
        reject();
      }
    })
  }

  offById(id){
    return new Promise((resolve, reject)=>{
      let mediator = this._lightMediators.get(id);

      if(mediator){
        mediator.off();
        resolve(mediator.getLight());
      } else {
        reject();
      }
    })
  }

  allColor(color){
    return new Promise((resolve, reject)=>{
      this._lightMediators.forEach((mediator)=> {
        mediator.setColor(color);
      });

      this.getLights()
        .then((lights)=>{
          resolve(lights);
        });
    });
  }

  colorById(id, color){
    return new Promise((resolve, reject)=>{
      let mediator = this._lightMediators.get(id);

      if(mediator){
        mediator.setColor(color);
        resolve(mediator.getLight());
      } else {
        reject();
      }

    })
  }

  allLightsOff(){
    return new Promise((resolve, reject)=>{
      this._lightMediators.forEach((mediator)=>{
        mediator.off();
      });

      this.getLights()
        .then((lights)=>{
          resolve(lights);
        });
    });
  }

  allLightsOn(){
    return new Promise((resolve, reject)=>{
      this._lightMediators.forEach((mediator)=>{
        mediator.on();
      });

      this.getLights()
        .then((lights)=>{
          resolve(lights);
        });
    });
  }

  getLights(){
    return new Promise((resolve, reject)=> {
      let lights = [];
      this._lightMediators.forEach((lightMediator)=> {
        lights.push(lightMediator.getLight());
      });
      resolve(lights);
    });
  }

  getLightById(id){
    return new Promise((resolve, reject)=>{
      let mediator = this._lightMediators.get(id);
      if(mediator){
        resolve(mediator.getLight());
      } else {
        reject();
      }
    });
  }

}
