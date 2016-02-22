'use strict'
const is = require('./utils').is
let promise = (spec, my) => {
  let that = {},
    states = {
      'pending': 0,
      'fulfilled': 1,
      'rejected': 2
    }

  spec = spec || {}
  my = my || {}

  my.onFulfilled = my.onFulfilled || []
  my.onRejected = my.onRejected || []

  my.executor = is('Function', spec) ?
    {executor: spec} :
    spec.executor || {}

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

  that.resolve = () => {

    return that
  }

  that.create = (call) => {
    let newPromise = promise(call)

    newPromise.then = then
    newPromise.catch = catchErr

    delete newPromise.create
    delete newPromise.all
    delete newPromise.race
    delete newPromise.reject
    delete newPromise.resolve

    return newPromise
  }

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

  return that
}

module.exports = promise()
