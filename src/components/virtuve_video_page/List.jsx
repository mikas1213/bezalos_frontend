import styles from './List.module.css';
import ListCard from './ListCard';

const List = ({ videos }) => {
    
    return (
        <div className={styles.list}>
            {/* <div className={styles.listInner}> */}
                {videos?.map(video => <ListCard video={video} key={video.id} /> )}
            {/* </div> */}
        </div>
    );
};

export default List;