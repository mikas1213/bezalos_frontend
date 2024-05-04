import styles from './Filters.module.css';
import { useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';

const Filters = ({ searchItem }) => {
    const inputVal = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOnClick = (val) => {
        const params = {};
        if(val) params.cat = val;
        setSearchParams(params);

        inputVal.current.value = '';
    };

    return (
        <div className={styles.filters}>
            <div className={`${styles.filterItem} ${searchParams.get('cat') === null ? styles.active : ''}`} onClick={() => handleOnClick('')}>All</div>
            <div className={`${styles.filterItem} ${searchParams.get('cat') === 'vebinaras' ? styles.active : ''}`} onClick={() => handleOnClick('vebinaras')}>Vebinarai</div>
            <div className={`${styles.filterItem} ${searchParams.get('cat') === 'mokymai' ? styles.active : ''}`} onClick={() => handleOnClick('mokymai')}>Mokymai</div>
            <div className={`${styles.filterItem} ${searchParams.get('cat') === 'emocinis' ? styles.active : ''}`} onClick={() => handleOnClick('emocinis')}>Emocinis valgymas</div>
            <div className={`${styles.filterItem} ${searchParams.get('cat') === 'mityba' ? styles.active : ''}`} onClick={() => handleOnClick('mityba')}>Mityba</div>
            <div className={`${styles.filterItem} ${searchParams.get('cat') === 'psichologija' ? styles.active : ''}`} onClick={() => handleOnClick('psichologija')}>Valgymo psichologija</div>
            
            <div className={styles.filterInput}>
                 <input 
                    type='text' 
                    ref={inputVal}
                    placeholder='Paieška'
                    value={searchItem || ''}
                    onChange={(e) => setSearchParams(prev => {
                        prev.set('search', e.target.value)
                        return prev;
                    }, { replace: true })}
                /> 
                <button><IoIosSearch className={styles.icon}/></button>
            </div>
            
        </div>
    );
};

export default Filters;