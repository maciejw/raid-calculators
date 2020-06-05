import React from 'react';
import { toInt } from "../../toInt";
import { TextField } from "./TextField";
import { CalculatorFieldProps } from "./CalculatorFieldProps";
export function AuraField({ state, onUpdate }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="aura"
      label="Aura"
      value={state.aura}
      onInput={(e) => onUpdate({ ...state, aura: toInt(e.currentTarget.value) })} />
  );
}
