import React from 'react';
import { Card, Form, Row, Col, Badge } from 'react-bootstrap';
import { ChampionState, ChampionId, SpeedChange, BuffDebuff, ChampionGameState } from './state';
import { ProgressBar } from './ProgressBar';

function toFloat(str: string) {
  return parseFloat(str) || 0;
}

export type ChampionProps = {
  state: ChampionState;
  gameState?: ChampionGameState;
  currentlyActive: boolean;
  onSpeedChanged: (args: SpeedChange) => void;
} & ChampionId;

function BuffsDebuffsInfo(
  props: { info: BuffDebuff[] } & {
    type: 'buff' | 'debuff';
  }
) {
  return (
    <>
      {props.info.map((i) => (
        <>
          <Badge variant={props.type === 'buff' ? 'primary' : 'danger'}>
            {i.name} {i.value}% turns {i.turns}
          </Badge>{' '}
        </>
      ))}
    </>
  );
}

export function Champion({ champ, team, state, gameState, currentlyActive, onSpeedChanged }: ChampionProps) {
  const championId = { champ, team };
  return (
    <Card bg="light" border={currentlyActive ? 'primary' : undefined} style={{ marginBottom: '20px' }}>
      <Card.Header>
        {team} champ{champ + 1}
      </Card.Header>
      <Card.Body>
        {gameState && (
          <Card.Title>
            <ProgressBar filled={gameState.turnMeter} />
          </Card.Title>
        )}
        <Card.Text as="div">
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="6">
                Speed
              </Form.Label>
              <Col>
                <Form.Control
                  value={state.speed}
                  onChange={(e) =>
                    onSpeedChanged({
                      ...championId,
                      speed: toFloat(e.target.value),
                    })
                  }
                />
              </Col>
            </Form.Group>
            {gameState && (
              <>
                <BuffsDebuffsInfo type="buff" info={gameState.buffs} />
                <BuffsDebuffsInfo type="debuff" info={gameState.deBuffs} />
              </>
            )}
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
