import useAxiosPrivate from './useAxiosPrivate';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

const useAdminRecipes = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true);
    const [adminRecipes, setAdminRecipes] = useState([]);
    const recipesPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosPrivate.get('/admin/recipes');

                setTotalPages(Math.ceil(data.length / recipesPerPage));
                            
                const indexOfLastRecipe = currentPage * recipesPerPage;
                const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
                const currentRecipes = data.slice(indexOfFirstRecipe, indexOfLastRecipe);

                setAdminRecipes(currentRecipes);
                setIsLoading(false);
            } catch (err) {
                toast.error(err.response.data.message || err.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [axiosPrivate, currentPage]);

    return { isLoading, adminRecipes, setAdminRecipes, currentPage, setCurrentPage, totalPages }
};

export default useAdminRecipes;