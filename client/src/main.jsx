import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './views/routes/Routes'
import './index.scss'
import {store} from './store'
import {Provider} from 'react-redux'
import {ThemeProvider} from '@mui/material'
import {theme} from './theme'
import '../src/lib/firebase/firebaseConfig'
import {API_URL} from "./api/index.js";
import {StompSessionProvider} from "react-stomp-hooks";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <StompSessionProvider url={`${API_URL}/ws`}
                                      connectHeaders={{"Authorization": `Bearer ${localStorage.getItem("access")}`}}
                                      disconnectHeaders={{"DiscconnectedH": `Bearer ${localStorage.getItem("access")}`}}>
                    <App/>
                </StompSessionProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)
