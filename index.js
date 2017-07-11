function Callable(f) {
  Object.setPrototypeOf(f, this.constructor.prototype);
  return f;
}

Callable.prototype = Object.create(Function.prototype);
Callable.prototype.constructor = Callable;

module.exports = Callable;
