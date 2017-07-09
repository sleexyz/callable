function Callable(f) {
  const wrapped = x => f(x);
  Object.setPrototypeOf(wrapped, this.constructor.prototype);
  return wrapped;
}

Callable.prototype = Object.create(Function.prototype);
Callable.prototype.constructor = Callable;

module.exports = Callable;
