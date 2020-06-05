import React from "react";
import Form from "react-bootstrap/Form";
import { FieldProps } from "./FieldProps";
export function TextField({
  controlId,
  label,
  value,
  onInput,
}: FieldProps & { value: React.ComponentProps<typeof Form.Control>["value"] }) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="textbox" value={value} onInput={onInput} />
    </Form.Group>
  );
}
