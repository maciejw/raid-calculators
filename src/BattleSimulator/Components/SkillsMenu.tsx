import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownToggle from "react-bootstrap/DropdownToggle";

import { defaultSkill, SkillDefinition } from "../state";
import { GiHamburgerMenu } from "react-icons/gi";

export type SkillsProps = {
  onSkillUse: (s: SkillDefinition) => void;
  skills: SkillDefinition[];
};

function MenuButton() {
  return (
    <Button size="sm" variant="outline-secondary">
      <GiHamburgerMenu />
    </Button>
  );
}
export function SkillsMenu({ skills, onSkillUse }: SkillsProps) {
  return (
    <Dropdown style={{ float: "right" }}>
      <Dropdown.Toggle id="skills" size="sm" style={{ lineHeight: 1 }} />
      <Dropdown.Menu>
        <Dropdown.Header>Speed related skills</Dropdown.Header>
        {skills.map((s, i) => (
          <Dropdown.Item key={i} onClick={() => onSkillUse(s)}>
            {s.toString()}
          </Dropdown.Item>
        ))}
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => onSkillUse(defaultSkill)}>
          Make a move using {defaultSkill.toString()} skill not affecting speed
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
