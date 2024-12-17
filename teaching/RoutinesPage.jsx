import { useState, useEffect } from "react"
import HabitForm from "./HabitForm"
import Routine from "./Routine"

/*
    "STATE" is data that is connected to the DOM
    When we update the data,
    the DOM updates with it

    Vanilla JS
        let count = 0
        count++
        h1.innerText = count        DOM Maniupulation

        <h1>0</h1>

    React
        let [count, setCount] = useState(0)
        setCount(count + 1)


        A - function
        B - dependency array (array of states)
     useEffect(A, B)
        "any time B changes, invoke A"

    useEffect(A, [])
        "invoke A when the component mounts (loads for the first time)"

        JSON.parse(localStorage.getItem("routines")) || []
            "load and parse, but if null, use [] instead"

            "save routines in localStorage with the name 'routines'"
        localStorage.setItem("routines", JSON.stringify(routines))
                               name           value
*/

import styles from "./routines.module.css"

function RoutinesPage() {

    let [routines, setRoutines] = useState(JSON.parse(localStorage.getItem("routines")) || [])
    let [desc, setDesc] = useState(false)

    useEffect(()=>{
        localStorage.setItem("routines", JSON.stringify(routines))
    }, [routines])

    function handleSort(e) {
        let sort = e.target.value
        let newRoutines = [...routines]
        if (sort === "repetitions") {
            newRoutines.sort((a, b) => {
                return desc ? b.repetitions - a.repetitions : a.repetitions - b.repetitions
            })
        } else if (sort === "priority") {
            newRoutines.sort((a, b) => {
                return desc ? b.priority.localeCompare(a.priority) : a.priority.localeCompare(b.priority)
            })
        }
        setRoutines(newRoutines)
    }

    function handleSortOrder(e) {
        let isDescending = e.target.checked
        setDesc(isDescending)
    }

    return (
        <>
            <HabitForm setRoutines={setRoutines} />

            <div className={styles.abc}>
                Sort by:
                <select onChange={handleSort} defaultValue="">
                    <option value="">Select sort</option>
                    <option value="repetitions">Repetitions</option>
                    <option value="priority">Priority</option>
                </select>
                Descending:
                <input type="checkbox" onChange={handleSortOrder} defaultChecked={false} />
            </div>

            {routines.map(  (r, i) => {
                return <Routine i={i} routine={r} setRoutines={setRoutines} key={r.name} />
            })}
        </>
    )
}