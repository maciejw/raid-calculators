import React from 'react';
import { CheckField } from "./CheckField";
import { CalculatorFieldProps } from "./CalculatorFieldProps";
export function LoreOfSteelPresentField({ state, onUpdate }: CalculatorFieldProps) {
  return (
    <CheckField
      controlId="lore-of-steel-present"
      label="Lore of steel present"
      checked={state.loreOfSteelPresent}
      onInput={() => onUpdate({
        ...state,
        loreOfSteelPresent: !state.loreOfSteelPresent,
      })} />
  );
}
