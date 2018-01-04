/* global test, expect */

import immutable from './main'

test('immutable', () => {
  const obj1 = {
    a: {b: {c: 'old'}},
    x: {y: {z: 'old'}},
    i: {j: {k: 'old'}}
  }
  const {a} = obj1
  const {b} = a
  const {c} = b
  const {x} = obj1
  const {y} = x
  const {z} = y
  const {i} = obj1
  const {j} = i
  const {k} = j

  const obj2 = immutable.on(obj1)(
    immutable.vset('a.b.d.e', 'new'),
    immutable.fset('a.b.c', (old) => `${old}+new`),
    immutable.vset('x.y.z', 'new')
  )
  expect(obj2).toEqual({
    a: {b: {c: 'old+new'}},
    x: {y: {z: 'new'}},
    i: {j: {k: 'old'}}
  })
  expect(obj2 !== obj1).toEqual(true)
  expect(obj2.a !== a).toEqual(true)
  expect(obj2.a.b !== b).toEqual(true)
  expect(obj2.a.b.c === 'old+new').toEqual(true)
  expect(obj2.x !== x).toEqual(true)
  expect(obj2.x.y !== y).toEqual(true)
  expect(obj2.x.y.z === 'new').toEqual(true)
  expect(obj2.i === i).toEqual(true)
  expect(obj2.i.j === j).toEqual(true)
  expect(obj2.i.j.k === k).toEqual(true)

  expect(obj1.a === a).toEqual(true)
  expect(obj1.a.b === b).toEqual(true)
  expect(obj1.a.b.c === c).toEqual(true)
  expect(obj1.a.b.d === undefined).toEqual(true)
  expect(obj1.x === x).toEqual(true)
  expect(obj1.x.y === y).toEqual(true)
  expect(obj1.x.y.z === z).toEqual(true)
  expect(obj1.i === i).toEqual(true)
  expect(obj1.i.j === j).toEqual(true)
  expect(obj1.i.j.k === k).toEqual(true)
})
