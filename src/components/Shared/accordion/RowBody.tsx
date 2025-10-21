import { useRef, type ReactNode } from 'react';
type Props = {
    children: ReactNode,
    isOpen: boolean
};
const RowBody = ({ children, isOpen }: Props) => {
    const contentHeight = useRef<HTMLDivElement>(null);
    return (
        <div ref={contentHeight} style={{
            height: isOpen ? contentHeight.current?.scrollHeight : '0px',
            transition: 'height 0.2s ease-in-out'
        }}>
            {children}
        </div>
    );
}

export default RowBody;