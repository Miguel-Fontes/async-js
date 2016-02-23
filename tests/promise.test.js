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
    it('should implement reject API', function (done) {
      expect(Promise.reject).not.to.be.undefined
      done()
    })
    it('should implement resolve API', function (done) {
      expect(Promise.resolve).not.to.be.undefined
      done()
    })
  })
  describe('Promise API', function () {
    it('should implement then API', function (done) {
      Promise.create(function (resolve, reject) {
        expect(resolve({}).then).not.to.be.undefined
      })
      done()
    })
    it('should implement catch API', function (done) {
      Promise.create(function (resolve, reject) {
        expect(resolve({}).catch).not.to.be.undefined
      })
      done()
    })
  })

  describe.skip('Construtor Resolution', function () {
    it('should create with a function')
    it('should create with a object')
    it('should resolve with a object')
    it('should resolve with a thenable')
    it('should reject with a object')
  })
  
  describe('Then', function () {
    it('should call onFulfilled Function when fulfilled', function (done) {
      Promise.create(function (resolve, reject) {
        let myPromise = resolve(done)

        myPromise.then((data) => {
            console.log(data)
          data()
        })

      })

    })
    it('should call onRejected Function when rejected' /*, function (done) {
      Promise.then(function onFulfilled () {}, function onRejected () {
        done()
      })
    }*/)
    it('should return a Promise' /*, function (done) {
      expect(Promise.then().then).not.to.be.undefined
      expect(Promise.then().catch).not.to.be.undefined
      done()
    }*/)
  })
})
