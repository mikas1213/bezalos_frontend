import { Cluster } from '../../Shared/cluster/Cluster';

import AccordionRow from './AccordionRow';
import { type AccordionData } from './types';

import styles from './Accordion.module.css';

export const Accordion = ({ data }: { data: AccordionData }) => {
    return (
        <Cluster className={styles.accordion} dir='column' align='space-between'>
            {data.rows.map((row, i) => <AccordionRow key={i} properties={data.properties} row={row} isFirstChild={i !== 0} /> )}
        </Cluster>
    );
};

