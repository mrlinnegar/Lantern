import LightDataError from '../exceptions/LightDataError';
const pattern = new RegExp('[0-9A-Fa-f]{6}');

export function lightDataValidator(data) {
  console.log(data);
  let { status: s, data: d, fps: f, loop: l } = data;
  const response = {};

  if (typeof s !== 'undefined') {
    if (s != 0 && s != 1 && s != 2) {
      throw new LightDataError(400, 'Status is set incorrectly');
    }
    response.status = s;
  }

  if (d) {
    if(!Array.isArray(d)){
      throw new LightDataError(400, 'Animation data is not in the correct format');
    }
    d.map((frame)=> {
      if(!Array.isArray(frame)){
        throw new LightDataError(400, 'Animation data is not in the correct format');
      }
      frame.map((bulbColor) => {
        if (!pattern.test(bulbColor)) {
          throw new LightDataError(400, bulbColor + ' is not a valid format');
        }
      });
    });


    response.data = d;
  }

  if (l) {
    if (l != 0 && l != 1){
      throw new LightDataError(400, 'Loop must be either 1 and 0');
    }
    response.loop = l;
  }

  if (f) {
    f = parseInt(f);
    if(f < 1 || f > 16){
      throw new LightDataError(400, 'Frames per second must be between 1 an 16');
    }
    response.fps = f;
  }

  return response;
};

export function colorValidator(color) {
    if(!color.match(/[0-9A-Fa-f]{6}/)){
        throw new LightDataError(400, 'Color is not in the correct format');
    }
    return color;
}