import styles from './Videos.module.css';
import Container from './Container';
import Filters from './Filters';
import Card from './Card';
import Spinner from '../../components/UI/Spinner';
import NotFoundVideo from './NotFoundVideo';

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
    
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Videos = ({user_id, u_status, s_status}) => {
    const [videos, setVideos] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const axiosPrivate = useAxiosPrivate();
    const searchItem = searchParams.get('search');

    let queryParams = '';
    let queryString = '/videos';
    const paramsArr = ['vebinaras', 'trumpai', 'emocinis', 'mityba', 'psichologija'];

    if(paramsArr.includes(searchParams.get('cat')) || searchParams.get('search')) {
        for(const [key, val] of searchParams.entries()) queryParams = queryParams + `${key}=${val}&`;
    } 

    if(queryParams) queryString = queryString + `?${queryParams.slice(0, -1)}`;
    
    useEffect(() => {
        async function getData(signal) {
            setIsLoading(true);
            const { data } = await axiosPrivate.get(queryString, { signal });
            setVideos(data);
            setIsLoading(false);
        }

        const controller = new AbortController();
        getData(controller.signal);
        
        return () => controller.abort();
        
    }, [queryString, axiosPrivate]);
    
    return (
        <Container>
            <Filters searchItem={searchItem} />
            {isLoading ? <Spinner /> : videos?.length === 0
                ? <NotFoundVideo />
                : <div className={styles.videos}>
                    {videos?.map(video => <Card 
                        key={video.id} 
                        video={video} 
                        user_id={user_id} 
                        u_status={u_status} 
                        s_status={s_status} 
                    />)}

                </div>
            }
        </Container>
    );
};

export default Videos;