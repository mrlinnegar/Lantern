import mqtt from 'mqtt';
import LightBroker from './LightBroker';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.should();

describe('LightBroker', () => {
  describe('constructor', () => {
    it('should work as expected', () => {
      const stub = sinon.stub(mqtt, 'connect', () => {
        return {
          on: sinon.spy(),
        };
      });

      const broker = new LightBroker();
      broker.init();
      stub.should.have.been.calledWith('mqtt://192.168.0.1');
    });
  });
});
