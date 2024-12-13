import Header from './components/Header/Header.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/HomePage.jsx'
import CalendarPage from './pages/Calendar/CalendarPage.jsx'
import RoutinesPage from './pages/Routines/RoutinesPage.jsx'

function App() {

  return (
    <>
      <Header />
      <main>
        {/* Router here */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/calendar" element={<CalendarPage />}/>
          <Route path="/routines" element={<RoutinesPage />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
