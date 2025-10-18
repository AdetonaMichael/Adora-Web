"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" && <Sun size={20} />}
        {theme === "dark" && <Moon size={20} />}
        {theme === "system" && <Monitor size={20} />}
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value as "light" | "dark" | "system");
                  setShowMenu(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  theme === t.value ? "text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                <t.icon size={16} />
                <span className="text-sm">{t.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}