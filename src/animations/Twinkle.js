import Animation from './Animation'

const tinycolor = require("tinycolor2");
const frameRate = 8;
const numberOfFrames = 16;

export default class Twinkle extends Animation {
  constructor(color = '800813'){
    super(color, numberOfFrames, 5, frameRate);
    this.name = 'Twinkle';
    this.constructAnimation()
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  darkenColor(color){
    if(color != '000000') {
      if(Math.random() > 0.25) {
        return tinycolor(color).darken(this.getRandomInt(0,25)).toHex();
      } else {
        return tinycolor(color).lighten(this.getRandomInt(0,2)).toHex();
      }
    } else {
      return '000000';
    }
  }

  constructAnimation(color) {
    let data = [];
    for(let frame = 0; frame < this.numberOfFrames; frame++){
      for(let bulb = 0; bulb < this.numberOfBulbs; bulb++){
        this.data[frame][bulb] = this.darkenColor(this.defaultColor);
      }
    }
    return data;
  }

}
