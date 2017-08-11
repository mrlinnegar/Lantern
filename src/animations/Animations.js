import SolidColor from './SolidColor';
import NYPD from './NYPD';
import Twinkle from './Twinkle';

let Animations = new Map();

Animations.set('None', SolidColor);
Animations.set('NYPD', NYPD);
Animations.set('Twinkle', Twinkle);

export default Animations;
