import styles from './Service.module.css';
import { CircleX } from 'lucide-react';
import { HiTemplate } from 'react-icons/hi';
import { MdOutlineOndemandVideo } from "react-icons/md";

const Service = ({ service, handleModalOpen, setFormValues, handleServiceDelete }) => {
    
    return (
        <div className={styles.service}>
            <img 
                src={service.image_s}
                alt={service.title} 
                className={styles.image}
            />

            <div className={`${styles.section} ${styles.title}`} onClick={() => {
                handleModalOpen(true, 'services', 'update');
                setFormValues(service);
            }}>
                <span>{service.title}</span>
            </div>

            <div className={styles.section}>
                €{service.base_price}
            </div>

            <div className={styles.section}>
                {service.discount > 0 && `€${service.current_price}`}
            </div>

            <div className={`${styles.section} ${styles.center}`}>
                {service.discount} %
            </div>

            <div className={`${styles.section} ${styles.center}`}>
                {service.quantity === 0 ? <small style={{color: 'var(--color-admin-red)'}}>Sold Out</small> : service.quantity}
            </div>

            <div className={`${styles.section} ${styles.center}`}>
                {service.sort}
            </div>

            <div className={`${styles.section} ${styles.center}`}>
                <span className={styles[service.status]}>{service.status}</span>
            </div>

            <div className={`${styles.section} ${styles.center}`}>
                <span className={styles[service.category]}>{service.category === 'Planas' ? <HiTemplate className={styles.planasIcon}/> : service.category === 'Kursai' ? <MdOutlineOndemandVideo className={styles.courseIcon} /> : ''}</span>
            </div>

            <div className={`${styles.section} ${styles.center}`}>
                {service.is_active === 'Off' && <CircleX className={styles.iconActive} />}
            </div>

            <div 
                className={`${styles.section} ${styles.deleteService}`}
                onClick={() => {
                    const is_delete = window.confirm('Trinti paslaugą?');
                    if(is_delete) {
                        handleServiceDelete.mutate(service.id);
                    }
                }}
            >
                <CircleX className={styles.iconDelete} />
            </div> 
        </div>
    );
};

export const ServiceHeader = () => {
    return (
        <div className={styles.serviceHeader}>
            <div className={styles.section}></div>
            <div className={styles.section}>Paslauga</div>
            <div className={styles.section}>Kaina</div>
            <div className={styles.section}>Nauja kaina</div>
            <div className={`${styles.section} ${styles.center}`}>Nuolaida</div>
            <div className={`${styles.section} ${styles.center}`}>vnt.</div>
            <div className={`${styles.section} ${styles.center}`}>Sort</div>
            <div className={`${styles.section} ${styles.center}`}>Statusas</div>
            <div className={`${styles.section} ${styles.center}`}>Kategorija</div>
            <div className={`${styles.section} ${styles.center}`}>Aktyvi</div>
            <div className={styles.section}></div>
        </div>
    );
}

export default Service;