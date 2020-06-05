import React from "react";
import Badge from "react-bootstrap/Badge";

import { ChampionId } from "../state";
export function ChampionInfo(props: ChampionId) {
  return (
    <>
      <Badge
        title={props.team}
        variant={props.team === "team1" ? "warning" : "info"}
      >
        Champ {props.champ + 1}
      </Badge>
    </>
  );
}
