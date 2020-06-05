import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Champion, ChampionProps } from "./Champion";
import {
  ChampionId,
  ChampionState,
  ChampionGameState,
  TeamSpots,
  sameChampion,
} from "../state";

import { SkillsProps } from "./SkillsMenu";

export type TeamProps = {
  onSpeedChanged: ChampionProps["onSpeedChanged"];
  onSkillUse: SkillsProps["onSkillUse"];
  activeMember?: ChampionId;
  team: TeamSpots;
  teamMembers: ChampionState[];
  teamMembersGameData: ChampionGameState[];
};

export function Team({
  onSkillUse,
  onSpeedChanged,
  activeMember,
  team,
  teamMembers,
  teamMembersGameData,
}: TeamProps) {
  const indexedTeam = teamMembers.map((state, champ) => ({
    team,
    champ,
    state,
  }));

  function isActive(championId: ChampionId) {
    return (activeMember && sameChampion(activeMember, championId)) || false;
  }

  function getGameData(id: ChampionId) {
    return teamMembersGameData.find((m) => sameChampion(id, m));
  }
  let members = indexedTeam;
  if (team === "team2") {
    members = members.reverse();
  }

  return (
    <Container fluid>
      <Row>
        {members.map(({ champ, team, state }) => {
          return (
            <React.Fragment key={`${team}-${champ}`}>
              <Col sm="12" md="6" lg="auto" style={{ margin: "auto" }}>
                <Champion
                  {...{ team, champ, state, onSpeedChanged, onSkillUse }}
                  gameState={getGameData({ team, champ })}
                  currentlyActive={isActive({ champ, team })}
                />
              </Col>
            </React.Fragment>
          );
        })}
      </Row>
    </Container>
  );
}
