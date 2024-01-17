import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
      fontFamily: [
        '"Segoe UI Historic"',
        '"Segoe UI"',
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