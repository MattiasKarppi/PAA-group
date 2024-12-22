import { createContext, useContext, useState, useEffect } from "react";
import AddEventModal from "../pages/Calendar/AddEventModal.jsx";
import EditEventModal from "../pages/Calendar/EditEventModal.jsx";
import { sortEventsByStart } from "../pages/Calendar/dateUtil.js";
// import { useAuthContext } from "./AuthContext.jsx";

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
    closeModal: () => {},
    getAllEventsAsArray: () => {}
}

const CalendarContext = createContext(initialCalendarContext)

export const useCalendarContext = () => {
    return useContext(CalendarContext)
}

const CalendarContextProvider = ({ children }) => {

    // const auth = useAuthContext()
    const [events, setEvents] = useState(initialCalendarContext.events)
    const [modal, setModal] = useState([null, null])

    // when events updates
    useEffect(()=>{
        // save events to local storage
        localStorage.setItem(LS_KEY, JSON.stringify(events))

        // if logged in, save user
        // auth.updateUser({events: events.events})
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

    const updateEvent = (oldYMD, oldTitle, newYMD, newEvent) => {
        const newEvents = {...events}

        const i = getIndex(...oldYMD, oldTitle)
        if (i < 0) return false;

        // update
        newEvents[oldYMD[0]][oldYMD[1]][oldYMD[2]].splice(i, 1);
        addEvent(...newYMD, newEvent)

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

    const getAllEventsAsArray = () => {
        let result = []
        for (const year in events) {
            for (const month in events[year]) {
                for (const date in events[year][month]) {
                    result.push(...events[year][month][date])
                }
            }
        }
        sortEventsByStart(result)
        return result
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
        closeModal: () => setModal([null, null]),
        getAllEventsAsArray
    }

    return (
        <CalendarContext.Provider value={ctx}>
            {children}
            {modal[0] === "addEvent" && <AddEventModal />}
            {modal[0] === "editEvent" && <EditEventModal />}
        </CalendarContext.Provider>
    )
}

export default CalendarContextProvider