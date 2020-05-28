import * as React from "react";
import { useReducer } from "react";
import "./styles.css";
import { arenaReducer, initialArenaState } from "./arenaReducer";

import { Ticker } from "./Ticker";
import { Champion } from "./Champion";

import {
  ChampionId,
  aoe15TurnMeterFill30SpeedBuff,
  aoe20TurnMeterFill,
  aoe30TurnMeterFill30SpeedBuffEnemy30TurnMeterDecrease,
  unknownSkill,
  aoe30TurnMeterFill,
  SkillDefinition
} from "./state";

function ChampionInfo(props: ChampionId) {
  return (
    <>
      {props.team} champ{props.champ}
    </>
  );
}

export default function App() {
  const [arenaState, arenaDispatch] = useReducer(
    arenaReducer,
    initialArenaState
  );

  const enabled = arenaState.turnOwner === undefined && arenaState.activeBattle;

  function dispatchUseSkill(skill: SkillDefinition) {
    arenaDispatch({
      type: "UseSkill",
      payload: {
        skill,
        ...arenaState.turnOwner!
      }
    });
    arenaDispatch({ type: "Tick" });
  }

  function isActive(championId: ChampionId) {
    return (
      (arenaState.turnOwner &&
        arenaState.turnOwner.champ === championId.champ &&
        arenaState.turnOwner.team === championId.team) ||
      false
    );
  }

  return (
    <div className="App">
      <Ticker enable={enabled} onTick={() => arenaDispatch({ type: "Tick" })} />

      <h1>Turn Simulator</h1>

      {!arenaState.turnOwner && (
        <div style={{ margin: "20px" }}>
          <label>
            Run battle continuously{" "}
            <input
              type="checkbox"
              onChange={() => arenaDispatch({ type: "ToggleBattle" })}
              checked={arenaState.activeBattle}
            />
          </label>{" "}
          or emit sngle{" "}
          <button onClick={() => arenaDispatch({ type: "Tick" })}>Tick</button>{" "}
          or reset turn meters and buffs
          <button onClick={() => arenaDispatch({ type: "Reset" })}>
            Reset
          </button>
        </div>
      )}
      {arenaState.turnOwner && (
        <div style={{ margin: "10px" }}>
          Current champion:{" "}
          <span style={{ fontWeight: "bold" }}>
            <ChampionInfo {...arenaState.turnOwner} />
          </span>
          <button onClick={() => dispatchUseSkill(unknownSkill)}>
            Make a turn
          </button>
          or use skills:
          <br />
          <button
            onClick={() => dispatchUseSkill(aoe15TurnMeterFill30SpeedBuff)}
          >
            Aoe ally 15% turn meter boost and 30% speed buff
          </button>
          <br />
          <button
            onClick={() =>
              dispatchUseSkill(
                aoe30TurnMeterFill30SpeedBuffEnemy30TurnMeterDecrease
              )
            }
          >
            Aoe ally 30% turn meter boost and 30% speed buff enemy 30% turn
            meter deboost
          </button>
          <br />
          <button onClick={() => dispatchUseSkill(aoe20TurnMeterFill)}>
            Aoe ally 20% turn meter boost
          </button>
          <br />
          <button onClick={() => dispatchUseSkill(aoe30TurnMeterFill)}>
            Aoe ally 30% turn meter boost
          </button>
        </div>
      )}

      <div style={{ float: "left" }}>
        <Champion
          champ={0}
          team="team1"
          currentlyActive={isActive({ champ: 0, team: "team1" })}
          state={arenaState.team1[0]}
          onSkill={payload => arenaDispatch({ type: "UseSkill", payload })}
          onSpeedChanged={payload =>
            arenaDispatch({ type: "SpeedChanged", payload })
          }
          onToggle={payload =>
            arenaDispatch({ type: "ToggleChampion", payload })
          }
        />
        <Champion
          champ={1}
          team="team1"
          currentlyActive={isActive({ champ: 1, team: "team1" })}
          state={arenaState.team1[1]}
          onSkill={payload => arenaDispatch({ type: "UseSkill", payload })}
          onSpeedChanged={payload =>
            arenaDispatch({ type: "SpeedChanged", payload })
          }
          onToggle={payload =>
            arenaDispatch({ type: "ToggleChampion", payload })
          }
        />
        <Champion
          champ={2}
          team="team1"
          currentlyActive={isActive({ champ: 2, team: "team1" })}
          state={arenaState.team1[2]}
          onSkill={payload => arenaDispatch({ type: "UseSkill", payload })}
          onSpeedChanged={payload =>
            arenaDispatch({ type: "SpeedChanged", payload })
          }
          onToggle={payload =>
            arenaDispatch({ type: "ToggleChampion", payload })
          }
        />
        <Champion
          champ={3}
          team="team1"
          currentlyActive={isActive({ champ: 3, team: "team1" })}
          state={arenaState.team1[3]}
          onSkill={payload => arenaDispatch({ type: "UseSkill", payload })}
          onSpeedChanged={payload =>
            arenaDispatch({ type: "SpeedChanged", payload })
          }
          onToggle={payload =>
            arenaDispatch({ type: "ToggleChampion", payload })
          }
        />
      </div>

      <div style={{ float: "right" }}>
        <Champion
          champ={0}
          team="team2"
          currentlyActive={isActive({ champ: 0, team: "team2" })}
          state={arenaState.team2[0]}
          onSkill={payload => arenaDispatch({ type: "UseSkill", payload })}
          onSpeedChanged={payload =>
            arenaDispatch({ type: "SpeedChanged", payload })
          }
          onToggle={payload =>
            arenaDispatch({ type: "ToggleChampion", payload })
          }
        />
        <Champion
          champ={1}
          team="team2"
          currentlyActive={isActive({ champ: 1, team: "team2" })}
          state={arenaState.team2[1]}
          onSkill={payload => arenaDispatch({ type: "UseSkill", payload })}
          onSpeedChanged={payload =>
            arenaDispatch({ type: "SpeedChanged", payload })
          }
          onToggle={payload =>
            arenaDispatch({ type: "ToggleChampion", payload })
          }
        />
        <Champion
          champ={2}
          team="team2"
          currentlyActive={isActive({ champ: 2, team: "team2" })}
          state={arenaState.team2[2]}
          onSkill={payload => arenaDispatch({ type: "UseSkill", payload })}
          onSpeedChanged={payload =>
            arenaDispatch({ type: "SpeedChanged", payload })
          }
          onToggle={payload =>
            arenaDispatch({ type: "ToggleChampion", payload })
          }
        />
        <Champion
          champ={3}
          team="team2"
          currentlyActive={isActive({ champ: 3, team: "team2" })}
          state={arenaState.team2[3]}
          onSkill={payload => arenaDispatch({ type: "UseSkill", payload })}
          onSpeedChanged={payload =>
            arenaDispatch({ type: "SpeedChanged", payload })
          }
          onToggle={payload =>
            arenaDispatch({ type: "ToggleChampion", payload })
          }
        />
      </div>
    </div>
  );
}
