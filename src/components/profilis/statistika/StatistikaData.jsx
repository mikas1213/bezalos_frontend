import DataRow, { DataRowHeader } from './DataRow';

import styles from './StatistikaData.module.css';

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