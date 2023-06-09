import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'normalize.css'

import AuthRoute from '@/router/AuthRoute'
import '@/assets/css/index.less'
import './index.css'

import App from '@/App'
import { store, persistor } from '@/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter>
        <AuthRoute>
          <App />
        </AuthRoute>
      </HashRouter>
    </PersistGate>
  </Provider>
)
