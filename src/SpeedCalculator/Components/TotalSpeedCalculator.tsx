import React from "react";
import { CalculatorFieldProps } from "./Fields/CalculatorFieldProps";
import { AuraField } from "./Fields/AuraField";
import { BaseSpeedField } from "../BaseSpeedField";
import { TotalSpeedField } from "./Fields/TotalSpeedField";
import { NumberOfSpeedSetsField } from "./Fields/NumberOfSpeedSetsField";
import { LoreOfSteelPresentField } from "./Fields/LoreOfSteelPresentField";

export function TotalSpeedCalculator(props: CalculatorFieldProps) {
  return (
    <>
      <AuraField {...props} />
      <BaseSpeedField {...props} />
      <TotalSpeedField {...props} />
      <NumberOfSpeedSetsField {...props} />
      <LoreOfSteelPresentField {...props} />
    </>
  );
}
