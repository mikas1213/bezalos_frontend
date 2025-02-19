import styles from './AdminRecipe.module.css';
import { CircleX, CirclePlay, Vegan, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminRecipe = ({ adminRecipe, handleDeleteRecipe, setModalControl, setNewRecipe }) => {
    const img_src = adminRecipe.photo ? URL.createObjectURL(adminRecipe.photo) : adminRecipe.image_s;

    return (
        <div className={styles.adminRecipe}>
            <img 
                src={img_src}
                alt={adminRecipe.title} 
                className={styles.image}
            />
            <div className={`${styles.section} ${styles.title}`} onClick={() => {
                setNewRecipe(adminRecipe);
                setModalControl({isOpen: true, action: 'edit'});
            }}>
                {adminRecipe.title}
            </div>

            <div className={`${styles.section} ${styles.foodLogic}`}>
                <span className={styles[adminRecipe.food_logic.replace('+', '_').toLowerCase()]}>{adminRecipe.food_logic}</span>
            </div>

            <div className={`${styles.section} ${styles.recipeType}`}>
                {adminRecipe.recipe_type}
            </div>

            <div className={`${styles.section} ${styles.taste}`}>
                {adminRecipe.taste}
            </div>

            <div className={`${styles.section} ${styles.duration}`}>
                <Clock className={styles.icon} />
                {adminRecipe.duration}
                <small>min.</small>
            </div>

            <div className={`${styles.section} ${styles.likes}`}>
                <Heart className={`${styles.icon} ${adminRecipe.likes ? styles.liked : ''}`} />
                {adminRecipe.likes}
            </div>

            <div className={`${styles.section} ${styles.videoLink}`}>

                {adminRecipe.video_link && <>
                    <CirclePlay className={styles.icon} />
                    <Link to={adminRecipe.video_link} target='_blank' rel='noopener noreferrer' >
                        {adminRecipe.video_link}
                    </Link>
                </>}
            </div>

            <div className={`${styles.section} ${styles.isVegetarian}`}>
                {adminRecipe.is_vegetarian ? <Vegan className={styles.icon} /> : ''}
            </div>

            <div 
                className={`${styles.section} ${styles.deleteRecipe}`}
                onClick={() => handleDeleteRecipe(adminRecipe.id)}
            >
                <CircleX className={styles.icon} />
            </div>
        </div>
    );
};

export default AdminRecipe;