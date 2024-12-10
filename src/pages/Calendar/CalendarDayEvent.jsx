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
            <button onClick={e => {
                e.stopPropagation()
            }}>
                <img src="/icons/edit.svg" alt="pencil icon" />
            </button>
            <button onClick={e => {
                e.stopPropagation()
                handleDelete()
            }}>
                <img src="/icons/delete.svg" alt="trash can icon" />
            </button>
        </div>
    )
}

export default CalendarDayEvent;