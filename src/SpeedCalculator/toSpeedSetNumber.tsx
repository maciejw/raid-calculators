import { SpeedSetNumber } from "./Components/SpeedCalculator";
export function toSpeedSetNumber(value: string): SpeedSetNumber {
  return ((parseInt(value, 10) || 0) % 4) as SpeedSetNumber;
}
