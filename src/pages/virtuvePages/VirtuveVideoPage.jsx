import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth  from '../../hooks/useAuth';

import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/virtuve_video_page/Container';
import Filters from '../../components/virtuve_video_page/Filters';
import Video from '../../components/virtuve_video_page/Video';
import List from '../../components/virtuve_video_page/List';
import NotFoundVideo from '../../components/virtuve/NotFoundVideo';

const VirtuveVideoPage = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const { auth }  = useAuth();
    let loggedUser = {};
    if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);

    const { user_id = '', user_name = ''} = loggedUser;
    const params = useParams();
    const [video, setVideo] = useState();
    const [videos, setVideos] = useState();
    const [comments, setComments] = useState(video?.data?.video.video_comments);
    const [isLike, setIsLike] = useState();
    const [likesCount, setLikesCount] = useState();
    const [isLoadingVideo, setIsLoadingVideo] = useState(true);
    const [isError, setIsError] = useState(false);
    const [filter, setFilter] = useState('');
    
    const handleFilter = (fil) => {
        setFilter(fil)
    }
    const onAddVideoComment = (comment) => {
        setComments(com => [comment, ...com]);
    };
    const onDeleteVideoComment = async id => {
        try {
            await axiosPrivate.delete(`/comments/${id}`); 
            setTimeout(() => {
                setComments(prevPrev => prevPrev.filter(v => v.id !== id));
            }, 400);
        } catch (err) {
            toast.error(err.response.data.message || 'Serverio klaida');
        }
    };

    const onToggleLikes = async (video_id) => {
        try {
            const { data } = await axiosPrivate.post(`/likes/video`, {entity_id: video_id, category: 'video'}); 
            setIsLike(data.isLiked);
            setLikesCount(data.likesCount);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Serverio klaida');
        }
    };
    
    useEffect(() => {
        document.body.style.backgroundColor = '#fff';
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get(`/videos${params.type === 'c' ? `?cat=kursai` : ''}`); 
                setVideos(data);
            } catch (err) {
                console.log(err.message)
            }
        }
        getData();
    }, [axiosPrivate, params.video, params.type]);

    useEffect(() => {
        let isMounted = true;
        if(document.getElementsByTagName('main')[0] !== undefined) {
            document.getElementsByTagName('main')[0].scrollIntoView({behavior: 'smooth'});
        }
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get(`/videos/${params.type}/${params.video}`);
                document.title = `Be žalos | ${data.title}`;
                if(isMounted) {
                    setVideo({...data, url: data.s3_video_url});
                    setIsLike(data.is_liked);
                    setLikesCount(data.likes_count);
                    setComments(data.video_comments);
                    setIsLoadingVideo(false);
                }
                
            } catch(err) {
                if (isMounted) {
                    if(err.response.status === 402 && err.response.data.type === 'subscription') {
                        navigate('/prenumeruoti', { replace: true });
                    } else if(err.response.status === 402 && err.response.data.type === 'course') {
                        navigate('/isigyti-kursa', { replace: true });
                    } else {
                        setIsError(true);
                        setVideos(err.response.data.videos);
                    }
                }
            }
        };

        getData();
        return () => {
            isMounted = false;
        };
    }, [params.video, params.type, axiosPrivate, navigate]);
    
    return (
        <>
            <Navbar />
            <Main>
                {!isError ? <Container>
                    {!isError && <Filters handleClick={handleFilter} filter={filter} />}
                    {!isLoadingVideo && !isError && <Video 
                        key={video.url} 
                        video={video} 
                        user_id={user_id} 
                        user_name={user_name}
                        comments={comments}
                        isLike={isLike}
                        likesCount={likesCount}
                        onToggleLikes={onToggleLikes}
                        onAddVideoComment={onAddVideoComment}
                        onDeleteVideoComment={onDeleteVideoComment}
                    />}
                    {!isLoadingVideo && !isError && <List videos={videos} filter={filter} />}
                </Container> : <NotFoundVideo />}
            </Main>
        </>
    );
};

export default VirtuveVideoPage;
