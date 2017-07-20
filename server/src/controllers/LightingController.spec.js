import LightingController from './LightingController';
import LightNotFoundError from '../exceptions/LightNotFoundError';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
chai.should();


describe('LightingController', () => {
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
      const lighting = new LightingController(fakeBroker);
      expect(lighting.addObserver).to.be.a('function');
    });

    it('should call init on the light broker', () => {
      const lighting = new LightingController(fakeBroker);
      fakeBroker.init.should.have.been.called;
    });

    it('should create an empty map for lights', () => {
      const lighting = new LightingController(fakeBroker);
      expect(lighting.lights).to.be.a('map');
      expect(lighting.lights.size).to.equal(0);
    });

  });

  describe('addLight', () => {
    it('should add a new light to the lights map', () => {
      const lighting = new LightingController(fakeBroker);
      const fakeLight = "FAKELIGHT";
      const LIGHT_ID = '12345';
      lighting.addLight(LIGHT_ID, fakeLight);
      expect(lighting.lights.size).to.equal(1);
    });
  });

  describe('handleMessage', () => {
    it('it should register a new light for an unrecognised light ID', () => {

      const lighting = new LightingController(fakeBroker);
      const stub = sinon.stub(lighting, 'registerNewLight');
      const INCOMING_MESSAGE = '12345|000000';

      lighting.handleMessage(INCOMING_MESSAGE);
      stub.should.have.been.calledWith('12345');
    });


    it('should set last seen for an existing light with a recognised ID', () => {
      const fakeLight = {
        setLastSeen: sinon.spy()
      }
      const lighting = new LightingController(fakeBroker);
      const LIGHT_ID = '12345';
      const INCOMING_MESSAGE = '12345|000000'
      lighting.addLight(LIGHT_ID, fakeLight);

      lighting.handleMessage(INCOMING_MESSAGE);

      fakeLight.setLastSeen.should.have.been.called;

    });

    it('should update the status of an existing light without a color', () => {
      const fakeLight = {
        setLastSeen: sinon.spy(),
        update: sinon.spy(),
      }
      const lighting = new LightingController(fakeBroker);
      const LIGHT_ID = '12345';
      const INCOMING_MESSAGE = '12345|'
      lighting.addLight(LIGHT_ID, fakeLight);

      lighting.handleMessage(INCOMING_MESSAGE);

      fakeLight.update.should.have.been.calledWith({ status: 0 });
    });

    it('should not update the status of an existing light with a color', () => {
      const fakeLight = {
        setLastSeen: sinon.spy(),
        update: sinon.spy(),
      }
      const lighting = new LightingController(fakeBroker);
      const LIGHT_ID = '12345';
      const INCOMING_MESSAGE = '12345|FFFFFF'
      lighting.addLight(LIGHT_ID, fakeLight);

      lighting.handleMessage(INCOMING_MESSAGE);

      fakeLight.update.should.not.have.been.called;
    });

  });

  describe('registerNewLight', () => {

  });

  describe('cleanLights', () => {

  });

  describe('getLights', () => {
    it('should return an empty array if there are no lights', () => {
      const lighting = new LightingController(fakeBroker);
      const lights = lighting.getLights();
      expect(lights).to.be.an('array');
      expect(lights.length).to.equal(0);
    });

    it('should return an array of light data if there are lights', () => {
      const lighting = new LightingController(fakeBroker);

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
      const lighting = new LightingController(fakeBroker);

      const testFunction = () => {
        lighting.getLightById('12345');
      };

      expect(testFunction).to.throw().with.property('status', 404)
    });

    it('should return a light with a correct id', () => {
      const lighting = new LightingController(fakeBroker);
      const fakeLight = 'fakeLight';
      const fakeLightId = '12345';

      lighting.addLight(fakeLightId, fakeLight);
      const light = lighting.getLightById(fakeLightId);
      expect(light).to.deep.equal(fakeLight);

    })
  });
});
