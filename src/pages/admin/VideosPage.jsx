import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const VideosPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get('/admin/videos');
                setVideos(data.data.videos);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message);
            }
        };
        getData();
    }, [axiosPrivate]);

    return (
        <div>
            {!isLoading && videos.map(video => {
                return (<p key={video.id}>{video.title} {video.duration}</p>);
            })}
        </div>
    );
};

export default VideosPage;