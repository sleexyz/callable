# Callable

[![NPM](https://nodei.co/npm/callable-class.png)](https://npmjs.org/package/callable-class)
[![CircleCI](https://circleci.com/gh/sleexyz/callable.svg?style=svg)](https://circleci.com/gh/sleexyz/callable)


An extendable base class for callable classes, designed to work nicely with Flow.

## Type definition:

```js
// @flow
declare export default class Callable<A, B> extends Function {
  constructor(fn: A => B): this & (A => B);
}
```

## Examples:

#### Example: Extend `Callable` with custom methods
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

#### Example: Extend `Callable` with custom fields and constructor
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

const foo = new ActionCreator("foo", () => {});

console.log(foo.type); // "foo"
```
