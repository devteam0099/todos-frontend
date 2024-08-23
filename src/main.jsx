import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import Main from './index.jsx'
import {Provider} from 'react-redux'
import { store } from './hooks/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>
)
