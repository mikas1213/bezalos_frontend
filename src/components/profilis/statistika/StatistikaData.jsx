import styles from './StatistikaData.module.css';
import DataRow, { DataRowHeader } from './DataRow';

const StatistikaData = ({ bodyData }) => {
    console.log(bodyData)
    return (
        <div className={styles.statistikaData}>
            <DataRowHeader />
            {bodyData.map(row => <DataRow 
                key={row.id}
                row={row}
            />)}
        </div>
    );
};

export default StatistikaData;