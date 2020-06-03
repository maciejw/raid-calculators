import * as React from "react";
import { numberRoundDecimal } from "../SpeedCalculator/speed";

export function ProgressBar({ filled = 0 }) {
  const progressStyle: React.CSSProperties = {
    width: `${Math.min(filled, 100)}%`
  };
  return (
    <div className="ProgressBar">
      <div className="Progress" style={progressStyle}>
        {numberRoundDecimal(filled, 2)}%
      </div>
    </div>
  );
}
