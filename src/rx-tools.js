'use strict'
const observable = require('./observable')
const observer = require('./observer')
const connectable = require('./connectable-observable')

let rxtools = () => {
  let that = {}

  that.observable = {
    // Create tem que receber na realidade uma funçao
    // com os steps para criação do stream
    // Na realidade, todo stream é uma função.
    // As helper functions transformam os streams em funções

    // Example:
    /*
     var source = Rx.Observable.create(function (observer) {
      // Yield a single value and complete
      observer.onNext(42)
      observer.onCompleted()

      // Any cleanup logic might go here
      return function () {
        console.log('disposed')
      }
    });*/

    create: (stream) => {
      return observable(stream)
    },

    fromArray: (arr) => {
      return observable({ stream: arr })
    }
  }

  that.connectable = {
    create: (config, priv) => {
      return connectable(config, priv)
    },

    fromArray: (arr) => {
      return connectable({ stream: arr })
    }
  }

  that.observer = observer

  return that
}

module.exports = rxtools()
