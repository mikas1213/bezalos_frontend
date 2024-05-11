import axios from '../api/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Main from '../components/UI/Main';
import Container from '../components/virtuve_video_page/Container';
import Filters from '../components/virtuve_video_page/Filters';
import Video from '../components/virtuve_video_page/Video';
// import Comments from '../components/virtuve_video_page/Comments';
import List from '../components/virtuve_video_page/List';
import NotFoundVideo from '../components/virtuve/NotFoundVideo';
// import { jwtDecode } from "jwt-decode";
// import useAuth  from '../hooks/useAuth';

const VirtuveVideoPage = () => {
    // const { auth }  = useAuth();
    const params = useParams();
    const [video, setVideo] = useState();
    const [videos, setVideos] = useState();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [filter, setFilter] = useState('');
    
    const handleFilter = (fil) => {
        setFilter(fil)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await axios.get(`/videos/${params.video}`); 
                const video = {url: data.data.url , ...data.data.videos.find(v => v.video_url === params.video)};
                
                const users = data.data.users; 
                const comments = video.video_comments;
                const video_comments = [];

                if(comments[0] !== null) {
                    comments.map(comment => {
                        video_comments.push({
                            id: comment.comment_id,
                            name: users.find(user => user.id === comment.user_id).name,
                            comment: comment.comment
                        });
                    });
                }
                
                setVideo(video);
                setVideos(data.data.videos);
                setComments(video_comments);
                setIsLoading(false);
            } catch(err) {
                setIsError(true);
                setVideos(err.response.data.videos);
            }
        };
        
        getData();
    }, [params]);
    
    return (
        <>
            <Navbar />
            <Main>
                {!isError ? <Container>
                        <Filters handleClick={handleFilter} filter={filter}/>
                        <Video video={video} comments={comments} isLoading={isLoading}/>
                        {/* <Comments comments={comments} video_id={video?.id}/> */}
                        <List videos={videos} filter={filter}/>
                </Container> : <NotFoundVideo />}
            </Main>
        </>
    );
};

export default VirtuveVideoPage;
