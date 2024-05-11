import styles from './Comments.module.css';

const Comments = ({ comments, video_id }) => {
    console.log(video_id)
    return (
        <div className={styles.comments}>
            <div className={styles.commentsCount}>
                <span>{comments.length}</span>
                &nbsp;
                <span>Komentarų</span>
            </div>
            <ul>
               {comments.map(comment => <li key={comment.id}>
                    <b><span>{comment.name}</span></b>
                    &nbsp;
                    <span>{comment.comment}</span>
                </li>)}
            </ul>
        </div>
    );
};

export default Comments;