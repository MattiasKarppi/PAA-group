import dayjs from 'dayjs'

export const dayjsFromEvent = (event, end = false) => {
    if (end) {
        return dayjs(`${event.endDate}T${event.endTime}`)
    } else {
        return dayjs(`${event.startDate}T${event.startTime}`)
    }
}

export const sortEventsByStart = (events) => {
    events.sort((a, b) => {
        return dayjsFromEvent(a).diff(dayjsFromEvent(b))
    })
}