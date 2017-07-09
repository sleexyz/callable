const Callable = require("./");

describe("Callable", () => {
  it("is a Callable", () => {
    const fn = new Callable(x => x);
    expect(fn instanceof Callable).toEqual(true);
  });
  it("is a Function", () => {
    const fn = new Callable(x => x);
    expect(fn instanceof Function).toEqual(true);
  });
  it("wraps a function", () => {
    const fn = new Callable(x => x + 1);
    expect(fn(0)).toEqual(1);
  });
  describe("when extending", () => {
    class Foo extends Callable {
      constructor(tag, fn) {
        super(fn);
        this.tag = tag;
      }
      getTag() {
        return this.tag;
      }
    }
    it("has additional fields", () => {
      const fn = new Foo("incr", x => x + 1);
      expect(fn.tag).toEqual("incr");
    });
    it("has additional methods", () => {
      const fn = new Foo("incr", x => x + 1);
      expect(fn.getTag()).toEqual("incr");
    });
    it("has a valid prototype chain", () => {
      const fn = new Foo("incr", x => x + 1);
      expect(fn instanceof Foo).toEqual(true);
      expect(fn instanceof Callable).toEqual(true);
      expect(fn instanceof Function).toEqual(true);
    });
    it("is able to hijack the incoming function", () => {
      class Spy extends Callable {
        constructor(fn) {
          const spy = {
            callCount: 0
          };
          super((x) => {
            spy.callCount += 1;
            fn(x);
          });
          this.spy = spy;
        }
      }
      const fn = new Spy(x => x + 1);
      expect(fn.spy.callCount).toEqual(0);
      fn(0);
      expect(fn.spy.callCount).toEqual(1);
    });
  });
});
