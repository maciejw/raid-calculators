import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SpeedCalculator } from "./SpeedCalculator";
import { BattleSimulator } from "./BattleSimulator";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navigation } from "./Navigation";

export default function App() {
  return (
    <Container fluid>
      <Router>
        <>
          <Navigation />
          <Switch>
            <Route path="/real-speed-calculator">
              <SpeedCalculator />
            </Route>
            <Route path="/battle-simulator">
              <BattleSimulator />
            </Route>
            <Route path="/">
              <div>
                <h1>Welcome</h1>
              </div>
            </Route>
          </Switch>
        </>
      </Router>
    </Container>
  );
}
