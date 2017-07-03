export default class Light {
  constructor(id, status, color='ffffff'){
    this.id = id;
    this.status = status;
    this.color = color;
    this.lastUpdated = new Date();
  }
}
