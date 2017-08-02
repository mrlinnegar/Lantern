export default class SolidColor {
  constructor(color = 'FFFFFF') {
    this.color = color;
  }

  toString() {
    return `COLOR|${this.color}`;
  }
}
