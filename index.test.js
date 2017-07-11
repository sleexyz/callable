// @flow
import Callable from "./";

describe("Callable", () => {
  it("is a Callable", () => {
    const fn = new Callable(x => x);
    expect(fn instanceof Callable).toEqual(true);
  });
  it("is a Function", () => {
    const fn = new Callable(x => x);
    expect(fn instanceof Function).toEqual(true);
  });
  it("can be called", () => {
    const fn = new Callable(x => x + 1);
    expect(fn(0)).toEqual(1);
  });
  it("mutates the incoming function", () => {
    const f = x => x + 1;
    const g = new Callable(f);
    expect(f === g).toEqual(true);
  });
  describe("when extending", () => {
    class Foo<A, B> extends Callable<A, B> {
      tag: string;
      constructor(tag: string, fn: A => B) {
        super(fn);
        this.tag = tag;
      }
      getTag() {
        return this.tag;
      }
    }
    it("can be called", () => {
      const fn = new Foo("incr", x => x + 1);
      expect(fn(0)).toEqual(1);
    });
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
      (fn: number => number);
      (fn: Callable<number, number>);
      (fn: Foo<number, number>);
      expect(fn instanceof Foo).toEqual(true);
      expect(fn instanceof Callable).toEqual(true);
      expect(fn instanceof Function).toEqual(true);
    });
    it("is able to hijack the incoming function", () => {
      class Spy<A, B> extends Callable<A, B> {
        spy: {
          callCount: number
        };
        constructor(fn: A => B) {
          const spy = {
            callCount: 0
          };
          super((x: A): B => {
            spy.callCount += 1;
            return fn(x);
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
