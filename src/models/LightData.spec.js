import LightData from './LightData';

const expect = require('chai').expect;

describe('LightData', () => {
  describe('constructor', () => {
    it('should throw if no id is passed', () => {
      const testFunction = () => {
        const lightData = new LightData();
        return lightData;
      };
      expect(testFunction).to.throw();
    });

    it('should have a default status of 0', () => {
      const lightData = new LightData('12345');
      expect(lightData.status).to.equal(0);
    });

  });
});
