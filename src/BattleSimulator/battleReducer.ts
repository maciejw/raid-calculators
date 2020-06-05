import {
  BattleState,
  Actions,
  updateTurnMeter,
  TeamSpots,
  Modifier,
  resetTurnMeterAndBuffsDeBuffs,
  fillChampionSpots,
  ChampionGameState,
  sameChampion,
  sameChampionOrTeam,
  ChampionFilterCriteria,
  BuffDebuff,
  GameSettings,
} from "./state";
import { sortingSpecification } from "./compare";

export function initialBattleState({
  teamCounts = { team1: 5, team2: 5 },
  simulationSpeed = 300,
}: Partial<GameSettings>): BattleState {
  return {
    isGameLoopRunning: false,
    battleEvents: [],
    game: {
      participants: [],
    },
    teams: {
      team1: fillChampionSpots(teamCounts.team1),
      team2: fillChampionSpots(teamCounts.team2),
    },
    gameSettings: { teamCounts, simulationSpeed },
  };
}

function modifyParticipants(
  participants: ChampionGameState[],
  filteringCriteria: ChampionFilterCriteria,
  modify: (participant: ChampionGameState) => ChampionGameState
) {
  return [
    ...participants.filter((p) => !sameChampionOrTeam(filteringCriteria, p)),
    ...participants
      .filter((p) => sameChampionOrTeam(filteringCriteria, p))
      .map(modify),
  ];
}

const newParticipantDefaults: ChampionGameState = {
  champ: 0,
  team: "team1",
  speed: 0,
  turnMeter: 0,
  buffs: [],
  deBuffs: [],
};

export function battleReducer(
  state: BattleState,
  action: Actions
): BattleState {
  switch (action.type) {
    case "SpeedChanged": {
      const { team, champ, speed } = action.payload;

      const otherParticipants = state.game.participants.filter(
        (p) => !sameChampion(p, { team, champ })
      );

      let currentParticipant = state.game.participants.find((p) =>
        sameChampion(p, { team, champ })
      );

      if (currentParticipant === undefined) {
        currentParticipant = {
          ...newParticipantDefaults,
          team,
          champ,
        };
      }

      const newState: BattleState = {
        ...state,
        game: {
          ...state.game,
          participants: [...otherParticipants, currentParticipant],
        },
        teams: {
          ...state.teams,
          [team]: [...state.teams[team]],
        },
      };

      newState.teams[team][champ] = { ...state.teams[team][champ], speed };

      newState.game.participants = modifyParticipants(
        newState.game.participants,
        { team, champ },
        (participant) => ({ ...participant, speed })
      );

      return newState;
    }
    case "ToggleBattle": {
      return {
        ...state,
        isGameLoopRunning: !state.isGameLoopRunning,
      };
    }
    case "Tick": {
      if (state.game.participants.length > 0) {
        const newState: BattleState = {
          ...state,
          game: {
            ...state.game,
            participants: updateTurnMeter(state.game.participants),
          },
        };
        const orderedChampions = newState.game.participants.sort(
          sortingSpecification(
            ["turnMeter", "desc"],
            ["team"],
            ["speed", "desc"],
            ["champ"]
          )
        );

        const activeChampion = orderedChampions[0];

        const { champ, team, turnMeter } = activeChampion;
        if (turnMeter >= 100) {
          newState.game.turnOwner = { champ, team };
        }

        return newState;
      }
      return state;
    }
    case "Reset": {
      const newState: BattleState = {
        ...state,
        battleEvents: [],
        game: {
          ...state.game,
          participants: resetTurnMeterAndBuffsDeBuffs(state.game.participants),
        },
      };

      return newState;
    }
    case "UseSkill": {
      if (state.game.turnOwner) {
        const { team, champ } = state.game.turnOwner;
        const opposingTeam = getOpposingTeam(team);
        const { payload } = action;

        let participants = modifyParticipants(
          state.game.participants,
          { team, champ },
          (participant) => {
            const newParticipant = { ...participant, turnMeter: 0 };

            newParticipant.buffs = decrementBuffsDeBuffs(newParticipant.buffs);
            newParticipant.deBuffs = decrementBuffsDeBuffs(
              newParticipant.deBuffs
            );

            return newParticipant;
          }
        );

        participants = modifyParticipants(
          participants,
          { team },
          (participant) =>
            applyModifiers(participant, payload.skill.currentTeamModifiers)
        );

        participants = modifyParticipants(
          participants,
          { team: opposingTeam },
          (participant) =>
            applyModifiers(participant, payload.skill.opposingTeamModifiers)
        );

        const newState: BattleState = {
          ...state,
          battleEvents: [
            ...state.battleEvents,
            {
              champ,
              team,
              info: payload.skill.toString(),
              order: state.battleEvents.length + 1,
            },
          ],
          game: {
            ...state.game,
            participants,
            turnOwner: undefined,
          },
        };

        return newState;
      } else {
        return state;
      }
    }
    case "UpdateTeamCount": {
      const newState: BattleState = {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          teamCounts: {
            ...state.gameSettings.teamCounts,
            [action.payload.setting]: action.payload.value,
          },
        },
      };
      return updateTeamCount(newState, action.payload.setting);
    }
    case "UpdateSimulationSpeedSettings": {
      return {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          simulationSpeed: action.payload,
        },
      };
    }
  }
  assertUnreachable(action);
}

function updateTeamCount(state: BattleState, team: TeamSpots): BattleState {
  return {
    ...state,
    teams: {
      ...state.teams,
      [team]: fillChampionSpots(state.gameSettings.teamCounts[team]),
    },
    game: {
      participants: [...state.game.participants.filter((p) => p.team !== team)],
    },
  };
}

function assertUnreachable(x: never): never {
  throw new Error("Unreachable code");
}

function decrementBuffsDeBuffs(buffsDeBuffs: BuffDebuff[]) {
  return buffsDeBuffs
    .map((b) => ({ ...b, turns: --b.turns }))
    .filter((b) => b.turns > 0);
}

function getOpposingTeam(team: TeamSpots): TeamSpots {
  if (team === "team1") return "team2";
  return "team1";
}

function applyModifiers(participant: ChampionGameState, modifiers: Modifier[]) {
  let result = participant;
  for (const modifier of modifiers) {
    result = modifier.apply(participant);
  }
  return result;
}
