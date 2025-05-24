import styles from './VideosNav.module.css';
import { CirclePlus } from 'lucide-react';
import { Divider } from '../nutrition_plans/Divider';

const VideosNav = ({ isModalOpen, setIsModalOpen }) => {
    
    return (
        <div className={styles.VideosNav}>
            <button 
                disabled={isModalOpen ? true : false}
                className={styles.addBtn}
                onClick={() => setIsModalOpen(true)}
            >
                Naujas Video
                <CirclePlus className={styles.iconAdd} />
            </button>

            <Divider />
        </div>
    );
};

export default VideosNav;