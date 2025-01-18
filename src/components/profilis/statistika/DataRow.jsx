import styles from './DataRow.module.css';
export const DataRowHeader = () => {
    return (
        <div className={styles.tableHeader}>
            <div className={styles.tableCell}>Svoris</div>	
            <div className={styles.tableCell}>Bicepsas</div>	
            <div className={styles.tableCell}>Talija</div>
            <div className={styles.tableCell}>Sėdmenys</div>	
            <div className={styles.tableCell}>Šlaunis</div>	
            <div className={styles.tableCell}>Data</div>
            <div className={styles.tableCell}>Veiksmai</div>	
        </div>
    );
};

const DataRow = ({ row }) => {
    return (
        <div className={styles.tableRow}>
            <div className={styles.tableCell}>
                <span className={styles.label}>Svoris</span>
                <input className={styles.input} type='text' value={row.svoris} />
            </div>	
            <div className={styles.tableCell}>
                <span className={styles.label}>Bicepsas</span>
                <input className={styles.input} type='text' value={row.bicepsas} />
                
            </div>	
            <div className={styles.tableCell}>
                <span className={styles.label}>Talija</span>
                <input className={styles.input} type='text' value={row.talija} />
            </div>
            <div className={styles.tableCell}>
                <span className={styles.label}>Sėdmenys</span>
                <input className={styles.input} type='text' value={row.sedmenys} />
            </div>	
            <div className={styles.tableCell}>
                <span className={styles.label}>Šlaunis</span>
                <input className={styles.input} type='text' value={row.slaunis} />
            </div>	
            <div className={styles.tableCell}>
                <span className={styles.tableDate}>{new Date(Date.parse(row.created_at)).toLocaleDateString('lt-LT')}</span>
                <div className={styles.deleteBtnMob}>Išrinti</div>	
            </div>
            <div className={styles.deleteBtn}>Ištrinti</div>	
        </div>
    );
};

export default DataRow;