import SolidColor from './SolidColor';
import Twinkle from './Twinkle';
import Blink from './Blink';
import Pulse from './Pulse';
import Chaser from './Chaser';

const AnimationsAvailable = new Map();

AnimationsAvailable.set('Solid', SolidColor)
AnimationsAvailable.set('Blink', Blink);
AnimationsAvailable.set('Twinkle', Twinkle);
AnimationsAvailable.set('Pulse', Pulse);
AnimationsAvailable.set('Chaser', Chaser);


let AnimationList = {
    random: ()=>{
        const index = Math.floor(Math.random() * AnimationsAvailable.size)
        const key = Array.from(AnimationsAvailable.keys())[index];
        return AnimationsAvailable.get(key);
    },
    get: (animationName)=>{
        return AnimationsAvailable.get(animationName);
    }
};

export default AnimationList
