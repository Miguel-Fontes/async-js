require('babel-polyfill')
const expect = require('chai').expect
describe('Javascript Generators Suite', function () {
  describe('Default Tests', function () {
    it('should create a generator that returns 0, 1, 2, 3, 4, 5...', function (done) {
      function* foo () {
        let x = 0
        while (true) {
          yield x
          x++
        }
      }

      let it = foo()
      expect(it.next().value).to.be.equal(0)
      expect(it.next().value).to.be.equal(1)
      expect(it.next().value).to.be.equal(2)
      expect(it.next().value).to.be.equal(3)
      expect(it.next().value).to.be.equal(4)
      expect(it.next().value).to.be.equal(5)
      done()
    })

    it('should exchange messages with the generator', function (done) {
      function* fooGenerator () {
        let x = 0
        while (true) {
          x = x + (yield x)
        }
      }

      let it = fooGenerator()

      expect(it.next().value).to.be.equal(0)
      expect(it.next(5).value).to.be.equal(5)
      expect(it.next(5).value).to.be.equal(10)
      expect(it.next(5).value).to.be.equal(15)
      expect(it.next(5).value).to.be.equal(20)

      done()
    })

    it('custom iterator interface definition', function (done) {
      var myIterator = (function () {
        let nextVal

        return {
          // Sintaxe ES6 [Symbol.iterator]. o Symbol iterator retorna o nome da propriedade usada
          // pelo javascript para obter um iterator de um objeto.
          [Symbol.iterator]: function () { return this; },
          next: () => {
            if (nextVal === undefined) {
              nextVal = 1
            } else {
              nextVal = (3 * nextVal) + 6
            }

            // Este iterator será infinito, uma vez que nunca definimos done como true
            return {done: false, value: nextVal}
          }
        }
      })()

      expect(myIterator.next().value).to.be.equal(1) // 1
      expect(myIterator.next().value).to.be.equal(9) // 9
      expect(myIterator.next().value).to.be.equal(33) // 33
      expect(myIterator.next().value).to.be.equal(105) // 105

      done()
    })

    it('get the iterator of a array with [Symbol.iterator]', function (done) {
      let arr = [5, 4, 3, 2, 1, 0]

      // Busco o iterator do Array
      let it = arr[Symbol.iterator]()

      // Percorro os valores do array usando seu iterator
      expect(it.next().value).to.be.equal(5)
      expect(it.next().value).to.be.equal(4)
      expect(it.next().value).to.be.equal(3)
      expect(it.next().value).to.be.equal(2)
      expect(it.next().value).to.be.equal(1)
      expect(it.next().value).to.be.equal(0)

      // Fim do array, o value deve ser undefined com done TRUE
      expect(it.next().value).to.be.equal(undefined)
      expect(it.next().done).to.be.equal(true)

      // A interface aqui é a mesma. next() retorn um objeto {done: boolean, value: any} com os valores do array.

      done()
    })

    it('generators are iterables', function (done) {
      function* fooGen () {
        let x = 0
        while(true) {
          yield x
          if (x >= 10) {
            break
          } else {
            x = x + 1
          }
        }
        // Return faz com que um generator seja marcado como DONE
        return x
      }

      // myX para comparar os valores
      let myX = 0

      // fooGen() é um iterator. Passando a função para um for of, funciona como com qualquer outro iterator
      for (let x of fooGen()) {
        expect(x).to.be.equal(myX)
        myX++
      }

      done()
    })
    it('adding post completion cleanup code to generators', function (done) {
      function* selfCleaningGenerator () {
        let x = 0
        try {
          while (x <= 10) {
            yield x
            x += 2
          }
        }

        // Vai sempre executar esse código quando o while chegar ao fim
        finally {
          x = 0
        }
      }

      let myX = 0
      for (let x of selfCleaningGenerator()) {
        expect(x).to.be.equal(myX)
        myX += 2
      }

      done()
    })

    it('completing a generator externally', function (done) {
      function* selfCleaningGenerator () {
        let x = 0
        try {
          // Loop infinito. Vou controlar a execução do generator externamente
          while(true) {
            yield x
            x += 2
          }
        }

        // Vai sempre executar esse código quando o while chegar ao fim
        finally {
          x = 0
        }
      }

      let myX = 0
      let it = selfCleaningGenerator() // Vou precisar de uma referência ao iterator

      for (let x of it) {
        expect(x).to.be.equal(myX)

        if (x >= 10) {
          // Completo o generator quando x for 10.
          // O it.return aceita um valor de entrada e, em nosso caso, vou passar a string 'Completed!'
          let completion = (it.return('Completed!'))

          // O valor enviado no return é retornado no fim da execução. Valido.
          expect(completion.value).to.be.equal('Completed!')
          expect(completion.done).to.be.equal(true)
        }

        myX += 2
      }

      done()
    })

    it('error handling with generators', function (done) {
      function* fooLowerCase (s) {
        yield s.toLowerCase()
      }

      // Send in a number. 123.toLowerCase() == TypeError
      let it = fooLowerCase(123)

      try {
        it.next()
      } catch (err) {
        expect(err.toString()).to.contain('TypeError')
        done()
      }
    })

    it('sending an error to a generator via throw and getting it back into my face', function (done) {
      function* fooErrors () {
        yield 'Send me some errors plz'

        yield 'Thanks! Not, rly.'
      }

      let it = fooErrors()

      try {
        // Send a throw
        it.throw('As you wish sir')
      } catch (err) {
        // The generator bounces back the error
        expect(err).to.be.equal('As you wish sir')
        done()
      }
    })

    it('generators can delegate to other generators!', function (done) {
      function* countTo5 () {
        yield 1
        yield *count2to4()
        yield 5
      }

      function* count2to4 () {
        yield 2
        yield 3
        yield 4
      }

      let it = countTo5()

      expect(it.next().value).to.be.equal(1)
      expect(it.next().value).to.be.equal(2)
      expect(it.next().value).to.be.equal(3)
      expect(it.next().value).to.be.equal(4)
      expect(it.next().value).to.be.equal(5)

      done()
    })

  })
  describe('Async with Generators', function () {
    const http = require('http')
    const url = 'http://jsonplaceholder.typicode.com/users'

    it('we can use generators to model async requests', function (done) {
      // PERIGO: Estou usando uma API pública para obter dados de teste e estou VALIDANDO os dados.
      // Isso é suicídio, tá ligado? Mas o código ficou legal.
      let usersArr = [
        'Clementina DuBuque',
        'Glenna Reichert',
        'Nicholas Runolfsdottir V',
        'Kurtis Weissnat',
        'Mrs. Dennis Schulist',
        'Chelsey Dietrich',
        'Patricia Lebsack',
        'Clementine Bauch',
        'Ervin Howell',
        'Leanne Graham'
      ]

      function hRequestUsers () {
        http.get(url, (res) => {
          res.body = ''
          res.on('data', (chunk) => {
            res.body += chunk.toString()
          })

          res.on('end', () => {
            it.next(JSON.parse(res.body))
          })
        })

        return 'ok'
      }

      function* asyncGen (request) {
        try {
          // Paro a execução no request e aguardo que o request me avise que fez o fetch dos dados (it.next())
          let users = yield hRequestUsers()

          // Itero nos resultados
          for (let user of users) {
            let usr = usersArr.pop()
            expect(user.name).to.be.equal(usr)
          }

        } catch(err) {
          console.error(err)
        }

        finally {
          console.log('Finalizado!')
        }
      }

      try {
        // Inicio o progrma
        var it = asyncGen()
        it.next()

      } catch (err) {
        console.error(err)
      }

      done()
    })
  })
})
