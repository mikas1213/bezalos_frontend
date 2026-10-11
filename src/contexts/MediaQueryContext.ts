import { createContext, useContext } from 'react';

export const MediaQueryContext = createContext<number | undefined>(undefined);

export const useMediaQuery = () => {
	const context = useContext(MediaQueryContext);
	if (context === undefined)
		throw new Error('MediaQueryContext was used outside of the MediaQueryProvider');
	return context;
};
