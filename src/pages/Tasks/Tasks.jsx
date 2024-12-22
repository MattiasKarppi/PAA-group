import Task from './Task';
import styles from './Tasks.module.css';
import { useState } from 'react';


function Tasks({ tasks, setTasks }) {
    const [statusFilter, setStatusFilter] = useState(""); // To filter by status
    const [categoryFilter, setCategoryFilter] = useState(""); // To filter by category
    const [sortOption, setSortOption] = useState(""); // To handle sorting
    const [time, setTime] = useState(1); // For time slider in form

    function handleSubmit(e) {
        //Below written function prevents refresh
        e.preventDefault();

        let form = e.target;

        let newTask = {
            title: form.title.value,
            description: form.description.value,
            status: form.status.value,
            category: form.category.value,
            time: time,
            date: form.duedate.value,
        };

        let tasksCopy = [...tasks];
        tasksCopy.push(newTask);
        setTasks(tasksCopy);
    }

    // Function to filter and sort tasks
    const getFilteredAndSortedTasks = () => {
        let filteredTasks = tasks;

        // apply filters
        if (statusFilter) {
            filteredTasks = filteredTasks.filter((task) => task.status === statusFilter);
        }
        if (categoryFilter) {
            filteredTasks = filteredTasks.filter((task) => task.category === categoryFilter);
        }

        // Apply sorting
        if (sortOption) {
            filteredTasks = [...filteredTasks]; // Avoid mutating the original array
            if (sortOption === "Time ascending") {
                filteredTasks.sort((a, b) => a.time - b.time);
            } else if (sortOption === "Time descending") {
                filteredTasks.sort((a, b) => b.time - a.time);
            } else if (sortOption === "Date ascending") {
                filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else if (sortOption === "Date descending") {
                filteredTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (sortOption === "Status ascending") {
                filteredTasks.sort((a, b) =>
                    a.status.localeCompare(b.status) // Alphabetical order: Done > In progress > Not yet started
                );
            } else if (sortOption === "Status descending") {
                filteredTasks.sort((a, b) =>
                    b.status.localeCompare(a.status) // Reverse order
                );
            }
        }

        return filteredTasks;
    };

    const filteredAndSortedTasks = getFilteredAndSortedTasks();

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label>
                        Enter your Task/Todo
                        <input type="text" name="title" />
                    </label>
                </div>

                <br />

                <div className={styles.field}>
                    <label>
                        Description
                        <input type="text" name="description" />
                    </label>
                </div>

                <br />

                <div className={styles.field}>
                    <label>
                        Status selector
                        <br />
                        <select name="status">
                            <option value="In progress">In progress</option>
                            <option value="Not yet started">Not yet started</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </div>

                <br />

                <div className={styles.field}>
                    <label>
                        <h3>Time estimate</h3>
                        <input
                            type="range"
                            min="1"
                            max="24"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            style={{
                                width: "100%",
                                appearance: "none",
                                background: "#ddd",
                                height: "6px",
                                borderRadius: "3px",
                                outline: "none",
                            }}
                        />
                        <br />
                        <span>{time} hours</span>
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

                <button className={styles.TasksButton}>Add task</button>
            </form>

            {/* Filter and sort options */}
            <div className={styles.filters}>
                <label>
                    Show Status Filter
                    <br />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">Pick status</option>
                        <option value="Done">Done</option>
                        <option value="In progress">In progress</option>
                        <option value="Not yet started">Not yet started</option>
                    </select>
                </label>
<br />
                <label>
                    Only show
                    <br />
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="">No filter selected</option>
                        <option value="Health">Health</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </label>
<br />
                <label>
                    Sort via
                    <br />
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">No sort selected</option>
                        <option value="Time ascending">Time ascending</option>
                        <option value="Time descending">Time descending</option>
                        <option value="Status ascending">Status ascending</option>
                        <option value="Status descending">Status descending</option>
                        <option value="Date ascending">Date ascending</option>
                        <option value="Date descending">Date descending</option>
                    </select>
                </label>
            </div>

            {/* Render filtered and sorted tasks */}
            {filteredAndSortedTasks.map((task, i) => {
                return <Task key={task.title} task={task} i={i} />;
            })}
        </>
    );
}

export default Tasks;
