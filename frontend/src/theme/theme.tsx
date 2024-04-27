import { PaletteMode } from "@mui/material";
import { blue, blueGrey, grey } from "@mui/material/colors";

const theme = {
  palette: {
    primary: blue,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Palette values for light mode
          primary: blue,
          divider: blueGrey[200],
          background: {
            default: "#fff",
            paper: grey[50],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // Palette values for dark mode
          primary: blue,
          divider: blueGrey[800],
          background: {
            default: blueGrey[900],
            paper: blueGrey[800],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export default theme;

