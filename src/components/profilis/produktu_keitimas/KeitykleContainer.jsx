import { useState, useEffect } from 'react';

const KeitykleContainer = ({ children }) => {
    const [containerWidth, setContainerWidth] = useState('22rem');

    useEffect(() => {
        const mediaQuery_576 = window.matchMedia('(max-width: 576px)');
        const applyMediaQueryStyles = () => {
            if (mediaQuery_576.matches) {
                setContainerWidth('100%');
            } else {
                setContainerWidth('22rem');
            }
        }
        mediaQuery_576.addEventListener('change', applyMediaQueryStyles);
        applyMediaQueryStyles();

        return () => {
            mediaQuery_576.removeEventListener('change', applyMediaQueryStyles);
            document.body.style.overflowX = 'hidden';
        };      
    }, []);

    return (
        <div style={{
            width: containerWidth,
            margin: '0 auto 2rem auto'
        }}>
            {children}
        </div>
    );
};

export default KeitykleContainer;