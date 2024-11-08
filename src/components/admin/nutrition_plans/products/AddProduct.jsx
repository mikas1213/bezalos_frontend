import styles from './AddProduct.module.css';
import Select from 'react-select';
import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';7
import toast from 'react-hot-toast';

const categoryOptions = [
    { value: 'Riebūs baltymai', label: 'Riebūs baltymai'},
    { value: 'Liesi baltymai', label: 'Liesi baltymai' },
    { value: 'Angliavandeniai', label: 'Angliavandeniai' },
    { value: 'Riebalai', label: 'Riebalai' },
    { value: 'Vaisiai/uogos', label: 'Vaisiai / uogos' }
];

const subCategoryOptions = [
    { value: '-', label: 'Be subkategorijos' },
    { value: 'pieno produktas', label: 'Pieno produktas'},
    { value: 'uzkandis', label: 'Užkandis' },
];

const intoleranceOptions = [
    { value: '-', label: 'Valgo viską' },
    { value: 'Be glitimo', label: 'Be glitimo' },
    { value: 'Be laktozės', label: 'Be laktozės'},
];

const foodTypeOptions = [
    {value: '-', label: 'Grupė'},
    {value: 'Mėsa', label: 'Mėsa'},
    {value: 'Žuvis', label: 'Žuvis'},
    {value: 'Kruopos', label: 'Kruopos'},
    {value: 'Pieno produktai', label: 'Pieno produktai'},
    {value: 'Ankštiniai', label: 'Ankštiniai'}
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: !state.isFocused && '1px solid #ccc',
        boxShadow: state.isFocused ? '#245D6B' : state.borderColor,
        borderColor: state.isFocused ? '#245D6B' : state.borderColor,

        '&:hover': {
            border: !state.isFocused && '1px solid #999',
            cursor: 'pointer'
        },
        fontSize: '13px',
        padding: 0,
        height: '32px',
        minHeight: '0px',
        width: '155px',
        '&placeholder': {color: 'red'}
    }),
    singleValue: (provided) =>({
        ...provided,
        color: '#777',
        
    }),
    option:(provider, state) => ({
        ...provider,
        fontSize: 13,
        borderBottom: '0.5px solid #ccc',
        backgroundColor: state.isFocused ? '#245D6B' : '#fff',
        color: state.isFocused ? '#fff' : '#245D6B',
        cursor: 'pointer',
        height: '2.1rem',
        '&:hover': { cursor: 'pointer', 
            backgroundColor: '#245D6B',
            boxShadow: '#245D6B'
        }
    }),
    valueContainer: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    // indicatorSeparator: base => ({
        // ...base,
        // minHeight: '1px',
        // height: '20px',

    //   }),
    indicatorsContainer: (provided) => ({
        ...provided,
        minHeight: 0,
        height: '30px',
    })
}

const AddProduct = ({ handleAddProduct }) => {
    const [formData, setFormData] = useState({intolerance: '-'});
    const handleFormData = (e1, e2) => {
        setFormData(prev => ({...prev, [e1.target?.name || e2.name]: e1.target?.value || e1.value}));
    };
    
    const reqexp = '([0-9]+)|([0-9]+[,.][0-9]+)';
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();
          
        try {
            const data = await axiosPrivate.post('/admin/plans/products', formData);
            handleAddProduct({...formData, id: data.data.id});
            setFormData({});
            toast.success('Produktas pridėtas');
            
        } catch (err) {
            toast.error('Neįvesti laukai:\n'+err.response?.data.errors.map(er => er.path).join('\n'));
        }
    };
    
    return (        
        <form className={styles.addProduct} onSubmit={handleSubmit}>
            <input type='text' value={formData.title || ''} name='title' placeholder='Pavadinimas' required={true} onChange={handleFormData} />
            <input type='text' value={formData.proteins || ''} pattern={reqexp} name='proteins' className={styles.macro} placeholder='b' required={true} onChange={handleFormData} />
            <input type='text' value={formData.carbs || ''} pattern={reqexp} name='carbs' className={styles.macro} placeholder='a' required={true} onChange={handleFormData} />
            <input type='text' value={formData.fat || ''} pattern={reqexp} name='fat' className={styles.macro} placeholder='r' required={true} onChange={handleFormData} />
            
            <Select 
                required={true}
                options={categoryOptions} 
                isSearchable={false}
                placeholder='Kategorija'
                styles={customStyles}
                name='category'
                defaultValue={formData.category}
                onChange={handleFormData}
            />
            <Select 
                required={true}
                options={subCategoryOptions} 
                isSearchable={false}
                placeholder='Sub kategorija'
                styles={customStyles}
                name='sub_category'
                defaultValue={formData.sub_category}
                onChange={handleFormData}
            />
            <Select 
                required={true}
                options={foodTypeOptions} 
                isSearchable={false}
                placeholder='Grupė'
                styles={customStyles}
                name='group'
                defaultValue={foodTypeOptions[0]}
                onChange={handleFormData}
            />
            <Select 
                required={true}
                options={intoleranceOptions} 
                isSearchable={false}
                placeholder='Netoleravimas'
                styles={customStyles}
                name='intolerance'
                defaultValue={intoleranceOptions[0]}
                onChange={handleFormData}
            />
            <button>Pridėti</button>
        </form>
    );
};

export default AddProduct;