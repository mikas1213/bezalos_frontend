import styles from './Input.module.css';

const Input = ({children, type, place, name, inputsData, onChange}) => {
    return (
        <div className={styles.inputGroup}>
            <input
                type={type}
                value={inputsData[name]}
                name={name}
                // required
                // pattern="[A-Za-z]{3}"
                onChange={(e) => onChange({...inputsData, [name]: e.target.value})}
                placeholder={place}
                autoComplete="off"
            />
            {children}
        </div>
    );
};

export default Input;