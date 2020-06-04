import { compare, sortingSpecification } from "./compare";
describe("Compare", () => {
  test.each`
    str1      | str2      | expectedResult
    ${"aaa1"} | ${"aaa2"} | ${-1}
    ${"aaa1"} | ${"aaa1"} | ${0}
    ${"aaa2"} | ${"aaa1"} | ${1}
    ${1}      | ${2}      | ${-1}
    ${1}      | ${1}      | ${0}
    ${2}      | ${1}      | ${1}
  `(
    "should return $expectedResult when compare $str1 with $str2",
    ({ str1, str2, expectedResult }) => {
      expect(compare(str1, str2)).toBe(expectedResult);
    }
  );



  it("should sort object array as expected", () => {
    const data = [
      { aaa: "test2", bbb: 2 },
      { aaa: "test1", bbb: 4 },
      { aaa: "test2", bbb: 5 },
      { aaa: "test1", bbb: 1 },
      { aaa: "test2", bbb: 2 },
      { aaa: "test1", bbb: 3 },
      { aaa: "test2", bbb: 5 },
      { aaa: "test2", bbb: 6 },
      { aaa: "test1", bbb: 2 },
    ].sort(sortingSpecification(["aaa"], ["bbb", "desc"]));

    expect(data).toMatchObject([
      { aaa: "test1", bbb: 4 },
      { aaa: "test1", bbb: 3 },
      { aaa: "test1", bbb: 2 },
      { aaa: "test1", bbb: 1 },
      { aaa: "test2", bbb: 6 },
      { aaa: "test2", bbb: 5 },
      { aaa: "test2", bbb: 5 },
      { aaa: "test2", bbb: 2 },
      { aaa: "test2", bbb: 2 },
    ]);
  });
});
