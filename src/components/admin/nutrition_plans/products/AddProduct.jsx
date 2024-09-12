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
    { value: 'null', label: 'Be subkategorijos' },
    { value: 'pieno produktas', label: 'Pieno produktas'},
    { value: 'uzkandis', label: 'Užkandis' },
];
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid #ccc',
        // border: !state.isFocused || !state.isSelected ? '1px solid #ccc' : '1px solid #245D6B',
        boxShadow: state.isFocused ? 'none' : state.borderColor,
        borderColor: state.isFocused ? 'none' : state.borderColor,
        
        // borderColor: state.isFocused ? '#000' : '#c0f',
        '&:hover': {
            border: '1px solid #999',
            cursor: 'pointer'
        },
        fontSize: '13px',
        padding: 0,
        height: '30px',
        minHeight: '0px',
        width: '165px',
        
        // '@media only screen and (max-width: 375px)': {
        //     ...baseStyles['@media only screen and (max-width: 375px)'],
        //     fontSize: '4.5rem',
        // },
    }),
    singleValue: (provided) =>({
        ...provided,
        color: '#555',
        // borderColor: '#0ff'
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
        // minHeight: '50px',
        // height: '50px',
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
    }),
    // dropdownIndicator: provider => ({
        // ...provider,
        // fontSize: '20px'
    // }),
    // clearIndicator: provider => ({
        // ...provider,
        // padding: '5px',
        // fontSize: '20px'
    // })
    // input: (provided, state) => ({
        // ...provided,
        // margin: '0px',
        // lineHeight: '5px'
    // }),

    // container: (baseStyles) => ({
    //     ...baseStyles,
        
    //     paddingRight: 20,
    // }),
}

const AddProduct = ({ handleAddProduct }) => {
    const [formData, setFormData] = useState({});
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
            <button>Pridėti</button>
        </form>
    );
};

export default AddProduct;