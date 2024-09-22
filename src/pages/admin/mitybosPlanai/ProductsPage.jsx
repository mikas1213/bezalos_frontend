import Products from '../../../components/admin/nutrition_plans/products/Products';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useState, useEffect } from 'react';
import Navbar from '../../../components/admin/nutrition_plans/products/Navbar';

const ProductsPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [queryStr, setQueryStr] = useState('');

    const handleAddProduct = newProduct => {
        if(newProduct.sub_category === 'null') newProduct.sub_category = null;
        setProducts(prevState => [newProduct, ...prevState]);
    };
    const handleDeleteProduct = async id => {
        try {
            await axiosPrivate.delete(`/admin/plans/products/${id}`);
            setTimeout(() => {
                setProducts(products => products.filter(product => product.id !== id));
            }, 500);
        } catch (err) {
            console.log(err.message);
        }
    };
    const handleEditProduct = async (prodId, prodCell, value) => {
        try {
            await axiosPrivate.patch('/admin/plans/products', {prodId, prodCell, value});
            const currentProducts = [...products];
            const index = currentProducts.findIndex(prod => prod.id === prodId);
            const currentProduct = currentProducts[index];
            currentProduct[prodCell] = value;
            currentProducts[index] = currentProduct;
            setProducts([...currentProducts]);
        } catch (err) {
            console.log('CIA: ', err.response.data.message);
        }
    };

    const handleSearchProduct = searchItem => {
        const {search = '', filter = ''} = searchItem;
        setQueryStr(() => {
            if(search && search.length > 2) {
                return '?search='+search;
            } else if(filter) {
                return '?filter='+filter;
            } else {
                return '';
            }
        });
    };
    
    useEffect(() => {
        const getData = async (signal) => {
            try {
                const data = await axiosPrivate.get(`/admin/plans/products${queryStr}`, { signal });
                setProducts(data.data.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();

    }, [axiosPrivate, queryStr, setQueryStr]);

    return (
        <>
            <Navbar 
                handleAddProduct={handleAddProduct} 
                handleSearchProduct={handleSearchProduct} 
            />  
            <Products 
                products={products} 
                isLoading={isLoading} 
                handleDeleteProduct={handleDeleteProduct}
                handleEditProduct={handleEditProduct}
            />
        </>
    );
};

export default ProductsPage;