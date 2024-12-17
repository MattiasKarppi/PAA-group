

import { useParams, useNavigate } from "react-router-dom"

function EditTaskPage ({ tasks, setTasks }) {

    const params = useParams()
    const navigate = useNavigate()

    const task = tasks[params.i]

    if (!task) {
        return "Task not found"
    }

    const deleteTask = () => {
        const newTasks = [...tasks]
        newTasks.splice(params.i, 1)
        setTasks(newTasks)
        navigate("/tasks")
    }

    const saveTask = () => {

    }

    return (
        <div>

            <h3>Edit task</h3>

            <button onClick={deleteTask}>
                Delete
            </button>
            <form>
                <div>
                    <label>
                        Title: 
                        <input type="text" defaultValue={task.title} />
                    </label>
                </div>
            </form>

        </div>
    )
}



export default EditTaskPage