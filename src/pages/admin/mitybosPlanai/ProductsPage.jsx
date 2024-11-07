import ProductRow, { ProductRowH } from '../../../components/admin/nutrition_plans/products/ProductRow';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useState } from 'react';
import Wrapper from './Wrapper';
import Navbar from '../../../components/admin/nutrition_plans/Navbar';
import AddProduct from '../../../components/admin/nutrition_plans/products/AddProduct';
import SearchInput from '../../../components/admin/nutrition_plans/SearchInput';
import { default as CategorySelect } from 'react-select';
import { useProducts } from '../../../hooks/nutrition_plans_hooks/useProducts';
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
        // minWidth: '150px',
        width: '140px',
        // width: '100%'
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
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    const [clickedProduct, setClickedProduct] = useState('');
    const [isClickedDelete, setIsClickedDelete] = useState(false);
    const [clickedCell, setClickedCell] = useState({});

    let filters = {};
    filters = categoryFilter ? {filter: categoryFilter} : filters;
    filters = searchFilter ? {search: searchFilter} : filters;

    const {products, setProducts, isLoading} = useProducts(filters);
    
    const handleAddProduct = newProduct => {
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
                    onChange={e => {setCategoryFilter(e.value); setSearchFilter('')}}
                />
                <SearchInput onChangeValue={setSearchFilter} setCategoryFilter={setCategoryFilter} />
            </Navbar>

            <Wrapper layout='products'>
                <ProductRowH count={products?.length}/>
                {!isLoading && products?.map(prod => 
                <ProductRow 
                    key={prod.id} 
                    product={prod}

                    clickedProduct={clickedProduct}
                    setClickedProduct={setClickedProduct}

                    setIsClickedDelete={setIsClickedDelete}
                    isClickedDelete={isClickedDelete}

                    clickedCell={clickedCell}
                    setClickedCell={setClickedCell}

                    handleEditProduct={handleEditProduct}
                    handleDeleteProduct={handleDeleteProduct}
                />)}
            </Wrapper>
        </>
    );
};

export default ProductsPage;