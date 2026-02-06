import { useAxiosPrivate } from '../features/auth';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

const useAdminRecipes = (filters) => {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true);
    const [adminRecipes, setAdminRecipes] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const query = new URLSearchParams({
        ...filters, 
        page: currentPage, 
        limit: 20
    }).toString();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { data, current_page, total_pages } } = await axiosPrivate.get(`/admin/recipes?${query}`);
                setTotalPages(total_pages);
                setCurrentPage(current_page);    
                setTotalPages(total_pages);
                setAdminRecipes(data);
                setIsLoading(false);
            } catch (err) {
                toast.error(err.response.data.message || err.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [axiosPrivate, currentPage, query]);

    return { isLoading, adminRecipes, setAdminRecipes, currentPage, setCurrentPage, totalPages }
};

export default useAdminRecipes;
