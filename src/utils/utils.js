'use strict'
exports.is = function is (type, obj) {
  var clas = Object.prototype.toString.call(obj).slice(8, -1)
  return obj !== undefined && obj !== null && clas === type
}

exports.extend = function extend (...objects) {
  let extended = {}

  objects.forEach(obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        extended[key] = obj[key]
      }
    }
  })

  return extended
}
