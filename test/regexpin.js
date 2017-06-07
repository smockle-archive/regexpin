const test = require('tape')
const Immutable = require('immutable')
const regexpIn = require('../lib/regexpin')

test('regexpIn', t => {
  t.plan(30)

  t.throws(regexpIn, 'throws an error when search key path is missing')

  t.throws(
    regexpIn.bind(null, Immutable.Set([3]), Immutable.Map({ a: 3 })),
    'throws an error when search key path doesn’t contain strings or regular expressions'
  )

  t.equal(
    regexpIn(['a']) instanceof Function,
    true,
    'returns a partially-applied function when only Array search key path is given'
  )

  t.equal(
    regexpIn(Immutable.Set(['a'])) instanceof Function,
    true,
    'returns a partially-applied function when only Immutable.Set search key path is given'
  )

  t.equal(
    regexpIn(['a'], Immutable.Map({ a: 3 })),
    3,
    'returns a shallow value when an Array search key path and iterable are given'
  )

  t.equal(
    regexpIn(Immutable.Set(['a']), Immutable.Map({ a: 3 })),
    3,
    'returns a shallow value when an Immutable.Set search key path and iterable are given'
  )

  t.equal(
    regexpIn(['a', 'b'], Immutable.Map({ a: Immutable.Map({ b: 3 }) })),
    3,
    'returns a deep value when an Array search key path and iterable are given'
  )

  t.equal(
    regexpIn(
      Immutable.Set(['a', 'b']),
      Immutable.Map({ a: Immutable.Map({ b: 3 }) })
    ),
    3,
    'returns a deep value when an Immutable.Set search key path and iterable are given'
  )

  t.equal(
    regexpIn(['z'], Immutable.Map({ a: 3 })),
    undefined,
    'returns shallow undefined when an Array search key path and iterable are given'
  )

  t.equal(
    regexpIn(Immutable.Set(['z']), Immutable.Map({ a: 3 })),
    undefined,
    'returns shallow undefined when an Immutable.Set search key path and iterable are given'
  )

  t.equal(
    regexpIn(['z', 'b'], Immutable.Map({ a: Immutable.Map({ b: 3 }) })),
    undefined,
    'returns deep undefined when an Array search key path and iterable are given'
  )

  t.equal(
    regexpIn(
      Immutable.Set(['z', 'b']),
      Immutable.Map({ a: Immutable.Map({ b: 3 }) })
    ),
    undefined,
    'returns deep undefined when an Immutable.Set search key path and iterable are given'
  )

  const m1 = Immutable.Map({ b: 3 })
  t.equal(
    regexpIn(['a'], Immutable.Map({ a: m1 })),
    m1,
    'returns a shallow Immutable.Map when an Array search key path and iterable are given'
  )

  const m2 = Immutable.Map({ b: 3 })
  t.equal(
    regexpIn(Immutable.Set(['a']), Immutable.Map({ a: m2 })),
    m2,
    'returns a shallow Immutable.Map when an Immutable.Set search key path and iterable are given'
  )

  const m3 = Immutable.Map({ c: 3 })
  t.equal(
    regexpIn(['a', 'b'], Immutable.Map({ a: Immutable.Map({ b: m3 }) })),
    m3,
    'returns a deep Immutable.Map when an Array search key path and iterable are given'
  )

  const m4 = Immutable.Map({ c: 3 })
  t.equal(
    regexpIn(
      Immutable.Set(['a', 'b']),
      Immutable.Map({ a: Immutable.Map({ b: m4 }) })
    ),
    m4,
    'returns a deep Immutable.Map when an Immutable.Set search key path and iterable are given'
  )

  t.equal(
    regexpIn(['a'])(Immutable.Map({ a: 3 })),
    3,
    'returns a shallow value when an iterable is passed to a partially-applied function with an Array search key path'
  )

  t.equal(
    regexpIn(Immutable.Set(['a']))(Immutable.Map({ a: 3 })),
    3,
    'returns a shallow value when an iterable is passed to a partially-applied function with an Immutable.Set search key path'
  )

  t.equal(
    regexpIn(['a', 'b'])(Immutable.Map({ a: Immutable.Map({ b: 3 }) })),
    3,
    'returns a deep value when an iterable is passed to a partially-applied function with an Array search key path'
  )

  t.equal(
    regexpIn(Immutable.Set(['a', 'b']))(
      Immutable.Map({ a: Immutable.Map({ b: 3 }) })
    ),
    3,
    'returns a deep value when an iterable is passed to a partially-applied function with an Immutable.Set search key path'
  )

  t.equal(
    regexpIn(['z'])(Immutable.Map({ a: 3 })),
    undefined,
    'returns shallow undefined when an iterable is passed to a partially-applied function with an Array search key path'
  )

  t.equal(
    regexpIn(Immutable.Set(['z']))(Immutable.Map({ a: 3 })),
    undefined,
    'returns shallow undefined when an iterable is passed to a partially-applied function with an Immutable.Set search key path'
  )

  t.equal(
    regexpIn(['z', 'b'])(Immutable.Map({ a: Immutable.Map({ b: 3 }) })),
    undefined,
    'returns deep undefined when an iterable is passed to a partially-applied function with an Array search key path'
  )

  t.equal(
    regexpIn(Immutable.Set(['z', 'b']))(
      Immutable.Map({ a: Immutable.Map({ b: 3 }) })
    ),
    undefined,
    'returns deep undefined when an iterable is passed to a partially-applied function with an Immutable.Set search key path'
  )

  const m5 = Immutable.Map({ b: 3 })
  t.equal(
    regexpIn(['a'])(Immutable.Map({ a: m5 })),
    m5,
    'returns a shallow Immutable.Map when an iterable is passed to a partially-applied function with an Array search key path'
  )

  const m6 = Immutable.Map({ b: 3 })
  t.equal(
    regexpIn(Immutable.Set(['a']))(Immutable.Map({ a: m6 })),
    m6,
    'returns a shallow Immutable.Map when an iterable is passed to a partially-applied function with an Immutable.Set search key path'
  )

  const m7 = Immutable.Map({ c: 3 })
  t.equal(
    regexpIn(['a', 'b'])(Immutable.Map({ a: Immutable.Map({ b: m7 }) })),
    m7,
    'returns a deep Immutable.Map when an iterable is passed to a partially-applied function with an Array search key path'
  )

  const m8 = Immutable.Map({ c: 3 })
  t.equal(
    regexpIn(Immutable.Set(['a', 'b']))(
      Immutable.Map({ a: Immutable.Map({ b: m8 }) })
    ),
    m8,
    'returns a deep Immutable.Map when an iterable is passed to a partially-applied function with an Immutable.Set search key path'
  )

  const m9 = Immutable.Map({ d: 3 })
  t.equal(
    regexpIn(
      ['a', /bat/, 'c'],
      Immutable.Map({ a: Immutable.Map({ batter: Immutable.Map({ c: m9 }) }) })
    ),
    m9,
    'returns a deep value when Array search key path regexes and iterable are given'
  )

  const m10 = Immutable.Map({ d: 3 })
  t.equal(
    regexpIn(
      ['a', 'b', /CAT/i],
      Immutable.Map({ a: Immutable.Map({ b: Immutable.Map({ cat: m10 }) }) })
    ),
    m10,
    'returns a deep Immutable.Map when Array search key path regexes and iterable are given'
  )
})
