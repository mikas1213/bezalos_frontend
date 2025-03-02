const styles={
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto',
};

const StatisticLayout = ({ children }) => {
    return (
        <div style={styles}>
            { children }
        </div>
    );
};

export default StatisticLayout;