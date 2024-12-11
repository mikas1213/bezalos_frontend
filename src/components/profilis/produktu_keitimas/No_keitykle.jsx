import styles from './No_Keitykle.module.css';
import { CiSearch } from 'react-icons/ci';
import { TbSortAscendingLetters, TbSortAscendingNumbers } from 'react-icons/tb';

const fake_products = [
    {id: 1, title: 'Kanapių sėklos', g: 27},
    {id: 2, title: 'Vytintos mini dešrelės', g: 38},
    {id: 3, title: 'Šonkauliukai', g: 48},
    {id: 4, title: 'Fermentinis sūris', g: 49},
    {id: 5, title: 'Antiena', g: 52},
    {id: 6, title: 'Šviežias tunas', g: 73},
    {id: 7, title: 'Vištienos kulšelės', g: 103}
];

const No_keytykle = () => {
    return (
        <div>
            <div className={styles.header}>Maistro produktų keitimas</div>
            <div className={styles.productInput}>
                <CiSearch className={styles.icon} />
                <input disabled={true} type='text' className={styles.prodTitle} placeholder='Aviena' />
                <input disabled={true} type='text'  className={styles.grams}  placeholder='150 g' />
            </div>

            <div className={styles.groupFilters}>
                <button disabled={true}>Visi</button>
                <button disabled={true} className={styles.active}>Mėsa</button>
                <button disabled={true} className={styles.active}>Žuvis</button>
                <button disabled={true} className={styles.active}>Kruopos</button>
                <button disabled={true} className={styles.active}>Pieno produktai</button>
                <button disabled={true} className={styles.active}>Ankštiniai</button>
            </div>

            <div className={styles.sort}>
                <div className={styles.title}>
                    <span>Pavadinimas</span> 
                    <TbSortAscendingLetters className={styles.icon} />
                </div>
                
                <div className={styles.grams}>
                    <span>Gramai</span> 
                    <TbSortAscendingNumbers className={styles.icon} />
                </div>
            </div>

            <div className={styles.availableProducts}>
                {fake_products.map(prod =>
                    <div key={prod.id} className={styles.availProd}>
                        <span className={styles.prodTitle}>{prod.title}</span>
                        <div className={styles.gramsContainer}>
                            <span>{prod.g}</span>
                            <span>g</span>
                        </div>        
                    </div>
                )}
            </div>

        </div>
    );
};

export default No_keytykle;