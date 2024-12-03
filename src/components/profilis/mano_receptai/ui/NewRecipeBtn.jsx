import styles from './NewRecipeBtn.module.css';
import { useState, useEffect, useRef } from 'react';
import RecipeModal from '../recipe_modal/RecipeModal';

const NewRecipeBtn = () => {
    const [open, setOpen] = useState(false);

    // const ref = useRef(null);
    // useEffect(() => {
    //     const handleClickOutside = e => {
    //         if(ref.current && !ref.current.contains(e.target)) {
    //             setOpen(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, [setOpen]);

    return (
        <div 
            // ref={ref} 
            className={styles.newRecipe}
        >
            <button 
                onClick={() => setOpen(!open)}
                className={styles.newRecipeBtn}>
                Kurti naują receptą
            </button>
            {open && <RecipeModal />}
        </div>
    );
};

export default NewRecipeBtn;