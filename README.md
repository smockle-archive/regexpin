# regexpIn

Like Immutable.JS’ [Iterable#getIn](https://facebook.github.io/immutable-js/docs/#/Iterable/getIn), but with `RegExp` support.

## Installation

Run `npm install --save regexpin` to add `regexpIn` to your project.

## Usage

```JavaScript
const Immutable = require('immutable')
const regexpIn = require('regexpin')
const map = Immutable.Map({ 'hello': { 'world': 3 } })

// regexpIn is curried, so you can partially-apply it
const messageGetter = regexpIn(['hello', /WO/i])
const message = messageGetter(map)
console.log(message) // Logs `3`

// You can also provide both arguments at once
const newMessage = regexpIn([/^(.*)lo$/, 'world'], map)
console.log(newMessage) // Also logs `3`
```

## Testing

`regexpIn` includes several unit tests. After cloning the `regexpIn` repo locally, run `npm install` in the project folder to install dependencies, then `npm test` to execute the tests.
