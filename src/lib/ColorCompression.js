



function toRGB(hexInput){
    let red = hexInput.substring(0,2);
    let green = hexInput.substring(2,4);
    let blue = hexInput.substring(4,6);

    let output = [];
    output.push(parseInt(red, 16));
    output.push(parseInt(green, 16));
    output.push(parseInt(blue, 16));

    return output;
}

function toAscii(input) {
  const compressedInput = Math.floor(input / 2);
  let shiftedInput = compressedInput + 32;

  if(shiftedInput > 126){
    shiftedInput = 126;
  }

  const character = String.fromCharCode(shiftedInput);
  return character;
}

const ColorCompression = {
  toRGB: toRGB,
  toAscii: toAscii,

  compress: (hexInput) => {
    const colors = toRGB(hexInput);

    let output = colors.map((color) => {
      return toAscii(color);
    });
    
    return output.join('');
  },

};

export default ColorCompression;
