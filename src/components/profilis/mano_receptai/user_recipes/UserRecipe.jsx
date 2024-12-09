import styles from './UserRecipe.module.css';
import { Flame, CircleX} from 'lucide-react';

const icons = { '-': '🍽', 'A+B': '🥘', 'B+R': '🥗', 'A+R': '🍩' };

const UserRecipe = ({ recipe, handleDeleteRecipe }) => {
    const logicStyle = `${styles[recipe.logic?.toLowerCase().replace('+', '_')]}`;

    return (
        <div className={`${styles.userRecipe} ${recipe.isNew ? styles.new : ''}`}>
            <div className={styles.header}>
                <span className={styles.deleteIconContainer} onClick={e => {
                    e.target.closest(`.${styles.userRecipe}`).classList.remove(styles.new)
                    e.target.closest(`.${styles.userRecipe}`).classList.add(styles.deleted)
                    handleDeleteRecipe(recipe.id);
                }}>
                    <CircleX className={styles.deleteIcon} />
                </span>
                
                <div className={styles.img}>
                    {icons[recipe.logic]}
                </div>

                <div className={styles.summary}>
                    <div className={styles.kcal}>
                        <Flame className={styles.kcalIcon}/>
                        {recipe.kcal.toFixed(0)}
                    </div>
                    <div className={styles.bar}>
                        <div className={styles.b_r}>
                            <span>B</span>
                            <span>{recipe.b.toFixed(0)}</span>
                        </div>
                        <div className={styles.a_b}>
                            <span>A</span>
                            <span>{recipe.a.toFixed(0)}</span>
                        </div>
                        <div className={styles.a_r}>
                            <span>R</span>
                            <span>{recipe.r.toFixed(0)}</span>
                        </div>
                        {recipe.logic !== '-' && <span className={logicStyle}>{recipe.logic}</span>}
                    </div>
                </div>
                
                <div className={styles.recipeTitle}>
                    {recipe.title}
                </div>
            </div>


            <div className={styles.prdoducts}>
                {recipe.products.map(prod => <div key={prod.id} className={styles.product}>
                    <span className={styles.dot}>•</span>
                    <span className={styles.prodTitle}>{prod.title}</span>
                    <div className={styles.gramsContainer}>
                        <span className={styles.grams}>{prod.grams}</span>
                        <small className={styles.gramChar}>g</small>
                    </div>
                </div>)}
            </div>
            <div className={styles.bottom} />
        </div>
    );
};

export default UserRecipe;