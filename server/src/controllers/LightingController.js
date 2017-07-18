import mqtt from 'mqtt';
import Light from '../models/Light';
import Comms from './LightingCommunication';
import Observable from '../lib/Observable'

export default class LightingController extends Observable {
  constructor(){
    super()
    this._lights = new Map();
    this._comms = new Comms();
    this._comms.init((topic, message)=>{
      this.handleMessage(topic, message)
    });

    this._clean = setInterval(()=>{
      const now = new Date()
      this.cleanLights(now)
    },1000);

  }

  handleMessage(topic, message) {

    const data =  message.toString().split("|");

    const id = data[0];
    const color = data[1];


    if(!this._lights.has(id)){
      this.registerNewLight(id);
    } else {
      this._lights.get(id).update({lastUpdated: new Date()});
      if(!color){
        this._lights.get(id).off();
      }
    }

  }

  cleanLights(now) {
    const MAX_LIGHT_NO_COMMUNICATION = 15000

    this._lights.forEach((light) => {
      if((now - light.lastUpdated()) > MAX_LIGHT_NO_COMMUNICATION)  {
        this.emit('SERVER_REMOVE_LIGHT', light.getId());
        this._lights.delete(light.getId())
      }
    });
  }

  registerNewLight(id){
    const light = new Light(id);

    light.addObserver('LIGHT_ON', (light)=> {
      this._comms.publish(light._address, light.getColor());
      this.emit('SERVER_UPDATE_LIGHT', light.getData());
    })

    light.addObserver('LIGHT_OFF', (light) => {
      this._comms.publish(light._address, '000000');
      this.emit('SERVER_UPDATE_LIGHT', light.getData());
    });

    this._lights.set(id, light);
    light.update({});

    this.emit('SERVER_ADD_LIGHT', light.getData())

  }

  getLights(){
    let lights = [];
    this._lights.forEach((light)=> {
      lights.push(light.getData());
    });
    return lights;
  }

  getLightById(id){
    let light = this._lights.get(id);
    return light;
  }

}
