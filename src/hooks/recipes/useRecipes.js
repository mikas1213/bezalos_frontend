import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from '../../api/axios';

export const useRecipes = (filters, user_id) => {
    const recipesPerPage = 16;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [mostLiked, setMostLikde] = useState([]);
    const isFirstRender = useRef(true);

    const query = new URLSearchParams({
        ...filters, 
        page: currentPage, 
        limit: recipesPerPage
    }).toString();

    useEffect(() => {
        document.body.style.backgroundColor = '#fff'; 
        document.title = 'Be žalos | Receptai';
        const fetchData = async () => {
            try {
                const { data: { rows, most_liked, total_rows, total_pages, current_page }} = await axios.post(`/recipes?${query}`, {id: user_id});
                
                setCurrentPage(current_page);
                setTotalPages(total_pages);
                setTotalRows(total_rows);
                setRecipes(rows);
                setMostLikde(most_liked);
                setIsLoading(false);
            } catch (err) {
                toast.error(err.response?.data?.message || 'Error fetching recipes');
            } finally {
                setIsLoading(false);
            }
        };

        if (isFirstRender.current) {
            fetchData();
            isFirstRender.current = false;
        } else {
            const timeoutId = setTimeout(fetchData, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [query, user_id]);

    return { 
        isLoading,
        recipes,
        setRecipes,
        currentPage,
        setCurrentPage,
        totalPages,
        totalRows,
        mostLiked
    }
};