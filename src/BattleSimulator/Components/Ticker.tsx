import React from "react";
import { useEffect } from "react";

export function Ticker({
  onTick,
  enable,
  speed,
}: {
  speed: number;
  onTick: () => void;
  enable?: boolean;
}) {
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (enable) {
        onTick();
      }
    }, speed);
    return () => {
      window.clearTimeout(interval);
    };
  });
  return null;
}
