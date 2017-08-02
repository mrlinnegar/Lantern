const BULBS_PER_FRAME = 5;

export default class Rider {
  constructor(color = 'FF0000') {
    this.color = color;
    this.frameRate = 16;
    this.frameCount = 8;
    this.data = [];

    this.constructAnimation();
  }

  constructAnimation() {
    for(let frame = 0; frame < 4; frame++){
      for(let bulb = 0; bulb < BULBS_PER_FRAME; bulb++){
        if(frame == bulb){
          this.data.push(this.color)
        } else {
          this.data.push('000000');
        }
      }
    }

    for(let frame = 4; frame > 0; frame--){
      for(let bulb = 0; bulb < BULBS_PER_FRAME; bulb++){
        if(frame == bulb){
          this.data.push(this.color)
        } else {
          this.data.push('000000');
        }
      }
    }
  }

  toString() {
    const dataString = this.data.join('');
    return `ANIM|${this.frameCount},${this.frameRate},${dataString}`;
  }
}
