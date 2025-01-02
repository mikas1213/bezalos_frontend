import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const usePaslaugos = (id) => {
    const [paslauga, setPaslauga] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`/services/${id}`);
                if(!data.length) {
                    navigate('/paslaugos');
                    return;
                }
                setPaslauga(data[0]);
            } catch (err) {
                navigate('/paslaugos')
            } finally {
                setIsloading(false);
            }
        };

        getData();
    }, [id, navigate]);

    return { paslauga, setPaslauga, isLoading};
};

export default usePaslaugos;