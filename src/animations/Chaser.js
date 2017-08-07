const BULBS_PER_FRAME = 5;

const Chaser = (function() {

  const frameRate = 1;
  const frameCount = 5;

  function constructAnimation(color) {
    let data = [];
    for(let frame = 0; frame < frameCount; frame++){
      for(let bulb = 0; bulb < BULBS_PER_FRAME; bulb++){
        if(frame == bulb){
          data.push(color)
        } else {
          data.push('000000');
        }
      }
    }
    return data;
  }

  function render(color = '00FF00') {
    const data = constructAnimation(color);
    const dataString = data.join('');
    return `ANIM|${frameCount},${frameRate},${dataString}`;
  }

  return {
    name: 'Chaser',
    render: render
  };

})();

export default Chaser;
