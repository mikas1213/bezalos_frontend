import styles from './AccordionRow.module.css';
import { useState } from 'react';
import RowHeader from './RowHeader';
import RowBody from './RowBody';
import RowBodyItem from './RowBodyItem';
import { Cluster } from '../cluster/Cluster';
import { Box } from '../box/Box';

import type { Row, Properties } from './types';
type Props = { row: Row, properties: Properties, isFirstChild: boolean };

const AccordionRow = ({ row, properties, isFirstChild }: Props) => {

    const { colors } = properties;
    const [isOpen, setIsOpen] = useState(false);
    const accordionRowClasses = [
        styles.accordionRow,
        isOpen && styles.open
    ].filter(Boolean).join(' ');

    return (
        <div
            className={accordionRowClasses}
            onClick={() => setIsOpen(open => !open)}
            style={{
                borderLeft: isOpen ? `3px solid ${colors.activeColor}` : '3px solid var(--light-green-grey-300)',
                backgroundColor: isOpen ? colors.bgColor : ''
            }}
        >
            {isFirstChild && <div style={{ borderBottom: '0.8px solid var(--light-green-grey-100)'}}></div>}

            <RowHeader row={row} colors={colors} isOpen={isOpen} />
            <RowBody isOpen={isOpen}>
                <Box padding={['0', '1rem', '1rem', '1rem']}>
                    <Cluster dir='column' gap='1rem' >
                        {row.items.map((item, i) => <RowBodyItem key={i} item={item} properties={properties} />)}
                    </Cluster>
                </Box>
            </RowBody>
        </div>
    )
};

export default AccordionRow;
