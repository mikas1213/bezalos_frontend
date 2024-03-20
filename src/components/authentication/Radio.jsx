import styles from './Radio.module.css';

const Radio = ({value, label, val, setVal}) => {

    return (
        <>
            <div className={styles.radio}>

                <input 
                    className={styles.input} 
                    type="radio"
                    name="target"
                    checked={val.initial_target === value}
                    value={value}
                    onChange={() => setVal({...val, initial_target: value})}
                />
                <span className={styles.check} onClick={() => setVal({...val, initial_target: value})}></span>
                <label htmlFor="" onClick={() => setVal({...val, initial_target: value})}>{label}</label>
            </div>
        </>
    );
}

export default Radio;