"use client";

import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border p-2 transition hover:scale-105"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FaSun className="text-xl text-yellow-400" />
      ) : (
        <FaMoon className="text-xl" />
      )}
    </button>
  );
}