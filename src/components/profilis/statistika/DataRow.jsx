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
            <div className={styles.tableCell}></div>	
        </div>
    );
};
const inputs = [
    {label: 'Svoris', name: 'svoris', unit: 'kg'},
    {label: 'Bicepsas', name: 'bicepsas', unit: 'cm'},
    {label: 'Talija', name: 'talija', unit: 'cm'},
    {label: 'Sėdmenys', name: 'sedmenys', unit: 'cm'},
    {label: 'Šlaunis', name: 'slaunis', unit: 'cm'},
];

const DataRow = ({ row, deleteBodyData }) => {
    return (
        <div className={styles.tableRow}>
            {inputs.map(input => <div key={input.label} className={styles.tableCell}>
                <span className={styles.label}>{input.label}</span>
                <div className={styles.value}>
                    <span>{row[input.name]}</span>
                    <small>{input.unit}</small>
                </div>
            </div>)}

            <div className={styles.tableCell}>
                <span className={styles.tableDate}>{new Date(Date.parse(row.created_at)).toLocaleDateString('lt-LT')}</span>
                <span onClick={() => deleteBodyData(row.id)} className={styles.deleteBtnMob}>Išrinti</span>	
            </div>
             
            <div className={`${styles.tableCell} ${styles.deleteBtn}`}>
                <span onClick={() => deleteBodyData(row.id)}>Ištrinti</span>
            </div>	
        </div>
    );
};

export default DataRow;