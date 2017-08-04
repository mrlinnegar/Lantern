const tinycolor = require("tinycolor2");
const BULBS_PER_FRAME = 5;

export default class Twinkle {
  constructor(color = 'FFFFFF') {
    this.color = color;
    this.frameRate = 8;
    this.frameCount = 16;
    this.data = [];
    this.constructAnimation();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getColor(){
    if(this.color != '000000') {
      if(Math.random() > 0.25) {
        return tinycolor(this.color).darken(this.getRandomInt(0,25)).toHex();
      } else {
        return tinycolor(this.color).lighten(this.getRandomInt(0,2)).toHex();
      }
    } else {
      return '000000';
    }
  }

  constructAnimation() {
    let data = [];
    for(let frame = 0; frame < this.frameCount; frame++){
      for(let bulb = 0; bulb < BULBS_PER_FRAME; bulb++){
        this.data.push(this.getColor());
      }
    }
  }

  toString() {
    const dataString = this.data.join('');
    return `ANIM|${this.frameCount},${this.frameRate},${dataString}`;
  }
}
