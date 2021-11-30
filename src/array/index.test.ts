import { generateArray } from ".";

describe("array test suits", () => {
  it("array from can gererate right array", () => {
    expect(generateArray(5)).toStrictEqual([0, 1, 2, 3, 4]);
  });
});
