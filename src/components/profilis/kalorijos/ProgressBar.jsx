import styles from './ProgressBar.module.css';
import CountUp from 'react-countup';
import { useEffect, useRef } from 'react';

const ProgressBar = ({ kcal }) => {

    const b_grams = kcal * 20 / 100 / 4;
    const a_grams = kcal * 45 / 100 / 4;
    const r_grams = kcal * 35 / 100 / 9;

    const b_ref = useRef(0);
    const a_ref = useRef(0);
    const r_ref = useRef(0);

    useEffect(() => {
        b_ref.current = b_grams;
        a_ref.current = a_grams;
        r_ref.current = r_grams;
    }, [b_grams, a_grams, r_grams]);

    return (
        <div className={styles.progressBar}>
            <div className={styles.inner}>
                <div 
                    style={{ width: `${20}%`, backgroundColor: 'var(--color-b)' }} 
                    className={styles.part}
                >
                    {20}%
                </div>
                <div 
                    style={{ width: `${45}%`, backgroundColor: 'var(--color-a)'}} 
                    className={styles.part}
                >
                    {45}%
                </div>
                <div 
                    style={{ width: `${35}%`, backgroundColor: 'var(--color-r)'}} 
                    className={styles.part}
                >
                    {35}%
                </div>
            </div>

            <div className={styles.bar}>
                <div className={styles.barInner}>
                <div className={styles.b}>
                    <span className={styles.barTitle}>Baltymai</span>
                    <span className={styles.grams}>
                        <CountUp
                            key={b_grams}
                            start={b_ref.current}
                            end={b_grams}
                            decimals={0}
                            duration={1.8}
                            separator=''
                        />
                        <span>g</span>
                    </span>
                </div>
                
                <div className={styles.a}>
                    <span className={styles.barTitle}>Angliavandeniai</span>
                    <span className={styles.grams}>
                        <CountUp
                            key={a_grams}
                            start={a_ref.current}
                            end={a_grams}
                            decimals={0}
                            duration={2}
                            separator=''
                        />
                        <span>g</span>
                    </span>
                </div>

                <div className={styles.r}>
                    <span className={styles.barTitle}>Riebalai</span>
                    <span className={styles.grams}>
                        <CountUp
                            key={r_grams}
                            start={r_ref.current}
                            end={r_grams}
                            decimals={0}
                            duration={2.2}
                            separator=''
                        />
                        <span>g</span>
                    </span>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;










