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
    return my.stream.map(f)
  }

  that.do = f => {
    f(my.stream)
  }

  that.subscribe = (observer) => {
    // Reolver o stream e passar os valores para os observers/**/
    my.stream.resolve(observer)
    observer.onCompleted()
    return that
  }

  that.publish = () => {
    return rx.connectable.create(spec, my)
  }

  return that
}

module.exports = observable
