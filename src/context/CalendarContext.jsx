import { createContext, useContext, useState, useEffect } from "react";
import AddEventModal from "../pages/Calendar/AddEventModal.jsx";

/*
    Example events object
    (hash map for faster lookups)

    events: {
        2025: {
            3: {
                7: [{
                    title: "Dentist appointment",
                    startTime:  '0000-00-00'
                    startDate:  '00:00'
                    endTime:
                    endDate:
                }]
            }
        }
    }
*/

const LS_KEY = "frontend2-doug-events"

const initialCalendarContext = {
    events: JSON.parse(localStorage.getItem(LS_KEY) || "{}"),
    addEvent: () => {},
    getEvent: () => {},
    getEvents: () => {},
    updateEvent: () => {},
    deleteEvent: () => {},
    modal: [null, null],
    setModal: () => {},
    closeModal: () => {}
}

const CalendarContext = createContext(initialCalendarContext)

export const useCalendarContext = () => {
    return useContext(CalendarContext)
}

const CalendarContextProvider = ({ children }) => {

    const [events, setEvents] = useState(initialCalendarContext.events)
    const [modal, setModal] = useState([null, null])

    // save to localStorage whenever events changes
    useEffect(()=>{
        localStorage.setItem(LS_KEY, JSON.stringify(events))
    }, [events])

    const addEvent = (year, month, date, event) => {
        const newEvents = {...events}

        if (!newEvents[year]) newEvents[year] = {};
        if (!newEvents[year][month]) newEvents[year][month] = {};
        if (!newEvents[year][month][date]) newEvents[year][month][date] = [];

        // check if already exists. if so, return false (error)
        const match = newEvents[year][month][date].find(e => e.title === event.title);
        if (match) return false;

        newEvents[year][month][date].push(event);
        setEvents(newEvents)
        return true;
    }

    const getEvent = (year, month, date, title) => {
        return getEvents(year, month, date)?.find(e => e.title === title)
    }

    const getEvents = (year, month, date) => {
        return events[year]?.[month]?.[date]
    }

    const getIndex = (year, month, date, title) => {
        // check if date even has events. if not, return -1
        const dateEvents = getEvents(year, month, date)
        if (!dateEvents) return -1;

        // find the matching event's index
        return dateEvents.findIndex(e => e.title === title);
    }

    const updateEvent = (year, month, date, title, newEvent) => {
        const newEvents = {...events}

        const i = getIndex(year, month, date, title)
        if (i < 0) return false;

        // update
        newEvents[year][month][date][i] = newEvent;
        setEvents(newEvents)

        return true
    }

    const deleteEvent = (year, month, date, title, newEvent) => {
        const newEvents = {...events}

        const i = getIndex(year, month, date, title)
        if (i < 0) return false;

        // delete
        newEvents[year][month][date].splice(i, 1);
        setEvents(newEvents)

        return true;
    }

    const ctx = {
        events,
        addEvent,
        getEvent,
        getEvents,
        updateEvent,
        deleteEvent,
        setModal,
        modal,
        closeModal: () => setModal([null, null])
    }

    return (
        <CalendarContext.Provider value={ctx}>
            {children}
            {modal[0] === "addEvent" && <AddEventModal />}
        </CalendarContext.Provider>
    )
}

export default CalendarContextProvider