import Animation from './Animation'
const tinycolor = require("tinycolor2");

const FRAME_RATE = 8;
const NUMBER_OF_FRAMES = 16;
const NUMBER_OF_BULBS = 5;

export default class Twinkle extends Animation {
  constructor(color = '800813'){
    super(color, NUMBER_OF_FRAMES, FRAME_RATE);
    this.name = 'Twinkle';
    this.colors = [
      color
    ];
    this.constructAnimation();
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

  constructAnimation() {

    for(let frame = 0; frame < this.numberOfFrames; frame++){
      for(let bulb = 0; bulb < NUMBER_OF_BULBS; bulb++){
        this.data[frame][bulb] = this.darkenColor(this.defaultColor);
      }
    }
  }

}
