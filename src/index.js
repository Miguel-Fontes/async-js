'use strict'
const rx = require('./rx-tools')
const rp = require('request-promise')
const pr = require('./promise')()

let nomes = ['Miguel Fontes',
  'Bruna Marques',
  'Guilherme Fontes',
  'Allan Coelho',
  'Jefferson',
  'Mauricio Fontes',
  'Maria Gorete']

// Cold Observable
let observableNames = rx.observable.fromArray(nomes)
  .map((data) => {
    return data = data + '!'
  })

/*observableNames
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
    }))*/

let connectable = observableNames.publish()

setTimeout(function () {
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

  }, 3000)

}, 3000)
