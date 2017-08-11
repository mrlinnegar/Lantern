import Animation from './Animation'

export default class SolidColor extends Animation {
  constructor(){
    super('FFFFFF');
    this.name = 'None';
  }

  toString() {
    return `COLOR|${this.defaultColor}`;
  }
};
