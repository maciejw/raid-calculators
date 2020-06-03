import * as React from "react";
import { useEffect } from "react";

export function Ticker({
  onTick,
  enable = false
}: {
  onTick: () => void;
  enable?: boolean;
}) {
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (enable) {
        onTick();
      }
    }, 200);
    return () => {
      window.clearTimeout(interval);
    };
  });
  return <React.Fragment />;
}
