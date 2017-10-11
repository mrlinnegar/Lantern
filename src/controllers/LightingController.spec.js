import LightRespository from './LightRespository';
import LightNotFoundError from '../exceptions/LightNotFoundError';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
chai.should();


describe('LightRespository', () => {
  let fakeBroker;
  let fakeLight;

  beforeEach( ()=> {
    fakeBroker = {
      init: sinon.spy()
    };
    fakeLight = {

    };
  });

  describe('constructor', () => {
    it('should allow observers to subscribe to it', () => {
      const lighting = new LightRespository(fakeBroker);
      expect(lighting.addObserver).to.be.a('function');
    });

    it('should call init on the light broker', () => {
      const lighting = new LightRespository(fakeBroker);
      fakeBroker.init.should.have.been.called;
    });

    it('should create an empty map for lights', () => {
      const lighting = new LightRespository(fakeBroker);
      expect(lighting.lights).to.be.a('map');
      expect(lighting.lights.size).to.equal(0);
    });

  });

  describe('addLight', () => {
    it('should add a new light to the lights map', () => {
      const lighting = new LightRespository(fakeBroker);
      const fakeLight = "FAKELIGHT";
      const LIGHT_ID = '12345';
      lighting.addLight(LIGHT_ID, fakeLight);
      expect(lighting.lights.size).to.equal(1);
    });
  });

  describe('handleMessage', () => {
    it('it should register a new light for an unrecognised light ID', () => {

      const lighting = new LightRespository(fakeBroker);
      const registerNewLightStub = sinon.stub(lighting, 'registerNewLight');
      const INCOMING_MESSAGE = '12345';

      lighting.handleMessage(INCOMING_MESSAGE);
      registerNewLightStub.should.have.been.calledWith('12345');
    });

  });

  describe('registerNewLight', () => {

  });

  describe('cleanLights', () => {

  });

  describe('getLights', () => {
    it('should return an empty array if there are no lights', () => {
      const lighting = new LightRespository(fakeBroker);
      const lights = lighting.getLights();
      expect(lights).to.be.an('array');
      expect(lights.length).to.equal(0);
    });

    it('should return an array of light data if there are lights', () => {
      const lighting = new LightRespository(fakeBroker);

      const fakeLight = {
        getData: sinon.stub().returns('TESTDATA')
      }

      lighting.addLight('12345', fakeLight);
      const lights = lighting.getLights();

      fakeLight.getData.should.have.been.called;
      expect(lights).to.be.an('array');
      expect(lights.length).to.equal(1);
    });

  });

  describe('getLightById', () => {
    it('should throw an error no light', () => {
      const lighting = new LightRespository(fakeBroker);

      const testFunction = () => {
        lighting.getLightById('12345');
      };

      expect(testFunction).to.throw().with.property('status', 404)
    });

    it('should return a light with a correct id', () => {
      const lighting = new LightRespository(fakeBroker);
      const fakeLight = 'fakeLight';
      const fakeLightId = '12345';

      lighting.addLight(fakeLightId, fakeLight);
      const light = lighting.getLightById(fakeLightId);
      expect(light).to.deep.equal(fakeLight);

    })
  });
});
