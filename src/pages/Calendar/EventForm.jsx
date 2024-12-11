import dayjs from "dayjs"

function EventForm({ d, event, handleSubmit, formError }) {

    const start = d || dayjs(`${event.startDate}T${event.startTime}`)
    const end = d ? d.hour(23).minute(59) : dayjs(`${event.endDate}T${event.endTime}`)
    const defaultStartDate = start.format('YYYY-MM-DD')
    const defaultStartTime = start.format("HH:mm")
    const defaultEndDate = end.format('YYYY-MM-DD')
    const defaultEndTime = end.format("HH:mm")

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="add-evt-name">Event name:</label>
                <input required type="text" id="add-evt-name" name="name" defaultValue={event?.title || ""} />
            </div>
            <div className="field">
                <label htmlFor="add-evt-start-date">Start date:</label>
                <input required type="date" id="add-evt-start-date" name="startDate" defaultValue={defaultStartDate}/>
            </div>
            <div className="field">
                <label htmlFor="add-evt-start-time">Start time:</label>
                <input required type="time" id="add-evt-start-time" name="startTime" defaultValue={defaultStartTime} />
            </div>
            <div className="field">
                <label htmlFor="add-evt-end-date">End date:</label>
                <input required type="date" id="add-evt-end-date" name="endDate" defaultValue={defaultEndDate}/>
            </div>
            <div className="field">
                <label htmlFor="add-evt-end-time">End time:</label>
                <input required type="time" id="add-evt-end-time" name="endTime" defaultValue={defaultEndTime} />
            </div>
            <div className="foot">
                <button>
                    Submit
                </button>
                {formError && <div className="error">{formError}</div>}
            </div>
        </form>
    )
}

export default EventForm;