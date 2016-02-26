'use strict'
const is = require('./../utils/utils').is
const thenable = require('./thenable')

let promise = function Promise (spec, my) {
  let that = {}

  spec = spec || {}
  my = my || {}

  that.all = (promises) => {
    // TODO: Implementar
    return that
  }

  that.race = (promises) => {
    // TODO: Implementar
    return that
  }

  that.create = (call) => {
    // Call pode ser uma funcion (resolve: function, reject: function) ou um valor
    return thenable(call)
  }

  return that
}

module.exports = promise()
