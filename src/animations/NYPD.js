import Animation from './Animation';

const frameRate = 16;
const numberOfFrames = 16;
const numberOfBulbs = 5;
const RED = 'FF0000';
const BLUE = '0000FF';
const OFF = '000000';

export default class NYPD extends Animation {
  constructor(){
    super('000000', numberOfFrames, numberOfBulbs, frameRate);
    this.name = 'NYPD';
    this.constructAnimation();
  }

  constructAnimation(){
    this.data[0] = this.fillFrame(RED);
    this.data[1] = this.fillFrame(OFF);
    this.data[2] = this.fillFrame(RED);
    this.data[3] = this.fillFrame(OFF);
    this.data[4] = this.fillFrame(RED);
    this.data[5] = this.fillFrame(OFF);
    this.data[6] = this.fillFrame(OFF);
    this.data[7] = this.fillFrame(OFF);
    this.data[8] = this.fillFrame(BLUE);
    this.data[9] = this.fillFrame(OFF);
    this.data[10] = this.fillFrame(BLUE);
    this.data[11] = this.fillFrame(OFF);
    this.data[12] = this.fillFrame(BLUE);
    this.data[13] = this.fillFrame(OFF);
    this.data[14] = this.fillFrame(OFF);
    this.data[15] = this.fillFrame(OFF);
  }

}
