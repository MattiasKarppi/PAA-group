import HomeEvents from './HomeEvents.jsx'
import HomeTasks from './HomeTasks.jsx';

function Home({ tasks }) {


    return (
        <>
            <HomeEvents />
            <HomeTasks tasks={tasks} />
        </>
    )
}

export default Home;