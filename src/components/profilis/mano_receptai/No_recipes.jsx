import { Fragment } from 'react';
import styles from './No_recipes.module.css';
import { Flame, CircleX} from 'lucide-react';

const icons = { '-': '🍽', 'A+B': '🥘', 'B+R': '🥗', 'A+R': '🍩' };
const fake_recipes = [
    {id: 1, title: 'Avižiniai Blynai', logic: 'A+B', products: [
        {id: '1.1', title: 'Avižiniai dribsniai'},
        {id: '1.2', title: 'Bananas'},
        {id: '1.3', title: 'Kiaušiniai'},
        {id: '1.4', title: 'Kepimo aliejus'}
    ]},
    {id: 2, title: 'Vištienos salotos', logic: 'B+R', products: [
        {id: '2.1', title: 'Kininis kopūstas'},
        {id: '2.2', title: 'Vištienos kumpelis'},
        {id: '2.3', title: 'Vynuogės'},
        {id: '2.4', title: 'Majonezas'}
    ]},
    {id: 3, title: 'Užkandis', logic: 'A+R', products: [
        {id: '3.1', title: 'Trapučiai'},
        {id: '3.2', title: 'Riešutų sviestas'},
        {id: '3.3', title: 'Bananas'}
    ]},
    {id: 4, title: 'Sushi', logic: '-', products: [
        {id: '4.1', title: 'Agurkas'},
        {id: '4.2', title: 'Lašiša'},
        {id: '4.3', title: 'Veganiška užtepėlė'},
        {id: '4.4', title: 'Sezamų sėklos'}        
    ]}
];

const No_recipes = () => {

    return (
        <>
        <div className={styles.manoReceptaiNavBar}>
            <div className={styles.newRecipe}>
                <button className={styles.newRecipeBtn}>Kurti naują receptą</button>
            </div>

            <div 
                className={styles.logicFilter}>
                {['A+B', 'B+R', 'A+R'].map((option, i) => 
                    <Fragment key={i} >
                        <input style={{display: 'none'}}type='radio'/>
                        <span className={`${styles.filterLabel} ${styles[option.replace('+', '_')]}`}>{ option }</span>
                    </Fragment>
                )}
            </div>

            <div className={styles.searchRecipe}>
                <input 
                    disabled={true}
                    type='text'
                    placeholder='Ieškoti'
                    className={styles.searchRecipeInput}
                />
            </div>
        </div>

        <div className={styles.recipeList}>
            {fake_recipes.map(recipe =>
                <div key={recipe.id} className={styles.userRecipe}>
                    <div className={styles.header}>
                        <span className={styles.deleteIconContainer}>
                            <CircleX className={styles.deleteIcon} />
                        </span>

                        <div className={styles.img}>
                            {icons[recipe.logic]}
                        </div>

                        <div className={styles.summary}>
                            <div className={styles.kcal}>
                                <Flame className={styles.kcalIcon}/>
                                {0}
                            </div>
                            <div className={styles.bar}>
                                <div className={styles.b_r}>
                                    <span>B</span>
                                    <span>0</span>
                                </div>
                                <div className={styles.a_b}>
                                    <span>A</span>
                                    <span>0</span>
                                </div>
                                <div className={styles.a_r}>
                                    <span>R</span>
                                    <span>0</span>
                                </div>
                                {recipe.logic !== '-' && <span className={styles[recipe.logic.toLowerCase().replace('+', '_')]}>{recipe.logic}</span>}
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
                                <span className={styles.grams}>0</span>
                                <small className={styles.gramChar}>g</small>
                            </div>
                        </div>)}
                    </div>
                    <div className={styles.bottom} />
                </div>
            )}
        </div>
        </>
    );
};

export default No_recipes;