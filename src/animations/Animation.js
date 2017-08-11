import ColorCompression from '../lib/ColorCompression';

const NUMBER_OF_BULBS = 5;
const NUMBER_OF_FRAMES = 8;
const FRAMES_PER_SECOND = 8;
const OFF = '000000';

export default class Animation {
  constructor(defaultColor = OFF,
              numberOfFrames = NUMBER_OF_FRAMES,
              numberOfBulbs = NUMBER_OF_BULBS,
              frameRate = FRAMES_PER_SECOND,
              ) {

    this.name = 'Animation';
    this.numberOfFrames = numberOfFrames;
    this.numberOfBulbs = numberOfBulbs;
    this.frameRate = frameRate;
    this.defaultColor = defaultColor;
    this.data = this.constructDefaultAnimation();
  }

  constructDefaultAnimation() {
      let sequence = [];
      for(let frame = 0; frame < this.numberOfFrames; frame++){
        sequence[frame] = this.fillFrame(OFF);
      }
      return sequence;
  }

  fillFrame(color = OFF) {
    let frame = [];
    for(let bulb = 0; bulb < this.numberOfBulbs; bulb++){
      frame[bulb] = color;
    }
    return frame;
  }

  toString() {
    let output = [];

    this.data.map((frame)=> {

      frame.map((bulb) => {
        output.push(bulb);
      });
    });

    const dataString = output.join('');

    return `ANIM|${this.numberOfFrames},${this.frameRate},${dataString}`;

  }

}
