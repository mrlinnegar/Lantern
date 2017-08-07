export default class LightRepository {
  constructor() {
    this.lights = new Map();
  }

  addLight(id, light) {
    this.lights.set(id, light);
  }
}
