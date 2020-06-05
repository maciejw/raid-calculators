import React from "react";
import { toInt } from "../../toInt";
import { TextField } from "./TextField";
import { CalculatorFieldProps } from "./CalculatorFieldProps";
export function TotalSpeedField({ state, onUpdate }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="total-speed"
      label="Total speed"
      value={state.totalSpeed}
      onInput={(e) =>
        onUpdate({ ...state, totalSpeed: toInt(e.currentTarget.value) })
      }
    />
  );
}
