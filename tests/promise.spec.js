const expect = require('chai').expect
const Promise = require('./../src/promise')

describe('Promise suite', function () {
  describe('Constructor API', function () {
    it('should implement all API', function (done) {
      expect(Promise.all).not.to.be.undefined
      done()
    })
    it('should implement race API', function (done) {
      expect(Promise.race).not.to.be.undefined
      done()
    })
    it('should implement create API', function (done) {
      expect(Promise.create).not.to.be.undefined
      done()
    })
  })

  describe.skip('Construtor Resolution', function () {
    it('should create with a function')
    it('should create with a object')
  })
})
