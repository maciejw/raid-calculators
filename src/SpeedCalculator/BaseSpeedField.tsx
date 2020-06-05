import React from "react";
import { toInt } from "./toInt";
import { TextField } from "./Components/Fields/TextField";
import { CalculatorFieldProps } from "./Components/Fields/CalculatorFieldProps";
export function BaseSpeedField({ state, onUpdate }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="base-speed"
      label="Base speed"
      value={state.baseSpeed}
      onInput={(e) =>
        onUpdate({ ...state, baseSpeed: toInt(e.currentTarget.value) })
      }
    />
  );
}
