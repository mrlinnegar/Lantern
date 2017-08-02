const BULBS_PER_FRAME = 5;

export default class Chaser {
  constructor(color = 'FFFFFF') {
    this.color = color;
    this.frameRate = 1;
    this.frameCount = 5;
    this.data = [];

    this.constructAnimation();
  }

  constructAnimation() {
    for(let frame = 0; frame < this.frameCount; frame++){
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
