function HabitForm({ setRoutines }) {

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
                <label htmlFor="habit-form-name">Name</label>
                <input type="text" id="habit-form-name" name="name" />
            </div>
            <div className="field">
                <label htmlFor="habit-form-priority">Priority</label>
                <select id="habit-form-priority" name="priority">
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                </select>
            </div>
            <button>
                Submit
            </button>
        </form>
    )
}

export default HabitForm