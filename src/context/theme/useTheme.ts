import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export function useTheme() {
  const value = useContext(ThemeContext);

  if (value == null)
    throw new Error("use Theme must be used between ThemeProvider.");

  return value;
}
