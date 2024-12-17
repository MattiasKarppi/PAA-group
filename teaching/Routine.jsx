
/*
    Routine = the component
    routine = the routine object
*/

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

    }

    function handleDelete() {
        setRoutines(routines => {
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
    </div>
 )
}

export default Routine