const BULBS_PER_FRAME = 5;

const Rider  = (function(){

    const frameRate = 16;
    const frameCount = 8;


  function constructAnimation(color) {
    let data = [];
    for(let frame = 0; frame < 4; frame++){
      for(let bulb = 0; bulb < BULBS_PER_FRAME; bulb++){
        if(frame == bulb){
          data.push(color)
        } else {
          data.push('000000');
        }
      }
    }

    for(let frame = 4; frame > 0; frame--){
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

  function render(color = 'FF0000') {
    let data = constructAnimation(color)
    const dataString = data.join('');
    return `ANIM|${frameCount},${frameRate},${dataString}`;
  }

  return {
    name: 'Rider',
    render: render
  }
})()

export default Rider;
