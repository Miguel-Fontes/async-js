'use strict'
const observable = require('./observable')
const observer = require('./observer')
const connectable = require('./connectable-observable')
const arrStream = require('./arr-stream')

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
      return connectable(config, priv)
    },

    fromArray: (arr) => {
      return connectable({ stream: arrStream(arr) })
    }
  }

  that.observer = observer

  return that
}

module.exports = rxtools()
