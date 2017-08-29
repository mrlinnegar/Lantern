import SolidColor from './SolidColor';
import Twinkle from './Twinkle';
import Blink from './Blink';
import Pulse from './Pulse';
import NYPD from './NYPD';
let Animations = new Map();

Animations.set('None', SolidColor);
Animations.set('Blink', Blink);
Animations.set('NYPD', NYPD);
Animations.set('Twinkle', Twinkle);
Animations.set('Pulse', Pulse);

export default Animations;
