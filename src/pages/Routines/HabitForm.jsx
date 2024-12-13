
function HabitForm({setRoutines}) {
  function handleSubmit(event) {
    event.preventDefault()
    let form = event.target
    let name = form.name.value
    let priority = form.priority.value
    let newRoutine = {
      name,
      priority,
      repetitions: 0
    }
    
    setRoutines(routines => {
      return [...routines, newRoutine]
    })
  }

  return (
    <form onSubmit={handleSubmit}>
       <div className="field">
        <label htmlFor="Habit-form-name">Name</label>
        <input type="text" id="Habit-form-name" name="name" />
       </div>
       <div className="field">
          <label htmlFor="Habit-form-priorty"></label>
          <select id="Habit-form-priority" name="priority">
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>
       </div>
        <button>
          Submit
        </button>
    </form>
  )
}

export default HabitForm