import Animation from './Animation';

const frameRate = 16;
const numberOfFrames = 16;

const RED = 'FF0000';
const BLUE = '0000FF';
const OFF = '000000';

export default class NYPD extends Animation {
  constructor(){
    super('000000', numberOfFrames, frameRate);
    this.name = 'NYPD';
    this.colors = [
      RED,
      BLUE
    ];
    this.constructAnimation();
  }

  constructAnimation(){
    const colorPrimary = this.colors[0];
    const colorSecondary = this.colors[1];

    this.data[0] = this.fillFrame(colorPrimary);
    this.data[1] = this.fillFrame(OFF);
    this.data[2] = this.fillFrame(colorPrimary);
    this.data[3] = this.fillFrame(OFF);
    this.data[4] = this.fillFrame(colorPrimary);
    this.data[5] = this.fillFrame(OFF);
    this.data[6] = this.fillFrame(OFF);
    this.data[7] = this.fillFrame(OFF);
    this.data[8] = this.fillFrame(colorSecondary);
    this.data[9] = this.fillFrame(OFF);
    this.data[10] = this.fillFrame(colorSecondary);
    this.data[11] = this.fillFrame(OFF);
    this.data[12] = this.fillFrame(colorSecondary);
    this.data[13] = this.fillFrame(OFF);
    this.data[14] = this.fillFrame(OFF);
    this.data[15] = this.fillFrame(OFF);
  }

}
