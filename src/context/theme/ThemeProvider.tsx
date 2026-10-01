import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useLayoutEffect, type ReactNode } from "react";

const LOCAL_STORAGE_THEME_KEY = "THEME";
const themeModes = ["system", "dark", "light"] as const;
type ThemeModes = (typeof themeModes)[number];

type ThemeContextType = {
  isDark: boolean;
  theme: ThemeModes;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<ThemeModes>(
    LOCAL_STORAGE_THEME_KEY,
    "system",
  );
  const isDark =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
