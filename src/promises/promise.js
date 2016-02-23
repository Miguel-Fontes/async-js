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
    // Call pode ser uma funcion (resolve: function, reject: function)
    // Ou um valor (nesse caso, construo um obj spec e passo status já resolved)
    let spec = is('Function', call) ? call : { data: call, status: 1 }

    return thenable(spec)
  }

  return that
}

module.exports = promise()
