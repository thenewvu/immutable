const on = (obj) => (...ops) => ops.reduce((_obj, op) => op(_obj), obj)

const fset = (at, fn) => (obj) => {
  if (!obj || !at) return obj

  const firstDot = at.indexOf('.')
  if (firstDot === -1) return {...obj, [at]: fn(obj[at])}

  const firstKey = at.slice(0, firstDot)
  const restPath = at.slice(firstDot + 1)
  return {...obj, [firstKey]: fset(restPath, fn)(obj[firstKey])}
}

const vset = (at, val) => (obj) => fset(at, () => val)(obj)

export default {on, fset, vset}
