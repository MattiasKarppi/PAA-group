import Header from './components/Header/Header.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/HomePage.jsx'
import CalendarPage from './pages/Calendar/CalendarPage.jsx'

import Tasks from './pages/Tasks/Tasks.jsx'
import EditTaskPage from './pages/Tasks/EditTaskPage.jsx'
import { useState, useEffect } from 'react'
import RoutinesPage from './pages/Routines/RoutinesPage.jsx'

function App() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <Header />
      <main>

        <Routes>
          <Route path="/" element={<Home tasks={tasks}/>}/>
          <Route path="/calendar" element={<CalendarPage />}/>
          <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks}/>}/>
          <Route path="/task/:i" element={<EditTaskPage tasks={tasks} setTasks={setTasks}/>}/>
          <Route path="/routines" element={<RoutinesPage />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
