import * as React from "react";

export function ProgressBar({ filled = 0 }) {
  const proggressStyle: React.CSSProperties = {
    width: `${filled}%`
  };
  return (
    <div className="ProgressBar">
      <div className="Progress" style={proggressStyle}>
        {filled}%
      </div>
    </div>
  );
}
