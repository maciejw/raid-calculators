import React from 'react';
import { Button, ButtonGroup, Container, Form, Col, Row, ListGroup, Badge } from 'react-bootstrap';
import { useReducer } from 'react';
import { battleReducer, initialArenaState } from './battleReducer';

import { Ticker } from './Ticker';
import { Champion, ChampionProps } from './Champion';

import {
  ChampionId,
  aoe15TurnMeterFill30SpeedBuff,
  aoe20TurnMeterFill,
  aoe30TurnMeterFill30SpeedBuffEnemy30TurnMeterDecrease,
  aoe30SpeedDebuffEnemy,
  defaultSkill,
  aoe30TurnMeterFill,
  TeamSpots,
  BattleLogEvent,
  ChampionState,
  ChampionGameState,
  sameChampion,
  SkillDefinition,
} from './state';

function ChampionInfo(props: ChampionId) {
  return (
    <>
      <Badge variant={props.team === 'team1' ? 'warning' : 'info'}>
        {props.team} champ{props.champ + 1}
      </Badge>
    </>
  );
}
type BattleLogProps = {
  events: BattleLogEvent[];
};

function BattleLog({ events = [] }: BattleLogProps) {
  return (
    <ListGroup>
      {events.map(({ info, champ, team, order }) => {
        return (
          <ListGroup.Item>
            <b>{order}</b>: Champion <ChampionInfo {...{ champ, team }} /> used{' '}
            <span style={{ fontWeight: 'bold' }}>{info}</span> skill
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
type TeamProps = {
  onSpeedChanged: ChampionProps['onSpeedChanged'];
  activeMember?: ChampionId;
  team: TeamSpots;
  teamMembers: ChampionState[];
  teamMembersGameData: ChampionGameState[];
};
function Team({ onSpeedChanged, activeMember, team, teamMembers, teamMembersGameData }: TeamProps) {
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

  return (
    <Container fluid>
      <Row>
        {indexedTeam.map(({ champ, team, state }) => {
          return (
            <Col sm={6} md={6} lg={3} key={`${team}-${champ}`}>
              <Champion
                {...{ team, champ, state, onSpeedChanged }}
                gameState={getGameData({ team, champ })}
                currentlyActive={isActive({ champ, team })}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export function BattleSimulator() {
  const [arenaState, arenaDispatch] = useReducer(battleReducer, initialArenaState);
  const { turnOwner } = arenaState.game;

  const enabled = turnOwner === undefined && arenaState.activeGame;

  function dispatchUseSkill(skill: SkillDefinition) {
    arenaDispatch({
      type: 'UseSkill',
      payload: {
        skill,
        ...turnOwner!,
      },
    });
  }
  const skills = [
    aoe15TurnMeterFill30SpeedBuff,
    aoe30SpeedDebuffEnemy,
    aoe30TurnMeterFill30SpeedBuffEnemy30TurnMeterDecrease,
    aoe20TurnMeterFill,
    aoe30TurnMeterFill,
  ];
  return (
    <>
      <Ticker enable={enabled} onTick={() => arenaDispatch({ type: 'Tick' })} />

      <h1>Turn Simulator</h1>

      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={9}>
            {!turnOwner && (
              <>
                <h4>Game settings</h4>
                <Container fluid>
                  <Row>
                    <Col>
                      <Form.Check
                        type="switch"
                        inline
                        id="continuous-ticks"
                        label="Emit ticks continuously"
                        onChange={() => arenaDispatch({ type: 'ToggleBattle' })}
                        checked={arenaState.activeGame}
                      />
                      <Button variant="outline-secondary" onClick={() => arenaDispatch({ type: 'Tick' })}>
                        Emit single tick
                      </Button>{' '}
                      <Button variant="outline-secondary" onClick={() => arenaDispatch({ type: 'Reset' })}>
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
            {turnOwner && (
              <>
                <h4>Possible moves: </h4>
                <Container fluid>
                  <Row>
                    <Col>
                      <ButtonGroup vertical>
                        {skills.map((s) => (
                          <Button variant="outline-secondary" onClick={() => dispatchUseSkill(s)}>
                            {s.toString()}
                          </Button>
                        ))}

                        <Button variant="outline-primary" onClick={() => dispatchUseSkill(defaultSkill)}>
                          Make a move using {defaultSkill.toString()} skill not affecting speed
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
            <hr style={{ marginBottom: '40px' }} />

            <h4>
              <Badge variant="warning">Your team</Badge>
            </h4>

            <Team
              activeMember={turnOwner}
              team="team1"
              teamMembers={arenaState.teams.team1}
              teamMembersGameData={arenaState.game.participants}
              onSpeedChanged={(payload) =>
                arenaDispatch({
                  type: 'SpeedChanged',
                  payload,
                })
              }
            />

            <hr style={{ marginBottom: '40px' }} />

            <h4>
              <Badge variant="info">Enemy team</Badge>
            </h4>
            <Team
              activeMember={turnOwner}
              team="team2"
              teamMembers={arenaState.teams.team2}
              teamMembersGameData={arenaState.game.participants}
              onSpeedChanged={(payload) =>
                arenaDispatch({
                  type: 'SpeedChanged',
                  payload,
                })
              }
            />
            <hr style={{ marginBottom: '40px' }} />
          </Col>

          <Col lg={3}>
            {arenaState.battleEvents.length > 0 && (
              <>
                <h4>Battle Log</h4>
                <Container fluid>
                  <Row>
                    <Col>
                      <BattleLog events={arenaState.battleEvents} />
                    </Col>
                  </Row>
                </Container>
                <hr style={{ marginBottom: '40px' }} />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
