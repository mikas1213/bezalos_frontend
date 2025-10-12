import { useContext, createContext, useState, useEffect, type ReactNode } from 'react';
const MediaQueryContext = createContext(0);

export const MediaQueryProvider = ({ children }: { children: ReactNode }) => {
    const [mediaQuery, setMediaQuery] = useState(1025);

    useEffect(() => {
        const queries = [
            { size: 320, query: window.matchMedia('(max-width: 320px)') },
            { size: 375, query: window.matchMedia('(max-width: 375px)') },
            { size: 440, query: window.matchMedia('(max-width: 440px)') },
            { size: 576, query: window.matchMedia('(max-width: 576px)') },
            { size: 768, query: window.matchMedia('(max-width: 768px)') },
            { size: 1024, query: window.matchMedia('(max-width: 1024px)') }
        ];

        const applyMediaQuery = () => {
            const matchedQuery = queries.find(q => q.query.matches);
            setMediaQuery(matchedQuery ? matchedQuery.size : 1025);
        };

        queries.forEach(q => q.query.addEventListener('change', applyMediaQuery));
        applyMediaQuery();

        return () => queries.forEach(q => q.query.removeEventListener('change', applyMediaQuery));
    }, []);

    return (
        <MediaQueryContext value={mediaQuery}>
            {children}
        </MediaQueryContext>
    );
};

export const useMediaQuery = () => {
    const context = useContext(MediaQueryContext);
    if(context === undefined) throw new Error('MadiaQueryContext was used outside of the MediaQueryProvider');
    return context;
};

