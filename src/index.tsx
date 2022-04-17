import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles'

import App from './components/App'
import Firebase, { FirebaseContext } from './components/Firebase'

const theme: Theme = createMuiTheme({
  typography: {
    fontFamily: "'Space Grotesk', sans-serif",
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <FirebaseContext.Provider value={new Firebase()}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </FirebaseContext.Provider>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
