import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './views/routes/Routes'
import './index.scss'
import { store } from './store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import '../src/lib/firebase/firebaseConfig'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
