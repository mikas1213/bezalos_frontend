import styles from './StatistikaData.module.css';
import DataRow, { DataRowHeader } from './DataRow';

const StatistikaData = ({ bodyData, deleteBodyData }) => {
    
    return (
        <div className={styles.statistikaData}>
            <DataRowHeader />
            {bodyData.map(row => <DataRow 
                key={row.id}
                row={row}
                deleteBodyData={deleteBodyData}
            />)}
        </div>
    );
};

export default StatistikaData;