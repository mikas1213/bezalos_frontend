import styles from './Videos.module.css';
import { roles } from '../../utils/roles';
import Container from './Container';
import Filters from './Filters';
import Card from './Card';
import Spinner from '../../components/UI/Spinner';
import NotFoundVideo from './NotFoundVideo';
import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../features/auth';
import { useSearchParams } from 'react-router-dom';

const Videos = ({user_id, user_role, u_status, s_status, is_course}) => {
    
    const [searchParams] = useSearchParams();
    const axiosPrivate = useAxiosPrivate();
    const searchItem = searchParams.get('search');

    let queryParams = '';
    let queryString = '/videos';
    const paramsArr = ['kursai', 'vebinaras', 'trumpai', 'emocinis', 'mityba', 'psichologija'];

    if(paramsArr.includes(searchParams.get('cat')) || searchParams.get('search')) {
        for(const [key, val] of searchParams.entries()) queryParams = queryParams + `${key}=${val}&`;
    } 

    if(queryParams) queryString = queryString + `?${queryParams.slice(0, -1)}`;

    const { data: videos, isLoading } = useQuery({
        queryKey: ['videos', queryString],
        queryFn: async () => {
            const response = await axiosPrivate.get(queryString);
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 min cache
        refetchOnWindowFocus: false, // Išjungiame auto-refetch kai langas vėl tampa aktyvus
    });
    
    return (
        <Container>
            <Filters searchItem={searchItem} />
            {isLoading ? <Spinner /> : videos?.filter(video => user_role === roles.admin ? video : video.is_active).length === 0
                ? <NotFoundVideo />
                : <div className={`${styles.videos} padding--b`}>
                    {videos?.filter(video => user_role === roles.admin ? video : video.is_active).map(video => <Card 
                        key={video.id} 
                        video={video} 
                        user_id={user_id} 
                        u_status={u_status} 
                        s_status={s_status} 
                        is_course={is_course}
                    />)}

                </div>
            }
        </Container>
    );
};

export default Videos;