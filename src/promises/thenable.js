'use strict'
const is = require('./../utils/utils').is

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
  my.data = spec.data || {}
  my.err = spec.err || {}

  my.executor = is('Function', spec) ? spec : spec.executor || spec || {}
  my.status = spec.status || states['pending']

  // API
  that.then = then
  that.catch = catchErr

  // Resolution if is a function
  if (is('Function', my.executor)) {
    my.executor(resolve, reject)
  } else {
    resolve(my.executor)
  }

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
    // If 1 - Foi informado um Callback(CB) + 2 - CB é uma Function + 3 - Thenable está fulfilled
    if (onFulfilledCb && is('Function', onFulfilledCb) && my.status === states['fulfilled']) {
      onFulfilledCb(my.data)
    }

    // if 1 - Thenable está pending + 2 - CB é uma Function
    if (my.status === states['pending'] && is('Function', onFulfilledCb)) {
      my.onFulfilled.push(onFulfilledCb)
    }

    // Tratamento para rejected
    catchErr(onRejectedCb)

    return thenable(my)
  }

  function catchErr (onRejectedCb) {
    // If 1 - Foi informado um Callback(CB) + 2 - CB é uma Function + 3 - Thenable está rejected
    if (onRejectedCb && is('Function', onRejectedCb) && my.status === states['rejected']) {
      onRejectedCb(my.err)
    }

    // if 1 - Thenable está pending + 2 - CB é uma Function
    if (my.status === states['pending'] && is('Function', onRejectedCb)) {
      my.onRejected.push(onRejectedCb)
    }
  }

  return that
}

module.exports = thenable
