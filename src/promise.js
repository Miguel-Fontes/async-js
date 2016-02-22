'use strict'
const is = require('./utils').is
let promise = (spec, my) => {
  let that = {},
    states = {
      'pending': 0,
      'fulfilled': 1,
      'rejected': 2
    }

  spec = spec || {}
  my = my || {}

  my.onFulfilled = my.onFulfilled || {}
  my.onRejected = my.onRejected || {}

  my.executor = is('Function', spec) ?
    {executor: spec} :
    spec.executor || {}

  my.status = my.status || 0

  that.then = (onFulfilledCb, onRejectedCb) => {
    let onFulfilled = is('Function', onFulfilledCb) ? onFulfilledCb : false
    let onRejected = is('Function', onRejectedCb) ? onRejectedCb : false

    // Rolou
    if (onFulfilled && my.status === states['fulfilled']) onFulfilled()

    // Deu treta
    if (onRejected && my.status === states['rejected']) onRejected()

    return that
  }

  that.catch = (cb) => {
    if (my.status === states['rejected']) {
      cb( /*err*/)
    }
    return that
  }

  return that
}

module.exports = promise

/*The then Method

A promise must provide a then method to access its current or eventual value or reason.

A promise’s then method accepts two arguments:

promise.then(onFulfilled, onRejected)

    Both onFulfilled and onRejected are optional arguments:
        If onFulfilled is not a function, it must be ignored.
        If onRejected is not a function, it must be ignored.
    If onFulfilled is a function:
        it must be called after promise is fulfilled, with promise’s value as its first argument.
        it must not be called before promise is fulfilled.
        it must not be called more than once.
    If onRejected is a function,
        it must be called after promise is rejected, with promise’s reason as its first argument.
        it must not be called before promise is rejected.
        it must not be called more than once.
    onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3.1].
    onFulfilled and onRejected must be called as functions (i.e. with no this value). [3.2]
    then may be called multiple times on the same promise.
        If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then.
        If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.

    then must return a promise [3.3].

    promise2 = promise1.then(onFulfilled, onRejected)

        If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
        If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
        If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
        If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
*/

/*The Promise Resolution Procedure

The promise resolution procedure is an abstract operation taking as input a promise and a value, which we denote as [[Resolve]](promise, x). If x is a thenable, it attempts to make promise adopt the state of x, under the assumption that x behaves at least somewhat like a promise. Otherwise, it fulfills promise with the value x.

This treatment of thenables allows promise implementations to interoperate, as long as they expose a Promises/A+-compliant then method. It also allows Promises/A+ implementations to “assimilate” nonconformant implementations with reasonable then methods.

To run [[Resolve]](promise, x), perform the following steps:

    If promise and x refer to the same object, reject promise with a TypeError as the reason.
    If x is a promise, adopt its state [3.4]:
        If x is pending, promise must remain pending until x is fulfilled or rejected.
        If/when x is fulfilled, fulfill promise with the same value.
        If/when x is rejected, reject promise with the same reason.
    Otherwise, if x is an object or function,
        Let then be x.then. [3.5]
        If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
        If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
            If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
            If/when rejectPromise is called with a reason r, reject promise with r.
            If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
            If calling then throws an exception e,
                If resolvePromise or rejectPromise have been called, ignore it.
                Otherwise, reject promise with e as the reason.
        If then is not a function, fulfill promise with x.
    If x is not an object or function, fulfill promise with x.

If a promise is resolved with a thenable that participates in a circular thenable chain, such that the recursive nature of [[Resolve]](promise, thenable) eventually causes [[Resolve]](promise, thenable) to be called again, following the above algorithm will lead to infinite recursion. Implementations are encouraged, but not required, to detect such recursion and reject promise with an informative TypeError as the reason. [3.6]*/
