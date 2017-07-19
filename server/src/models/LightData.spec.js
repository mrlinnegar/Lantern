const expect = require('chai').expect;
import LightData from './LightData'

describe('LightData', ()=>{
  describe('constructor', ()=> {
    it('should throw if no id is passed', ()=> {
      const testFunction = ()=>{
        lightData = new LightData();
      }
      expect(testFunction).to.throw()
    })

    it('should have a default status of 0', ()=> {
      const lightData = new LightData('12345');
      expect(lightData.status).to.equal(0);
    })

    it('should have default color', ()=> {
      const lightData = new LightData('12345');
      expect(lightData.color).to.equal('FFFFFF');
    })
  })

})
