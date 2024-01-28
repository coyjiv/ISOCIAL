import { createTheme } from "@mui/material";

// keep palette in sync with colors.scss

export const theme = createTheme({
    typography: {
      fontFamily: [
        '"Segoe UI"',
        '"Segoe UI Historic"',
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      wash: "#F0F2F5",
      grey: "#75777a",
      black: "#050505",
      lightGrey: "#f0f2f5",
      lightGrey2: "#f5f5f5",
      primaryButtonBackground: "#0866FF",
      white: "#fff",
      shadow2: "rgba(0, 0, 0, 0.2)",
      disabledButtonBackground: "#e4e6eb",
      disabledButtonColor: "#a7a9ab",
      greyBorder: "#ccc",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
          },
        },
      },
    },
    
  });