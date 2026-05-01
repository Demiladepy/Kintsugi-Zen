"use client";

import { useEffect } from "react";

export function AxeDevtools() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    (async () => {
      try {
        const axe = (await import("@axe-core/react")).default;
        const ReactModule = await import("react");
        const ReactDOMModule = await import("react-dom");

        // @axe-core/react mutates the provided objects; ESM namespaces are read-only.
        const React = { ...ReactModule };
        const ReactDOM = { ...ReactDOMModule };
        axe(React as never, ReactDOM as never, 1000);
      } catch {
        // Avoid breaking the page if axe cannot patch the current runtime.
      }
    })();
  }, []);

  return null;
}
