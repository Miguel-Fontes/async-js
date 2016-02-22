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
})
