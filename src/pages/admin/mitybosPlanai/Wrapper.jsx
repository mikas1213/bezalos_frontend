const custom = {
    products: {
        overflow: 'scroll',
        height: 'calc(100dvh - 45px)',
        borderRadius: '0.5rem',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
    },
    meals: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '0.8rem',
        paddingBottom: '2rem'
    },
    plans: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '0.8rem'
    }
}

const Wrapper = ({ children, layout }) => {
    return (
        <div style={custom[layout]}>
            {children}
        </div>
    );
};

export default Wrapper;