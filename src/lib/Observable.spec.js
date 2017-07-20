import Observable from './Observable';

const expect = require('chai').expect;
const sinon = require('sinon');


describe('Observable', () => {
  describe('constructor', () => {
    it('should create a map for new observers', () => {
      const observable = new Observable();
      expect(observable.observers).to.be.a('map');
    });
  });

  describe('addObserver', () => {
    it('should have a subscribe function', () => {
      const observable = new Observable();
      expect(observable.addObserver).to.be.a('function');
    });

    it('should allow functions to be an array', () => {
      const observable = new Observable();
      const label = 'LABEL';
      const callback = sinon.spy();
      observable.addObserver(label, callback);
      expect(observable.observers.size).to.be.equal(1);
      expect(observable.observers.get(label)).to.be.a('array');
      expect(observable.observers.get(label).length).to.equal(1);
    });
  });

  describe('emit', () => {
    it('should call all callbacks when a label is emitted', () => {
      const observable = new Observable();
      const label = 'LABEL';
      const firstCallback = sinon.spy();
      const secondCallback = sinon.spy();
      observable.addObserver(label, firstCallback);
      observable.addObserver(label, secondCallback);
      observable.emit(label);

      expect(firstCallback.called).to.be.true;
      expect(secondCallback.called).to.be.true;
    });

    it('should call only callbacks for the correct label', () => {
      const observable = new Observable();
      const firstLabel = 'LABEL1';
      const secondLabel = 'LABEL2';
      const firstCallback = sinon.spy();
      const secondCallback = sinon.spy();
      observable.addObserver(firstLabel, firstCallback);
      observable.addObserver(secondLabel, secondCallback);
      observable.emit(firstLabel);

      expect(firstCallback.called).to.be.true;
      expect(secondCallback.called).to.be.false;
    });
  });
});
