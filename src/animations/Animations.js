import Chaser from './Chaser';
import Rider from './Rider';
import SolidColor from './SolidColor';
import Twinkle from './Twinkle';

let Animations = new Map();


Animations.set('None', SolidColor);
Animations.set('Chaser', Chaser);
Animations.set('Rider', Rider);
Animations.set('Twinkle', Twinkle);

export default Animations;
