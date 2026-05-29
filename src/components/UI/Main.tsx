import { type ReactNode, type RefObject } from 'react';

import styles from './Main.module.scss';

interface MainProps {
	children: ReactNode;
	myRef?: RefObject<HTMLElement>;
	page?: string;
}

const Main = ({ children, myRef, page = '' }: MainProps) => {
	return (
		<main ref={myRef} className={`${styles.main} ${page ? styles[page] : ''}`}>
			{children}
		</main>
	);
};

export default Main;
