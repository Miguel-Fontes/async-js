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

  describe('Construtor Resolution', function () {
    it('should create with a function', function (done) {
      let myMessage = 'Resolved'
      let myPromise = Promise.create((resolve, reject) => {
        resolve(myMessage.toString())
      })

      expect(myPromise.then).not.to.be.undefined
      expect(myPromise.catch).not.to.be.undefined

      myPromise.then(data => {
        expect(data.toString()).to.be.equals(myMessage.toString())
      })

      done()
    })
    it('should create with a value', function (done) {
      let myData = ['Value', 'Promise', 'Creation']
      let myPromise = Promise.create(myData)

      expect(myPromise.then).not.to.be.undefined
      expect(myPromise.catch).not.to.be.undefined

      myPromise.then(data => {
        expect(data).to.be.equals(myData)
      })

      done()
    })
  })
})
