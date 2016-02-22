const expect = require('chai').expect
const promise = require('./../src/promise')

describe('Promise suite', function () {
  describe('API', function () {
    it('should implement then API', function (done) {
      expect(promise().then).not.to.be.undefined
      done()
    })
    it('should implement catch API', function (done) {
      expect(promise().catch).not.to.be.undefined
      done()
    })
  })
  describe('Then', function () {
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
