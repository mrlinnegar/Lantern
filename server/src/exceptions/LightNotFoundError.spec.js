import LightNotFoundError from './LightNotFoundError';

const expect = require('chai').expect;

describe('LightNotFoundError', () => {
  describe('constructor', () => {
    it('should default to 404 status and light not found', () => {
      const error = new LightNotFoundError();
      expect(error.status).to.equal(404);
      expect(error.message).to.equal('Light not found');
    });
  });
});
