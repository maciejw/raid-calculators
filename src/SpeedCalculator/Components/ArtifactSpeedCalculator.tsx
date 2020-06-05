import React from "react";

import { CalculatorFieldProps } from "./Fields/CalculatorFieldProps";
import { AuraField } from "./Fields/AuraField";
import { BaseSpeedField } from "../BaseSpeedField";
import { ArtifactSpeedField } from "./Fields/ArtifactSpeedField";
import { NumberOfSpeedSetsField } from "./Fields/NumberOfSpeedSetsField";
import { LoreOfSteelPresentField } from "./Fields/LoreOfSteelPresentField";
export function ArtifactSpeedCalculator(props: CalculatorFieldProps) {
  return (
    <>
      <AuraField {...props} />
      <BaseSpeedField {...props} />
      <ArtifactSpeedField {...props} />
      <NumberOfSpeedSetsField {...props} />
      <LoreOfSteelPresentField {...props} />
    </>
  );
}
