import React, { useReducer } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import { battleReducer, initialBattleState } from "../battleReducer";
import { SkillDefinition } from "../state";
import { Ticker } from "./Ticker";
import { Team } from "./Team";
import { BattleLog } from "./BattleLog";
import { toInt } from "../../internal-contracts";

export function BattleSimulator() {
  const [battleState, battleDispatch] = useReducer(
    battleReducer,
    initialBattleState({ teamCounts: { team1: 5, team2: 5 } })
  );
  const { turnOwner } = battleState.game;

  const enabled = turnOwner === undefined && battleState.isGameLoopRunning;

  function dispatchUseSkill(skill: SkillDefinition) {
    battleDispatch({
      type: "UseSkill",
      payload: {
        skill,
        ...turnOwner!,
      },
    });
  }
  const cardStyle = { marginBottom: "0.5rem" };
  return (
    <>
      <Ticker
        speed={battleState.gameSettings.simulationSpeed}
        enable={enabled}
        onTick={() => battleDispatch({ type: "Tick" })}
      />

      <Container fluid>
        <Row>
          <Col sm="12" md="12" lg="9">
            <Card style={cardStyle}>
              <Card.Body>
                <Team
                  onSkillUse={(s) => dispatchUseSkill(s)}
                  activeMember={turnOwner}
                  team="team2"
                  teamMembers={battleState.teams.team2}
                  teamMembersGameData={battleState.game.participants}
                  onSpeedChanged={(payload) =>
                    battleDispatch({
                      type: "SpeedChanged",
                      payload,
                    })
                  }
                />
              </Card.Body>
              <Card.Footer>
                <h4>
                  <Badge variant="info" style={{ width: "100%" }}>
                    Enemy team
                  </Badge>
                </h4>
              </Card.Footer>
            </Card>
            <Card style={cardStyle}>
              <Card.Header>
                <h4>
                  <Badge variant="warning" style={{ width: "100%" }}>
                    Your team
                  </Badge>
                </h4>
              </Card.Header>
              <Card.Body>
                <Team
                  onSkillUse={(s) => dispatchUseSkill(s)}
                  activeMember={turnOwner}
                  team="team1"
                  teamMembers={battleState.teams.team1}
                  teamMembersGameData={battleState.game.participants}
                  onSpeedChanged={(payload) =>
                    battleDispatch({
                      type: "SpeedChanged",
                      payload,
                    })
                  }
                />
              </Card.Body>
            </Card>
            <Card body style={cardStyle}>
              <h4>Simulation settings</h4>
              <Container fluid>
                <Row>
                  <Col sm="12" md="6" lg="6" style={{ margin: "0.5rem auto" }}>
                    <Form.Group>
                      <Form.Label>
                        <Badge variant="info">Enemy team member count</Badge>
                      </Form.Label>
                      <Form.Control
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={battleState.gameSettings.teamCounts.team2}
                        onChange={(e) =>
                          battleDispatch({
                            type: "UpdateTeamCount",
                            payload: {
                              setting: "team2",
                              value: toInt(e.target.value) % 6,
                            },
                          })
                        }
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm="12" md="6" lg="6" style={{ margin: "0.5rem auto" }}>
                    <Form.Group>
                      <Form.Label>
                        <Badge variant="warning">Your team member count</Badge>
                      </Form.Label>
                      <Form.Control
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={battleState.gameSettings.teamCounts.team1}
                        onChange={(e) =>
                          battleDispatch({
                            type: "UpdateTeamCount",
                            payload: {
                              setting: "team1",
                              value: toInt(e.target.value) % 6,
                            },
                          })
                        }
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="simulation-speed">
                      <Form.Label>Simulation speed</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          battleDispatch({
                            type: "UpdateSimulationSpeedSettings",
                            payload: toInt(e.target.value),
                          })
                        }
                        title={`Current value ${battleState.gameSettings.simulationSpeed}ms`}
                        type="range"
                        value={battleState.gameSettings.simulationSpeed}
                        min={100}
                        max={1000}
                        step={50}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ButtonGroup>
                      <Button
                        variant="outline-secondary"
                        onClick={() => battleDispatch({ type: "Tick" })}
                      >
                        Emit single tick
                      </Button>{" "}
                      <ToggleButtonGroup
                        type="checkbox"
                        onChange={() =>
                          battleDispatch({ type: "ToggleBattle" })
                        }
                        value={[
                          battleState.isGameLoopRunning ? true : undefined,
                        ]}
                      >
                        <ToggleButton value={true} variant="outline-secondary">
                          Emit ticks continuously
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <Button
                        variant="outline-secondary"
                        onClick={() => battleDispatch({ type: "Reset" })}
                      >
                        Reset turn meters and buffs/debuffs
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Container>
            </Card>
          </Col>
          <Col lg="3">
            {battleState.battleEvents.length > 0 && (
              <>
                <h4>Battle Log</h4>
                <Container fluid>
                  <Row>
                    <Col>
                      <BattleLog events={battleState.battleEvents} />
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
