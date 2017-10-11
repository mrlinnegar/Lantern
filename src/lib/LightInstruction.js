import ColorCompression from '../lib/ColorCompression';

function animate(data, frameRate = 1, loop = 1) {
  let output = [];

  data.map((frame)=> {
    frame.map((bulbColor) => {
      output.push(ColorCompression.compress(bulbColor));
    });
  });

  const dataString = output.join('');
  const instruction = `ANIM|${loop},${data.length},${frameRate},${dataString}`;
  console.log(`'${instruction}'`);

  return instruction;
}

function off(){
  return 'OFF|000000';
}

function pause(){
  return 'STOP|000000';
}

function play(){
  return 'PLAY|000000';
}


const LightInstruction = {
  "off" : off,
  "animate" : animate,
  "pause" : pause,
    "play": play
};

export default LightInstruction;
