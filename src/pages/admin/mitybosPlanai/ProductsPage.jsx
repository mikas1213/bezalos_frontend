import Products from '../../../components/admin/nutrition_plans/products/Products';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useState, useEffect } from 'react';
import Navbar from '../../../components/admin/nutrition_plans/Navbar';
import AddProduct from '../../../components/admin/nutrition_plans/products/AddProduct';
import SearchInput from '../../../components/admin/nutrition_plans/SearchInput';
import { default as CategorySelect } from 'react-select';
import toast from 'react-hot-toast';

const categoryOptions = [
    { value: 'Riebūs baltymai', label: 'Riebūs baltymai'},
    { value: 'Liesi baltymai', label: 'Liesi baltymai' },
    { value: 'Angliavandeniai', label: 'Angliavandeniai' },
    { value: 'Riebalai', label: 'Riebalai' },
    { value: 'Vaisiai/uogos', label: 'Vaisiai / uogos' }
];

const categorySelectStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid #ccc',
        boxShadow: state.isFocused ? 'none' : state.borderColor,
        borderColor: state.isFocused ? 'none' : state.borderColor,
        '&:hover': {
            border: '1px solid #999',
            cursor: 'pointer'
        },
        fontSize: '13px',
        padding: 0,
        height: '32px',
        minHeight: '0px',
        minWidth: '165px',
        width: '100%'
        // '@media only screen and (max-width: 375px)': {
        //     ...baseStyles['@media only screen and (max-width: 375px)'],
        //     fontSize: '4.5rem',
        // },
    }),
    option:(provided, state) => ({
        ...provided,
        cursor: 'pointer',
        height: '2.1rem',
        fontSize: '0.8rem',
        backgroundColor: state.isSelected ? '#245D6B' : state.isFocused ? '#245D6B11' : '#fff',
        color: state.isSelected ? '#fff' : state.isFocused ? '#245D6B' : '#777',
        '&:hover': {
            backgroundColor: state.isSelected ? '#245D6B' : '#245D6B11',
            color: state.isSelected ? '#fff' : '#245D6B',
        }
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '32px',
        paddingTop: 0,
        paddingBottom: 0,
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        minHeight: 0,
        height: '30px',
    })
}

const ProductsPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    useEffect(() => {

        let filters = {};
        filters = categoryFilter ? {filter: categoryFilter} : filters;
        filters = searchFilter ? {search: searchFilter} : filters;
        
        let queryString = Object.keys(filters).length ? '?' + new URLSearchParams(filters).toString() : '';
        const getData = async (signal) => {
            try {
                const data = await axiosPrivate.get(`/admin/plans/products${queryString}`, { signal });
                setProducts(data?.data?.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();

    }, [axiosPrivate, categoryFilter, searchFilter]);

    const handleAddProduct = newProduct => {
        // if(newProduct.sub_category === 'null') newProduct.sub_category = null;
        setProducts(prevState => [newProduct, ...prevState]);
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
            toast.error('Klaida!')
        }
    };

    const handleDeleteProduct = async id => {
        try {
            await axiosPrivate.delete(`/admin/plans/products/${id}`);
            setTimeout(() => {
                setProducts(products => products.filter(product => product.id !== id));
            }, 500);
        } catch (err) {
            toast.error('Klaida!')
        }
    };

    return (
        <>
            <Navbar>
                <AddProduct handleAddProduct={handleAddProduct} />
                <CategorySelect 
                    options={categoryOptions} 
                    styles={categorySelectStyles} 
                    isSearchable={false}
                    placeholder='Kategorija'
                    onChange={e => setCategoryFilter(e.value)}
                />
                <SearchInput onChangeValue={setSearchFilter} />
            </Navbar>

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