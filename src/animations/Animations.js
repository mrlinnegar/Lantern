import Chaser from './Chaser';
import Rider from './Rider';
import SolidColor from './SolidColor';
import Twinkle from './Twinkle';
import NYPD from './NYPD';

let Animations = new Map();


Animations.set('None', SolidColor);
Animations.set('NYPD', NYPD);
Animations.set('Chaser', Chaser);
Animations.set('Rider', Rider);
Animations.set('Twinkle', Twinkle);
export default Animations;
