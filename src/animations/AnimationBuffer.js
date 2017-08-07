const BULBS_PER_FRAME = 5;
const FRAMES_PER_SEQUENCE = 16;
const BLACK = '000000';

function AnimationBuffer() {
  let buffer = []
  for(let frame = 0; frame < FRAMES_PER_SEQUENCE; frame++) {
    for(let bulb = 0; bulb < BULBS_PER_FRAME; bulb++) {
      buffer[frame][bulb] = BLACK;
    }
  }
  return buffer;
}
