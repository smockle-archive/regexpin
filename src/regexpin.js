/**
 * A consistent shared value representing "not set" which equals nothing other
 * than itself, and nothing that could be provided externally.
 * @const {object}
 */
const NOT_SET = {}

/**
 * Get value at search key path in iterable.
 * @param {Array.<string, RegExp>} searchKeyPath - The keys to traverse in order.
 * @param {Immutable.Iterable} iterable - The iterable object.
 * @return {*} The value at search key path (if one exists).
 * @throws {TypeError} Argument searchKeyPath must contain strings or regular expressions.
 */
function _regexpIn (searchKeyPath, iterable) {
  var nested = NOT_SET
  for (var key of searchKeyPath) {
    var _iterable = nested === NOT_SET ? iterable : nested
    var iterableKeys = _iterable.keys()
    var test
    if (typeof key === 'string') {
      test = (value) => key === value
    } else if (key instanceof RegExp) {
      test = RegExp.prototype.test.bind(key)
    } else {
      throw new TypeError('keys in search key path must be strings or regular expressions')
    }
    for (var iterableKey of iterableKeys) {
      if (test(iterableKey)) {
        nested = _iterable.get(iterableKey)
        break
      }
    }
    if (nested === NOT_SET) return
  }
  return nested
}

/**
 * Return a value or partially-applied function.
 * @return {*} The value or partially-applied function.
 * @throws {TypeError} Argument searchKeyPath is required.
 */
function regexpIn () {
  if (arguments.length === 0 || !('map' in arguments[0])) {
    throw new TypeError('regexpIn requires a search key path')
  } else if (arguments.length === 1) {
    return _regexpIn.bind.apply(_regexpIn, [this].concat(new Array(arguments[0])))
  } else {
    return _regexpIn.apply(this, arguments)
  }
}

module.exports = regexpIn
