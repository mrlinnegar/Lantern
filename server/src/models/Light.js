import Observable from '../lib/Observable'
import LightData from './LightData';

export default class Light extends Observable {
  constructor(id){
    super();
    this._lightData = new LightData(id, 0);
    this._address = "/" + id;
  }

  update(update = {}){

    this._lightData = Object.assign(new LightData(), this._lightData, update);

    if(this._lightData.status){
      this.emit('LIGHT_ON', this);
    } else {
      this.emit('LIGHT_OFF', this);
    }
  }

  isOn(){
    return this._lightData.status;
  }

  lastUpdated(){
    return this._lightData.lastUpdated
  }


  getData(){
    console.log('get data', this._lightData);
    return this._lightData;
  }

  getId(){
    return this._lightData.id;
  }

  getColor(){
    return this._lightData.color
  }

}
