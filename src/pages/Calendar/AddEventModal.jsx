import { useState } from "react";
import { useCalendarContext } from "../../context/CalendarContext.jsx";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import sty from './Calendar.module.css'
import EventForm from "./EventForm.jsx";

//                      editing can be the event being edited
function AddEventModal({ editing = null }) {

    const [formError, setFormError] = useState(null)

    const ctx = useCalendarContext()
    const day = ctx.modal[1]

    const now = dayjs()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError(null)

        let { 
            name,
            startTime,
            startDate,
            endDate,
            endTime
        } = Object.fromEntries(new FormData(e.target))

        name = name.trim()

        // validate name
        if (!name) return setFormError("name required");

        // get start and end as dayjs objects
        const start = dayjs(`${startDate}T${startTime}`)
        const end = dayjs(`${endDate}T${endTime}`)

        // validate start in future
        if (start.diff(now, 'minute') < 30) return setFormError("start must be at least 30 minutes in future");

        // validate diff
        if (end.diff(start, 'minute') < 5) return setFormError("end must be at least 5 minutes after start");

        ctx.addEvent(
            start.year(),
            start.month(),
            start.date(),
            {
                title: name,
                startDate,
                startTime,
                endDate,
                endTime
            }
        )
        
        ctx.closeModal()
    }
    

    return (
        <div className="modal-backdrop" onClick={e => {
            if (e.target !== e.currentTarget) return;
            ctx.closeModal()
        }}>
            <div className="modal">
                <div className={sty.modalHead}>
                    <h3>{editing ? "Edit" : "Add"} event</h3>
                    <button onClick={ctx.closeModal}>
                        <img src="/icons/close.svg" alt="x icon" />
                    </button>
                </div>
                <EventForm
                    d={day}
                    handleSubmit={handleSubmit}
                    formError={formError}
                />
            </div>
        </div>
    )
}

export default AddEventModal;