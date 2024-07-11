import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { 
    FaHeart, 
    FaRegHeart 
} from "react-icons/fa6";

import styles from './Video.module.css';
import { useState} from 'react';

import CommentCard from "./CommentCard";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Send = ({active}) => {
    return (
        <svg 
            className={`${styles.icon} ${active}`}
            viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g id='SVGRepo_bgCarrier' strokeWidth='0'/>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
            <g id='SVGRepo_iconCarrier'> 
                <path d='M18.0693 8.50867L9.50929 4.22867C3.75929 1.34867 1.39929 3.70867 4.27929 9.45867L5.14929 11.1987C5.39929 11.7087 5.39929 12.2987 5.14929 12.8087L4.27929 14.5387C1.39929 20.2887 3.74929 22.6487 9.50929 19.7687L18.0693 15.4887C21.9093 13.5687 21.9093 10.4287 18.0693 8.50867ZM14.8393 12.7487H9.43929C9.02929 12.7487 8.68929 12.4087 8.68929 11.9987C8.68929 11.5887 9.02929 11.2487 9.43929 11.2487H14.8393C15.2493 11.2487 15.5893 11.5887 15.5893 11.9987C15.5893 12.4087 15.2493 12.7487 14.8393 12.7487Z' /> 
            </g>
        </svg>
    );
};

const Video = ({ user_id, user_name, video, comments, onToggleLikes, onAddVideoComment, onDeleteVideoComment, isLike, likesCount }) => {
    
    const axiosPrivate = useAxiosPrivate();
    const [showMore, setShowMore] = useState(false);
    const [desc1, desc2] = video.description.split(':');
    const desctList = desc2.trim().split('\n');

    const [showComments, setShowComments] = useState(false);
    const { register, 
        // formState: { errors }, 
        // setError, 
        watch, reset, handleSubmit } = useForm(
        {defaultValues: {
        video_id: video.id,
        user_id,
        user_name
      }}
    );
    
    const submit = async ({comment, video_id, user_id, user_name}) => {
        if(!watch('comment')) return;
        const new_comment = {
            id: uuidv4(), video_id, user_id, user_name, comment: comment?.trim()
        };
        onAddVideoComment(new_comment);
        
        try{
            await axiosPrivate.post('/videos/comment', new_comment);
            setShowComments(true);
            reset();
        } catch(err) {
            toast.error('Kažkas negerai');
        }
    };
    

    return (
        <div className={styles.video}>
            <video 
                className={styles[video.video_url === 'policistiniu-kiausidziu-sindromas' && 'gydytojaiCover']}
                onContextMenu={ event => event.preventDefault() }
                controls={true}
                poster="data:image/gif,0000"
                playsInline
                controlsList='nodownload' 
                width='100%'
            >
                <source src={video?.url+'#t=0.0'} type='video/mp4' />
            </video>
            
            <div className={styles.cardBottom}>
                <div className={styles?.title}>{video.title}</div>
                <div className={styles.descriptionContainer}>
                    <div>
                        {desc1}:
                    </div>
                    
                    <div className={`${styles.description} ${showMore ? styles.show : ''}`}>
                        <div className={styles.descriptionInner}>
                            {desctList.map((listItem, i) => <li key={i}>{listItem}</li>)}
                        </div>
                    </div>
                    <span 
                        className={styles.showMore} 
                        onClick={() => setShowMore(show => !show)}>
                        {showMore ? 'mažiau' : 'daugiau'}
                    </span>
                </div>


                <div className={styles.divider}></div>

                <div className={styles.commentsLikesHeader}>
                    <div className={styles.commentsCount} onClick={() => {
                        comments.length ? setShowComments(show => !show) : null;
                    }}>
                        <span>Komentarai</span>&nbsp;
                        <span>{comments.length}</span>
                    </div>

                    <div className={styles.like} onClick={() => onToggleLikes(video.id, user_id)}>
                        {isLike ? <FaHeart /> : <FaRegHeart />}
                        <span>{
                            +likesCount > 999 ? parseInt(likesCount / 1000)+'k+' : likesCount
                        }</span>
                    </div>
   
                </div>

                <div className={styles.writeComment}>
                    <div className={styles.avatar}>{user_name.toUpperCase().substring(0, 1)}</div>
                    <form className={styles.writeCommentForm} onSubmit={handleSubmit(submit)}>
                        <input 
                            type='text'
                            autoComplete='off'
                            placeholder='Pridėti komentarą' 
                            {...register('comment')}
                        />
                        <button type='submit'>
                            <Send active={watch('comment') ? styles.active : ''}/>
                        </button>
                    </form>
                </div>

                <div className={`${styles.commentsContainer} ${(showComments && comments.length) ? styles.show : ''}`}>
                    <div className={styles.comments}>
                        {comments[0] !== null && comments.map(v => 
                            <CommentCard 
                                key={v.id || Math.random()} 
                                name={v.user_name} 
                                comment={v}
                                isBin={user_id === v.user_id}
                                onDeleteVideoComment={onDeleteVideoComment}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;