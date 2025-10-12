import type { CSSProperties, ReactNode, ElementType, HTMLAttributes } from 'react';
import styles from './Center.module.css';

/**
 * @param {ElementType} [as='div'] – The HTML element or React component to render as the container.
 * @param {ReactNode} children – The content to be centered inside the container.
 * @param {string} [maxWidth='var(--maxWidth')] – The maximum width of the container.
 * @param {boolean} [textCenter=false] – If `true`, centers the text horizontally using `text-align: center`.
 * @param {string} [padding='var(--padding-lr')] – Horizontal padding applied to the left and right sides.
 * @param {boolean} [intrinsic=false] – If `true`, the container width will shrink to fit its content.
 * @param {string} [className] – Additional CSS class names to apply to the container.
 * @param {HTMLAttributes<HTMLElement>} ...rest – Any other valid HTML attributes (e.g. `id`, `aria-*`, `data-*`).
 */

type CenterProps = {
    as?: ElementType,
	children: ReactNode,
	maxWidth?: string,
	textCenter?: boolean,
    padding?: string,
    intrinsic?: boolean,
    className?: string
} & HTMLAttributes<HTMLElement>;

export const Center = ({ as: Component = 'div', children, maxWidth = 'var(--maxWidth)', textCenter = false, padding = '0', intrinsic = false, className = '' }: CenterProps) => {
    
	const classNames = [
        className,
        styles.center, 
        textCenter ? styles.textCenter : '',
        intrinsic ? styles.intrinsic : ''
    ].filter(Boolean).join(' ');

    const centerStyle = {
        '--maxWidth': maxWidth,
        '--padding-lr': padding
    } as CSSProperties;

	return <Component className={classNames} style={centerStyle}>{children}</Component>;
};