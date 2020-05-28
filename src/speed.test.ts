import { calculateRealSpeed } from "./speed";

//212, 207, 206

/*

Don't go over 212 or under 205 for your three other champs. 
Otherwise it will throw this team off. 
248 maneater, 246 maneater, 212, 207, 206. 
If you are having issues don't use lore of steel in support. Rotation below.
Syphon, syphon
Unkillable, A1, A1
A1, A1, unkillable - auto



*/

describe("Real speed calculator", () => {
  test.each`
    chapion        | baseSpeed | artifactSpeed | numberOfSpeedSets | aura         | loreOfSteelPresent | expectedResult
    ${"draco"}     | ${98}     | ${90}         | ${0}              | ${undefined} | ${undefined}       | ${188}
    ${"fu-shan"}   | ${106}    | ${76}         | ${0}              | ${undefined} | ${undefined}       | ${182}
    ${"martyr"}    | ${93}     | ${91}         | ${0}              | ${undefined} | ${undefined}       | ${184}
    ${"maneater1"} | ${98}     | ${127}        | ${1}              | ${undefined} | ${undefined}       | ${225}
    ${"maneater2"} | ${98}     | ${125}        | ${1}              | ${undefined} | ${undefined}       | ${223}
    ${"draco"}     | ${98}     | ${90}         | ${0}              | ${24}        | ${undefined}       | ${212}
    ${"fu-shan"}   | ${106}    | ${76}         | ${0}              | ${24}        | ${undefined}       | ${207}
    ${"martyr"}    | ${93}     | ${91}         | ${0}              | ${24}        | ${undefined}       | ${206}
    ${"maneater1"} | ${98}     | ${127}        | ${1}              | ${24}        | ${undefined}       | ${248}
    ${"maneater2"} | ${98}     | ${125}        | ${1}              | ${24}        | ${undefined}       | ${246}
  `(
    "Should calculate expected speed $expectedResult for [$chapion $baseSpeed $artifactSpeed $numberOfSpeedSets $aura $loreOfSteelPresent]",
    ({
      baseSpeed,
      artifactSpeed,
      numberOfSpeedSets,
      aura,
      loreOfSteelPresent,
      expectedResult
    }) => {
      const result = calculateRealSpeed({
        baseSpeed,
        artifactSpeed,
        numberOfSpeedSets,
        aura,
        loreOfSteelPresent
      });

      expect(result).toBe(expectedResult);
    }
  );

  test.skip.each`
    baseSpeed | artifactSpeed | numberOfSpeedSets | aura         | loreOfSteelPresent | expectedResult
    ${106}    | ${71}         | ${0}              | ${undefined} | ${undefined}       | ${177}
    ${106}    | ${71}         | ${0}              | ${24}        | ${undefined}       | ${202}
    ${98}     | ${90}         | ${0}              | ${undefined} | ${undefined}       | ${188}
    ${98}     | ${90}         | ${0}              | ${24}        | ${undefined}       | ${212}
    ${93}     | ${93}         | ${0}              | ${undefined} | ${undefined}       | ${186}
    ${93}     | ${93}         | ${0}              | ${24}        | ${undefined}       | ${208}
    ${104}    | ${0}          | ${0}              | ${undefined} | ${undefined}       | ${104}
    ${104}    | ${0}          | ${0}              | ${undefined} | ${true}            | ${104}
    ${104}    | ${12}         | ${1}              | ${undefined} | ${undefined}       | ${116}
    ${104}    | ${26}         | ${2}              | ${undefined} | ${undefined}       | ${130}
    ${104}    | ${141}        | ${3}              | ${undefined} | ${undefined}       | ${141}
    ${104}    | ${147}        | ${3}              | ${undefined} | ${true}            | ${147}
    ${104}    | ${141}        | ${3}              | ${30}        | ${undefined}       | ${184}
    ${104}    | ${147}        | ${3}              | ${30}        | ${true}            | ${193}
    ${104}    | ${104}        | ${0}              | ${30}        | ${false}           | ${135}
    ${104}    | ${104}        | ${0}              | ${30}        | ${true}            | ${135}
    ${108}    | ${290}        | ${3}              | ${undefined} | ${false}           | ${290}
    ${110}    | ${240}        | ${3}              | ${undefined} | ${true}            | ${240}
    ${108}    | ${290}        | ${3}              | ${24}        | ${false}           | ${325}
    ${108}    | ${290}        | ${3}              | ${30}        | ${false}           | ${334}
    ${108}    | ${290}        | ${3}              | ${32}        | ${false}           | ${337}
    ${108}    | ${290}        | ${3}              | ${32}        | ${true}            | ${340}
    ${110}    | ${274}        | ${3}              | ${32}        | ${true}            | ${324}
    ${110}    | ${110}        | ${3}              | ${undefined} | ${false}           | ${110}
  `(
    "Should calculate expected speed $expectedResult for [$baseSpeed $artifactSpeed $numberOfSpeedSets $aura $loreOfSteelPresent]",
    ({
      baseSpeed,
      artifactSpeed,
      numberOfSpeedSets,
      aura,
      loreOfSteelPresent,
      expectedResult
    }) => {
      const result = calculateRealSpeed({
        baseSpeed,
        artifactSpeed,
        numberOfSpeedSets,
        aura,
        loreOfSteelPresent
      });

      expect(result).toBe(expectedResult);
    }
  );
});
