import Animation from './Animation';

const OFF = '000000';

export default class Chaser extends Animation {
    constructor(color = 'FFFFFF'){
        super(color, 5, 8);
        this.name = 'Chaser';
        this.constructAnimation();
    }


    constructAnimation() {
        this.data = [];
        for(let frame = 0; frame < 5; frame++){
            this.data[frame] = [];
            for(let bulb = 0; bulb < 5; bulb++){
                if(frame === bulb){
                    this.data[frame].push(this.defaultColor)
                } else {
                    this.data[frame].push(OFF);
                }
            }
        }
    }

}
