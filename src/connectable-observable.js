let connectable = (spec, my) => {
  const rx = require('./rx-tools')
  const extend = require('./utils').extend
  const is = require('./utils').is
  const observable = require('./observable')

  let that = {}

  spec = spec || {}
  my = my || {}

  my.observers = my.observers || []
  my.stream = spec.stream || {}

  // Extendo com as funcionalidades de Observable
  that = extend(that, observable(spec, my))

  that.connect = () => {
    my.stream.forEach(value => {
      that.notify(observer => {
        observer.onNext(value)
      })
    })

   that.notify(observer => {
      observer.onCompleted()
    })
    return that
  }

  that.notify = (cb) => {
    my.observers.forEach((observer) => {
      cb(observer)
    })
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
