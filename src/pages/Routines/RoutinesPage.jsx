import { useState, useEffect } from "react"
import HabitForm from "./HabitForm"
import Routine from "./Routine"
import styles from './Routines.module.css';

function RoutinesPage({ routines, setRoutines }) {

  let [desc, setDesc] = useState(false)
  let [filterPriority, setFilterPriority] = useState("All")

  useEffect(()=>{
    localStorage.setItem("routines", JSON.stringify(routines))
  }, [routines]);

  function handleSort(event) {
    let sort = event.target.value
    let newRoutines = [...routines]

    const priorityOrder = {"High": 1, "Normal": 2, "Low": 3};

    if (sort === "Repetitions") {
        newRoutines.sort((a, b) => {
          return desc? a.repetitions - b.repetitions : b.repetitions - a.repetitions;
        })
        
    } else if (sort === "Priority") {
        newRoutines.sort((a, b) => {
          return desc? priorityOrder[b.priority] - priorityOrder[a.priority] : priorityOrder[a.priority] - priorityOrder[b.priority]
        })
          
    }
    setRoutines (newRoutines)
    }

  function handleSortOrder(event) {
    let isDecending = event.target.checked
    setDesc(isDecending)
  }

  function handleFilterChange(event) {
    setFilterPriority(event.target.value)
  }

  const filteredRoutines = routines.filter(routine => {
    return filterPriority === "All" || routine.priority === filterPriority
  })
  
  return (
    <div className={styles.container} id="routines-page">
      <h3>Routines Page</h3>
      <HabitForm setRoutines={setRoutines} />
      <div className ={styles.controlsContainer}>
        <div className={styles.sortContainer}>
        <label>Sort by:</label>
        <select onChange={handleSort} defaultValue="">
          <option value="Select sort">Select sort</option>
          <option value="Repetitions">Repetitions</option>
          <option value="Priority">Priority</option>
        </select>
        <label>Descending:</label>
        <input type="checkbox" onChange={handleSortOrder} defaultChecked={false} />
      </div>
      <div className={styles.filterContainer}>
        <label>Filter by priority:</label>
        <select onChange={handleFilterChange} value={filterPriority}>
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
      {filteredRoutines.map((r, i) => {
        return <Routine i={i} routine={r} setRoutines={setRoutines} key={r.name} />
      })}
    </div>
  );
}


export default RoutinesPage
