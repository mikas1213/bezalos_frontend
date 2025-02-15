import styles from './AdminRecipe.module.css';
import { getImageFromBlob } from '../../../utils/images';
import { CircleX } from 'lucide-react';

const AdminRecipe = ({ adminRecipe }) => {
    return (
        <div className={styles.adminRecipe}>
            <img 
                src={getImageFromBlob(adminRecipe.photo_s, adminRecipe.photo_type)} 
                alt={adminRecipe.title} 
                className={styles.image}
            />
            <span className={styles.title}>{adminRecipe.title}</span>
            <span>{adminRecipe.food_logic}</span>
            <CircleX className={styles.iconDelete} />
        </div>
    );
};

export default AdminRecipe;