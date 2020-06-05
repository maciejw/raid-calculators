import React from 'react';
import { toFloat } from "../../toFloat";
import { TextField } from "./TextField";
import { CalculatorFieldProps } from "./CalculatorFieldProps";
export function ArtifactSpeedField({ state, onUpdate }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="artifact-speed"
      label="Artifact speed"
      value={state.artifactSpeed}
      onInput={(e) => onUpdate({ ...state, artifactSpeed: toFloat(e.currentTarget.value) })} />
  );
}
