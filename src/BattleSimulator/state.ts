import { getFillRate } from "./turnMeter";
import { sortingSpecification } from "./compare";

export type BuffDebuffState = {
  value: number;
  turns: number;
};
export type BuffDebuffInfo = { name: string };

export type BuffDebuff = BuffDebuffState & BuffDebuffInfo;

export type ChampionGameState = {
  speed: number;
  turnMeter: number;
  buffs: BuffDebuff[];
  deBuffs: BuffDebuff[];
} & ChampionId;
export type ChampionState = {
  speed?: number;
  championName?: string;
};

export type TeamSpots = "team1" | "team2";

export type TeamsState = Record<TeamSpots, ChampionState[]>;
export type GameState = { participants: ChampionGameState[] } & {
  turnOwner?: ChampionId;
};

export type BattleLogEvent = {
  info: string;
  order: number;
} & ChampionId;

export type BattleState = { battleEvents: BattleLogEvent[] } & {
  teams: TeamsState;
} & { game: GameState } & {
  isGameLoopRunning: boolean;
};

export type ChampionId = { champ: number; team: TeamSpots };

export function sameChampion(one: ChampionId, another: ChampionId) {
  return another.champ === one.champ && another.team === one.team;
}
export type ChampionFilterCriteria = {
  champ?: number | "none";
  team: TeamSpots;
};

export function sameChampionOrTeam(
  { team, champ = "none" }: ChampionFilterCriteria,
  filteredChampion: ChampionId
) {
  return (
    (champ !== "none" &&
      filteredChampion.champ === champ &&
      filteredChampion.team === team) ||
    (champ === "none" && filteredChampion.team === team)
  );
}

export type ChampionSpots = number;

export interface Modifier {
  apply(champion: ChampionGameState): ChampionGameState;
  toString(): string;
}
export class TurnMeterFill implements Modifier {
  amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  apply(champion: ChampionGameState): ChampionGameState {
    const { turnMeter, ...rest } = champion;

    return { turnMeter: turnMeter + this.amount, ...rest };
  }
  toString() {
    return `fills TM ${this.amount}%`;
  }
}

export class TurnMeterDeplete implements Modifier {
  amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  apply(champion: ChampionGameState): ChampionGameState {
    const { turnMeter, ...rest } = champion;

    return { turnMeter: Math.max(0, turnMeter - this.amount), ...rest };
  }
  toString() {
    return `depletes TM ${this.amount}%`;
  }
}

function replaceBuffDebuff(buffsDebuffs: BuffDebuff[], buffDebuff: BuffDebuff) {
  const rest = buffsDebuffs.filter(
    (bd) => bd.name !== buffDebuff.name && bd.value !== buffDebuff.value
  );

  return [...rest, { ...buffDebuff }];
}
export class ApplySpeedBuff implements Modifier {
  static buffName = "speed buff";
  buff: BuffDebuff;
  constructor(buff: BuffDebuffState) {
    this.buff = { ...buff, name: ApplySpeedBuff.buffName };
  }
  apply(champion: ChampionGameState): ChampionGameState {
    return { ...champion, buffs: replaceBuffDebuff(champion.buffs, this.buff) };
  }
  toString() {
    return `${this.buff.name} ${this.buff.value}% for ${this.buff.turns} turn(s)`;
  }
}

export class ApplySpeedDeBuff implements Modifier {
  static deBuffName = "speed debuff";
  deBuff: BuffDebuff;
  constructor(debuff: BuffDebuffState) {
    this.deBuff = { ...debuff, name: ApplySpeedDeBuff.deBuffName };
  }
  apply(champion: ChampionGameState): ChampionGameState {
    return { ...champion, deBuffs: [...champion.deBuffs, this.deBuff] };
  }
  toString() {
    return `${this.deBuff.name} ${this.deBuff.value}% for ${this.deBuff.turns} turn(s)`;
  }
}
export class SkillDefinition {
  currentTeamModifiers: Modifier[];
  opposingTeamModifiers: Modifier[];
  constructor({
    teamModifiers = [],
    opposingTeamModifiers = [],
  }: SkillDefinitionParams) {
    this.currentTeamModifiers = teamModifiers;
    this.opposingTeamModifiers = opposingTeamModifiers;
  }

