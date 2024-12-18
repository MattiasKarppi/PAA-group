import { Link } from "react-router-dom"

function Task ({ task, i }){

    return (
        <div className='task'>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Date: {task.date}</p>
            <p>Status:{task.status}</p>
            <p>Time:{task.time}</p>
            <p>Category:{task.category}</p>
            <Link to={`/task/${i}`}>Edit task</Link>
                {/* will add the input from the form */}
        </div>
    )
}
export default Task