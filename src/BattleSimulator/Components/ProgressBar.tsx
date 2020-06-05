import React from "react";
import BootstrapProgressBar from "react-bootstrap/ProgressBar";
import { numberRoundDecimal } from "../../internal-contracts";

export function ProgressBar({ now = 0 }) {
  return (
    <BootstrapProgressBar
      variant="success"
      now={now}
      label={<>{numberRoundDecimal(now, 2)} %</>}
    />
  );
}
