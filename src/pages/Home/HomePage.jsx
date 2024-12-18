import { useCalendarContext } from "../../context/CalendarContext";
import style from './Home.module.css'
import HomeCard from "./HomeCard";

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
        .filter(t => t.status !== "done")
        .sort((a, b) => {
            return a.date.localeCompare(b.date)
        })
        .slice(0, 3);

    return (
        <div id={style.homeCards}>
            {/* tasks */}
            <HomeCard 
                arr={unfinishedTasks} 
                title="Next on the agenda"
                entries={item => ([
                    ['Name', item.title],
                    ['Due', item.date]
                 ])} 
            />

            {/* routines */}
            <HomeCard 
                arr={routinesWithMostRepetitions} 
                title="Your daily routine"
                entries={item => ([
                    ['Name', item.name]
                 ])} 
            />

            {/* events */}
            <HomeCard 
                arr={upcoming3Events} 
                title="Upcoming events"
                entries={item => ([
                    ['Name', item.title]
                 ])} 
            />

        </div>
    )
}

export default Home;