import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export function useAuth() {
  const value = useContext(AuthContext);

  if (value == null)
    throw new Error("useAuth must be used between AuthProvider.");

  return value;
}
