const KeitykleContainer = ({ children }) => {
    return (
        <div style={{
            height: '100vh',
            width: '22rem',
            margin: '0 auto'
        }}>
            {children}
        </div>
    );
};

export default KeitykleContainer;