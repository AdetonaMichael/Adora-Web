"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // Get actual theme (resolve system preference)
  const getActualTheme = useCallback((): "light" | "dark" => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  }, [theme]);

  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const newActualTheme = getActualTheme();
    setActualTheme(newActualTheme);

    // Apply theme: set both data-theme (compat) and the `dark` class for Tailwind
    if (newActualTheme === "dark") {
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
    } else {
      root.removeAttribute("data-theme");
      root.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme, mounted, getActualTheme]);

  // Listen to system theme changes when in system mode
  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newActualTheme = mediaQuery.matches ? "dark" : "light";
      setActualTheme(newActualTheme);
      if (newActualTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  // Always render the provider so consumers (client components) never run
  // outside of the ThemeContext. We still guard DOM mutations with `mounted`.
  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}