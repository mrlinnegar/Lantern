import Observable from '../lib/Observable';
import LightData from './LightData';
import Rider from '../animations/Rider';
import SolidColor from '../animations/SolidColor';
import Twinkle from '../animations/Twinkle';

const NUMBER_OF_BULBS = 5;

export default class Light extends Observable {
  constructor(id) {
    if (!id) {
      throw new Error('Light requires an ID');
    }

    super();
    this.lightData = new LightData(id);
    this.address = `${id}`;
    this.lastSeen = new Date();
    this.animation = new Twinkle(this.lightData.color);
  }

  update(update = {}, notify = true) {
    this.lightData = Object.assign(new LightData(this.getId()), this.lightData, update);
    this.animation = new Twinkle(this.lightData.color);

    if(notify) {
      this.emit('LIGHT_UPDATE', this);
    }
  }

  isOn() {
    return this.lightData.status == 1;
  }

  lastUpdated() {
    return this.lightData.lastUpdated;
  }

  getData() {
    let object = Object.assign({},this.lightData);
    return object;
  }

  getId() {
    return this.lightData.id;
  }

  getColor() {
    if(this.lightData.status === 1) {
      return this.lightData.color;
    } else {
      return '000000';
    }
  }

  getLastSeen() {
    return this.lastSeen;
  }

  setLastSeen(date) {
    this.lastSeen = date;
  }
}
