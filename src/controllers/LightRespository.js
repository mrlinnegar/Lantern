import Light from '../models/Light';
import Observable from '../lib/Observable';
import LightNotFoundError from '../exceptions/LightNotFoundError';

import {
  SERVER_ADD_LIGHT,
  SERVER_REMOVE_LIGHT,
  SERVER_UPDATE_LIGHT
} from '../actions';

const MAX_LIGHT_NO_COMMUNICATION = 15000;
const TIME_BETWEEN_CLEANUPS = 1000;

export default class LightRespository extends Observable {
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
    const data = message.toString().split("|");
    const id = data[0];
    const memory = data[1];
    const status = data[2];
    if (!this.lights.has(id)) {
      this.registerNewLight(id);
    } else {
      this.lights.get(id).setLastSeen(new Date(), memory, status);
    }
  }

  cleanLights(now) {
    this.lights.forEach((light) => {
      if ((now - light.getLastSeen()) > MAX_LIGHT_NO_COMMUNICATION) {
        this.emit(SERVER_REMOVE_LIGHT, light.getId());
        this.lights.delete(light.getId());
      }
    });
  }

  registerNewLight(id) {
    const newLight = new Light(id, this.lightBroker);
    this.lights.set(id, newLight);
    this.bindObservers(newLight);
    this.emit(SERVER_ADD_LIGHT, newLight.getData());
    newLight.update({status:1});
  }

  bindObservers(newLight){
    newLight.addObserver('LIGHT_UPDATE', (light) => {
      this.emit(SERVER_UPDATE_LIGHT, light.getData());
    });
  }

  getLights() {
    return this.lights;
  }


  getRandomLight() {
      const index  = Math.floor(Math.random() * this.lights.size)
      const key = Array.from(this.lights.keys())[index];
      return this.lights.get(key);
  }

  getLightsData() {
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
