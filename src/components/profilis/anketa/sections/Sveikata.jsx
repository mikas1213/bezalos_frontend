import styles from './Sveikata.module.css';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';

const Sveikata = () => {
    return (
        <>
            <CheckBox name='problems' label='Turiu sveikatos problemų.' />
            <Textarea placeholder='asf' maxLength={100} className={styles.mt_05}/>
        </>
    );
};

export default Sveikata;