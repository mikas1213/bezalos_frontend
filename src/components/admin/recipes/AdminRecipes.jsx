import styles from './AdminRecipes.module.css';
import AdminRecipe from './AdminRecipe';

const AdminRecipes = ({ adminRecipes, handleDeleteRecipe }) => {
    
    return (
        <div className={styles.adminRecipes}>
            {adminRecipes.map(adminRecipe => <AdminRecipe 
                key={adminRecipe.id} 
                adminRecipe={adminRecipe} 
                handleDeleteRecipe={handleDeleteRecipe} 
            />)}
        </div>
    );
};

export default AdminRecipes;