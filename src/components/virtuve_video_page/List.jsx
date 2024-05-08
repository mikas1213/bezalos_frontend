import styles from './List.module.css';
import ListCard from './ListCard';
// import { useState } from 'react';

const List = ({ videos, filter }) => {
    
    // const [filter, setFilter] = useState('');
    // const handleClick = fil => setFilter(fil);

    return (
        <div className={styles.list}>      
            {/* <div className={styles.filter}>
                <span className={filter === '' ? styles.active : ''} onClick={() => handleClick('')}>Visi</span>
                <span className={filter === 'vebinaras' ? styles.active : ''} onClick={() => handleClick('vebinaras')}>Vebinarai</span>
                <span className={filter === 'mokymai' ? styles.active : ''} onClick={() => handleClick('mokymai')}>Mokymai</span>
                <span className={filter === 'emocinis' ? styles.active : ''} onClick={() => handleClick('emocinis')}>Emocinis valgymas</span>
                <span className={filter === 'mityba' ? styles.active : ''} onClick={() => handleClick('mityba')}>Mityba</span>
                <span className={filter === 'psichologija' ? styles.active : ''} onClick={() => handleClick('psichologija')}>Valgymo psichologija</span>
            </div> */}
            
            {videos?.filter(v => v.search_tag.indexOf(filter) > -1).map(video => <ListCard video={video} key={video.id} /> )}
            {/* {videos?.map(video => <ListCard video={video} key={video.id} /> )} */}
        </div>
    );
};

export default List;