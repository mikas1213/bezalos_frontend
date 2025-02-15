import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';

const VideosPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get('/admin/videos');
                setVideos(data);
                setIsLoading(false);
            } catch (err) {
                toast.error(err.response.data.message || err.message);
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