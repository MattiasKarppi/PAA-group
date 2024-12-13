function Routine({ routine, setRoutines, i }) {

    function handleIncrease() {
      routine.repetitions++
      setRoutines(routines => {
        return [...routines]
      })
    }
    
    function handleDecrease() {
      if (routine.repetitions <= 0) {
        return
      }
      routine.repetitions--
      setRoutines(routines=> {
        return [...routines]
      })
    }

    function handleReset() {
      routine.repetitions = 0
      setRoutines (routines=> {
        return [...routines]
      })

    }

    function handleDelete() {
      setRoutines (routines => {
        let newRoutines = [...routines]
        newRoutines.splice(i, 1)
        return newRoutines
      })
    }
  return (
    <div>
      Name: {routine.name} <br />
      Priority: {routine.priority} <br />
      Repetitions: 
      <button onClick={handleDecrease}>
          -
      </button>
      {routine.repetitions}
      <button onClick={handleIncrease}>
          +
      </button>
      <button onClick={handleReset}>
        Reset
      </button>
      <button onClick={handleDelete}>
        Delete
      </button>

    </div>
  )
}

export default Routine