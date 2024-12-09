import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/routines">Routines</Link>
            <Link to="/calendar">Calendar</Link>
        </nav>
    )
}

export default Nav;