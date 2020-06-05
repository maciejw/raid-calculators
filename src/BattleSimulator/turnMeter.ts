import { ChampionGameState, ApplySpeedBuff, ApplySpeedDeBuff } from "./state";

export function getFillRate(speed: number) {
  return speed * 0.07;
}
export function calculateTurnMeter(champ: ChampionGameState) {
  let modifier = 0;

  const speedBuff = champ.buffs.find(
    (b) => b.name === ApplySpeedBuff.modifierName
  );
  if (speedBuff) {
    modifier = speedBuff.value;
  }
  const speedDeBuff = champ.deBuffs.find(
    (b) => b.name === ApplySpeedDeBuff.modifierName
  );
  if (speedDeBuff) {
    modifier = modifier - speedDeBuff.value;
  }
  const multiplier = (100 + modifier) / 100;

  return champ.turnMeter + getFillRate(champ.speed * multiplier);
}
