import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from './components/ui/provider'
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from './Context/chatProvider.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <Provider>
          <App />
        </Provider>
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
)
