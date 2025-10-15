import type { CSSProperties, ReactNode } from 'react';
import styles from './Cover.module.css';

/**
 * @param {ReactNode} children – The content inside the layout (e.g. header, main, footer).
 * @param {string} [minHeight='100vh'] – Minimum height of the container. Accepts any valid CSS unit.
 * @param {string} [space='1rem'] – Spacing between child elements and padding around the container.
 * @param {number} [centeredIndex] – Index of the child element to be vertically centered (starting from 0).
 */

type CoverProps = {
	children: ReactNode;
	minHeight?: string;
	space?: string;
	centeredIndex?: number;
};

export const Cover = ({ children, minHeight = '100vh', space = '1rem', centeredIndex }: CoverProps) => {
    
	const coverStyle = {
		'--min-height': minHeight,
		'--space': space,
	} as CSSProperties;

	const childrenArray = Array.isArray(children) ? children : [children];

	return (
		<div className={styles.cover} style={coverStyle}>
			{childrenArray.map((child, index) => (
				<div
					key={index}
					className={centeredIndex === index ? styles.centered : ''}
				>
					{child}
				</div>
			))}
		</div>
	);
};
