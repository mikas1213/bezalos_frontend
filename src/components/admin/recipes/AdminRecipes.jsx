import AdminRecipe from './AdminRecipe';

import styles from './AdminRecipes.module.css';

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