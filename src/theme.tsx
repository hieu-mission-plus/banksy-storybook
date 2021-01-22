import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1ea462',
      light: '#29BA74',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6C809D',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
})

export default theme
