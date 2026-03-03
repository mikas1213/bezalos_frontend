import { useState, useEffect } from 'react';
import { axiosPublic } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const usePaslauga = (slug) => {
    const [paslauga, setPaslauga] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosPublic.get(`/services/${slug}`);                if(Object.keys(data).length === 0) {
                    navigate('/paslaugos');
                    return;
                }
                setPaslauga(data);
            } catch (err) {
                navigate('/paslaugos')
            } finally {
                setIsloading(false);
            }
        };

        getData();
    }, [slug, navigate]);

    return { paslauga, setPaslauga, isLoading};
};

export default usePaslauga;