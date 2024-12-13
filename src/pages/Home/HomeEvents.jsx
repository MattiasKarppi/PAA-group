import { useCalendarContext } from '../../context/CalendarContext.jsx'

function HomeEvents() {
    const calendarContext = useCalendarContext()
    const upcomingEvents = calendarContext.getAllEventsAsArray().slice(0, 4)

    return (
        <div id='events'>
            <h3>Upcoming events</h3>
            {upcomingEvents.map(evt => {
                const key = `${evt.startDate}T${evt.startTime}`
                return (
                    <div key={key}>
                        {evt.title}
                    </div>
                )
            })}
        </div>
    )
}

export default HomeEvents;