import { useState } from "react";
import { useCalendarContext } from "../../context/CalendarContext.jsx";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import sty from './Calendar.module.css'

function AddEventModal() {

    const [formError, setFormError] = useState(null)

    const ctx = useCalendarContext()
    const day = ctx.modal[1]

    const now = dayjs()
    const end = now.hour(23).minute(59)
    const defaultStartDate = day.format('YYYY-MM-DD')
    const defaultStartTime = now.format("HH:mm")
    const defaultEndTime = end.format("HH:mm")

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
                    <h3>Add event</h3>
                    <button onClick={ctx.closeModal}>
                        <img src="/icons/close.svg" alt="x icon" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="add-evt-name">Event name:</label>
                        <input required type="text" id="add-evt-name" name="name" />
                    </div>
                    <div className="field">
                        <label htmlFor="add-evt-start-date">Start date:</label>
                        <input required type="date" id="add-evt-start-date" name="startDate" defaultValue={defaultStartDate}/>
                    </div>
                    <div className="field">
                        <label htmlFor="add-evt-start-time">Start time:</label>
                        <input required type="time" id="add-evt-start-time" name="startTime" defaultValue={defaultStartTime} />
                    </div>
                    <div className="field">
                        <label htmlFor="add-evt-end-date">End date:</label>
                        <input required type="date" id="add-evt-end-date" name="endDate" defaultValue={defaultStartDate}/>
                    </div>
                    <div className="field">
                        <label htmlFor="add-evt-end-time">End time:</label>
                        <input required type="time" id="add-evt-end-time" name="endTime" defaultValue={defaultEndTime} />
                    </div>
                    <div className="foot">
                        <button>
                            Submit
                        </button>
                        {formError && <div className="error">{formError}</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEventModal;