import React from "react";

import Badge from "react-bootstrap/Badge";
import { BuffDebuff } from "../state";
export function ChampionBuffsDebuffsInfo(
  props: { info: BuffDebuff[] } & {
    type: "buff" | "debuff";
  }
) {
  return (
    <>
      {props.info.map((i, idx) => (
        <React.Fragment key={`${i.name}-${i.value}-${idx}`}>
          <Badge variant={props.type === "buff" ? "primary" : "danger"}>
            {i.name} {i.value}% turns {i.turns}
          </Badge>{" "}
        </React.Fragment>
      ))}
    </>
  );
}
