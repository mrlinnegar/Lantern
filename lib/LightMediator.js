import Observable from './Observable'
import Light from './Light';

export default class LightMediator extends Observable {
  constructor(id){
    super();
    this.light = new Light(id, 0);
    this._address = "/" + id;
  }

  on(){
    this.light.status = 1;
    this.emit('on', this._address);
    console.log('light on', this._address);
  }

  off(){
    this.light.status = 0;
    this.emit('off', this._address);
    console.log('light off', this._address);
  }

  isOn(){
    return this.light.status;
  }

}
