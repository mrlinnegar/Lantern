import Observable from './Observable'
import Light from '../models/Light';

export default class LightMediator extends Observable {
  constructor(id){
    super();
    this._light = new Light(id, 0);
    this._address = "/" + id;
  }

  on(){
    this._light.status = 1;
    this.emit('on', this);
    console.log('light on', this._address);
  }

  off(){
    this._light.status = 0;
    this.emit('off', this);
    console.log('light off', this._address);
  }

  getLight(){
    return this._light;
  }

  update(req){
    this._light = Object.assign(new Light(), this._light, req);

    if(this._light.status){
      this.on();
    } else {
      this.off();
    }
  }

  isOn(){
    return this.light.status;
  }

}
