# Callable

An extendable base class for callable classes, designed to work with Flow.

```js
// @flow
import Callable from "callable";

class Composable<A, B> extends Callable<A, B> {
  andThen(next: B => C): Composable<A, B> {
    return new Composable(x => next(this(x)));
  }
}

const foo = new Composable(x => [...x, 1])
  .andThen(x => [...x, 2])
  .andThen(x => [...x, 3])

console.log(foo([])); // [1, 2, 3]
```
