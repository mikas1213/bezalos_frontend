import styles from './UserRecipe.module.css';

const UserRecipe = ({ recipe }) => {
    return (
        <div className={styles.userRecipe}>
            {recipe.title}
        </div>
    );
};

export default UserRecipe;