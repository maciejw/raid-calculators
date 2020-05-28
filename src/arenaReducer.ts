import {
  ArenaState,
  Actions,
  updateTurnMeter,
  orderChampionsByTurnMeter,
  ChampionState,
  TeamSpots,
  Modifier,
  resetTurnMeterAndBuffsDebuffs
} from "./state";

export const initialArenaState: ArenaState = {
  activeBattle: false,
  team1: [
    { speed: 0, turnMeter: 0, skip: false },
    { speed: 0, turnMeter: 0, skip: false },
    { speed: 0, turnMeter: 0, skip: false },
    { speed: 0, turnMeter: 0, skip: false }
  ],
  team2: [
    { speed: 0, turnMeter: 0, skip: false },
    { speed: 0, turnMeter: 0, skip: false },
    { speed: 0, turnMeter: 0, skip: false },
    { speed: 0, turnMeter: 0, skip: false }
  ]
};

export function arenaReducer(state: ArenaState, action: Actions): ArenaState {
  switch (action.type) {
    case "SpeedChanged": {
      const { team, champ, speed } = action.payload;

      const [champ1, champ2, champ3, champ4] = state[team];

      const champs = [champ1, champ2, champ3, champ4];

      champs[champ] = { ...state[team][champ], speed };

      return {
        ...state,
        [team]: champs
      };
    }
    case "ToggleChampion": {
      const { team, champ } = action.payload;
      const skip = !state[team][champ].skip;

      const [champ1, champ2, champ3, champ4] = state[team];

      const champs = [champ1, champ2, champ3, champ4];

      champs[champ] = { ...state[team][champ], skip };

      return {
        ...state,
        [team]: champs
      };
    }
    case "ToggleBattle": {
      return {
        ...state,
        activeBattle: !state.activeBattle
      };
    }
    case "Tick": {
      const newState: ArenaState = {
        ...state,
        team1: updateTurnMeter(state.team1),
        team2: updateTurnMeter(state.team2)
      };
      const orderedChampions = orderChampionsByTurnMeter(newState);
      const { champ, team, turnMeter } = orderedChampions[0];
      if (turnMeter >= 100) {
        newState.turnOwner = { champ, team };
      }
      return newState;
    }
    case "Reset": {
      const newState: ArenaState = {
        ...state,
        team1: resetTurnMeterAndBuffsDebuffs(state.team1),
        team2: resetTurnMeterAndBuffsDebuffs(state.team2)
      };

      return newState;
    }
    case "UseSkill": {
      if (state.turnOwner) {
        const { team, champ } = state.turnOwner;
        const enemyTeam = getOposingTeam(team);
        const newState: ArenaState = {
          ...state,
          turnOwner: undefined
        };
        debugger;
        const { payload } = action;

        newState[team][champ] = { ...newState[team][champ], turnMeter: 0 };

        const allies = updateTurnMeter(
          applyModifiers(newState[team], payload.skill.allyModifiers || [])
        );
        const enemies = updateTurnMeter(
          applyModifiers(
            newState[enemyTeam],
            payload.skill.enemyModifiers || []
          )
        );

        newState[team] = allies;
        newState[enemyTeam] = enemies;

        {
          const orderedChampions = orderChampionsByTurnMeter(newState);
          const { champ, team, turnMeter } = orderedChampions[0];
          if (turnMeter >= 100) {
            newState.turnOwner = { champ, team };
          }
        }

        return newState;
      } else {
        return state;
      }
    }
    default:
      throw new Error("unknown dispatch type");
  }
}

function getOposingTeam(taam: TeamSpots): TeamSpots {
  if (taam === "team1") return "team2";
  return "team1";
}

function applyModifiers(
  champions: [ChampionState, ChampionState, ChampionState, ChampionState],
  modifiers: Modifier[]
): [ChampionState, ChampionState, ChampionState, ChampionState] {
  let [champ1, champ2, champ3, champ4] = champions;

  for (const midifier of modifiers) {
    champ1 = midifier.apply(champ1);
    champ2 = midifier.apply(champ2);
    champ3 = midifier.apply(champ3);
    champ4 = midifier.apply(champ4);
  }
  return [champ1, champ2, champ3, champ4];
}
