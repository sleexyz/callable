// @flow
import Callable from "./";

const incr = (x: number): number => x + 1;

/*
   Callables should be able to flow into correct function types
*/

(new Callable(incr): number => number);
(new Callable(incr): number => mixed);

/*
   Callables should be not be able to flow into incorrect function types
*/

// $FlowFixMe
(new Callable(incr): number => void);
// $FlowFixMe
(new Callable(incr): void => number);
// $FlowFixMe
(new Callable(incr): void => void);

/*
   Callables should be able to flow into correct Callable types
*/

(new Callable(incr): Callable<number, number>);
(new Callable(incr): Callable<number, mixed>);

/*
   Callables should be not be able to flow into incorrect Callable types
*/

// $FlowFixMe
(new Callable(incr): Callable<number, void>);
// $FlowFixMe
(new Callable(incr): Callable<void, number>);
// $FlowFixMe
(new Callable(incr): Callable<void, void>);

/*
   Callables should be able to have extended prototypes
*/

class Composable<A, B> extends Callable<A, B> {
  andThen<C>(g: B => C): Callable<A, C> {
    return new Composable(x => g((this: any)(x)));
  }
}
(new Composable(incr).andThen(incr): Callable<number, number>);
// $FlowFixMe
(new Composable(incr).andThen(incr): Callable<void, void>);

/*
   Callables should be able to have extended constructors
*/

class ActionCreator<Type, A, B> extends Callable<A, B> {
  type: Type
  constructor(type: Type, fn: A => B) {
    super(fn);
    this.type = type;
  }
}
(new ActionCreator("incr", incr): ActionCreator<"incr", number, number>);
// $FlowFixMe
(new ActionCreator("incr", incr): ActionCreator<"incr", void, void>);
// $FlowFixMe
(new ActionCreator("incr", incr): ActionCreator<"notincr", void, void>);
