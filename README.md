# Callable

An extendable base class for callable classes, designed to work with Flow.

```js
// @flow
declare export default class Callable<A, B> extends Function {
  constructor(fn: A => B): this & (A => B);
}
```

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

const doFoo = new ActionCreator("doFoo", () => {});

console.log(doFoo.type); // "foo"
```
