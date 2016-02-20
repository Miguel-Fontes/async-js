var Rx = require('rx')
var RxNode = require('rx-node');
var https = require('https')
var rp = require('request-promise')

var requestStream = Rx.Observable.just('https://api.github.com/users')


var responseStream = requestStream
  .flatMap(function (requestUrl) {
    return RxNode.fromReadableStream(https.get({hostname: requestUrl, headers: {'user-agent': 'miguelmf'}})).wrap()
  })

responseStream.subscribe(function (response) {
  console.log(response)
})

// Miguelasdasdsssssss Fontes

/*http.get('http://www.google.com/index.html', (res) => {
  console.log(`Got response: ${res.statusCode}`)
  // consume response body
  res.resume()
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`)
});*/
