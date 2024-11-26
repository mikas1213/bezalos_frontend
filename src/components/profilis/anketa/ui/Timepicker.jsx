import styles from './Timepicker.module.css';
import { useState, useEffect, useRef } from 'react';
import { FaRegClock } from 'react-icons/fa6';

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

const Timepicker = ({ type, name, formData, handleForm, setErrors }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [h, m] = formData[name]?.split(':') || ['--', '--'];
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = e => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
        <div className={styles.timePicker} ref={dropdownRef}>
            <div className={styles.card} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.inner}>
                    <FaRegClock className={styles.icon}/>
                    <span className={styles.title}>
                        {`${h}:${m}`}
                    </span>
                </div>
            </div>

            {isOpen && (<div className={styles.selectTimeCard}>
                <div className={styles.header}>
                    <div>Pasirinkti laiką</div>
                </div>

                <div className={styles.content}>
                    <div className={styles.contentInner}>
                        <div className={styles.hourHeader}>Valandos</div>
                        <div className={styles.hours}>
                            {hours.map((hour) => (
                                <div 
                                    key={hour}
                                    className={styles.hour} 
                                    onClick={() => {
                                        handleForm({name, value: `${hour}:${m}`}, type, formData.day_id)

                                        setErrors(prev => {
                                            const updated = {...prev};
                                            const prop = formData.day_id ? `${name}_${formData.day_id}` : name;
     
                                            delete updated[prop];
                                            return updated;
                                        });
                                    }}
                                >
                                    <span className={h === hour ? styles.activeHour : ''}>{hour}</span>
                                </div> 
                            ))}
                        </div>
                    </div>

                    <div className={styles.contentInner}>
                        <div className={styles.minutesHeader}>Minutės</div>
                        <div className={styles.minutes}>
                            {minutes.map((minute) => (
                                <div 
                                    key={minute} 
                                    className={styles.minute}
                                    onClick={() => {
                                        handleForm({name, value: `${h}:${minute}`}, type, formData.day_id)
                                        setErrors(prev => {
                                            const updated = {...prev};
                                            const prop = formData.day_id ? `${name}_${formData.day_id}` : name;
       
                                            delete updated[prop];
                                            return updated;
                                        })
                                    }}
                                >
                                    <span className={m === minute ? styles.activeMinute : ''}>{minute}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button
                        className={styles.footerBtn}
                        onClick={() => setIsOpen(false)}
                    >Pasirinkti
                    </button>
                </div>
            </div>)}
        </div>
    );
};

export default Timepicker;