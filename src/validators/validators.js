import LightDataError from '../exceptions/LightDataError';
const pattern = new RegExp('[0-9A-Fa-f]{6}');

export function lightDataValidator(input) {
  console.log(input);

  const response = {};

  if (typeof input.status !== 'undefined') {
    if (input.status != 0 && input.status != 1 && input.status != 2) {
      throw new LightDataError(400, 'Status is set incorrectly');
    }
    response.status = input.status;
  }

  if (input.data) {
    if(!Array.isArray(input.data)){
      throw new LightDataError(400, 'Animation data is not in the correct format');
    }
    input.data.map((frame)=> {
      if(!Array.isArray(frame)){
        throw new LightDataError(400, 'Animation data is not in the correct format');
      }
      frame.map((bulbColor) => {
        if (!pattern.test(bulbColor)) {
          throw new LightDataError(400, bulbColor + ' is not a valid format');
        }
      });
    });


    response.data = input.data;
  }

  if (typeof input.loop !== 'undefined') {
    if (input.loop != 0 && input.loop != 1){
      throw new LightDataError(400, 'Loop must be either 1 and 0');
    }
    response.loop = input.loop;
  }

  if (typeof input.fps !== 'undefined') {
    input.fps = parseInt(input.fps);
    if(input.fps < 1 || input.fps > 16){
      throw new LightDataError(400, 'Frames per second must be between 1 an 16');
    }
    response.fps = input.fps;
  }

  return response;
};

export function colorValidator(color) {
    if(!color.match(/[0-9A-Fa-f]{6}/)){
        throw new LightDataError(400, 'Color is not in the correct format');
    }
    return color;
}