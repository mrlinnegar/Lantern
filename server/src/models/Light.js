import Observable from '../lib/Observable';
import LightData from './LightData';

export default class Light extends Observable {
  constructor(id) {
    if (!id) {
      throw new Error('Light requires an ID');
    }

    super();
    this.lightData = new LightData(id);
    this.address = `/${id}`;
    this.lastSeen = new Date();
  }

  update(update = {}) {
    this.lightData = Object.assign(new LightData(this.getId()), this.lightData, update);

    if (this.lightData.status) {
      this.emit('LIGHT_ON', this);
    } else {
      this.emit('LIGHT_OFF', this);
    }
  }

  isOn() {
    return this.lightData.status;
  }

  lastUpdated() {
    return this.lightData.lastUpdated;
  }

  getData() {
    return this.lightData;
  }

  getId() {
    return this.lightData.id;
  }

  getColor() {
    return this.lightData.color;
  }

  getLastSeen() {
    return this.lastSeen;
  }

  setLastSeen(date) {
    this.lastSeen = date;
  }
}
