'use strict'
const observable = require('./observable')
const observer = require('./observer')
const connectable = require('./connectable-observable')
const arrStream = require('./arr-stream')
const stream = require('./stream')
const extend = require('./../utils').extend
const is = require('./../utils').is

let rxtools = () => {
  let that = {}

  that.observable = {
    create: (stream) => {
      return observable(stream)
    },

    fromArray: (arr) => {
      return observable({ stream: arrStream(arr) })
    }
  }

  that.connectable = {
    create: (config, priv) => {
      // O extend garante que o cliente possa passar uma função ou um objeto
      // de configuração já formado
      let extConfig = extend({}, {stream: stream({resolve: config})} , config)

      return connectable(extConfig, priv)
    },

    fromArray: (arr) => {
      return connectable({ stream: arrStream(arr) })
    }
  }

  that.observer = observer

  return that
}

module.exports = rxtools()
