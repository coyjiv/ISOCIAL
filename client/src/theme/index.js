import { createTheme } from '@mui/material'

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
    wash: '#F0F2F5',
    black: '#050505',
    lightGrey: '#f0f2f5',
    primaryButtonBackground: '#0866FF',
    white: '#fff',
    shadow2: 'rgba(0, 0, 0, 0.2)',
    text: {
      base: '#1c1e21',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: 'text.base',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
  },
})
