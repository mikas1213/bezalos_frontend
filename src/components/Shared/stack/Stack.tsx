import type { CSSProperties, ReactNode } from 'react';
import styles from './Stack.module.css';

/**
 * @param {ReactNode} children - vidinis turinys, kurį Stack apgaubia
 * @param {string} [space='0'] - tarpas tarp Stack vaikų elementų (pvz. '1rem', '16px')
 * @param {boolean} [recursive=false] - ar Stack turi taikyti tarpus rekursyviai į vidinius Stack elementus
 * @param {number|null} [splitAfter=null] - nurodo, po kurio elemento taikyti specialų tarpo/stiliaus split; null reiškia, kad nesidalijama
 * @param {string} [className] – Additional CSS class names to apply to the container.
*/

type StackProps = {
    children: ReactNode,
    space?: string,
    recursive?: boolean,
    splitAfter?: number | null,
    className?: string
};

export const Stack = ({ children, space = '0', recursive = false, splitAfter = null, className = '' }: StackProps) => {

	const stackClasses = [
        className,
		styles.stack,
		recursive && styles.recursive,
		splitAfter && styles[`splitAfter${splitAfter}`]
	].filter(Boolean).join(' ');

    const stackStyle = { 
        '--stack-space': space 
    } as CSSProperties;
	return <div className={stackClasses} style={stackStyle}>{children}</div>;
};
