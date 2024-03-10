//libs
import { ThemeProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import { theme } from './theme'
//routes
import { App } from './views/routes/Routes'
//styles
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
//redux
import { store } from './store'
import { Provider } from 'react-redux'
//configs
import '../src/lib/firebase/firebaseConfig'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>,
)
  ;