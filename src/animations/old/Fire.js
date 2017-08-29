const tinycolor = require("tinycolor2");

const NUMBER_OF_FRAMES = 8;
const NUMBER_OF_BULBS = 5;

const Fire = (function() {

  const frameRate = 8;
  const frameCount = 8;

  const fireColor = 'ff6f00';
  const fireColor2 = 'ff510c';


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  function getColor(){
    let color = (Math.random() > 0.5)? fireColor: fireColor2;
    if(Math.random() > 0.25) {
      return tinycolor(color).darken(getRandomInt(0,50)).toHex();
    } else {
      return tinycolor(color).lighten(getRandomInt(0,2)).toHex();
    }
  }

  function constructAnimation() {
    let data = [];

    for(let frame = 0; frame < NUMBER_OF_FRAMES; frame++) {
      for(let bulb = 0; bulb < NUMBER_OF_BULBS; bulb++ ){
        data.push(getColor());
      }
    }

    return data;
  }

  function toDataString(data) {
    const dataString = data.join('');
    return `ANIM|${frameCount},${frameRate},${dataString}`;
  }

  function render() {
    const data = constructAnimation();
    return toDataString(data);
  }

  return {
    'name': 'Fire',
    'render': render
  };

})();


export default Fire;