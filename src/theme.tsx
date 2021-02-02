import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#29BA74',
      main: '#1DA462',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6C809D',
    },
    grey: {
      '100': '#F1F5F9',
      '400': '#94A3B8',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
})

export default theme