  toString() {
    const result: string[] = [];

    if (this.currentTeamModifiers.length > 0) {
      result.push(
        `Allies: ${this.currentTeamModifiers.map((s) => s.toString()).join(", ")}`
      );
    }
    if (this.opposingTeamModifiers.length > 0) {
      result.push(
        `Enemies: ${this.opposingTeamModifiers
          .map((s) => s.toString())
          .join(", ")}`
      );
    }
    if (result.length === 0) {
      return "Default";
    }
    return result.join(". ");
  }
}
export type SkillDefinitionParams = {
  teamModifiers?: Modifier[];
  opposingTeamModifiers?: Modifier[];
};

export const aoe15TurnMeterFill30SpeedBuff = new SkillDefinition({
  teamModifiers: [
    new TurnMeterFill(15),
    new ApplySpeedBuff({ value: 30, turns: 2 }),
  ],
});

export const aoe20TurnMeterFill = new SkillDefinition({
  teamModifiers: [new TurnMeterFill(20)],
});
export const aoe30TurnMeterFill = new SkillDefinition({
  teamModifiers: [new TurnMeterFill(30)],
});
export const aoe30TurnMeterFill30SpeedBuffEnemy30TurnMeterDecrease = new SkillDefinition(
  {
    teamModifiers: [
      new TurnMeterFill(30),
      new ApplySpeedBuff({ value: 30, turns: 2 }),
    ],
    opposingTeamModifiers: [new TurnMeterDeplete(30)],
  }
);

export const aoe30SpeedDebuffEnemy = new SkillDefinition({
  opposingTeamModifiers: [new ApplySpeedDeBuff({ value: 30, turns: 2 })],
});

export const defaultSkill = new SkillDefinition({});

export type SpeedChange = ChampionId & { speed: number };

export type SkillUse = ChampionId & {
  skill: SkillDefinition;
};

export type Actions =
  | { type: "SpeedChanged"; payload: SpeedChange }
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
  { name: "Arbiter", activeSkills: [], passiveSkills: [] },
];

export type ChampionDefinition = {
  name: string;
  activeSkills: Skill[];
  passiveSkills: Skill[];
};

export const initialSkillMappingsState: SkillMapState[] = [
  {
    championId: { champ: 0, team: "team1" },
    skills: championDefinitions[0],
  },
];

function calculateTurnMeter(champ: ChampionGameState) {
  let multiplier = 1;

  const speedBuff = champ.buffs.find((b) => b.name === ApplySpeedBuff.buffName);
  if (speedBuff) {
    multiplier = multiplier * (speedBuff.value / 100 + 1);
  }
  const speedDeBuff = champ.deBuffs.find(
    (b) => b.name === ApplySpeedDeBuff.deBuffName
  );
  if (speedDeBuff) {
    multiplier = multiplier / (speedDeBuff.value / 100 + 1);
  }

  return champ.turnMeter + getFillRate(champ.speed * multiplier);
}

export function updateTurnMeter(
  participants: ChampionGameState[]
): ChampionGameState[] {
  return participants.map((participants) => ({
    ...participants,
    turnMeter: calculateTurnMeter(participants),
  }));
}

export function resetTurnMeterAndBuffsDeBuffs(
  participants: ChampionGameState[]
): ChampionGameState[] {
  const newParticipants = [...participants];

  return newParticipants.map((newParticipant) => ({
    ...newParticipant,
    turnMeter: 0,
    speedBuff: [],
    speedDebuff: [],
  }));
}

export function fillChampionSpots(
  team1PlayersCount: number,
  team2PlayersCount: number
) {
  return {
    team1: Array.from(Array(team1PlayersCount), () => ({})),
    team2: Array.from(Array(team2PlayersCount), () => ({})),
  };
}
