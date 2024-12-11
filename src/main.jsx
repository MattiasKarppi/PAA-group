import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CalendarContextProvider from './context/CalendarContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <CalendarContextProvider>
        <App />
      </CalendarContextProvider>
    </HashRouter>
  </StrictMode>,
)
