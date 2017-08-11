const tinycolor = require("tinycolor2");
const BULBS_PER_FRAME = 5;

const Twinkle = (() => {

    const frameRate = 8;
    const frameCount = 16;

    let data = [];

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function darkenColor(color){
      if(color != '000000') {
        if(Math.random() > 0.25) {
          return tinycolor(color).darken(getRandomInt(0,25)).toHex();
        } else {
          return tinycolor(color).lighten(getRandomInt(0,2)).toHex();
        }
      } else {
        return '000000';
      }
    }

    function constructAnimation(color) {
      let data = [];
      for(let frame = 0; frame < frameCount; frame++){
        for(let bulb = 0; bulb < BULBS_PER_FRAME; bulb++){
          data.push(darkenColor(color));
        }
      }
      return data;
    }

    function toDataString(data) {
      const dataString = data.join('');
      return `ANIM|${frameCount},${frameRate},${dataString}`;
    }

    function render(color = 'FFFFFF') {
      const data = constructAnimation(color);
      return toDataString(data);
    }

    return {
      'name': 'Twinkle',
      'render': render
    };

})();

export default Twinkle;
