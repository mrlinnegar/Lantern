
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

    const data =  message.toString().split("|");

    const id = data[0];
    const color = data[1];


    if(!this._lightMediators.has(id)){
      this.registerLight(id);
    } else {
      this._lightMediators.get(id)._light.lastUpdated = new Date();
      if(!color){
        this._lightMediators.get(id).off();
      }
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
        resolve(mediator);
      } else {
        reject();
      }
    });
  }

}
