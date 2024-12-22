import { jsx } from "react/jsx-runtime";
import { useCalendarContext } from "../../context/CalendarContext";
import style from './Home.module.css'
import HomeCard from "./HomeCard";
import Auth from "./Auth";

function Home({ tasks, routines }) {

    const calendarContext = useCalendarContext()

    const upcoming3Events = calendarContext
        .getAllEventsAsArray()
        .slice(0, 3);

    const routinesWithMostRepetitions = routines
        .sort((a, b) => {
            return b.repetitions - a.repetitions
        })
        .slice(0, 3);

    const unfinishedTasks = tasks
        .filter(t => t.status !== "Done")
        .sort((a, b) => {
            return a.date.localeCompare(b.date)
        })
        .slice(0, 3);

    return (
        <>
            {/* <Auth /> */}
            <div id={style.homeCards}>
                {/* tasks */}
                <HomeCard 
                    arr={unfinishedTasks} 
                    title="Next on the agenda"
                    icon="task"
                    entries={item => ([
                        ['Name', item.title],
                        ['Due', item.date]
                    ])} 
                    link="/tasks"
                />

                {/* routines */}
                <HomeCard 
                    arr={routinesWithMostRepetitions} 
                    icon="routine"
                    title="Your daily routine"
                    entries={item => ([
                        ['Name', item.name],
                        ['Rep.', item.repetitions],
                        ['Priority', item.priority]
                    ])} 
                    link="/routines"
                />

                {/* events */}
                <HomeCard 
                    arr={upcoming3Events} 
                    title="Upcoming events"
                    icon="event"
                    entries={item => ([
                        ['Name', item.title],
                        ['Start', item.startDate],
                        ['End', item.endDate]
                    ])} 
                    link="/calendar"
                />

            </div>
        </>
    )
}

export default Home;