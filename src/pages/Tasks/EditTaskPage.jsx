import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditTaskPage({ tasks, setTasks }) {
    const params = useParams();
    const navigate = useNavigate();

    const task = tasks[params.i];

    if (!task) {
        return "Task not found";
    }

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState(task.date);
    const [status, setStatus] = useState(task.status);
    const [time, setTime] = useState(task.time);
    const [category, setCategory] = useState(task.category);

    const deleteTask = () => {
        const newTasks = [...tasks];
        newTasks.splice(params.i, 1);
        setTasks(newTasks);
        navigate("/tasks");
    };

    const backTasks = () => {
        navigate("/tasks");
    };

    const saveTask = (e) => {
        e.preventDefault();

        const updatedTask = {
            title,
            description,
            date,
            status,
            time,
            category,
        };

        const newTasks = [...tasks];
        newTasks[params.i] = updatedTask;

        setTasks(newTasks);
        navigate("/tasks");
    };

    return (
        <div>
            <button onClick={deleteTask} className="deleteButton">
                Delete
            </button>

            <button onClick={backTasks}>
                Back to Tasks
            </button>

            <form onSubmit={saveTask}>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <br />
                        Status:
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="In progress">In progress</option>
                            <option value="Not yet started">Not yet started</option>
                            <option value="Done">Done</option>
                        </select>
                        <br />
                        Time:
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
                        <br />
                        Category:
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Health">Health</option>
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                        <br />
                        <button type="submit">
                            Save changes
                        </button>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default EditTaskPage;
