import { useCalendarContext } from "../../context/CalendarContext.jsx";
import Calendar from "./Calendar.jsx";

function CalendarPage() {
    const ctx = useCalendarContext()

    console.log(ctx.events)
    console.log("all events:", ctx.getAllEventsAsArray())

    return (
        <div className="page" id="calendar-page">
            <Calendar />
        </div>
    )
}

export default CalendarPage;