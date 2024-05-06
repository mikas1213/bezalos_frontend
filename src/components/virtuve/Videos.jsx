import styles from './Videos.module.css';
import Container from './Container';
import Filters from './Filters';
import Card from './Card';
import Spinner from '../../components/UI/Spinner';
import NotFoundVideo from './NotFoundVideo';

import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Videos = () => {
    const [videos, setVideos] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const searchItem = searchParams.get('search');
   
    let queryParams = '';
    let queryString = '/videos';
    const paramsArr = ['vebinaras', 'mokymai', 'emocinis', 'mityba', 'psichologija'];

    if(paramsArr.includes(searchParams.get('cat')) || searchParams.get('search')) {
        for(const [key, val] of searchParams.entries()) queryParams = queryParams + `${key}=${val}&`;
    } 

    if(queryParams) queryString = queryString + `?${queryParams.slice(0, -1)}`;
    
    useEffect(() => {
        async function getData(signal) {
            setIsLoading(true);
            const data = await axios.get(queryString, { signal });
            
            setVideos(data.data.videos);
            setIsLoading(false);
        }

        const controller = new AbortController();
        getData(controller.signal);

        return () => controller.abort();
        
    }, [queryString]);
    
    return (
        <Container>
            <Filters searchItem={searchItem} />
                {isLoading ? <Spinner /> : videos?.length === 0
                    ? <NotFoundVideo />
                    : <div className={styles.videos}>
                        {videos?.map(video => <Card key={video.id} video={video} />)}
                    </div>
                }
        </Container>
    );
};

export default Videos;