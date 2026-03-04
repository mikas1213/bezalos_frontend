import styles from './List.module.css';
import ListCard from './ListCard';

const List = ({ videos, filter }) => {
    console.log('List videos', videos);
    console.log('filter: ', filter);
    console.log(videos?.filter(v => v.search_tag?.indexOf(filter) > -1).length)
    return (
        <div className={styles.list}>      
            {videos?.filter(v => v.search_tag?.indexOf(filter) > -1).map(video => <ListCard video={video} key={video.id} /> )}
        </div>
    );
};

export default List;