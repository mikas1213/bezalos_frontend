import { useState, useEffect } from 'react';
import axios from '../../api/axios';

const usePaslaugos = () => {
    const [paslaugos, setPaslaugos] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/services');
            setPaslaugos(data);
            setIsloading(false);
        };

        getData();
    }, []);

    return { paslaugos, isLoading};
};

export default usePaslaugos;