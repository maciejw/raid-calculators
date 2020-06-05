import React, { useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

import {
  calculateRealSpeedFromArtifacts,
  calculateRealSpeedFromTotal,
  ROUND_TO_DECIMAL_PLACES,
} from "../speed";

import { TotalSpeedCalculator } from "./TotalSpeedCalculator";
import { ArtifactSpeedCalculator } from "./ArtifactSpeedCalculator";

const calculationModes = {
  calculateRealSpeedFromArtifacts,
  calculateRealSpeedFromTotal,
};
const calculationModesTexts: Record<keyof typeof calculationModes, string> = {
  calculateRealSpeedFromTotal: "Calculate from total speed",
  calculateRealSpeedFromArtifacts: "Calculate from artifact speed",
};

export type SpeedSetNumber = 0 | 1 | 2 | 3;

type Mode = keyof typeof calculationModes | "none";

export type State = {
  baseSpeed: number;
  aura: number;
  artifactSpeed: number;
  totalSpeed: number;
  numberOfSpeedSets: SpeedSetNumber;
  loreOfSteelPresent: boolean;
  mode: Mode;
  result: number | undefined;
};

export type Update = (e: State) => void;

type SpeedCalculatorProps = { onSpeedCalculated?: (speed: number) => void };
export function SpeedCalculator({
  onSpeedCalculated = () => {},
}: SpeedCalculatorProps) {
  const [state, setState] = useState<State>({
    aura: 0,
    baseSpeed: 0,
    artifactSpeed: 0,
    totalSpeed: 0,
    numberOfSpeedSets: 0,
    loreOfSteelPresent: false,
    mode: "calculateRealSpeedFromTotal",
    result: undefined,
  });

  function calculate(state: State) {
    if (state.mode !== "none") {
      return calculationModes[state.mode](state);
    }
  }

  function updateAndRecalculate(state: State) {
    var result = calculate(state);

    if (result) {
      onSpeedCalculated(result);
    }
    setState({ ...state, result });
  }

  return (
    <Form>
      <div>
        <ButtonGroup>
          {Object.getOwnPropertyNames(calculationModes).map((m) => {
            const mode = m as keyof typeof calculationModes;
            return (
              <Button
                key={mode}
                variant={
                  state.mode === mode ? "secondary" : "outline-secondary"
                }
                onClick={() =>
                  updateAndRecalculate({
                    ...state,
                    mode,
                  })
                }
              >
                {calculationModesTexts[mode]}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
      <br />
      {state.result !== undefined && state.result > 0 && (
        <Alert variant="success">
          <Alert.Heading>Real speed of a champion:</Alert.Heading>
          {state.result.toFixed(ROUND_TO_DECIMAL_PLACES)}
        </Alert>
      )}
      {state.mode === "calculateRealSpeedFromTotal" && (
        <TotalSpeedCalculator onUpdate={updateAndRecalculate} state={state} />
      )}
      {state.mode === "calculateRealSpeedFromArtifacts" && (
        <ArtifactSpeedCalculator
          onUpdate={updateAndRecalculate}
          state={state}
        />
      )}
    </Form>
  );
}
