import { isEqual } from "./isEqual"

describe("isEqual test cases", () => {
  describe("array isEqual test cases", () => {
    it("string array with same item should be true", () => {
      expect(isEqual(["1"], ["1"])).toEqual(true)
      expect(isEqual(["a", "b"], ["a", "b"])).toEqual(true)
    })
    it("string array with not same item should be true", () => {
      expect(isEqual(["a", "b"], ["a", "b", "c"])).toEqual(false)
    })
    it("number array with same item should be true", () => {
      expect(isEqual([1], [1])).toEqual(true)
      expect(isEqual([1, 2], [1, 2])).toEqual(true)
    })
    it("number array with not same length should be false", () => {
      expect(isEqual([1, 2], [1, 2, 3])).toEqual(false)
    })
    it("empty array should be false", () => {
      expect(isEqual([], [])).toEqual(false)
    })
  })
  describe("object isEqual test cases", () => {
    it("two obj with same property should be true", () => {
      expect(isEqual({ a: "a" }, { a: "a" })).toEqual(true)
    })
  })

  // borrow test code from https://github.com/lodash/lodash/blob/master/test/isEqual.js
  describe("lodash isequal test cases", () => {
    const symbol1 = Symbol ? Symbol("a") : true,
      symbol2 = Symbol ? Symbol("b") : false
    const pairs = [
      [1, 1, true],
      [1, Object(1), true],
      [1, "1", false],
      [1, 2, false],
      [-0, -0, true],
      [0, 0, true],
      [0, Object(0), true],
      [Object(0), Object(0), true],
      [-0, 0, true],
      [0, "0", false],
      [0, null, false],
      [NaN, NaN, true],
      [NaN, Object(NaN), true],
      [Object(NaN), Object(NaN), true],
      [NaN, "a", false],
      [NaN, Infinity, false],
      ["a", "a", true],
      ["a", Object("a"), true],
      [Object("a"), Object("a"), true],
      ["a", "b", false],
      ["a", ["a"], false],
      [true, true, true],
      [true, Object(true), true],
      [Object(true), Object(true), true],
      [true, 1, false],
      [true, "a", false],
      [false, false, true],
      [false, Object(false), true],
      [Object(false), Object(false), true],
      [false, 0, false],
      [false, "", false],
      [symbol1, symbol1, true],
      [symbol1, Object(symbol1), true],
      [Object(symbol1), Object(symbol1), true],
      [symbol1, symbol2, false],
      [null, null, true],
      [null, undefined, false],
      [null, {}, false],
      [null, "", false],
      [undefined, undefined, true],
      [undefined, null, false],
      [undefined, "", false],
    ]
    // describe("base equal test cases", () => {
    //   it.concurrent.each(pairs)("isEqual(%o, %o) is %o", (a, b, c) => {
    //     expect(isEqual(a, b)).toEqual(c)
    //   })
    // })
  })
})
