import { useState, useEffect } from "react"
import HabitForm from "./HabitForm"
import Routine from "./Routine"

function RoutinesPage() {

  let [routines, setRoutines] = useState(JSON.parse(localStorage.getItem("routines")) || [])
  let [desc, setDesc] = useState(false)

  useEffect(()=>{
    localStorage.setItem("routines", JSON.stringify(routines))
  }, [routines])

  function handleSort(event) {
    let sort = event.target.value
    let newRoutines = [...routines]

    if (sort === "Repetitions") {
        newRoutines.sort((a, b) => {
          return desc? b.repetitions - a.repetitions : a.repetitions - b.repetitions
        })
        
    } else if (sort === "Priority") {
        newRoutines.sort((a, b) => {
          return desc? b.priority.localeCompare(a.priority) : a.priority.localeCompare(b.priority)
        })
          
    }
    setRoutines (newRoutines)
    }

  function handleSortOrder(event) {
    let isDecending = event.target.checked
    setDesc(isDecending)
  }
  
  return (
    <div>
      <h3>Routines Page</h3>
      <HabitForm setRoutines={setRoutines} />
      <div>
        Sort by:
        <select onChange={handleSort} defaultValue="">
          <option value="Select sort">Select sort</option>
          <option value="Repetitions">Repetitions</option>
          <option value="Priority">Priority</option>
        </select>
        Descending:
        <input type="checkbox" onChange={handleSortOrder} defaultChecked={false} />
      </div>

      {routines.map( (r, i) => {
        return <Routine i={i} routine={r} setRoutines={setRoutines} key={r.name} />
      })}
    </div>
  )
}


export default RoutinesPage
