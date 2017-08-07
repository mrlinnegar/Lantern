import LightRepository from './LightRepository';

const expect = require('chai').expect;

describe('LightRepository', () => {
  describe('Constructor', () => {
    it('should create a light repository', () => {
      const repository = new LightRepository();
    });
    it('should create an empty map for lights', () => {
      const repository = new LightRepository();
      expect(repository.lights).to.be.a('map');
    });
  });

  describe('AddLight', () => {
    it('should add a light to the map', () => {
      const repository = new LightRepository();
      const fakeLight = "FakeLight";
      repository.addLight(fakeLight);

      expect(repository.lights.size).to.equal(1);
    })
  });

  describe('RemoveLight', () => {

  });
});
