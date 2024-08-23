import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState, useEffect } from 'react';


const MitybosPlanaiPage = () => {

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get(`/admin/plans`);
                console.log(data)

            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, []);

    return (
        <div>mitybos planai</div>
    );
};

export default MitybosPlanaiPage;