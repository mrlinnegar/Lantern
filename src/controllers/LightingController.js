import Light from '../models/Light';
import Observable from '../lib/Observable';
import LightNotFoundError from '../exceptions/LightNotFoundError';

import {
    SERVER_ADD_LIGHT,
    SERVER_ALL_LIGHTS,
    SERVER_REMOVE_LIGHT,
    SERVER_UPDATE_LIGHT
} from '../actions';

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
    const data = message.toString().split("|");
    const id = data[0];
    const memory = data[1];
    const status = parseInt(data[2]);
    if (!this.lights.has(id)) {
      this.registerNewLight(id);
    } else {
      const update = {
            lastSeen: new Date(),
            memory: memory,
          status: status
        };

      this.refreshLight(id, update);
    }
  }

  cleanLights(now) {
    this.lights.forEach((light) => {
      if ((now - light.getLastSeen()) > MAX_LIGHT_NO_COMMUNICATION) {
        this.removeLight(light.getId());
      }
    });
  }

  registerNewLight(id) {
    const newLight = new Light(id, this.lightBroker);
    this.lights.set(id, newLight);
    this.emit(SERVER_ADD_LIGHT, newLight.getData());
    this.updateLight(id, { status: 1});
  }

    getLights() {
    return this.lights;
  }


  addLight(id){
      const newLight = new Light(id, this.lightBroker);
      this.lights.set(id, newLight);
      return newLight;
  }

  removeLight(id){
    this.lights.delete(id);
    this.emit(SERVER_REMOVE_LIGHT, id);
  }

  updateRandomLight(update) {
      const index  = Math.floor(Math.random() * this.lights.size)
      const key = Array.from(this.lights.keys())[index];
      let light = this.lights.get(key);
      light.update(update);
      const data = light.getData()
      this.emit(SERVER_UPDATE_LIGHT, data);
      this.lightBroker.publish(light.getAddress(), light.getInstruction());
      return this.getAllLightsData();
  }

  updateLight(id, update){
      const light = this.lights.get(id);
      if(light) {
          light.update(update);
          const data = light.getData()
          this.emit(SERVER_UPDATE_LIGHT, data);
          this.lightBroker.publish(light.getAddress(), light.getInstruction());
          return data;
      } else {
          throw new LightNotFoundError();
      }
  }

  refreshLight(id, update){
      const light = this.lights.get(id);
      if(light) {
          light.update(update);
          const data = light.getData()
          this.emit(SERVER_UPDATE_LIGHT, data);
      } else {
          throw new LightNotFoundError();
      }
  }

  updateAllLights(update){
      this.lights.forEach((light) => {
          light.update(update);
          this.lightBroker.publish(light.getAddress(), light.getInstruction());
      });
      const data = this.getAllLightsData();
      this.emit(SERVER_ALL_LIGHTS, data);
      return data;
  }

  getAllLightsData() {
    const lights = [];
    this.lights.forEach((light) => {
      lights.push(light.getData());
    });
    return lights;
  }

  getLightDataById(id) {
    const light = this.lights.get(id);
    if(light) {
      return light.getData();
    } else {
      throw new LightNotFoundError();
    }
  }
}
