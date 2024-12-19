import { useState } from "react"
import styles from './Auth.module.css'
import { useAuthContext } from "../../context/AuthContext"

function Auth() {

    const auth = useAuthContext()

    const [loggingIn, setLoggingIn] = useState(false)
    const [formError, setFormError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")
        let { username, password, password2 } = Object.fromEntries(new FormData(e.target));

        username = username.trim()

        // SIGN UP
        if (!loggingIn) {

            if (password.length < 6) {
                setFormError("password must be at least 6 characters")
                return
            }

            if (password !== password2) {
                setFormError("passwords must match")
                return
            }

            if (username.length < 3) {
                setFormError("username must be at least 3 characters")
                return
            }

            
            auth.addUser({
                username,
                password
            })
        } else { // LOG IN

        }
    }

    if (auth.user) return <>
        <button onClick={auth.logOut}>
            Log out
        </button>
    </>

    return <>
        <div className={styles.controls}>
            <button className={!loggingIn && styles.active} onClick={() => setLoggingIn(false)}>Sign up</button>
            <button className={loggingIn && styles.active} onClick={() => setLoggingIn(true)}>Log in</button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label>
                    Username
                    <input type="text" name="username" required />
                </label>
            </div>
            <div className="field">
                <label>
                    Password
                    <input type="password" name="password" required />
                </label>
            </div>
            {!loggingIn && (
                <div className="field">
                    <label>
                        Repeat Password
                        <input type="password" name="password2" required />
                    </label>
                </div>
            )}
            <button>
                {loggingIn ? "Log in" : "Sign up"}
            </button>
            <div className="error">
                {formError}
            </div>
        </form>
    </>
}

export default Auth