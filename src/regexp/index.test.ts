import { matchChineseCharacter, chineseRegexp } from ".";

describe("chinese character match", () => {
  describe("traditional regexp", () => {
    // TODO more test cases
    it("case 1", () => {
      expect(chineseRegexp("你好")).toEqual(true);
    });
  });
  describe("Unicode property escapes ", () => {
    // TODO more test cases
    it("case 1", () => {
      expect(matchChineseCharacter("你好")).toEqual(true);
    });
  });
});
