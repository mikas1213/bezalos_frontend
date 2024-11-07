import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Main from '../components/UI/Main';
import Container from '../components/virtuve_video_page/Container';
import Filters from '../components/virtuve_video_page/Filters';
import Video from '../components/virtuve_video_page/Video';
import List from '../components/virtuve_video_page/List';
import NotFoundVideo from '../components/virtuve/NotFoundVideo';
import { jwtDecode } from "jwt-decode";
import useAuth  from '../hooks/useAuth';
import toast from 'react-hot-toast';

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
    const onDeleteVideoComment = async (id, user_id) => {
        try {
            await axiosPrivate.delete(`/videos/comment/${id}/${user_id}`); 
            setTimeout(() => {
                setComments(prevPrev => prevPrev.filter(v => v.id !== id));
            }, 400);
        } catch (err) {
            toast.error('Kažkas negerai');
        }
    };

    const onToggleLikes = async (video_id, user_id) => {
        try {
            const like = await axiosPrivate.post(`/videos/like/${video_id}/${user_id}`); 
            setIsLike(like.data.isLiked);
            setLikesCount(like.data.likesCount);
        } catch (err) {
            toast.error('Kažkas negerai');
        }
    };
    
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get('/videos'); 
                setVideos(data.data.videos);
            } catch (err) {
                console.log(err.message)
            }
        }
        getData();
    }, []);

    useEffect(() => {
        if(document.getElementsByTagName('main')[0] !== undefined) {
            document.getElementsByTagName('main')[0].scrollIntoView({behavior: 'smooth'});
        }
        const getData = async () => {
            try {
                const video = await axiosPrivate.get(`/videos/${params.video}`);
                
                document.title = `Be Žalos | ${video.data.video.title}`;
                setVideo({...video.data.video, url: video.data.url, 
                    // is_liked: video.data.is_liked, 
                    // likes_count: video.data.likes_count
                });
                setIsLike(video.data.is_liked);
                setLikesCount(video.data.likes_count);
                setComments(() => {
                    return video.data.video.video_comments[0] !== null ? video.data.video.video_comments : []
                });
                
                setIsLoadingVideo(false);
            } catch(err) {
                if(err.response.status === 402) navigate('/prenumeruoti');
                setIsError(true);
                setVideos(err.response.data.videos);
            }
        };
        
        getData();
    }, [params.video, axiosPrivate, navigate]);
    
    return (
        <>
            <Navbar />
            <Main>
                {!isError ? <Container>
                        {!isError && <Filters handleClick={handleFilter} filter={filter}/>}
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
