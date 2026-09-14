"use client";
import { useEffect, useRef } from "react";
export default function ThemePicker() {
  const select = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    if (select.current) select.current.value = root.dataset.theme || "auto";
    const sync = () => {
      root.dataset.resolvedTheme =
        (root.dataset.theme || "auto") === "auto"
          ? media.matches
            ? "dark"
            : "light"
          : root.dataset.theme;
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return (
    <label className="theme-picker">
      <span>Appearance</span>
      <select
        ref={select}
        defaultValue="auto"
        onChange={(e) => {
          const value = e.target.value;
          const root = document.documentElement;
          root.dataset.theme = value;
          root.dataset.resolvedTheme =
            value === "auto"
              ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
              : value;
          try {
            localStorage.setItem("vc-theme", value);
          } catch {}
        }}
        aria-label="Color theme"
      >
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
