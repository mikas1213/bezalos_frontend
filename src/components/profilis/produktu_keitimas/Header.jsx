const Header = ({ title }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            color: 'var(--color-bgr-bottom)',
            fontSize: '1.5rem',
            fontWeight: '600',
            margin: '1.5rem 0 1rem 0'
        }}>{title}</div>
    );
};

export default Header;