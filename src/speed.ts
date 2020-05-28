type NumberOfSets = 0 | 1 | 2 | 3;

type SpeedParameters = {
  baseSpeed: number;
  artifactSpeed: number;
  aura?: number;
  loreOfSteelPresent?: boolean;
  numberOfSpeedSets?: NumberOfSets;
};

function getSpeedSetBonus(
  baseSpeed: number,
  numberOfSpeedSets: NumberOfSets,
  loreOfSteel = false
) {
  const loreOfSeelMultiplier = 1.15;

  let speedSetBonusMultiplier = 0.12;

  if (loreOfSteel)
    speedSetBonusMultiplier = speedSetBonusMultiplier * loreOfSeelMultiplier;

  return Math.round(baseSpeed * speedSetBonusMultiplier) * numberOfSpeedSets;
}

export function calculateRealSpeed({
  baseSpeed,
  artifactSpeed,
  aura = 0,
  loreOfSteelPresent = false,
  numberOfSpeedSets = 0
}: SpeedParameters) {
  const baseSpeedWithAura = getBaseSpeedWithAura(baseSpeed, aura);
  const artifactSpeedWithoutSpeedSetBonus =
    artifactSpeed -
    getSpeedSetBonus(baseSpeed, numberOfSpeedSets, loreOfSteelPresent);

  return (
    baseSpeedWithAura +
    getSpeedSetBonus(baseSpeedWithAura, numberOfSpeedSets, loreOfSteelPresent) +
    artifactSpeedWithoutSpeedSetBonus
  );
}
function getBaseSpeedWithAura(baseSpeed: number, aura: number) {
  const auraMultiplier = 1 + aura / 100;

  return Math.round(baseSpeed * auraMultiplier);
}
