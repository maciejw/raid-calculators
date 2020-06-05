import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SpeedCalculator } from "./SpeedCalculator/Components/SpeedCalculator";
import { BattleSimulator } from "./BattleSimulator";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navigation } from "./Navigation";

export default function App(): JSX.Element {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <>
        <Navigation />
        <Switch>
          <Route path="/real-speed-calculator">
            <Container fluid>
              <h1>Real speed calculator</h1>
              <SpeedCalculator />
            </Container>
          </Route>
          <Route path="/battle-simulator">
            <Container fluid>
              <h1>Turn simulator</h1>
              <BattleSimulator />
            </Container>
          </Route>
          <Route path="/">
            <Jumbotron fluid>
              <Container>
                <h1>Welcome</h1>
                <p>
                  This page is aim to be <em>RAID: Shadow Legends</em> speed
                  calculation simulator
                </p>
                <p>You can calculate here real speed of a champion</p>
                <p>You can simulate battle using speed related skills</p>
              </Container>
            </Jumbotron>
          </Route>
        </Switch>
      </>
    </Router>
  );
}
