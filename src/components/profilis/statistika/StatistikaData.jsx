import styles from './StatistikaData.module.css';
import DataRow, { DataRowHeader } from './DataRow';

const StatistikaData = ({ deleteBodyData, paginatedRecords }) => {
    return (
        <div className={styles.statistikaData}>
            <DataRowHeader />
            {paginatedRecords.map(row => <DataRow 
                key={row.id}
                row={row}
                deleteBodyData={deleteBodyData}
            />)}
        </div>
    );
};

export default StatistikaData;