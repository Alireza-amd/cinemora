import { useState, type SetStateAction } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = localStorage.getItem(key);
    if (valueInLocalStorage != null) return JSON.parse(valueInLocalStorage);

    const value =
      typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  });

  function setValue(value: SetStateAction<T>) {
    setState((prevState) => {
      const newState =
        typeof value === "function"
          ? (value as (prevValue: T) => T)(prevState)
          : value;

      localStorage.setItem(key, JSON.stringify(newState));

      return newState;
    });
  }

  return [state, setValue] as const;
}
