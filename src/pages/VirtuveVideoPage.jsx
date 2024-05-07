import axios from '../api/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Main from '../components/UI/Main';
import Container from '../components/virtuve_video_page/Container';
import Video from '../components/virtuve_video_page/Video';
import Comments from '../components/virtuve_video_page/Comments';
import List from '../components/virtuve_video_page/List';
// import { jwtDecode } from "jwt-decode";
// import useAuth  from '../hooks/useAuth';

const VirtuveVideoPage = () => {
    // const { auth }  = useAuth();
    const params = useParams();
    const [video, setVideo] = useState();
    const [videos, setVideos] = useState();
    const [isLoading, setIsLoading] = useState(false);
    

    
    useEffect(() => {
        
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await axios.get(`/videos/${params.video}`); 
                const videos = await axios.get('/videos');
                
                setVideo(data.data);
                setVideos(videos.data.videos);

                setIsLoading(false);

            } catch(err) {
                console.log(err.message);
            }

        };
        getData();
    }, [params]);

    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <Video video={video} isLoading={isLoading}/>
                    <List videos={videos}/>
                    <Comments />
                </Container>
            </Main>
        </>
    );
};

export default VirtuveVideoPage;
