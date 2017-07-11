# Callable

[![NPM](https://nodei.co/npm/callable-class.png)](https://npmjs.org/package/callable-class)

[![CircleCI](https://circleci.com/gh/sleexyz/callable.svg?style=svg)](https://circleci.com/gh/sleexyz/callable)


An extendable base class for callable classes, designed to work nicely with Flow.

## Type definition:

```js
// @flow
declare class Callable<A, B> extends Function {
  // See https://github.com/facebook/flow/issues/3084
  // (A): B
  $call: A => B;
  constructor(A => B): this;
}
```

## Notes:

We mutate the prototype of the incoming function.

```js
// @flow
import Callable from "callable-class";

const f = x => x + 1;
const g = new Callable(f);
console.log(f === g) // true
```



## Examples:

#### Extend `Callable` with custom methods
```js
// @flow
import Callable from "callable-class";

class Composable<A, B> extends Callable<A, B> {
  andThen(next: B => C): Composable<A, B> {
    return new Composable(x => next(this(x)));
  }
}

const foo = new Composable(x => [...x, 1])
  .andThen(x => [...x, 2])
  .andThen(x => [...x, 3]);

console.log(foo([])); // [1, 2, 3]
```

#### Extend `Callable` with custom fields and constructor
```js
// @flow
import Callable from "callable-class";

class ActionCreator<Type, A, B> extends Callable<A, B> {
  type: string;
  constructor(type: Type, fn: A => B) {
    super(fn);
    this.type = type;
  }
}

const foo = new ActionCreator("foo", x => x + 1);

console.log(foo.type); // "foo"
console.log(foo(0)); // 1
```
