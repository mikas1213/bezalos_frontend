import { type ReactNode } from 'react';
type Props = {
    children: ReactNode,
    isOpen: boolean
};

const RowBody = ({ children, isOpen }: Props) => (
    <div
        style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.2s ease-in-out',
        }}
    >
        <div style={{ overflow: 'hidden' }}>{children}</div>
    </div>
);

export default RowBody;