import sty from './Calendar.module.css'
import { useCalendarContext } from '../../context/CalendarContext.jsx';
import CalendarDayEvent from './CalendarDayEvent.jsx';
import { sortEventsByStart } from './dateUtil.js';

function CalendarDay({ d, now }) {
    // NO STATE LOGIC ABOVE HERE
    if (d.day === null) return (
        <div className={[sty.day, sty.nonDay].join(" ")}>
        
        </div>
    )

    const ctx = useCalendarContext()

    const year = d.dayjs.year()
    const month = d.dayjs.month()
    const date = d.dayjs.date()

    const isToday = now.isSame(d.dayjs, 'date');
    let classes = `${sty.day}`
    if (isToday) classes += ` ${sty.today}`

    const promptForNewEvent = () => {
        ctx.setModal(["addEvent", d.dayjs])
    }

    const dateEvents = ctx.getEvents(year, month, date)
    sortEventsByStart(dateEvents || [])

    return (
        <div className={classes} onClick={promptForNewEvent}>
            <h6>{d.val}</h6>
            {dateEvents && dateEvents.map(e => {
                const key = `${year}-${month}-${date}-${e.title}`
                return (<CalendarDayEvent 
                    key={key}
                    year={year}
                    month={month}
                    date={date}
                    event={e}
                />)
            })}
            <img className={sty.plus} src="./icons/plus.svg" alt="plus icon" />
        </div>
    )
}

export default CalendarDay;