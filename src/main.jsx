import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CalendarContextProvider from './context/CalendarContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthContextProvider>
        <CalendarContextProvider>
          <App />
        </CalendarContextProvider>
      </AuthContextProvider>
    </HashRouter>
  </StrictMode>,
)
