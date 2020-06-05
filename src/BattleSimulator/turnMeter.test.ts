import { calculateTurnMeter } from "./turnMeter";
import { ChampionGameState, ApplySpeedDeBuff, ApplySpeedBuff } from "./state";
import { numberRoundDecimal } from "../internal-contracts";
const defaultChampion: ChampionGameState = {
  speed: 100,
  buffs: [],
  deBuffs: [],
  champ: 1,
  team: "team1",
  turnMeter: 0,
};
describe("Turn meter", () => {
  it("should be calculated according to speed", () => {
    const result = calculateTurnMeter({ ...defaultChampion });
    expect(numberRoundDecimal(result, 2)).toEqual(7);
  });

  it("should be calculated according to speed and applied 30% debuff", () => {
    const expectedResult = calculateTurnMeter({
      ...defaultChampion,
      speed: 70,
    });
    const result = calculateTurnMeter({
      ...defaultChampion,
      speed: 100,
      deBuffs: [{ name: ApplySpeedDeBuff.modifierName, turns: 2, value: 30 }],
    });
    expect(result).toEqual(expectedResult);
  });

  it("should be calculated according to speed and applied 30% buff", () => {
    const expectedResult = calculateTurnMeter({
      ...defaultChampion,
      speed: 130,
    });
    const result = calculateTurnMeter({
      ...defaultChampion,
      speed: 100,
      buffs: [{ name: ApplySpeedBuff.modifierName, turns: 2, value: 30 }],
    });

    expect(result).toEqual(expectedResult);
  });

  it("should be calculated according to speed and applied 30% buff and 30% debuff", () => {
    const expectedResult = calculateTurnMeter({
      ...defaultChampion,
      speed: 100,
    });
    const result = calculateTurnMeter({
      ...defaultChampion,
      speed: 100,
      buffs: [{ name: ApplySpeedBuff.modifierName, turns: 2, value: 30 }],
      deBuffs: [{ name: ApplySpeedDeBuff.modifierName, turns: 2, value: 30 }],
    });
    expect(result).toEqual(expectedResult);
  });

  it("should be calculated according to speed and applied 30% buff and 15% debuff", () => {
    const expectedResult = calculateTurnMeter({
      ...defaultChampion,
      speed: 115,
    });
    const result = calculateTurnMeter({
      ...defaultChampion,
      speed: 100,
      buffs: [{ name: ApplySpeedBuff.modifierName, turns: 2, value: 30 }],
      deBuffs: [{ name: ApplySpeedDeBuff.modifierName, turns: 2, value: 15 }],
    });
    expect(numberRoundDecimal(result, 2)).toEqual(
      numberRoundDecimal(expectedResult, 2)
    );
  });
});
