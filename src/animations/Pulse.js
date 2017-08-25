import Animation from './Animation';
const tinycolor = require('tinycolor2');

const frameRate = 10;
const numberOfFrames = 20;

export default class Pulse extends Animation {
  constructor(color = 'FFFFFF'){
    super(color, numberOfFrames, frameRate);
    this.name = 'Pulse';
    this.constructAnimation();
  }


  constructAnimation(){
    this.data = [];
    for(let i = 0; i < numberOfFrames/2; i++){
      const color = tinycolor(this.defaultColor).darken(i * 5).toHex();
      this.data.push(this.fillFrame(color));
    }
    for(let i = numberOfFrames / 2; i > 0; i--){
      const color = tinycolor(this.defaultColor).darken(i * 5).toHex();
      this.data.push(this.fillFrame(color));
    }
  }

}
