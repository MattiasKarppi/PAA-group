import { Link, useLocation } from "react-router-dom";
import sty from './Header.module.css'

const navItems = [
    {to: "/", text: "Home", icon: "home"},
    {to: "/tasks", text: "Tasks", icon: "task"},
    {to: "/routines", text: "Routines", icon: "routine"},
    {to: "/calendar", text: "Calendar", icon: "event"},
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
                            borderBottom: `5px solid ${loc.pathname === item.to ? `var(--${item.icon})` : "transparent"}`,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}
                    >
                        <img src={`/icons/${item.icon}.svg`} alt={`${item.icon} icon`} />
                        {item.text}
                    </Link>
                )
            })}
        </nav>
    )
}

export default Nav;