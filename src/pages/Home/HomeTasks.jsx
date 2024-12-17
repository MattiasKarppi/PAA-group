function HomeTasks({ tasks }) {

    function get3LatestIncompleteTasks() {
        const incompleteTasks = tasks.filter(t => t.status !== "done");
        incompleteTasks.sort((a, b) => {
            return b.date.localeCompre(a.date)
        })
        return incompleteTasks
    }

    const displayedTasks = get3LatestIncompleteTasks()

    return (
        <div id="home-tasks">
            {displayedTasks.map((t, i)=>{
                return (
                    <div className="home-task" key={i}>
                        <h4>{t.title}</h4>
                    </div>
                )
            })}
        </div>
    )
}

export default HomeTasks