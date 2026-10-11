import { createContext, useContext } from 'react';

type ActiveSectionContext = {
	isIntersecting: boolean;
};

export const ActiveSectionContext = createContext<ActiveSectionContext | undefined>(undefined);

export const useObserver = () => {
	const context = useContext(ActiveSectionContext);
	if (context === undefined) {
		throw new Error('useObserver must be used inside an ObserverProvider.');
	}
	return context;
};
