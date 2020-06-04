import { battleReducer, initialBattleState } from "./battleReducer";
import { Actions } from "./state";

function speedChangedForTeam1Champ0Speed100(): Actions {
  return {
    type: "SpeedChanged",
    payload: { champ: 0, team: "team1", speed: 100 },
  };
}

describe("Battle reducer", () => {
  it("Should with each tick increment turn meter when champion is in battle", () => {
    var state = battleReducer(
      initialBattleState,
      speedChangedForTeam1Champ0Speed100()
    );
    const expectedState: typeof state = {
      isGameLoopRunning: false,
      battleEvents: [],
      game: {
        participants: [
          {
            champ: 0,
            team: "team1",
            buffs: [],
            deBuffs: [],
            turnMeter: 0,
            speed: 100,
          },
        ],
      },
      teams: {
        team1: [{ speed: 100 }, {}, {}, {}, {}],
        team2: [{}],
      },
    };
    expect(state).toMatchObject(expectedState);
  });
});
