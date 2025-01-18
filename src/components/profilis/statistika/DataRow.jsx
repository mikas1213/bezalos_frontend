import styles from './DataRow.module.css';

const DataRow = ({ row }) => {
    return (
        <div className={styles.dataRow}>
            {/* <span>Svoris</span>	
            <span>Bicepsas</span>	
            <span>Talija</span>
            <span>Sėdmenys</span>	
            <span>Šlaunis</span>	
            <span>Data</span>
            <span>Veiksmai</span>	 */}

            <span>{row.svoris}</span>	
            <span>{row.bicepsas}</span>	
            <span>{row.talijs}</span>
            <span>{row.sedmenys}</span>	
            <span>{row.slaunis}</span>	
            <span>{row.created_at}</span>
            <span>Veiksmai</span>	
        </div>
    );
};

export const DataRowHeader = () => {
    return (
        <div className={styles.rowHeader}>
            <span>Svoris</span>	
            <span>Bicepsas</span>	
            <span>Talija</span>
            <span>Sėdmenys</span>	
            <span>Šlaunis</span>	
            <span>Data</span>
            <span>Veiksmai</span>	
        </div>
    );
};
export default DataRow;