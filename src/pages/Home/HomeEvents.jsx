import { useCalendarContext } from '../../context/CalendarContext.jsx'
import { Link } from 'react-router-dom'
import sty from './HomeEvents.module.css'

function HomeEvents() {
    const calendarContext = useCalendarContext()
    const upcomingEvents = calendarContext.getAllEventsAsArray().slice(0, 4)

    return (
        <div id={sty.events}>
            <h3>Upcoming events</h3>
            <table id={sty.table}>
                <thead>
                    <th>Title</th>
                    <th>Start date</th>
                </thead>
                <tbody>
                    {upcomingEvents.map(evt => {
                        const key = `${evt.startDate}T${evt.startTime}`
                        return (
                            <tr key={key}>
                                <td>{evt.title}</td>
                                <td>{evt.startDate}</td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
            <Link to="/calendar">
                See all &rarr;
            </Link>
        </div>
    )
}

export default HomeEvents;