import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import store from './redux/store'
import {BrowserRouter as Router} from 'react-router-dom'
import {SnackbarProvider} from 'notistack'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
      <Router>
        <App />
      </Router>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,

)
