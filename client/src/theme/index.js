import createTheme from '@mui/material/styles/createTheme'

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
    greyColor: '#75777a',
    black: '#050505',
    lightGrey: '#f0f2f5',
    lightGrey2: '#f5f5f5',
    primaryButtonBackground: '#0866FF',
    white: '#fff',
    shadow2: 'rgba(0, 0, 0, 0.2)',
    disabledButtonBackground: '#e4e6eb',
    disabledButtonColor: '#a7a9ab',
    greyBorder: '#ccc',
    error: {
      main: '#ff0000',
      light: '#ffe6e6',
      dark: '#990000',
      100: '#ffe6e6',
      200: '#ffcccc',
      300: '#ffb3b3',
      400: '#ff9999',
      500: '#ff8080',
      600: '#ff6666',
    },
    success: {
      main: '#00cc00',
      light: '#33ff33',
      dark: '#009900',
      100: '#99ff99',
      200: '#80ff80',
      300: '#66ff66',
      400: '#4dff4d',
      500: '#33ff33',
      600: '#1aff1a',
    },
    warning: {
      main: '#ffcc00',
      light: '#ffff33',
      dark: '#b38f00',
      100: '#ffff99',
      200: '#ffff80',
      300: '#ffff66',
      400: '#ffff4d',
      500: '#ffff33',
      600: '#ffff1a',
    },
    primary: {
      main: '#0866FF',
      light: '#e6f0ff',
      dark: '#0047b3',
      100: '#e6f0ff',
      200: '#b3d1ff',
      300: '#80b3ff',
      400: '#4d94ff',
      500: '#1a75ff',
      600: '#0066cc',
    },
    primaryLight: '#e6f0ff',
    primaryDark: '#0047b3',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        color: 'text.base',
      },
    },
  },
})
