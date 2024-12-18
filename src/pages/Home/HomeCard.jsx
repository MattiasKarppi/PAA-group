import styles from './Home.module.css'
import { Link } from 'react-router-dom'

function HomeCard({ arr, entries, title, bg, icon, link }) {
    return (
        <div className={styles.homeCard} style={{ backgroundColor: bg }}>
            <h3>
                <img src={`/icons/${icon}.svg`} alt={`${icon} icon`} />
                {title}
            </h3>
            {arr.map((item, i) => {
                return (
                    <table key={i}>
                        <tbody>
                            {entries(item).map((entry, j) => {
                                return (
                                    <tr key={`${i}-${j}`}>
                                        <th>{entry[0]}</th>
                                        <td>{entry[1]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )
            })}
            <div className={styles.seeAll}>
                <Link to={link}>See all &rarr;</Link>
            </div>
        </div>
    )
}

export default HomeCard