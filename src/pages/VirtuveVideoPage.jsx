import axios from '../api/axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Main from '../components/UI/Main';
import Container from '../components/virtuve_video_page/Container';
import Filters from '../components/virtuve_video_page/Filters';
import Video from '../components/virtuve_video_page/Video';
import List from '../components/virtuve_video_page/List';
import NotFoundVideo from '../components/virtuve/NotFoundVideo';
import { jwtDecode } from "jwt-decode";
import useAuth  from '../hooks/useAuth';

const VirtuveVideoPage = () => {
    
    const axiosPrivate = useAxiosPrivate();

    const { auth }  = useAuth();
    let loggedUser = {};
    
    if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    const { user_id = ''} = loggedUser;
    
    const params = useParams();
    const [video, setVideo] = useState();
    const [videos, setVideos] = useState();
    const [comments, setComments] = useState([]);
    const [isLoadingVideo, setIsLoadingVideo] = useState(true);
    const [isError, setIsError] = useState(false);
    const [filter, setFilter] = useState('');
    
    const handleFilter = (fil) => {
        setFilter(fil)
    }
    // const onHandleVideo = (videoo) => {
    //     console.log('cia: ', videoo)
    //     setVideo({...videoo});
    // };
    
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
        // window.scrollTo(0, -100);
        
        if(document.getElementsByTagName('main')[0] !== undefined) {
            document.getElementsByTagName('main')[0].scrollIntoView({behavior: 'smooth'});
        }
        const getData = async () => {
            try {
                const video = await axios.get(`/videos/${params.video}`);
                
                setVideo({...video.data.video, url: video.data.url});
                setIsLoadingVideo(false);
            } catch(err) {
                setIsError(true);
                setVideos(err.response.data.videos);
            }
        };
        
        getData();
    }, [params.video]);
    
    return (
        <>
            <Navbar />
            <Main>
                {!isError ? <Container>
                        <Filters handleClick={handleFilter} filter={filter}/>

                        {!isLoadingVideo && <Video user_id={user_id} video={video} />}
                        <List videos={videos} filter={filter} />
                </Container> : <NotFoundVideo />}
            </Main>
        </>
    );
};

export default VirtuveVideoPage;
