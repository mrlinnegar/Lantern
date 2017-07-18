import 'babel-polyfill'
const expect = require('chai').expect;

import lightData from '../src/validators/validators.js';

describe('Light Validation', () => {
  describe('Status', ()=> {

    it('is missing is valid', () => {
      const data = {};

      const test = function(){
        lightData(data);
      }

      expect(test).not.to.throw();
    });

    it('should return true for valid status codes', ()=> {
      expect(lightData({status:1})).to.be.true;
      expect(lightData({status:0})).to.be.true;
    })

    it('should throw an error for invalud status codes', ()=> {
      const testData = {
        status: 2
      }
      const testFunction = ()=> {
        lightData(testData)
      }

      expect(testFunction).to.throw(Error)
    })
  })

  describe('color', ()=> {
    it('should allow no color to be passed', ()=>{
      const data = {};
      const testFunction = function(){
        lightData(data)
      }
      expect(testFunction).not.to.throw
    })

    it('should return true when no color is passed', ()=>{
      expect(lightData({})).to.be.true
    })

    it('should return true when valid color is passed', ()=>{
      const testData = {
        color: 'FFFFFF'
      }
      expect(lightData(testData)).to.be.true
    })

    it('should be case insensitive', ()=> {
      const testData = {
        color: 'ffffff'
      }
      expect(lightData(testData)).to.be.true
    })

    it('should throw an error when incorrect color is passed', ()=> {
      const testData = {
        color: 'NOTACOLOR'
      }
      const testFunction = ()=>{
        lightData(testData)
      }
      expect(testFunction).to.throw(Error)

    })
  })
});
