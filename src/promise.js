'use strict'
const is = require('./utils').is
let Promise = function Promise (spec, my) {
  let that = {},
    states = {
      'pending': 0,
      'fulfilled': 1,
      'rejected': 2
    }

  spec = spec || {}
  my = my || {}

  my.data = is('Function', spec) ?
    spec :
    spec.data || {}

  my.onFulfilled = my.onFulfilled || []
  my.onRejected = my.onRejected || []

  my.status = my.status || 0

  that.all = (promises) => {

    return that
  }

  that.race = (promises) => {

    return that
  }

  that.reject = (motivo) => {

    return that
  }

  that.resolve = (data) => {
    let newPromise = Promise(data)

    newPromise.then = then
    newPromise.catch = catchErr

    delete newPromise.create
    delete newPromise.all
    delete newPromise.race
    delete newPromise.reject
    delete newPromise.resolve

    return newPromise
  }

  that.create = (call) => {
    return call(that.resolve, that.reject)
  }

  function then (onFulfilledCb, onRejectedCb) {
    console.log(my.data)
    if (is('Function', onFulfilledCb)) { onFulfilledCb(my.data) }
    if (is('Function', onRejectedCb)) { my.onRejected.add(onRejectedCb) }

    /*// Rolou
    if (onFulfilled && my.status === states['fulfilled']) onFulfilled()

    // Deu treta
    if (onRejected && my.status === states['rejected']) onRejected()*/

    return that
  }

  function catchErr (onRejectedCb) {
    if (is('Function', onRejectedCb)) { my.onRejected.add(onRejectedCb) }
    return that
  }

  return that
}

module.exports = Promise()

function thenable (spec, my) {
  let that = {}

  spec = spec || {}
  my = my || {}

  my.onFulfilled = my.onFulfilled || []
  my.onRejected = my.onRejected || []

  function then (onFulfilledCb, onRejectedCb) {
    if (is('Function', onFulfilledCb)) { my.onFulfilled.add(onFulfilledCb) }
    if (is('Function', onRejectedCb)) { my.onRejected.add(onRejectedCb) }

    /*// Rolou
    if (onFulfilled && my.status === states['fulfilled']) onFulfilled()

    // Deu treta
    if (onRejected && my.status === states['rejected']) onRejected()*/

    return that
  }

  function catchErr (onRejectedCb) {
    if (is('Function', onRejectedCb)) { my.onRejected.add(onRejectedCb) }
    return that
  }

}
