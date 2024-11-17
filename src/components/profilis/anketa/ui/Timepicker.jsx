import styles from './Timepicker.module.css';
import { useState, useEffect, useRef } from 'react';
import { FaRegClock } from 'react-icons/fa6';

const Timepicker = ({type, name, formData, handleForm}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [current_hour, current_minute] = formData[name]?.split(':') || ['00', '00']
    const dropdownRef = useRef(null);

    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

    useEffect(() => {
        const handleClickOutside = e => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSetTime = (time, val) => {
        switch(time) {
            case 'hours':
                handleForm({name, value: `${val}:${current_minute}`}, type, formData.id);
                break;
            case 'minutes':
                handleForm({name, value: `${current_hour}:${val}`}, type, formData.id);
                break;
            default:
                return;
        }
    };

    return (
        <div className={styles.timePicker} ref={dropdownRef}>
            <div className={styles.card} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.inner}>
                    <FaRegClock className={styles.icon}/>
                    <span className={styles.title}>
                        {`${current_hour}:${current_minute}`}
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
                                    onClick={() => handleSetTime('hours', hour)}>
                                    <span className={current_hour === hour ? styles.activeHour : ''}>{hour}</span>
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
                                    onClick={() => handleSetTime('minutes', minute)}>
                                    <span className={current_minute === minute ? styles.activeMinute : ''}>{minute}</span>
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