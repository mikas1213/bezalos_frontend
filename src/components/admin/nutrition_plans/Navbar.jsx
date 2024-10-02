const styles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    height: '3rem',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    borderRadius: '5px',
    margin: '0.5rem 0'
};

const Navbar = ({ children }) => {
    return (
        <div style={styles}>
            { children }
        </div>
    );
};

export default Navbar;