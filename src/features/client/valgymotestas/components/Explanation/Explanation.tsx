import styles from './Explanation.module.scss';
import { Cluster } from '../../../../../components/Shared';

interface LineProp {
    icon: '💚' | '❤️';
    label: string;
}

const Line = ({ icon, label }: LineProp) => {
    return (
        <div className={styles.explanation}>
            <span className={styles.icon}>{ icon }</span>
            <span className={styles.label}>{ label }</span>
        </div>
    );
};

const line1: string  = '< 2.5 – šis valgymo elgesys šiuo metu dar nekelia reikšmingų iššūkių.';
const line2: string = '> 2.5 – šis valgymo elgesys gali kelti iššūkių tad verta į jį atkreipti dėmesį.'

export const Explanation = () => {
    return (
        <Cluster gap='0.5rem'>
            <Line icon='💚' label={line1}/>
            <Line icon='❤️' label={line2}/>
        </Cluster>
    );
};
