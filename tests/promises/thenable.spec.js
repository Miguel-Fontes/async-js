const thenable = require('./../../src/promises/thenable')
const expect = require('chai').expect

describe('Thenable Suite', function () {
  describe('API', function () {
    const resolvedThenable = thenable(function (resolve, reject) { resolve('resolved') })
    it('should implement Then API', function (done) {
      expect(resolvedThenable.then).not.to.be.undefined
      done()
    })
    it('should implement Catch API', function (done) {
      expect(resolvedThenable.catch).not.to.be.undefined
      done()
    })
  })

  describe('Then', function () {
    it('should call onFulfilled Function when fulfilled', function (done) {
      let myThenable = thenable(function (resolve, reject) {
        resolve(done)
      })

      myThenable.then((data) => {
        data()
      })

    })
    it('should call onRejected Function when rejected' , function (done) {
      let testErrMessage = 'Rejeitando para testes'
      let myThenable = thenable(function (resolve, reject) {
        let myError = new Error(testErrMessage)
        myError.done = done
        reject(myError)
      })

      myThenable
        .then((data) => {
          data()
        })
        .catch((motivo) => {
          expect(motivo.toString()).to.be.equals('Error: ' + testErrMessage)
          done()
        })
    })

    //then must return a promise [3.3].
    it('should return a Promise' , function (done) {
      let myThenable = thenable(function (resolve, reject) {
        resolve('done')
      }).then((data) => {
        data
      })

      expect(myThenable.then).not.to.be.undefined
      expect(myThenable.catch).not.to.be.undefined

      done()
    })
  })

})
