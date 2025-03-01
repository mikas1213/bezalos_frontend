import styles from './Promo.module.css';
import { CircleAlert, CircleX } from 'lucide-react';

export const PromoHeader = () => {
    return (
        <div className={styles.promoHeader}>
            <span>Kodas</span>
            <span>Nuolaida</span>
            <span>Panaudojimų limitas</span>
            <span>Panaudojimai</span>
            <span>Galoja iki</span>
            <span></span>
            <span className={styles.delete}>Trinti</span>
        </div>
    );
};

const Promo = ({ promo, handlePromoDelete }) => {
    const per = promo.promo_type === 'percentage' ? '%' : '';
    const fix = promo.promo_type === 'fixed' ? '€' : '';
    const date = new Date(promo.valid_until);
    const today = new Date();
    const is_valid = date > today;
    const valid_until = new Intl.DateTimeFormat('lt-LT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
    
    return (
        <div className={styles.promo}>
            <div className={styles.promo_code}>{promo.promo_code}</div>
            <div className={styles.promo_value}>{fix}{Number(promo.promo_value)?.toFixed(0)}{per}</div>
            <div>
                <span className={styles.usage_limit}>{promo.usage_limit}</span>
            </div>
            <div>
                <span className={styles.usage_count}>{promo.usage_count}</span>
            </div>
            <div className={styles.valid_until}>{valid_until}</div>
            <div>
                {(!is_valid || !promo.is_active) && <CircleAlert className={styles.is_validIcon} />}
            </div>
            <div className={styles.delete}>
                <CircleX className={styles.iconDelete}
                    onClick={() =>{
                        const is_delete = window.confirm('Trinti kodą?');
                        if(is_delete) {
                            handlePromoDelete.mutate(promo.id);
                        }
                    }} 
                />
            </div>
        </div>
    );
};

export default Promo;