import Nav from "./Nav.jsx";
import sty from './Header.module.css'

function Header() {
    return (
        <header className={sty.header}>
            <h1>App name here</h1>  
            <Nav />
        </header>
    )
}

export default Header;