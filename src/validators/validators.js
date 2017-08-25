import LightDataError from '../exceptions/LightDataError';
import Animations from '../animations/Animations';

export default function lightDataValidator(data) {
  const { status: s, color: c, animation: a } = data;
  const response = {};

  if (typeof s !== 'undefined') {
    if (s !== 0 && s !== 1) {
      throw new LightDataError(400, 'Status is set incorrectly');
    }
    response.status = s;
  }

  if (c) {
    const pattern = new RegExp('[0-9A-Fa-f]{6}');
    if (!pattern.test(c)) {
      throw new LightDataError(400, 'Color is not a valid format');
    }
    response.color = c;
  }

  if (a) {
    if(!Animations.get(a)){
      throw new LightDataError(400, 'Animation name is not valid');
    }
    response.animation = a;
  }

  return response;
}
