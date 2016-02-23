'use strict'
let observer = (spec, my) => {
  let that = {}

  spec = spec || {}
  my = my || {}

  that.onNext = spec.onNext || function (x) {
      console.log('Next', x)
  }

  that.onCompleted = spec.onCompleted || function () {
      console.log('Completed!')
  }

  that.onError = spec.onError || function (err) {
      console.log(err)
  }

  return that
}

module.exports = observer
