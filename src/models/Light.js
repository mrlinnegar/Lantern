import Observable from '../lib/Observable';
import LightData from './LightData';
import Bulb from './Bulb';

const NUMBER_OF_BULBS = 5;

export default class Light extends Observable {
  constructor(id) {
    if (!id) {
      throw new Error('Light requires an ID');
    }

    super();
    this.lightData = new LightData(id);
    this.address = `/${id}`;
    this.lastSeen = new Date();
    this.bulbs = [];

    this.addBulbs();
  }

  addBulbs() {
    for(let i = 0; i < NUMBER_OF_BULBS; i++){
      this.bulbs.push(new Bulb());
    }
  }

  update(update = {}) {
    this.lightData = Object.assign(new LightData(this.getId()), this.lightData, update);

    let newBulbs = [];

    this.bulbs.map((bulb) => {
      newBulbs.push(Object.assign(new Bulb(), bulb, update));
    });

    this.bulbs = newBulbs;

    this.emit('LIGHT_UPDATE', this);

    return;

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
    let object = Object.assign({},this.lightData);
    return object;
  }

  getId() {
    return this.lightData.id;
  }

  getColors() {
    let colorString = '';

    this.bulbs.map((bulb) => {
        if(bulb.status === 1) {
          colorString += bulb.color;
        } else {
          colorString += '000000';
        }
    });
    return colorString;
  }

  getLastSeen() {
    return this.lastSeen;
  }

  setLastSeen(date) {
    this.lastSeen = date;
  }
}
