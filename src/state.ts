import { getFillRate } from "./turnMeter";

export type BuffDebuff = {
  value: number;
  turns: number;
};

export type ChampionState = {
  speed: number;
  turnMeter: number;
  skip: boolean;
  speedBuff?: BuffDebuff;
  speedDebuff?: BuffDebuff;
};

export type TeamSpots = "team1" | "team2";

export type TeamsState = Record<
  TeamSpots,
  [ChampionState, ChampionState, ChampionState, ChampionState]
>;

export type ArenaState = TeamsState & { turnOwner?: ChampionId } & {
  activeBattle: boolean;
};

export type ChampionId = { champ: ChampionSpots; team: TeamSpots };

export type ChampionSpots = 0 | 1 | 2 | 3;

export interface Modifier {
  apply(champion: ChampionState): ChampionState;
}
export class TurnMeterFill implements Modifier {
  constructor(private amount: number) {}
  apply(champion: ChampionState): ChampionState {
    const { turnMeter, ...rest } = champion;

    return { turnMeter: turnMeter + this.amount, ...rest };
  }
}

export class TurnMeterDecrease implements Modifier {
  constructor(private amount: number) {}
  apply(champion: ChampionState): ChampionState {
    const { turnMeter, ...rest } = champion;

    return { turnMeter: Math.max(0, turnMeter - this.amount), ...rest };
  }
}

export class ApplySpeedBuff implements Modifier {
  constructor(private buff: BuffDebuff) {}
  apply(champion: ChampionState): ChampionState {
    return { ...champion, speedBuff: this.buff };
  }
}

export class ApplySpeedDebuff implements Modifier {
  constructor(private debuff: BuffDebuff) {}
  apply(champion: ChampionState): ChampionState {
    return { ...champion, speedDebuff: this.debuff };
  }
}

export type SkillDefinition = {
  name: string;
  allyModifiers?: Modifier[];
  enemyModifiers?: Modifier[];
};

export const aoe15TurnMeterFill30SpeedBuff: SkillDefinition = {
  name: "aoe15TurnMeterFill30SpeedBuff",
  allyModifiers: [
    new TurnMeterFill(15),
    new ApplySpeedBuff({ value: 30, turns: 2 })
  ]
};

export const aoe20TurnMeterFill: SkillDefinition = {
  name: "aoe20TurnMeterFill",
  allyModifiers: [new TurnMeterFill(20)]
};
export const aoe30TurnMeterFill: SkillDefinition = {
  name: "aoe30TurnMeterFill",
  allyModifiers: [new TurnMeterFill(30)]
};
export const aoe30TurnMeterFill30SpeedBuffEnemy30TurnMeterDecrease: SkillDefinition = {
  name: "aoe30TurnMeterBoost30TurnMeterDeboost30SpeedBuff",
  allyModifiers: [
    new TurnMeterFill(30),
    new ApplySpeedBuff({ value: 30, turns: 2 })
  ],
  enemyModifiers: [new TurnMeterDecrease(30)]
};

export const unknownSkill = {
  name: "unknown"
};
export type SpeedChange = ChampionId & { speed: number };

export type SkillUse = ChampionId & {
  skill: SkillDefinition;
};

export type Actions =
  | {
      type: "SpeedChanged";
      payload: SpeedChange;
    }
  | { type: "ToggleChampion"; payload: ChampionId }
  | { type: "Tick" }
  | { type: "Reset" }
  | { type: "ToggleBattle" }
  | { type: "UseSkill"; payload: SkillUse };

export type Skill = {};

export type SkillMapState = {
  championId: ChampionId;
  skills: ChampionDefinition;
};

export const championDefinitions: ChampionDefinition[] = [
  { name: "Arbiter", activeSkills: [], passiveSkills: [] }
];

export type ChampionDefinition = {
  name: string;
  activeSkills: Skill[];
  passiveSkills: Skill[];
};

export const initilaSkillMappingsState: SkillMapState[] = [
  {
    championId: { champ: 0, team: "team1" },
    skills: championDefinitions[0]
  }
];

type OrderedChampion = ChampionState & {
  champ: ChampionSpots;
  team: TeamSpots;
};

export function orderChampionsByTurnMeter(state: ArenaState) {
  return [
    { champ: 0, team: "team1", ...state.team1[0] },
    { champ: 1, team: "team1", ...state.team1[1] },
    { champ: 2, team: "team1", ...state.team1[2] },
    { champ: 3, team: "team1", ...state.team1[3] },
    { champ: 0, team: "team2", ...state.team2[0] },
    { champ: 1, team: "team2", ...state.team2[1] },
    { champ: 2, team: "team2", ...state.team2[2] },
    { champ: 3, team: "team2", ...state.team2[3] }
  ]
    .filter(c => !c.skip)
    .sort((c1, c2) => c2.turnMeter - c1.turnMeter) as OrderedChampion[];
}

function calculateTurnMeter(champ: ChampionState) {
  if (!champ.skip) {
    return champ.turnMeter + getFillRate(champ.speed);
  } else {
    return champ.turnMeter;
  }
}

export function updateTurnMeter(
  team: [ChampionState, ChampionState, ChampionState, ChampionState]
): [ChampionState, ChampionState, ChampionState, ChampionState] {
  var [champ1, champ2, champ3, champ4] = Array.from(team);

  return [
    { ...champ1, turnMeter: calculateTurnMeter(champ1) },
    { ...champ2, turnMeter: calculateTurnMeter(champ2) },
    { ...champ3, turnMeter: calculateTurnMeter(champ3) },
    { ...champ4, turnMeter: calculateTurnMeter(champ4) }
  ];
}

export function resetTurnMeterAndBuffsDebuffs(
  team: [ChampionState, ChampionState, ChampionState, ChampionState]
): [ChampionState, ChampionState, ChampionState, ChampionState] {
  var [champ1, champ2, champ3, champ4] = Array.from(team);

  return [
    { ...champ1, turnMeter: 0, speedBuff: undefined, speedDebuff: undefined },
    { ...champ2, turnMeter: 0, speedBuff: undefined, speedDebuff: undefined },
    { ...champ3, turnMeter: 0, speedBuff: undefined, speedDebuff: undefined },
    { ...champ4, turnMeter: 0, speedBuff: undefined, speedDebuff: undefined }
  ];
}

export function* championSpots() {
  const championSpots: ChampionSpots[] = [0, 1, 2, 3];
  const teamSpots: TeamSpots[] = ["team1", "team2"];
  for (const champ of championSpots) {
    for (const team of teamSpots) {
      yield { champ, team };
    }
  }
}
