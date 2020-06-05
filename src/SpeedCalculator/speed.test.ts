import { logger } from "../logger";
import {
  calculateRealSpeedFromArtifacts,
  calculateRealSpeedFromTotal,
} from "./speed";

describe("Real speed calculator", () => {
  test.each`
    champion       | baseSpeed | artifactSpeed | numberOfSpeedSets | aura         | loreOfSteelPresent | expectedResult
    ${"draco"}     | ${98}     | ${90}         | ${0}              | ${undefined} | ${undefined}       | ${188}
    ${"fu-shan"}   | ${106}    | ${76}         | ${0}              | ${undefined} | ${undefined}       | ${182}
    ${"martyr"}    | ${93}     | ${91}         | ${0}              | ${undefined} | ${undefined}       | ${184}
    ${"maneater1"} | ${98}     | ${127}        | ${1}              | ${undefined} | ${undefined}       | ${224.76}
    ${"maneater2"} | ${98}     | ${125}        | ${1}              | ${undefined} | ${undefined}       | ${222.76}
    ${"draco"}     | ${98}     | ${90}         | ${0}              | ${24}        | ${undefined}       | ${211.52}
    ${"fu-shan"}   | ${106}    | ${76}         | ${0}              | ${24}        | ${undefined}       | ${207.44}
    ${"martyr"}    | ${93}     | ${91}         | ${0}              | ${24}        | ${undefined}       | ${206.32}
    ${"maneater1"} | ${98}     | ${127}        | ${1}              | ${24}        | ${undefined}       | ${248.28}
    ${"maneater2"} | ${98}     | ${125}        | ${1}              | ${24}        | ${undefined}       | ${246.28}
    ${"arbiter"}   | ${110}    | ${124}        | ${3}              | ${undefined} | ${true}            | ${239.54}
    ${"arbiter"}   | ${110}    | ${124}        | ${3}              | ${30}        | ${true}            | ${272.54}
  `(
    "Should calculate expected speed $expectedResult for CB team member [$champion $baseSpeed $artifactSpeed $numberOfSpeedSets $aura $loreOfSteelPresent]",
    ({
      champion,
      baseSpeed,
      artifactSpeed,
      numberOfSpeedSets,
      aura,
      loreOfSteelPresent,
      expectedResult,
    }) => {
      logger("champion", champion);
      const result = calculateRealSpeedFromArtifacts({
        baseSpeed,
        artifactSpeed,
        numberOfSpeedSets,
        aura,
        loreOfSteelPresent,
      });

      expect(result).toBe(expectedResult);
    }
  );

  test.each`
    champion       | baseSpeed | totalSpeed | numberOfSpeedSets | aura         | loreOfSteelPresent | expectedResult
    ${"draco"}     | ${98}     | ${188}     | ${0}              | ${undefined} | ${undefined}       | ${188}
    ${"fu-shan"}   | ${106}    | ${182}     | ${0}              | ${undefined} | ${undefined}       | ${182}
    ${"martyr"}    | ${93}     | ${184}     | ${0}              | ${undefined} | ${undefined}       | ${184}
    ${"maneater1"} | ${98}     | ${225}     | ${1}              | ${undefined} | ${undefined}       | ${224.76}
    ${"maneater2"} | ${98}     | ${223}     | ${1}              | ${undefined} | ${undefined}       | ${222.76}
    ${"draco"}     | ${98}     | ${188}     | ${0}              | ${24}        | ${undefined}       | ${211.52}
    ${"fu-shan"}   | ${106}    | ${182}     | ${0}              | ${24}        | ${undefined}       | ${207.44}
    ${"martyr"}    | ${93}     | ${184}     | ${0}              | ${24}        | ${undefined}       | ${206.32}
    ${"maneater1"} | ${98}     | ${225}     | ${1}              | ${24}        | ${undefined}       | ${248.28}
    ${"maneater2"} | ${98}     | ${223}     | ${1}              | ${24}        | ${undefined}       | ${246.28}
    ${"arbiter"}   | ${110}    | ${240}     | ${3}              | ${undefined} | ${true}            | ${239.54}
    ${"arbiter"}   | ${110}    | ${240}     | ${3}              | ${30}        | ${true}            | ${272.54}
  `(
    "Should calculate expected speed $expectedResult for [$champion $baseSpeed $totalSpeed $numberOfSpeedSets $aura $loreOfSteelPresent]",
    ({
      champion,
      baseSpeed,
      totalSpeed,
      numberOfSpeedSets,
      aura,
      loreOfSteelPresent,
      expectedResult,
    }) => {
      logger("champion", champion);
      const result = calculateRealSpeedFromTotal({
        baseSpeed,
        totalSpeed,
        numberOfSpeedSets,
        aura,
        loreOfSteelPresent,
      });

      expect(result).toBe(expectedResult);
    }
  );
});
