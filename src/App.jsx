import Header from './components/Header/Header.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/HomePage.jsx'
import CalendarPage from './pages/Calendar/CalendarPage.jsx'
import Tasks from './pages/Tasks/Tasks.jsx'
import EditTaskPage from './pages/Tasks/EditTaskPage.jsx'
import { useState, useEffect } from 'react'
import RoutinesPage from './pages/Routines/RoutinesPage.jsx'

// import { useAuthContext } from './context/AuthContext.jsx'

function App() {

  // const auth = useAuthContext()

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])
  const [routines, setRoutines] = useState(JSON.parse(localStorage.getItem('routines')) || [])

  useEffect(()=>{
    // save to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('routines', JSON.stringify(routines))
    
    // update user
    // auth.updateUser({ tasks, routines })
  }, [tasks, routines])


  return (
    <>
      <Header />
      <main>

        <Routes>
          <Route path="/" element={<Home tasks={tasks} routines={routines}/>}/>
          <Route path="/calendar" element={<CalendarPage />}/>
          <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks}/>}/>
          <Route path="/task/:i" element={<EditTaskPage tasks={tasks} setTasks={setTasks}/>}/>
          <Route path="/routines" element={<RoutinesPage routines={routines} setRoutines={setRoutines} />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
