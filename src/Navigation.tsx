import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">RAID: Shadow Legend calculators</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link className="nav-link" to="/real-speed-calculator">
            Real speed calculator
          </Link>
          <Link className="nav-link" to="/battle-simulator">
            Battle simulator
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
