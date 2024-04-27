import { createTheme, Theme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { useColorTheme } from "./use-color-theme.tsx";
import React from "react";

type ThemeContextType = {
  mode: string;
  toggleColorMode: () => void;
  theme: Theme;
};

// using state and theme that listen to state changes in use-color-theme.tsx
export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  // shorthand way to define an anonymous function
  toggleColorMode: () => {},
  theme: createTheme(),
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// passing toggleColorMode function that toggle darkMode state
// passing theme for App.js to call in ThemeProvider 
// passing the current state of mode for Component to use
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
