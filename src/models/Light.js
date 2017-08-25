import Observable from '../lib/Observable';
import LightData from './LightData';
import Animations from '../animations/Animations';

const NUMBER_OF_BULBS = 5;

export default class Light extends Observable {
  constructor(id, broker) {
    if (!id) {
      throw new Error('Light requires an ID');
    }

    super();
    this.lightData = new LightData(id);
    this.address = `${id}`;
    this.broker = broker
  }

  update(update = {}) {
    this.lightData = Object.assign(
      new LightData(this.getId()),
                    this.lightData,
                    update);

    this.broker.publish(this.address, this.getInstruction());

    this.emit('LIGHT_UPDATE', this);
  }

  isOn() {
    return this.lightData.status == 1;
  }

  getData() {
    let object = Object.assign({},this.lightData);
    return object;
  }

  getId() {
    return this.lightData.id;
  }

  getInstruction() {
    let instruction = '';

    if(this.isOn()){
      const lightData = this.getData();
      const animation = Animations.get(lightData.animation);
      if(animation)
        instruction = new animation(lightData.color).toString();
      else {
        instruction = `COLOR|${lightData.color}`;
      }
    } else {
      instruction = 'OFF|000000';
    }

    return instruction;
  }

  getLastSeen() {
    return this.lightData.lastSeen;
  }

  setLastSeen(date, memory) {
    const update = {
      lastSeen: date,
      memory: memory
    };

    this.lightData = Object.assign(
      new LightData(this.getId()),
                    this.lightData,
                    update);

    this.emit('LIGHT_UPDATE', this);
  }

}
