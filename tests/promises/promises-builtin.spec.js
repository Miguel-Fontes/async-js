const expect = require('chai').expect
const assert = require('chai').assert

describe('Promises Suite (Default)', function () {
    describe('Basic Tests', function () {
        it('promise creation', function (done) {
            let myPromise = new Promise((resolve, reject) => {
                setTimeout(function () {
                    resolve('Miguel Fontes')
                }, 50)
            })

            expect(myPromise.then).not.to.be.undefined

            myPromise.then(data => {
                assert.equal(data, 'Miguel Fontes', 'Expected "Miguel Fontes"\ got something else (' + data + ')')
                done()
            })

        })

        it('we can create a resolved promise using Promise.resolve()', function (done) {
            let myResolvedPromise = Promise.resolve(100)

            myResolvedPromise.then(function (data) {
                expect(data).to.be.equal(100)
                done()
            })
        })

        it('we can create a rejected promise using Promise.reject()', function (done) {
            let myResolvedPromise = Promise.reject('i reject u')

            myResolvedPromise.catch(function (data) {
                expect(data).to.be.equal('i reject u')
                done()
            })
        })

        it('we can append callbacks for execution when the promise is resolved or rejected (promise.then(onFulfilled, onRejected))', function (done) {
            let myFulfilledPromise = new Promise((resolve, reject) => {
                setTimeout(function () {
                    resolve('Great Success!')
                }, 50)
            })

            let myRejectedPromise = new Promise((resolve, reject) => {
                setTimeout(function () {
                    reject('Critical Failure!')
                }, 50)

            })

            myFulfilledPromise
                .then(function (data) {
                    assert.equal(data, 'Great Success!')
                })

            myRejectedPromise
                .then(
                    function (data) {
                        expect(data).to.be.equal('')
                    }, function (err) {
                        assert.equal(err, 'Critical Failure!')
                        done() // vamos dar o done aqui!
                    })
        })

        it("there's a catch method to append onRejected callbacks as well", function (done) {
            let myRejectedPromise = new Promise((resolve, reject) => {
                setTimeout(function () {
                    reject('Critical Failure!')
                }, 50)
            })

            myRejectedPromise
                .catch(function (err) {
                    expect(err).to.be.equal('Critical Failure!')
                    done()
                })
        })

        it('we can use the resolve method to create a resolved promise with a value', function (done) {
            let myResolvedPromise = Promise.resolve(['This', 'is', 'a', 'drill'])

            myResolvedPromise.then(function (data) {
                let d = ['This', 'is', 'a', 'drill']
                expect(data).to.deep.equal(d)
                done()
            })
        })

        it('using Promise.all() we can pass a set of promises and wait for the completion of all of them', function (done) {
            let myPromiseSet = Promise.all([
                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve('Say')
                    }, 30)
                }),
                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve('My')
                    }, 70)
                }),
                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve('Name')
                    }, 20)
                })
            ]).then(function (data) {
                // Data aqui é um Array com o resultado de cada uma das promises indicadas
                // A ordem informada no array do ALL é respeitada (note os timetous das promises acima)
                expect(data).to.deep.equal(['Say', 'My', 'Name'])
                done()
            })

        })

        it('alas, using Promise.race() we can pass a group of promises and wait for the FIRST result', function (done) {
            let myPromiseSet = Promise.race([
                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve('Say')
                    }, 30)
                }),
                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve('My')
                    }, 70)
                }),
                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve('Name')
                    }, 20)
                })
            ]).then(function (data) {
                // Nossa promise mais rápida é a Name. Este é o valor que receberemos aqui.
                expect(data).to.deep.equal('Name')
                done()
            })
        })

        it('promises methods can return promises (thenables), so, we can chain requests and actions', function (done) {
            let myPromise = new Promise((resolve, reject) => {
                setTimeout(function () {
                    resolve('Great Success!')
                }, 50)
            })

            myPromise.then(function (data) {
                new Promise(function (reject, resolve) {
                    setTimeout(function () {
                        reject(data)
                    }, 50)
                }).then(function (err) {
                    expect(err).to.be.equal('Great Success!')
                    done()
                })
            })
            // ALERT: Don't recreate the callback hell using promises callback hell. This is ugly.
        })
    })


})
