import Navbar from '../../../components/admin/nutrition_plans/Navbar';
import { AddNewBtn } from '../../../components/admin/nutrition_plans/AddNewBtn';
import { ImPlus } from 'react-icons/im';
import SearchInput from '../../../components/admin/nutrition_plans/SearchInput';
import { RadioFilters } from '../../../components/admin/nutrition_plans/RadioFilters';
import { CheckBoxFilters } from '../../../components/admin/nutrition_plans/CheckBoxFilters';
import { Divider } from '../../../components/admin/nutrition_plans/Divider';
import { useState } from 'react';



const PlanaiPage = () => {
    const mealsFiltersOptions = [
        {value: 4, label: '4 V'},
        {value: 5, label: '5 V'},
        {value: 6, label: '6 V'}
    ];

    const [mealCountFilter, setMealCountFilter] = useState(null);
    const [search, setSearch] = useState('');
    const withoutMeatOptions = [
        {value: false, label: 'Be mėsos', name: '???'}
    ];
    console.log(mealCountFilter, search);
    return (
        <>
            <Navbar>
                <AddNewBtn label='Naujas planas' Icon={ImPlus} fontSize='1rem'/>
                <Divider />
                <RadioFilters 
                    options={mealsFiltersOptions} 
                    setFilter={mealCountFilter}
                    onSetFilter={setMealCountFilter}
                />   
                <Divider />
                <CheckBoxFilters grow={1} options={withoutMeatOptions} />
                <SearchInput onChangeValue={setSearch} />
            </Navbar>
        </>
    );
};

export default PlanaiPage;