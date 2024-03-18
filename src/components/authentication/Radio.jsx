import styles from './Radio.module.css';


const Radio = ({value, label, val, setVal}) => {
    // console.log('valll: ', val.initial_target)
    return (
        <>
            <div className={styles.radio}>
                {/* <input 
                    className={styles.input} 
                    type="radio"
                    name="target"
                    checked={val === value}
                    value={value}
                    onChange={() => setVal(value)}
                />
                <span className={styles.check} onClick={() => setVal(value)}></span>
                <label htmlFor="" onClick={() => setVal(value)}>{label}</label> */}

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