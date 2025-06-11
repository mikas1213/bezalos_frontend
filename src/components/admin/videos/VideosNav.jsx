import styles from './VideosNav.module.css';
import { CirclePlus } from 'lucide-react';
import { Divider } from '../nutrition_plans/Divider';

const VideosNav = ({ isModalOpen, setIsModalOpen, setFormValues }) => {
    
    return (
        <div className={styles.VideosNav}>
            <button 
                disabled={isModalOpen.isOpen ? true : false}
                className={styles.addBtn}
                onClick={() => {
                    setIsModalOpen({isOpen: true, action: 'insert'});
                    setFormValues(prevState => ({...prevState, action: 'insert'}));
                }}
            >
                Naujas Video
                <CirclePlus className={styles.iconAdd} />
            </button>
            <Divider />
        </div>
    );
};

export default VideosNav;