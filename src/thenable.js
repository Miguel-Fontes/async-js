'use strict'
const is = require('./utils').is

let thenable = function thenable (spec, my) {
  let that = {},
    states = {
      'pending': 0,
      'fulfilled': 1,
      'rejected': 2
    }

  spec = spec || {}
  my = my || {}

  my.onFulfilled = spec.onFulfilled || []
  my.onRejected = spec.onRejected || []
  my.data = {}
  my.err = {}

  my.executor = is('Function', spec) ? spec : spec.executor || {}
  my.status = spec.status || states['pending']

  // API
  that.then = then
  that.catch = catchErr

  // Resolution
  my.executor(resolve, reject)

  function reject (motivo) {
    my.err = motivo
    my.status = states['rejected']
    my.onRejected.forEach(callback => {
      callback(motivo)
    })
  }

  function resolve (data) {
    my.data = data
    my.status = states['fulfilled']
    my.onFulfilled.forEach(callback => {
      callback(data)
    })
  }

  function then (onFulfilledCb, onRejectedCb) {
    // Rolou
    if (onFulfilledCb && my.status === states['fulfilled']) {
      onFulfilledCb(my.data)
    }

    if (my.status === states['pending']) {
      if (is('Function', onFulfilledCb)) { my.onFulfilled.push(onFulfilledCb) }
    }

    // Deu treta
    catchErr(onRejectedCb)

    return that
  }

  function catchErr (onRejectedCb) {
    // Deu treta
    if (onRejectedCb && my.status === states['rejected']) {
      onRejectedCb(my.err)
    }

    if (is('Function', onRejectedCb)) { my.onRejected.push(onRejectedCb) }
    return that
  }

  return that
}

module.exports = thenable
