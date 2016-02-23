'use strict'
const is = require('./utils').is
const thenable = require ('./thenable')
let Promise = function Promise (spec, my) {
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
    // TODO: Refatorar
    return that
  }

  return that
}

module.exports = Promise()