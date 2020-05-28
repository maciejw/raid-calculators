import { arenaReducer, initialArenaState } from "./arenaReducer";

describe("arena reducer", () => {
  test("Tick increments turn meter when champion entered battle", () => {
    const [champ1, champ2, champ3, champ4] = initialArenaState.team1;

    var result = arenaReducer(
      {
        ...initialArenaState,
        team1: [{ ...champ1, speed: 100 }, champ2, champ3, champ4]
      },
      { type: "Tick" }
    );

    expect(result.team1[0].turnMeter).toBeGreaterThan(0);
    expect(result.team1[1].turnMeter).toEqual(0);
    expect(result.team1[2].turnMeter).toEqual(0);
    expect(result.team1[3].turnMeter).toEqual(0);
    expect(result.team2[0].turnMeter).toEqual(0);
    expect(result.team2[1].turnMeter).toEqual(0);
    expect(result.team2[2].turnMeter).toEqual(0);
    expect(result.team2[3].turnMeter).toEqual(0);
  });
});
