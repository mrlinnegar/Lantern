import SolidColor from '../animations/SolidColor';

export default class LightData {
  constructor(id, status = 0) {
    if (!id) {
      throw new Error('LightData requires an ID');
    }
    this.id = id;
    this.status = status;
    this.lastSeen = new Date();
    this.memory = 0;
    this.fps = 1;
    this.loop = 1;
    this.data = new SolidColor('FFFFFF').data
  }

}
