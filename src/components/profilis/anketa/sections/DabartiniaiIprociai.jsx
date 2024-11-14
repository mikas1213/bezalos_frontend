import styles from './DabartiniaiIprociai.module.css';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';
import Timepicker from '../ui/Timepicker';

const DabartiniaiIprociai = () => {
    return (
        <div className={styles.dabartiniaiIprociai}>  
            <div>   
                <CheckBox name='test' label='Yra tekę laikytis dienos' />
                <Textarea placeholder='Aprašyk juos' maxLength={50} className={styles.mt_05} />
            </div>
            <div>
                <CheckBox name='test' label='Netoleruojami maisto produktai' className={styles.mt_1} />
                <Textarea placeholder='Įrašyk juos' maxLength={50} className={styles.mt_05} />
            </div>


            <div className={`${styles.meals} ${styles.mt_1}`}>
                <div className={styles.mealContainer}>
                    <div className={styles.meal}>
                        <span className={styles.title}>Pusryčiai</span>
                        <Timepicker />    
                    </div>
                    <CheckBox name='test' label='Pusryčių nevalgau' className={styles.mt_05} />
                    <Textarea className={styles.mt_05} />
                </div>
                
                <div>
                    <div className={styles.meal}>
                        <span className={styles.title}>Pietūs</span>
                        <Timepicker />
                    </div>
                    <CheckBox name='test' label='Pusryčių nevalgau' className={styles.mt_05} />
                    <Textarea className={styles.mt_05} />
                </div>
                
                <div>
                    <div className={styles.meal}>
                        <span className={styles.title}>Užkandžiai</span>
                        <Timepicker />
                    </div>
                    <CheckBox name='test' label='Pusryčių nevalgau' className={styles.mt_05} />
                    <Textarea className={styles.mt_05} />
                </div>
               
                <div>
                    <div className={styles.meal}>
                        <span className={styles.title}>Vakarienė</span>
                        <Timepicker />
                    </div>
                    <CheckBox name='test' label='Pusryčių nevalgau' className={styles.mt_05} />
                    <Textarea className={styles.mt_05} />
                </div>
            </div>
        </div>
    );
};

export default DabartiniaiIprociai;