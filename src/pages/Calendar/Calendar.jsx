import CalendarDay from "./CalendarDay.jsx";
import dayjs from "dayjs";
import isLeapYear from 'dayjs/plugin/isLeapYear'
dayjs.extend(isLeapYear)
import sty from './Calendar.module.css'
import { useState } from "react";

const monthMap = [
    {name: "January", days: 31},
    {name: "February", days: 28},
    {name: "March", days: 31},
    {name: "April", days: 30},
    {name: "May", days: 31},
    {name: "June", days: 30},
    {name: "July", days: 31},
    {name: "August", days: 31},
    {name: "September", days: 30},
    {name: "October", days: 31},
    {name: "November", days: 30},
    {name: "December", days: 31},
]

const weekdaysMap = [
    {name: 'mon', val: 1},
    {name: 'tue', val: 2},
    {name: 'wed', val: 3},
    {name: 'thu', val: 4},
    {name: 'fri', val: 5},
    {name: 'sat', val: 6},
    {name: 'sun', val: 7}
]

const daysInMonth = (year, month) => {
    if (month === 1) {
        return dayjs(`${year}-${pad0(month+1)}-01`).isLeapYear() ? 29 : 28;
    } else {
        return monthMap[month].days
    }
}

const pad0 = n => n < 10 ? "0"+n : n;

const generateDaysArray = (year, month) => {
    // get weekday of first day
    const firstDayStr = `${year}-${pad0(month+1)}-01`
    const firstDay = dayjs(firstDayStr)
    let firstWeekday = firstDay.day() - 1;
    if (firstWeekday < 0) firstWeekday = 6;

    let days = []
    // push weekday pad
    for (let i = 0; i < firstWeekday; i++) {
        days.push({
            dayjs: null,
            day: null,
            val: ""
        })
    }
    // push days
    for (let i = 0; i < daysInMonth(year, month); i++) {
        days.push({
            day: i,
            val: (i+1).toString(),
            dayjs: dayjs(`${year}-${pad0(month+1)}-${pad0(i+1)}`)
        })
    }
    return days
}

const createView = (year, month) => {
    return {
        year,
        month,
        days: generateDaysArray(year, month),
        display: dayjs(`${year}-${pad0(month+1)}-01`).format('MMMM YYYY')
    }
}

function Calendar() {

    const now = dayjs()
    const date = now.date()
    const month = now.month()
    const year = now.year()
    const display = now.format('MMMM YYYY')

    const [view, setView] = useState(createView(year, month))

    const nudgeMonth = (delta) => {
        setView(view => {
            let {month, year} = view
            month += delta
            if (month < 0) {
                month = 11
                year--
            } else if (month > 11) {
                month = 0
                year++
            }
            return createView(year, month)
        })
    }

    return (
        <div id={sty.calendar}>
            <div id={sty.calendarHead}>
                <button onClick={() => nudgeMonth(-1)}>
                    Previous
                </button>
                <h3>{view.display}</h3>
                <button onClick={() => nudgeMonth(1)}>
                    Next
                </button>
            </div>
            <div id={sty.weekdays}>
                {weekdaysMap.map(d => <div key={d.name}>{d.name}</div>)}
            </div>
            <div id={sty.view}>
                {view.days.map((d, i) => {
                    const weekday = weekdaysMap[i%7]
                    const key = `${view.year}-${view.month}-${d.day}-${weekday.name}`
                    return <CalendarDay key={key} d={d} now={now} />
                })}
            </div>
        </div>
    )
}

export default Calendar;