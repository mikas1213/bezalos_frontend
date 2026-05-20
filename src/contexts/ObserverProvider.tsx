import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

type ActiveSectionContext = {
	isIntersecting: boolean;
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

			if (!entry.isIntersecting) return;
			entry.target.classList.remove('section--hidden');
		};

		const observer = new IntersectionObserver(revealSection, {
			root: null,
			threshold: 0.01,
		});

		const sections = document.querySelectorAll('section[id]');
		sections.forEach((section, index) => {
			const rect = section.getBoundingClientRect();
			const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

			if (isVisible) {
				setTimeout(() => {
					section.classList.remove('section--hidden');
				}, index * 200);
			}
			observer.observe(section);
		});

		return () => observer.disconnect();
	}, []);

	return <ActiveSectionContext value={{ isIntersecting }}>{children}</ActiveSectionContext>;
};

export const useObserver = () => {
	const context = useContext(ActiveSectionContext);
	if (context === undefined) {
		throw new Error('useObserver must be used inside an ObserverProvider.');
	}
	return context;
};
