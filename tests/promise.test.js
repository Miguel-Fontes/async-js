const expect = require('chai').expect
const promise = require('./../src/promise')

describe('Promise suite', function () {
  describe('Constructor API', function () {
    it('should implement all API', function (done) {
      expect(promise.all).not.to.be.undefined
      done()
    })
    it('should implement race API', function (done) {
      expect(promise.race).not.to.be.undefined
      done()
    })
    it('should implement reject API', function (done) {
      expect(promise.reject).not.to.be.undefined
      done()
    })
    it('should implement resolve API', function (done) {
      expect(promise.resolve).not.to.be.undefined
      done()
    })
  })
  describe('Promise API', function () {
    it('should implement then API', function(done) {
        expect(promise.create(function(resolve, reject) {
            resolve()
        }).then).not.to.be.undefined
        done()
    })
    it('should implement catch API', function(done) {
        expect(promise.create(function(resolve, reject) {
            resolve()
        }).catch).not.to.be.undefined
        done()
    })
  /*expect(promise().then).not.to.be.undefined
  done()
  expect(promise().catch).not.to.be.undefined
  done()*/
  })

  describe('Construtor Resolution', function () {
    it('should create with a function')
    it('should create with a object')
    it('should resolve with a object')
    it('should resolve with a thenable')
    it('should reject with a object')
  })
  describe.skip('Then', function () {
    it('should call onFulfilled Function when fulfilled', function (done) {
      promise().then(function onFulfilled () {
        done()
      })
    })
    it('should call onRejected Function when rejected', function (done) {
      promise().then(function onFulfilled () {}, function onRejected () {
        done()
      })
    })
    it('should return a promise', function (done) {
      expect(promise().then().then).not.to.be.undefined
      expect(promise().then().catch).not.to.be.undefined
      done()
    })
  })
})
