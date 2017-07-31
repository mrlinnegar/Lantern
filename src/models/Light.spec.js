import Light from './Light';

const expect = require('chai').expect;

describe('Light', () => {
  describe('constructor', () => {
    it('should throw an error if no ID is passed', () => {
      const testFunction = () => {
        const light = new Light();
        light.getId();
      };
      expect(testFunction).to.throw();
    });

    it('should set the address url to the passed id', () => {
      const light = new Light('ID');
      expect(light.address).to.equal('/ID');
    });

    it('should have an array of bulbs', () => {
      const light = new Light('ID');
      expect(light.bulbs).to.be.an('Array');
    });
  });
});
