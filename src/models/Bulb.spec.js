import Bulb from './Bulb';

const expect = require('chai').expect;

describe('Bulb', () => {
  describe('constructor', () => {
    it('should have default colour of FFFFFF', () => {
      const bulb = new Bulb();
      expect(bulb.color).to.equal('FFFFFF');
    });

    it('should be able to set the color with a parameter', () => {
      const testColor = 'FFFFFF';
      const bulb = new Bulb(testColor);
      expect(bulb.color).to.equal(testColor);
    });

    it('should have a default status of 0', () => {
      const bulb = new Bulb();
      expect(bulb.status).to.equal(0);
    })
  });
});
