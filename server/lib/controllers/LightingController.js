
import mqtt from 'mqtt';
import LightMediator from '../mediators/LightMediator';
import Comms from './LightingCommunication';
import Observable from '../mediators/Observable'

export default class LightingController extends Observable {
  constructor(){
    super()
    this._lightMediators = new Map();
    this._comms = new Comms();
    this._comms.init((topic, message)=>{
      this.handleMessage(topic, message)
    });

    setInterval(()=>{
      this.cleanLights()
    },1000);
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
  cleanLights() {
    const now = new Date();
    this._lightMediators.forEach((mediator) => {
      if((now - mediator._light.lastUpdated) > 15000)  {
        this.emit('SERVER_REMOVE_LIGHT', mediator._light.id);
        this._lightMediators.delete(mediator._light.id)
      }
    });
  }
  registerLight(id){
    const mediator = new LightMediator(id);
    mediator.addObserver('on', (mediator)=> {
      this._comms.publish(mediator._address, mediator._light.color);
      this.emit('SERVER_UPDATE_LIGHT', mediator.getLight());
    })

    mediator.addObserver('color', (mediator) => {
      this._comms.publish(mediator._address, mediator._light.color);
      this.emit('SERVER_UPDATE_LIGHT', mediator.getLight());
    });

    mediator.addObserver('off', (mediator) => {
      this._comms.publish(mediator._address, '000000');
      this.emit('SERVER_UPDATE_LIGHT', mediator.getLight());
    });

    this._lightMediators.set(id, mediator);
    mediator.off();
    this.emit('SERVER_ADD_LIGHT', mediator.getLight())
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
