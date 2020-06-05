import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { ChampionInfo } from "./ChampionInfo";
import { BattleLogEvent } from "../state";
export type BattleLogProps = {
  events: BattleLogEvent[];
};

export function BattleLog({ events = [] }: BattleLogProps) {
  return (
    <ListGroup>
      {events.map(({ info, champ, team, order }) => {
        return (
          <ListGroup.Item key={order}>
            <b>{order}</b>: Champion <ChampionInfo {...{ champ, team }} /> used{" "}
            <span style={{ fontWeight: "bold" }}>{info}</span> skill
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
