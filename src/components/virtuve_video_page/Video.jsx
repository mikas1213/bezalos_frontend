// import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import styles from './Video.module.css';
import { useState } from 'react';

const Video = ({ video, isLoading, comments }) => {
    const [showMore, setShowMore] = useState(false);
    const desc = video?.description || '';
    const [showComments, setShowComments] = useState(false);
    // const [desc, list] = full_desc.split(':');
    
    
    return (
        <div className={styles.video}>
            {!isLoading && <video 
                onContextMenu={ event => event.preventDefault() }
                controls={true}
                // autoPlay
                poster="data:image/gif,0000"
                playsInline
                controlsList='nodownload' 
                width='100%'
            >
                <source src={video?.url+'#t=0.0'} type='video/mp4' />
            </video>}
            
            <div className={styles.cardBottom}>
                <div className={styles?.title}>
                    {video?.title}
                </div>

                <div className={styles.description}>
                    {desc.length <  180 ? desc : <>
                        { showMore ? desc+' ' : desc.substring(0, 180)+'... '}
                     
                        <span 
                            className={styles.showMore} 
                            onClick={() => setShowMore(show => !show)}>
                            {showMore ? 'mažiau' : 'daugiau'}
                        </span>
                    </>}
                </div>

                <div className={styles.divider}></div>

                <div className={styles.commentsLikesHeader}>
                    <div className={styles.commentsCount} onClick={() => setShowComments(show => !show)}>
                        <span>Komentarai</span>&nbsp;
                        <span>({comments.length})</span>
                    </div>
                    {/* <div className={styles.likesCount}> */}
                    <div className={styles.like}>
                        <FaRegHeart className={styles.icon}/> <span>10</span>
                    </div>
                    {/* </div> */}
                </div>

                <div className={styles.writeComment}>
                    <div className={styles.avatar}>
                        <span className={styles.userName}>M</span>
                    </div>
                    <form className={styles.writeCommentForm}>
                        <input  type="text" placeholder='Pridėti komentarą' />
                    </form>
                    
                </div>

                <div className={`${styles.comments} ${showComments ? styles.show : ''}`}>
                    {comments.map(v => <li>{v.comment}</li>)}   
                </div>
            </div>
        </div>
    );
};

export default Video;