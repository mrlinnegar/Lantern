import Animation from './Animation'

const FRAME_RATE = 1;
const NUMBER_OF_FRAMES = 1;


export default class SolidColor extends Animation {
  constructor(color = 'FFFFFF'){
    super(color, NUMBER_OF_FRAMES, FRAME_RATE);
    this.name = 'None';
    this.constructAnimation();
  }

  constructAnimation(){
    this.data = []
    this.data.push(this.fillFrame(this.defaultColor));
  }
};
