import type { CSSProperties, ReactNode } from 'react';
import styles from './Grid.module.css';

/**
 * @param {ReactNode} children – The grid items to be displayed (e.g. cards, blocks).
 * @param {string} [space='1rem'] – The spacing between grid items. Applied as CSS `gap`.
 * @param {string} [min='250px'] – The minimum column width. Accepts any valid CSS length value.
 * @param {string} [className] – Additional CSS class names to apply to the container.
 */

type GridProps = {
    children: ReactNode;
    space?: string;
    min?: string;
    className?: string
};

export const Grid = ({ children, space = '1rem', min = '250px', className = '' }: GridProps) => {
    
    const gridStyle = {
        '--space': space,
        '--minimum': min
    } as CSSProperties;

    const gridClasses = [
        className,
        styles.grid
    ].join(' ');

    return (
        <div className={gridClasses} style={gridStyle}>
            {children}
        </div>
    );
};