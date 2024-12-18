import styles from './Home.module.css'

function HomeCard({ arr, entries, title }) {
    return (
        <div className={styles.homeCard}>
            <h3>{title}</h3>
            {arr.map((item, i) => {
                return (
                    <table key={i}>
                        {entries(item).map((entry, j) => {
                            return (
                                <tr key={`${i}-${j}`}>
                                    <th>{entry[0]}</th>
                                    <td>{entry[1]}</td>
                                </tr>
                            )
                        })}
                    </table>
                )
            })}
        </div>
    )
}

export default HomeCard