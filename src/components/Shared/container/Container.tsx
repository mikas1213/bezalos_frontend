import styles from './Container.module.css';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { forwardRef } from 'react';

/**
 * @param {ElementType} [as='div'] – The HTML element or React component to render as the container.
 * @param {ReactNode} children – The content that will be constrained by width.
 * @param {string} [id] – id of html element.
 * @param {string} [maxWidth='1200px'] – The maximum width of the container.
 * @param {string} [padding='1rem'] – Horizontal padding applied to the left and right sides.
 * @param {string} [className] – Additional CSS class names to apply to the container.
 */

type ContainerProps = {
    as?: ElementType,
    id?: string,
    children: ReactNode,
    maxWidth?: string,
    padding?: string,
    className?: string
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ as: Component = 'div',  children, maxWidth = 'var(--content-width)', padding = '1rem', className = '', id = undefined}, ref) => {
    const containerClasses = [
        className,
        styles.container
    ].join(' ');

    const containerStyle = {
        '--max-width': maxWidth,
        '--padding': padding
    } as CSSProperties;

    return (
        <Component id={id} ref={ref} className={containerClasses} style={containerStyle}>
            {children}
        </Component>
    );
});