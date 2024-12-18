import Task from './Task'
import styles from './Tasks.module.css'


function Tasks({ tasks, setTasks }) {


    function handleSubmit(e) {
        //Below written function prevents refresh
        e.preventDefault()

        let form = e.target

        let newTask = {
            title: form.title.value,
            description: form.description.value,
            status: form.status.value,
            category:form.category.value,
            time: form.time.value,
            date: form.duedate.value,
        }

        // make a copy of tasks
        let tasksCopy = [...tasks]

        // add the newTasks to tasksCopy
        tasksCopy.push(newTask)

        // set tasks as tasksCopy
        setTasks(tasksCopy)
    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className={styles.field}>
                    <label>
                        Enter your Task/Todo
                        <input type="text" name='title' />
                    </label>
                </div>

                <br />

                <div className={styles.field}>
                    <label>
                        Description
                        <input type="text" name='description' />
                    </label>
                </div>

                <br />

                <div className={styles.field}>
                    <label>
                        Status selector
                        <br />
                        <select name="status">
                            <option>In progress</option>
                            <option>Not yet started</option>
                            <option>Done</option>
                        </select>
                    </label>
                </div>

                <br />

                <div className={styles.field}>
                    <label>
                        <h3>Time estimate</h3>
                        <br />

                        <input type="time" name='time' />


                    </label>
                </div>
                
                <br />

                <div className={styles.field}>
                    <label>
                        Category
                            <br />
                    <select name="category">
                        <option>Health</option>
                        <option>Home</option>
                        <option>Work</option>
                        <option>Entertainment</option>
                    </select>
                    </label>
                </div>

                <br />

                <div className={styles.field}>
                    <label>
                        Due date
                        <br />
                        <input type="date" name="duedate" />
                    </label>
                </div>

                <br />
                
                <button>
                    Add task
                </button>

            </form>

            {/* map is like forEach */}
            {tasks.map((task, i) =>  {
                return <Task key={task.title} task={task} i={i} />
            })}


            
        </>
    )
}

export default Tasks