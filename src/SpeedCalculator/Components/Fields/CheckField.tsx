import React from "react";
import Form from "react-bootstrap/Form";
import { FieldProps } from "./FieldProps";
export function CheckField({
  controlId,
  label,
  checked,
  onInput: onChange,
}: FieldProps & { checked: boolean }) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Check
        type="checkbox"
        inline
        checked={checked}
        onChange={onChange}
      />
      <Form.Label>{label}</Form.Label>
    </Form.Group>
  );
}
