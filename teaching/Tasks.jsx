function Tasks() {
    return (
        <form>
            <label>
                Name
                <input type="text" />
            </label>
            <label>
                Description
                <input type="text" />
            </label>

            <label>
                Time to complete
                <input type="number" />
                <select>
                    <option>hours</option>
                    <option>days</option>
                    <option>weeks</option>
                </select>
            </label>
        </form>
    )
}