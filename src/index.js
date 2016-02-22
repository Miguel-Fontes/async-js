'use strict'
const rx = require('./rx-tools')
const rp = require('request-promise')
const pr = require('./promise')()

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

let i = 0;                     //  set your counter to 1

function numbersStream (observer) {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      observer.onNext(i)          //  your code here
      i++;                     //  increment the counter
      if (i < 15) {            //  if the counter < 10, call the loop function
         numbersStream(observer);             //  ..  again which will trigger another
      }                        //  ..  setTimeout()
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
