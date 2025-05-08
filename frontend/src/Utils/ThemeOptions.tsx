import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          color: "#000000",
          fontWeight: "400",
          fontSize: "1rem",
          lineHeight: "1.5",
          padding: 0,
          ":focus": {
            outline: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ":focus": {
            outline: "none",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#000000",
        },
      },
    },
  },
});
