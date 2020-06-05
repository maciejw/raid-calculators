import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "react-bootstrap/NavLink";
import { AiFillGithub } from "react-icons/ai";
import { Button } from "react-bootstrap";
export function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/" className="navbar-brand">
        RAID: Shadow Legends simulator
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/battle-simulator">
            Battle simulator
          </Link>
          <Link className="nav-link" to="/real-speed-calculator">
            Real speed calculator
          </Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse id="extra-navbar-nav">
        <Nav>
          <NavLink
            title="Project repository"
            href="https://github.com/maciejw/raid-calculators/"
          >
            <AiFillGithub size="2rem" />
          </NavLink>
          <NavLink
            title="Create issue on github"
            target="_new"
            href="https://github.com/maciejw/raid-calculators/issues/new"
          >
            <Button size="sm">Feedback</Button>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
