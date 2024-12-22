import { createContext, useContext, useEffect, useState } from "react";

const initialContext = {
    users: [],
    user: null,
    addUser: () => {},
    updateUser: () => {},
    logOut: () => {}
}

const AuthContext = createContext(initialContext)

export const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({children}) => {

    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('my-sched-users') || "[]"))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('my-sched-user')))

    useEffect(() => {
        localStorage.setItem("my-ched-users", JSON.stringify(users))
    }, [users])
    
    useEffect(() => {
        localStorage.setItem("my-sched-user", JSON.stringify(user))
    }, [user])

    return (
        <AuthContext.Provider value={{
            user,
            users,
            addUser(newUser) {
                // give id
                newUser = {
                    ...newUser,
                    id: `${Math.random()}-${Math.random()}-${Math.random()}`,
                    tasks: [],
                    routines: [],
                    events: []
                }

                // add to users
                const copy = [...users]
                copy.push(newUser)
                setUsers(copy)

                // set user
                setUser(newUser)
            },
            updateUser(update) {
                // if not logged in, cancel
                if (!user) return;

                // update user
                const newUser = {...user, ...update} 
                setUser(newUser)

                // update user in users
                const copy = [...users]
                const i = copy.findIndex(u => u.id === user.id)
                copy[i] = newUser
                setUsers(copy)
            },
            logOut() {
                setUser(null)
                window.location.href = "/"
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider