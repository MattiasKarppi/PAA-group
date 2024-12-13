import { Link, useLocation } from "react-router-dom";
import sty from './Header.module.css'

const navItems = [
    {to: "/", text: "Home"},
    {to: "/tasks", text: "Tasks"},
    {to: "/routines", text: "Routines"},
    {to: "/calendar", text: "Calendar"},
]

function Nav() {
    const loc = useLocation()

    return (
        <nav id={sty.nav}>
            {navItems.map(item => {
                return (
                    <Link 
                        key={item.to} 
                        to={item.to}
                        style={{
                            borderBottom: `5px solid ${loc.pathname === item.to ? "blue" : "gray"}`
                        }}
                    >
                        {item.text}
                    </Link>
                )
            })}
        </nav>
    )
}

export default Nav;