import Light from '../models/Light';
import Observable from '../lib/Observable';
import LightNotFoundError from '../exceptions/LightNotFoundError';
import Animations from '../animations/Animations';

const MAX_LIGHT_NO_COMMUNICATION = 15000;
const TIME_BETWEEN_CLEANUPS = 1000;

export default class LightingController extends Observable {
  constructor(lightBroker) {
    super();
    this.lights = new Map();
    this.lightBroker = lightBroker;

    this.lightBroker.init((topic, message) => {
      this.handleMessage(message);
    });

    this.setUpLightCleaning();
  }

  setUpLightCleaning() {
    this.clean = setInterval(() => {
      const now = new Date();
      this.cleanLights(now);
    }, TIME_BETWEEN_CLEANUPS);
  }

  handleMessage(message) {
    const id = message.toString();

    if (!this.lights.has(id)) {
      this.registerNewLight(id);
    } else {
      this.lights.get(id).setLastSeen(new Date());
    }
  }

  cleanLights(now) {
    this.lights.forEach((light) => {
      if ((now - light.getLastSeen()) > MAX_LIGHT_NO_COMMUNICATION) {
        this.emit('SERVER_REMOVE_LIGHT', light.getId());
        this.lights.delete(light.getId());
      }
    });
  }

  registerNewLight(id) {
    const newLight = new Light(id, this);
    this.addLight(id, newLight);
    this.bindObservers(newLight);
    this.emit('SERVER_ADD_LIGHT', newLight.getData());
    newLight.update({status:0});
  }

  addLight(id, newLight) {
    this.lights.set(id, newLight);
  }

  bindObservers(newLight){
    newLight.addObserver('LIGHT_UPDATE', (light) => {
      let instruction = '';

      if(light.isOn()){
        const lightData = light.getData();
        const animation = lightData.animation;
        if(animation)
          instruction = animation.toString();
        else {
          instruction = `COLOR|${lightData.color}`;
        }
      } else {
        instruction = 'OFF|000000';
      }
      this.lightBroker.publish(light.address, instruction);
      this.emit('SERVER_UPDATE_LIGHT', light.getData());
    });
  }

  getLights() {
    const lights = [];
    this.lights.forEach((light) => {
      lights.push(light.getData());
    });
    return lights;
  }

  getLightById(id) {
    const light = this.lights.get(id);
    if(light) {
      return light;
    } else {
      throw new LightNotFoundError();
    }
  }
}
