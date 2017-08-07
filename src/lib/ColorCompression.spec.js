const expect = require('chai').expect;

import ColorCompression from './ColorCompression';

describe('ColorCompression', () => {
  it('should be a function', () => {
    expect(ColorCompression).to.be.an('object');
  });

  describe('toRGB', () => {
    it('should have an RGB function', () => {
      expect(ColorCompression.toRGB).to.be.a('function');
    });

    it('should return an array', () => {
      const output = ColorCompression.toRGB('FFFFFF');
      expect(output).to.be.an('array');
    });

    it('should have 3 values in the returned object', () => {
      const output = ColorCompression.toRGB('FFFFFFF');
      expect(output.length).to.equal(3);
    });

    it('should parse a hex input and return R, G, and B integer values', () => {
      const output = ColorCompression.toRGB('FF00FF');
      expect(output[0]).to.equal(255);
      expect(output[1]).to.equal(0);
      expect(output[2]).to.equal(255);
    });
  });

  describe('toAscii', () => {
    it('should be a function', () => {
      expect(ColorCompression.toAscii).to.be.a('function');
    });

    it('should return a single character', () => {
      const output = ColorCompression.toAscii(0);
      expect(output.length).to.equal(1);
    });

    describe('mapping to prinable characters', () => {
      it('should return a space for a 0', () => {
        const output = ColorCompression.toAscii(0);
        expect(output).to.equal(' ');
      });

      it('should return a ! for a 2', () => {
        const output = ColorCompression.toAscii(2);
        expect(output).to.equal('!');
      });

      it('should handle large values', () => {
        const output = ColorCompression.toAscii(150);
        expect(output).to.equal('k');
      });

      it('should limit max values to ~', () => {
        const output = ColorCompression.toAscii(255);
        expect(output).to.equal('~');
      })

    });

  });


  describe('Compress', () => {

    it('should have a compress function', () => {
      expect(ColorCompression.compress).to.be.a('function');
    });


    it('should return a string', () => {
        const output = ColorCompression.compress('FFFFFF');
        expect(output).to.be.a('string');
    });

    it('should return three characters', () => {
      const output = ColorCompression.compress('FFFFFF');
      expect(output.length).to.equal(3);
    });

    it('should compress FFFFFF to ~~~', () => {
      const output = ColorCompression.compress('FFFFFF');
      expect(output).to.equal('~~~');
    });


    it('should compress 000000 to "   "', () => {
      const output = ColorCompression.compress('000000');
      expect(output).to.equal('   ');
    });

    it('should compress red, green and blue independantly', () => {
      const rOutput = ColorCompression.compress('FF0000');
      expect(rOutput).to.equal('~  ');

      const gOutput = ColorCompression.compress('00FF00');
      expect(gOutput).to.equal(' ~ ');

      const bOutput = ColorCompression.compress('0000FF');
      expect(bOutput).to.equal('  ~');



    })
  });
});
