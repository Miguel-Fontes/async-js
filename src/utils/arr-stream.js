'use strict'
let arrStream = function ArrStream (arr) {
  const rx = require('./rx-tools')

  let that = {}

  that.resolve = (observer) => {
    arr.forEach(value => {
      observer.onNext(value)
    })
  }

  that.map = (f) => {
    return rx.observable.fromArray(
      arr.map(x => {
        return f(x)
      })
    )
  }

  return that
}

module.exports = arrStream
