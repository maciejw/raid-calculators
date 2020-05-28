import * as React from "react";
import {
  ChampionState,
  ChampionId,
  SkillUse,
  SpeedChange,
  BuffDebuff
} from "./state";
import { ProgressBar } from "./ProgressBar";

function toInt(str: string) {
  return parseInt(str, 10) || 0;
}

export type ChampionProps = {
  state: ChampionState;
  currentlyActive: boolean;
  onSpeedChanged: (args: SpeedChange) => void;
  onToggle: (args: ChampionId) => void;
  onSkill: (args: SkillUse) => void;
} & ChampionId;

function BuffsDebufsInfo(
  props: { info?: BuffDebuff } & { children: React.ReactNode }
) {
  return (
    <>
      {props.info && (
        <>
          {props.children}{" "}
          <input value={`${props.info.value} turns ${props.info.turns}`} />
        </>
      )}
    </>
  );
}

export function Champion({
  champ,
  team,
  state,
  currentlyActive,
  onSpeedChanged,
  onToggle,
  onSkill
}: ChampionProps) {
  const championId = { champ, team };
  return (
    <div
      className="Champion"
      style={{ backgroundColor: currentlyActive ? "lightgreen" : "white" }}
    >
      <ProgressBar filled={state.turnMeter} />
      <label>
        skip
        <input
          type="checkbox"
          checked={state.skip}
          onChange={() => onToggle(championId)}
        />
      </label>
      <label>
        name
        <input defaultValue={`${team} champ${champ + 1}`} />
      </label>
      <label>
        speed
        <input
          type="text"
          value={state.speed}
          disabled={state.skip}
          onChange={e =>
            onSpeedChanged({ ...championId, speed: toInt(e.target.value) })
          }
        />
      </label>

      <label>
        <BuffsDebufsInfo info={state.speedBuff}>Speed buff</BuffsDebufsInfo>
      </label>
      <label>
        <BuffsDebufsInfo info={state.speedDebuff}>Speed debuff</BuffsDebufsInfo>
      </label>
    </div>
  );
}
