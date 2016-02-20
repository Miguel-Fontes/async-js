let promise = (spec, my) => {
  let that = {}

  spec = spec || {}
  my = my || {}

  my.status = 2

  that.then = (cb) => {
    cb(/*data*/)
    return that
  }

  that.catch = (cb) => {
    if (my.status !== 2) {
      cb(/*err*/)
    }
    return that
  }

  return that
}

module.exports = promise
