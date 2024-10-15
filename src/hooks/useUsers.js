import useAxiosPrivate from './useAxiosPrivate';
import { useState, useEffect } from 'react';

export const useUsers = (currentPage, search, sort) => {
    const pageSize = 20;
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const getData = async (page) => {
            try {
                const { data: { data, totalPage }} = await axiosPrivate.post(`/admin/users?search=${search}&page=${page}&pageSize=${pageSize}`, sort);
                setUsers(data);
                setTotalPages(totalPage);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getData(currentPage);
    }, [axiosPrivate, currentPage, sort, search, pageSize]);

    return { users, setUsers, isLoading, totalPages };
};