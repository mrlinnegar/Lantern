import Animation from './Animation';

const frameRate = 1;
const numberOfFrames = 8;

const ON = 'FFFFFF';
const OFF = '000000';

export default class Blink extends Animation {
  constructor(color = 'FFFFFF'){
    super(color, numberOfFrames, frameRate);
    this.name = 'Blink';
    this.colors = [
      ON
    ];
    this.constructAnimation();
  }

  constructAnimation(){
    const colorPrimary = this.colors[0];
    const colorSecondary = this.colors[1];

    for(let i = 0; i < numberOfFrames; i++){
      const color = (i % 2 == 0)? this.defaultColor : OFF;
      this.data[i] = this.fillFrame(color);
    }
  }

}
