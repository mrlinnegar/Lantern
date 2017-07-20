import Light from '../models/Light';
import Observable from '../lib/Observable';
import LightNotFoundError from '../exceptions/LightNotFoundError';

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

  }

  setUpLightCleaning() {
    this.clean = setInterval(() => {
      const now = new Date();
      this.cleanLights(now);
    }, TIME_BETWEEN_CLEANUPS);
  }

  handleMessage(message) {
    const data = message.toString().split('|');
    const id = data[0];
    const color = data[1];

    if (!this.lights.has(id)) {
      this.registerNewLight(id);
    } else {
      this.lights.get(id).setLastSeen(new Date());
      if (!color) {
        this.lights.get(id).update({ status: 0 });
      }
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
    console.log('adding new light', id);
    const newLight = new Light(id);
    this.addLight(id, newLight);
    newLight.update();
    this.bindObservers(newLight);
    this.emit('SERVER_ADD_LIGHT', newLight.getData());
  }

  addLight(id, newLight) {
    this.lights.set(id, newLight);
  }

  bindObservers(newLight){
    newLight.addObserver('LIGHT_ON', (light) => {
      this.lightBroker.publish(light.address, light.getColor());
      this.emit('SERVER_UPDATE_LIGHT', light.getData());
    });

    newLight.addObserver('LIGHT_OFF', (light) => {
      this.lightBroker.publish(light.address, '000000');
      this.emit('SERVER_UPDATE_LIGHT', light.getData());
    });
  }

  getLights() {
    const lights = [];
    console.log(this.lights);
    this.lights.forEach((light) => {
      console.log(light);
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
