import Nav from "./Nav.jsx";
import sty from './Header.module.css'

function Header() {
    return (
        <header className={sty.header}>
            <h1>My Scheduler</h1>  
            <Nav />
        </header>
    )
}

export default Header;