import styles from './AdminRecipes.module.css';
import AdminRecipe from './AdminRecipe';

const AdminRecipes = ({ adminRecipes, handleDeleteRecipe, setModalControl, setNewRecipe }) => {
    
    return (
        <div className={styles.adminRecipes}>
            {adminRecipes.map(adminRecipe => <AdminRecipe 
                key={adminRecipe.id} 
                setModalControl={setModalControl}
                setNewRecipe={setNewRecipe}
                adminRecipe={adminRecipe} 
                handleDeleteRecipe={handleDeleteRecipe} 
            />)}
        </div>
    );
};

export default AdminRecipes;