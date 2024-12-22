import sty from './Calendar.module.css'
import { useCalendarContext } from '../../context/CalendarContext.jsx'

function CalendarDayEvent({ year, month, date, event }) {
    const ctx = useCalendarContext()

    const handleDelete = () => {
        ctx.deleteEvent(year, month, date, event.title)
    }

    return (
        <div className={sty.dayEvent}>
            {event.title}
            <div className="controls">
                <button onClick={e => {
                    e.stopPropagation()
                    ctx.setModal(["editEvent", ctx.getEvent(year, month, date, event.title)])
                }}>
                    <img src="./icons/edit.svg" alt="pencil icon" />
                </button>
                <button onClick={e => {
                    e.stopPropagation()
                    handleDelete()
                }}>
                    <img src="./icons/delete.svg" alt="trash can icon" />
                </button>
            </div>
        </div>
    )
}

export default CalendarDayEvent;