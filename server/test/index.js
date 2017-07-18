import 'babel-polyfill'
const expect = require('chai').expect;

import lightData from '../src/validators/validators.js';

describe('Light Validation', () => {

  it('should remove unwanted properties', ()=> {
      const inputData = { 'otherobject': 12345 }
      const outputData = lightData(inputData)
      const expectedData = {}

      expect(outputData).to.deep.equal(expectedData)
  })

  describe('Status', ()=> {

    it('should allow no status to be passed', () => {
      const data = {};

      const test = function(){
        lightData(data);
      }

      expect(test).not.to.throw();
    });

    it('should return input object for valid on status code', ()=> {
      const testData = { status: 1};
      const outputData = lightData(testData);

      expect(outputData).to.deep.equal(testData);
    })

    it('should return input object for valid off status code', ()=> {
      const testData = { status: 0 }
      const outputData = lightData(testData);
      expect(outputData).to.deep.equal(testData);
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
      const testData = {}
      const outputData = lightData(testData);
      expect(outputData).to.deep.equal(testData);
    })

    it('should return true when valid color is passed', ()=>{
      const testData = {
        color: 'FFFFFF'
      }
      const outputData = lightData(testData);
      expect(outputData).to.deep.equal(testData);
    })

    it('should be case insensitive', ()=> {
      const testData = {
        color: 'ffffff'
      }
      const outputData = lightData(testData);
      expect(outputData).to.deep.equal(testData)
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
