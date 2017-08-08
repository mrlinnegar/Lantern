const BULBS_PER_FRAME = 5;

const NYPD = (() => {

    const frameRate = 14;
    const frameCount = 14;

    const RED = 'FF0000';
    const BLUE = '0000FF';
    const OFF = '000000';

    function fillFrame(data, color = '000000'){
      for(let bulb = 0; bulb < BULBS_PER_FRAME; bulb++){
        data.push(color);
      }
      return data;
    }

    function constructAnimation() {
      let data = [];

      data = fillFrame(data, RED);
      data = fillFrame(data, OFF);
      data = fillFrame(data, RED);
      data = fillFrame(data, OFF);
      data = fillFrame(data, RED);
      data = fillFrame(data, OFF);
      data = fillFrame(data, OFF);
      data = fillFrame(data, OFF);
      data = fillFrame(data, BLUE);
      data = fillFrame(data, OFF);
      data = fillFrame(data, BLUE);
      data = fillFrame(data, OFF);
      data = fillFrame(data, OFF);
      data = fillFrame(data, OFF);

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
      'name': 'NYPD',
      'render': render
    };

})();

export default NYPD;
