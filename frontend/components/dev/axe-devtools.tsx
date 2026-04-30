"use client";

import { useEffect } from "react";

export function AxeDevtools() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    (async () => {
      const axe = await import("@axe-core/react");
      const React = await import("react");
      const ReactDOM = await import("react-dom");
      axe.default(React, ReactDOM, 1000);
    })();
  }, []);

  return null;
}
