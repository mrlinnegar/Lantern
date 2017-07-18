export default class LightData {
  constructor(id, status, color='FEFEFF'){
    this.id = id;
    this.status = status;
    this.color = color;
    this.lastUpdated = new Date();
  }
}
