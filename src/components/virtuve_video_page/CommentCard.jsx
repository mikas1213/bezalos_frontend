import styles from './CommentCard.module.css';
import { useRef } from 'react';

const Bin = () => {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none' 
            xmlns='http://www.w3.org/2000/svg'
            className={styles.icon}
        >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'/>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
            <g id='SVGRepo_iconCarrier'> 
                <path d='M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4' strokeWidth='1.5' strokeLinecap='round'/> 
                <path d='M20.5 6H3.49988' strokeWidth='1.5' strokeLinecap='round'/> 
                <path d='M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5' strokeWidth='1.5' strokeLinecap='round'/> 
                <path d='M9.5 11L10 16' strokeWidth='1.5' strokeLinecap='round'/> 
                <path d='M14.5 11L14 16' strokeWidth='1.5' strokeLinecap='round'/> 
            </g>
        </svg>
    );
}

const CommentCard = ({ name, comment, isBin, onDeleteVideoComment }) => {
    const delCom = useRef(null);
    const handleDeleteVideo = () => {
        delCom.current.classList.add(styles.deleted);
        onDeleteVideoComment(comment.id, comment.user_id);
    }
    
    return (
        <div className={styles.commentCard} ref={delCom}>
            {/* <div className={styles.userAvatar : styles.authorAvatar}`}>
                { name?.toUpperCase().substring(0, 1) }
            </div> */}
            {name !== "jat.sandra@gmail.com" ? 
                <div className={styles.userAvatar}>
                    { name?.toUpperCase().substring(0, 1) }
                </div>
                :
                <div className={styles.authorAvatar}>BŽ</div>
            }

            <div className={styles.comment}>
                { comment.comment }
            </div>

            {isBin && 
                <div className={styles.recycleBin} onClick={handleDeleteVideo}>
                    <span><Bin /></span>
                </div>
            }
        </div>
    );
};

export default CommentCard;