import React from "react";
export type FieldProps = {
  controlId: string;
  label: string;
  onInput: React.FormEventHandler<HTMLInputElement>;
};
