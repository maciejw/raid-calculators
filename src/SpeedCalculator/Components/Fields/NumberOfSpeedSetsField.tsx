import React from "react";
import { toSpeedSetNumber } from "../../toSpeedSetNumber";
import { TextField } from "./TextField";
import { CalculatorFieldProps } from "./CalculatorFieldProps";
export function NumberOfSpeedSetsField({
  state,
  onUpdate,
}: CalculatorFieldProps) {
  return (
    <TextField
      controlId="number-of-speed-sets"
      label="Number of speed sets"
      value={state.numberOfSpeedSets}
      onInput={(e) =>
        onUpdate({
          ...state,
          numberOfSpeedSets: toSpeedSetNumber(e.currentTarget.value),
        })
      }
    />
  );
}
