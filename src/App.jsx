import Header from './components/Header/Header.jsx'
import { Routes, Route } from 'react-router-dom'
import CalendarPage from './pages/Calendar/CalendarPage.jsx'

function App() {

  return (
    <>
      <Header />
      <main>
        {/* Router here */}

        {/* test */}
        <CalendarPage />
      </main>
    </>
  )
}

export default App
