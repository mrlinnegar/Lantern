const expect = require('chai').expect;
import Light from './Light'

describe('Light', ()=> {
  describe('constructor', ()=> {
    it('should throw an error if no ID is passed', ()=>{
      let testFunction = ()=> {
        const light = new Light();
      }
      expect(testFunction).to.throw();
    })

    it('should set the address url to the passed id', ()=> {
      const light = new Light('ID');
      expect(light.address).to.equal('/ID')
    })
  })
})
