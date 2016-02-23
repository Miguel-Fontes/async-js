'use strict'
const rx = require('./../../src/rx/rx-tools')
const rp = require('request-promise')

describe.skip('Rx-Tools suite', function () {
  it('should complete hu3', function (done) {
    let nomes = ['Miguel Fontes',
      'Bruna Marques',
      'Guilherme Fontes',
      'Jubileu :P',
      'Mauricio Fontes',
      'Maria Gorete']

    // Cold Observable
    let observableNames = rx.observable.fromArray(nomes)
      .map((data) => {
        return data = data + '!'
      })
    observableNames
      .subscribe(
        rx.observer({
          onNext: (val) => {
            console.log('Observer 1 - Observes', val)
          },
          onCompleted: () => {
            console.log('Observer 1 - COMPLETE')
        }}))
      .subscribe(
        rx.observer({
          onNext: (val) => {
            console.log('Observer 2 - Observes', val)
          },
          onCompleted: () => {
            console.log('Observer 2 - COMPLETE')
          }
        }))
      .subscribe(
        rx.observer({
          onNext: (val) => {
            console.log('Observer 3 - Observes', val)
          },
          onCompleted: () => {
            console.log('Observer 3 - COMPLETE')
          }
        }))

    let pubObservable = observableNames.publish()

    pubObservable
      .subscribe(
        rx.observer({
          onNext: (val) => {
            console.log('HOT Observer 10000 - Observes', val)
          },
          onCompleted: () => {
            console.log('HOT Observer 10000 - COMPLETE')
        }}))

    pubObservable.connect()

    let connectable = rx.connectable.create(numbersStream)

    let i = 0

    function numbersStream (observer) {
      setTimeout(function () {
        observer.onNext(i)
        i++
        if (i < 15) {
          numbersStream(observer)
        }
      }, 1000)
    }

    connectable
      .subscribe(
        rx.observer({
          onNext: (val) => {
            console.log('HOT Observer 1 - Observes', val)
          },
          onCompleted: () => {
            console.log('HOT Observer 1 - COMPLETE')
        }}))

    connectable.connect()

    setTimeout(function () {
      connectable
        .subscribe(
          rx.observer({
            onNext: (val) => {
              console.log('HOT Observer 2 - Observes', val)
            },
            onCompleted: () => {
              console.log('HOT Observer 2 - COMPLETE')
          }}))

    }, 5000)
    done()
  })
})
