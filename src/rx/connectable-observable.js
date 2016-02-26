let connectable = function connectable (spec, my) {
  const rx = require('./rx-tools')
  const extend = require('./../utils/utils').extend
  const is = require('./../utils/utils').is
  const observable = require('./observable')

  let that = {}

  spec = spec || {}
  my = my || {}

  my.observers = my.observers || []
  my.stream = spec.stream || {}

  // Extendo com as funcionalidades de Observable
  that = extend(that, observable(spec, my))

  that.connect = () => {

    my.stream.resolve(rx.observer({
      onNext: (x) => {
        my.observers.forEach((observer) => {
          observer.onNext(x)
        })
      },
      onCompleted: () => {
        my.observers.forEach((observer) => {
          observer.onCompleted()
        })
      },
      onError: (err) => {
        my.observers.forEach((observer) => {
          observer.onError(err)
        })
      }
    }))
    return that
  }

  that.subscribe = (observer => {
    if (is('Array', observer)) {
      my.observers = my.observers.concat(observer)
    } else {
      my.observers.push(observer)
    }
  })

  return that
}

module.exports = connectable
