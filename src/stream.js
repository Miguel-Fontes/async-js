let stream = function stream (spec, my) {
  let that = {}

  spec = spec || {}
  my = my || {}

  that.resolve = spec.resolve || function resolve () { return that }

  that.map = spec.map || function map () { return that }

  return that
}

module.exports = stream
