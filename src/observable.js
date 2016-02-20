'use strict'
let observable = (spec, my) => {
  const is = require('./utils').is
  const rx = require('./rx-tools')

  let that = {}

  spec = spec || {}
  my = my || {}

  my.observers = my.observers || []
  my.stream = spec.stream || {}

  that.map = f => {
    return rx.observable.create({stream: my.stream.map(f)}, my)
  }

  that.do = f => {
    f(my.stream)
  }

  that.subscribe = (observer) => {
    // Reolver o stream e passar os valores para os observers
    my.stream.forEach(value => {
      observer.onNext(value)
    })

    observer.onCompleted()

    return that
  }

  that.publish = () => {
    return rx.connectable.create(spec, my)
  }

  return that
}

module.exports = observable
