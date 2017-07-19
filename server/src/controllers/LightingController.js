import mqtt from 'mqtt';
import Light from '../models/Light';
import Observable from '../lib/Observable'

const MAX_LIGHT_NO_COMMUNICATION = 15000
const TIME_BETWEEN_CLEANUPS = 1000

export default class LightingController extends Observable {
  constructor(communication){
    super()
    this._lights = new Map();
    this._comms = communication;

    this._comms.init((topic, message)=>{
      this.handleMessage(topic, message)
    });

    this._clean = setInterval(()=>{
      const now = new Date()
      this.cleanLights(now)
    },TIME_BETWEEN_CLEANUPS);

  }

  handleMessage(topic, message) {

    const data =  message.toString().split("|");

    const id = data[0];
    const color = data[1];


    if(!this._lights.has(id)){
      this.registerNewLight(id);
    } else {
      this._lights.get(id).setLastSeen( new Date() );
      if(!color){
        this._lights.get(id).off();
      }
    }

  }

  cleanLights(now) {

    this._lights.forEach((light) => {
      if((now - light.lastSeen()) > MAX_LIGHT_NO_COMMUNICATION)  {
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
    light.update();

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
