import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";

import {
  ChampionState,
  ChampionId,
  SpeedChange,
  ChampionGameState,
  aoe15TurnMeterFill30SpeedBuff,
  aoe30SpeedDebuffEnemy,
  aoe30TurnMeterFill30SpeedBuffEnemy30TurnMeterDecrease,
  aoe20TurnMeterFill,
  aoe30TurnMeterFill,
  SkillDefinition,
} from "../state";
import { ProgressBar } from "./ProgressBar";
import { ChampionBuffsDebuffsInfo } from "./ChampionBuffsDebuffsInfo";
import { SkillsMenu } from "./SkillsMenu";
import { toFloat } from "../../internal-contracts";
import { ChampionInfo } from "./ChampionInfo";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AiFillCalculator } from "react-icons/ai";
import { SpeedCalculatorModal } from "./SpeedCalculatorModal";

const skills = [
  aoe15TurnMeterFill30SpeedBuff,
  aoe30SpeedDebuffEnemy,
  aoe30TurnMeterFill30SpeedBuffEnemy30TurnMeterDecrease,
  aoe20TurnMeterFill,
  aoe30TurnMeterFill,
];

export type ChampionProps = {
  state: ChampionState;
  gameState?: ChampionGameState;
  currentlyActive: boolean;
  onSpeedChanged: (args: SpeedChange) => void;
  onSkillUse: (s: SkillDefinition) => void;
} & ChampionId;

export function Champion({
  champ,
  team,
  state,
  gameState,
  currentlyActive,
  onSpeedChanged,
  onSkillUse,
}: ChampionProps) {
  const championId = { champ, team };

  const [show, setModalShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current } = ref;
    if (current && currentlyActive) {
      current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  return (
    <>
      <div ref={ref} />
      <Card
        bg="light"
        border={currentlyActive ? "primary" : undefined}
        style={{
          margin: "0.5rem auto",
          maxWidth: "14em",
        }}
      >
        <Card.Header>
          <ChampionInfo {...championId} />
          {currentlyActive && (
            <SkillsMenu skills={skills} onSkillUse={onSkillUse} />
          )}
        </Card.Header>
        <Card.Body>
          {gameState && (
            <Card.Title>
              <ProgressBar now={gameState.turnMeter} />
            </Card.Title>
          )}
          <Card.Text as="div">
            <InputGroup>
              <FormControl
                placeholder="Speed"
                value={state.speed}
                onChange={(e) =>
                  onSpeedChanged({
                    ...championId,
                    speed: toFloat(e.target.value),
                  })
                }
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setModalShow(true)}
                >
                  <AiFillCalculator size="2em" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {gameState && (
              <>
                <ChampionBuffsDebuffsInfo type="buff" info={gameState.buffs} />
                <ChampionBuffsDebuffsInfo
                  type="debuff"
                  info={gameState.deBuffs}
                />
              </>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <SpeedCalculatorModal
        show={show}
        onHide={() => setModalShow(false)}
        onSetSpeed={(speed) => {
          onSpeedChanged({
            ...championId,
            speed,
          });
          setModalShow(false);
        }}
      />
    </>
  );
}
