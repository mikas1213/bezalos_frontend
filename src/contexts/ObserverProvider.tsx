import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from 'react';

type ActiveSectionContext = {
	isIntersecting: boolean
};
type ObserverProviderProps = {
	children: ReactNode;
};
const ActiveSectionContext = createContext<ActiveSectionContext | undefined>(undefined);

export const ObserverProvider = ({ children }: ObserverProviderProps) => {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

	useEffect(() => {
		const revealSection = (entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			if (!entry) return;
			setIsIntersecting(entry.isIntersecting);
			if (!isIntersecting) return;
			entry.target.classList.remove('section--hidden');
		};

		const observer = new IntersectionObserver(revealSection, {
			root: null,
			threshold: 0.05,
		});

		const sections = document.querySelectorAll('section[id]');
		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, []);

    return (
        <ActiveSectionContext value={{ isIntersecting }}>
            {children}
        </ActiveSectionContext>
    );
};

export const useObserver = () => {
    const context = useContext(ActiveSectionContext);
    if(context === undefined) {
        throw new Error('useObserver must be used inside an ObserverProvider.');
    }
    return context;
};
