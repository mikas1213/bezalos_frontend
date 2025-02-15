import styles from './AdminRecipes.module.css';
import AdminRecipe from './AdminRecipe';

const AdminRecipes = ({ adminRecipes }) => {
    
    return (
        <div className={styles.adminRecipes}>
            {adminRecipes.map(adminRecipe => <AdminRecipe key={adminRecipe.id} adminRecipe={adminRecipe} />)}
        </div>
    );
};

export default AdminRecipes;