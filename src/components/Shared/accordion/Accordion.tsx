import styles from './Accordion.module.css';
import AccordionRow from './AccordionRow';
import { Cluster } from '../../Shared/cluster/Cluster';
import { type AccordionData } from './types';

export const Accordion = ({ data }: { data: AccordionData }) => {
    return (
        <Cluster className={styles.accordion} dir='column' align='space-between'>
            {data.rows.map((row, i) => <AccordionRow key={i} properties={data.properties} row={row} isFirstChild={i !== 0} /> )}
        </Cluster>
    );
};

