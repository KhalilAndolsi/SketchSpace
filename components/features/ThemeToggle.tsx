"use client";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const {setTheme, resolvedTheme} = useTheme();
  return (
    <button type="button" onClick={() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }}>
      <Sun size={16} className="dark:block hidden" />
      <Moon size={16} className="dark:hidden block" />
    </button>
  );
}
