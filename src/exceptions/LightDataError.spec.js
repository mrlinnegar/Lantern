import LightDataError from './LightDataError';

const expect = require('chai').expect;

describe('LightDataError', () => {
  describe('constructor', () => {
    it('should default to 500 status and unknown error', () => {
      const error = new LightDataError();
      expect(error.status).to.equal(500);
      expect(error.message).to.equal('An unknown error has occured');
    });
  });
});
