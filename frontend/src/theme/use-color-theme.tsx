import { createTheme, PaletteMode } from "@mui/material";
import React from "react";
import { getDesignTokens } from "./theme.tsx";

export const useColorTheme = () => {
  
  // can manually change to dark mode here
  const [mode, setMode] = React.useState<PaletteMode>("light");

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  // exporting the theme to ThemeContextProvider
  const modifiedTheme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
