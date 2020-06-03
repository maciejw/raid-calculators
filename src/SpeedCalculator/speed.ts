let log: typeof console.log = () => {};
log = console.log;

export const ROUND_TO_DECIMAL_PLACES = 2;

type NumberOfSets = 0 | 1 | 2 | 3;

type SpeedComponentParameters = {
  baseSpeed: number;
  artifactSpeed: number;
  aura?: number;
  loreOfSteelPresent?: boolean;
  numberOfSpeedSets?: NumberOfSets;
};

type SpeedTotalParameters = {
  baseSpeed: number;
  totalSpeed: number;
  aura?: number;
  loreOfSteelPresent?: boolean;
  numberOfSpeedSets?: NumberOfSets;
};
export function calculateRealSpeedFromTotal({
  baseSpeed,
  totalSpeed,
  aura = 0,
  loreOfSteelPresent = false,
  numberOfSpeedSets = 0
}: SpeedTotalParameters) {
  log("input parameters", {
    baseSpeed,
    totalSpeed,
    aura,
    loreOfSteelPresent,
    numberOfSpeedSets
  });

  const auraBonus = getAuraBonus(baseSpeed, aura);
  log("auraBonus", auraBonus);

  const loreOfSteelBonus = getLoreOfSteelBonus(
    baseSpeed,
    numberOfSpeedSets,
    loreOfSteelPresent
  );
  log("loreOfSteelBonus", loreOfSteelBonus);

  const loreOfSteelBonusRounded = numberRoundDecimal(loreOfSteelBonus);
  log("loreOfSteelBonusRounded", loreOfSteelBonusRounded);

  const speedSetBonus = getSpeedSetBonus(baseSpeed, numberOfSpeedSets);
  log("speedSetBonus", speedSetBonus);

  const speedSetBonusRounded = numberRoundDecimal(speedSetBonus);
  log("speedSetBonusRounded", speedSetBonusRounded);

  const artifactSpeed =
    totalSpeed - baseSpeed - loreOfSteelBonusRounded - speedSetBonusRounded;
  log("artifactSpeed", artifactSpeed);

  const realSpeedBeforeRounding =
    auraBonus + baseSpeed + speedSetBonus + loreOfSteelBonus + artifactSpeed;

  log("realSpeedBeforeRounding", realSpeedBeforeRounding);
  return numberRoundDecimal(realSpeedBeforeRounding, ROUND_TO_DECIMAL_PLACES);
}
export function calculateRealSpeedFromArtifacts({
  baseSpeed,
  artifactSpeed,
  aura = 0,
  loreOfSteelPresent = false,
  numberOfSpeedSets = 0
}: SpeedComponentParameters) {
  log("input parameters", {
    baseSpeed,
    artifactSpeed,
    aura,
    loreOfSteelPresent,
    numberOfSpeedSets
  });

  const auraBonus = getAuraBonus(baseSpeed, aura);
  log("auraBonus", auraBonus);

  const loreOfSteelBonus = getLoreOfSteelBonus(
    baseSpeed,
    numberOfSpeedSets,
    loreOfSteelPresent
  );
  log("loreOfSteelBonus", loreOfSteelBonus);

  const speedSetBonus = getSpeedSetBonus(baseSpeed, numberOfSpeedSets);
  log("speedSetBonus", speedSetBonus);

  const speedSetBonusRounded = numberRoundDecimal(speedSetBonus);
  log("speedSetBonusRounded", speedSetBonusRounded);

  const artifactStatSubStatSpeed = artifactSpeed - speedSetBonusRounded;
  log("realArtifactSpeed", artifactStatSubStatSpeed);

  const realSpeedBeforeRounding =
    baseSpeed +
    auraBonus +
    artifactStatSubStatSpeed +
    speedSetBonus +
    loreOfSteelBonus;
  log("realSpeedBeforeRounding", realSpeedBeforeRounding);

  return numberRoundDecimal(realSpeedBeforeRounding, ROUND_TO_DECIMAL_PLACES);
}
function getAuraBonus(baseSpeed: number, aura: number) {
  const auraMultiplier = aura / 100;
  return baseSpeed * auraMultiplier;
}
export function numberRoundDecimal(number: number, decimalPlaces: number = 0) {
  return (
    Math.round((number + Number.EPSILON) * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
}
function getLoreOfSteelBonus(
  baseSpeed: number,
  numberOfSpeedSets: NumberOfSets,
  loreOfSteelPresent = false
) {
  const loreOfSeelModifier = loreOfSteelPresent ? 1.15 : 1;
  const speedSetBonus = getSpeedSetBonus(baseSpeed, numberOfSpeedSets);
  const speedSetBonusWithLoreOfSteel = speedSetBonus * loreOfSeelModifier;

  return speedSetBonusWithLoreOfSteel - speedSetBonus;
}

function getSpeedSetBonus(baseSpeed: number, numberOfSpeedSets: number) {
  const speedSetPercentage = 0.12;
  const speedSetBonus = baseSpeed * speedSetPercentage * numberOfSpeedSets;
  return speedSetBonus;
}
