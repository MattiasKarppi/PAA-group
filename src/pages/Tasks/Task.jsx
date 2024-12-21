import { Link } from "react-router-dom";
import styles from "./Task.module.css";

function Task({ task, i }) {
    return (
        <div className={styles.task}>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Date: {task.date}</p>
            <p>Status: {task.status}</p>
            <p>Time: {task.time}</p>
            <p>Category: {task.category}</p>
            <Link to={`/task/${i}`} className={styles.editButton}>
                Edit task
            </Link>
        </div>
    );
}

export default Task;
