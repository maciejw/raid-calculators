import React, { useState } from 'react';
import { Form, Alert, FormControlProps, ButtonGroup, Button } from 'react-bootstrap';
import { calculateRealSpeedFromArtifacts, calculateRealSpeedFromTotal, ROUND_TO_DECIMAL_PLACES } from './speed';

const calculationModes = {
  calculateRealSpeedFromArtifacts,
  calculateRealSpeedFromTotal,
};

function toInt(value: string) {
  return parseInt(value, 10) || 0;
}

function toFloat(value: string) {
  return parseFloat(value) || 0;
}

function toSpeedSetNumber(value: string): SpeedSetNumber {
  return ((parseInt(value, 10) || 0) % 4) as SpeedSetNumber;
}
type SpeedSetNumber = 0 | 1 | 2 | 3;

type Mode = keyof typeof calculationModes | 'none';

type State = {
  baseSpeed: number;
  aura: number;
  artifactSpeed: number;
  totalSpeed: number;
  numberOfSpeedSets: SpeedSetNumber;
  loreOfSteelPresent: boolean;
  mode: Mode;
  result: number | undefined;
};

type Update = (e: State) => void;

export function SpeedCalculator() {
  const [state, update] = useState<State>({
    aura: 0,
    baseSpeed: 0,
    artifactSpeed: 0,
    totalSpeed: 0,
    numberOfSpeedSets: 0,
    loreOfSteelPresent: false,
    mode: 'none',
    result: undefined,
  });

  function calculate(state: State) {
    if (state.mode !== 'none') {
      return calculationModes[state.mode](state);
    }
  }

  function updateAndRecalculate(state: State) {
    update({ ...state, result: calculate(state) });
  }

  return (
    <Form>
      <h2>Real Speed Calculator</h2>
      <div>
        <ButtonGroup>
          <Button
            variant={state.mode === 'calculateRealSpeedFromTotal' ? 'primary' : 'secondary'}
            onClick={() =>
              updateAndRecalculate({
                ...state,
                mode: 'calculateRealSpeedFromTotal',
              })
            }
          >
            Calculate from total speed
          </Button>
          <Button
            variant={state.mode === 'calculateRealSpeedFromArtifacts' ? 'primary' : 'secondary'}
            onClick={() =>
              updateAndRecalculate({
                ...state,
                mode: 'calculateRealSpeedFromArtifacts',
              })
            }
          >
            Calculate from artifact speed
          </Button>
        </ButtonGroup>
      </div>
      <br />
      {state.result !== undefined && state.result > 0 && (
        <Alert variant="success">
          <Alert.Heading>Real speed of a champion:</Alert.Heading>
          {state.result.toFixed(ROUND_TO_DECIMAL_PLACES)}
        </Alert>
      )}
      {state.mode === 'calculateRealSpeedFromTotal' && (
        <TotalSpeedCalculator update={updateAndRecalculate} state={state} />
      )}
      {state.mode === 'calculateRealSpeedFromArtifacts' && (
        <ArtifactSpeedCalculator update={updateAndRecalculate} state={state} />
      )}
    </Form>
  );
}

type FieldProps = {
  controlId: string;
  label: string;
  onInput: React.FormEventHandler<HTMLInputElement>;
};

function TextField({ controlId, label, value, onInput }: FieldProps & { value: FormControlProps['value'] }) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="textbox" value={value} onInput={onInput} />
    </Form.Group>
  );
}

function CheckField({ controlId, label, checked, onInput: onChange }: FieldProps & { checked: boolean }) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Check type="checkbox" inline checked={checked} onChange={onChange} />
      <Form.Label>{label}</Form.Label>
    </Form.Group>
  );
}

type CalculatorFieldProps = {
  state: State;
  update: Update;
};

function AuraField({ state, update }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="aura"
      label="Aura"
      value={state.aura}
      onInput={(e) => update({ ...state, aura: toInt(e.currentTarget.value) })}
    />
  );
}

function BaseSpeedField({ state, update }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="base-speed"
      label="Base speed"
      value={state.baseSpeed}
      onInput={(e) => update({ ...state, baseSpeed: toInt(e.currentTarget.value) })}
    />
  );
}

function TotalSpeedField({ state, update }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="total-speed"
      label="Total speed"
      value={state.totalSpeed}
      onInput={(e) => update({ ...state, totalSpeed: toInt(e.currentTarget.value) })}
    />
  );
}

function ArtifactSpeedField({ state, update }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="artifact-speed"
      label="Artifact speed"
      value={state.artifactSpeed}
      onInput={(e) => update({ ...state, artifactSpeed: toFloat(e.currentTarget.value) })}
    />
  );
}

function NumberOfSpeedSetsField({ state, update }: CalculatorFieldProps) {
  return (
    <TextField
      controlId="number-of-speed-sets"
      label="Number of speed sets"
      value={state.numberOfSpeedSets}
      onInput={(e) =>
        update({
          ...state,
          numberOfSpeedSets: toSpeedSetNumber(e.currentTarget.value),
        })
      }
    />
  );
}

function LoreOfSteelPresentField({ state, update }: CalculatorFieldProps) {
  return (
    <CheckField
      controlId="lore-of-steel-present"
      label="Lore of steel present"
      checked={state.loreOfSteelPresent}
      onInput={() =>
        update({
          ...state,
          loreOfSteelPresent: !state.loreOfSteelPresent,
        })
      }
    />
  );
}
function TotalSpeedCalculator(props: CalculatorFieldProps) {
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

function ArtifactSpeedCalculator(props: CalculatorFieldProps) {
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
