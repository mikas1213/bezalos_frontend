import { useRef, useState } from 'react';
import { default as LogicSelect } from 'react-select';
import { default as AddProductSelect } from 'react-select/async';

import { axiosPrivate } from '../../../../api/axios';
import { DeleteX_icon } from '../../../../svg/icons';
import { kcal } from '../../../../utils/calculationsHelpers';

import CheckboxMeal from './CheckboxMeal';
import ProdItem from './ProdItem';

import styles from './Meal.module.css';

const Meal = ({
	meal,
	handleMealUpdate,
	handleMealDelete,
	handleMealProductAdd,
	handleMealProductEdit,
	handleMealProductDelete,
}) => {
	let color = '';
	switch (meal.logic) {
		case 'A+B':
			color = '#30c040';
			break;
		case 'B+R':
			color = '#245D6B';
			break;
		case 'A+R':
			color = '#ec9f11';
			break;
		default:
			color = '';
	}

	const form = useRef(null);
	const deletedMealRef = useRef(null);

	const options = [
		{ value: 'A+B', label: 'A+B', name: 'logic' },
		{ value: 'B+R', label: 'B+R', name: 'logic' },
		{ value: 'A+R', label: 'A+R', name: 'logic' },
	];

	const [isMenuOpen, setIsMenuOpen] = useState('');

	const customLogicStyles = {
		control: (provided) => ({
			...provided,
			'&:hover': { cursor: 'pointer' },
			borderWidth: 2,
			boxShadow: color,
			borderColor: color,
			fontSize: 16,
			fontWeight: 600,
			minWidth: 50,
			minHeight: 0,
			height: 28,
		}),
		valueContainer: (provided) => ({
			...provided,
			padding: 0,
		}),
		singleValue: (provided) => ({
			...provided,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			color,
		}),
		menu: (provided) => ({
			...provided,
			padding: 0,
			marginTop: 8,
			boxShadow: '0 2px 10px rgba(0,0,0,.2)',
		}),
		option: (provider, state) => ({
			...provider,
			fontSize: '0.9rem',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: 30,
			backgroundColor: state.isSelected ? color : state.isFocused ? '#245D6B11' : '#fff',
			'&:hover': {
				cursor: 'pointer',
				backgroundColor: state.isSelected ? color : '#245D6B11',
				color: state.isSelected ? '#fff' : '#333',
			},
		}),
	};

	const customAddProdStyles = {
		container: (provider) => ({
			...provider,
			width: '100%',
		}),
		control: (provider, state) => ({
			...provider,
			'&:hover': {
				cursor: 'pointer',
				borderColor: !state.isFocused ? '#ccc' : '#245D6B',
				boxShadow: !state.isFocused ? '#ccc' : '#245D6B',
			},
			boxShadow: state.isFocused ? '#245D6B' : '#ddd',
			borderColor: state.isFocused ? '#245D6B' : '#ddd',
			fontSize: 12,
			minHeight: 0,
			height: 28,
		}),
		valueContainer: (provider) => ({
			...provider,
			minHeight: 0,
			height: 28,
		}),
		singleValue: (provider) => ({
			...provider,
			color: '#999',
			minHeight: 0,
		}),
		input: (provider) => ({
			...provider,
			minHeight: 0,
		}),
		// loadingIndicator: (provider) => ({
		//     ...provider,
		//     color: 'red',
		//     height: 1,
		//     width: 1
		// }),
		menu: (provider) => ({
			...provider,
			marginTop: 2,
			boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
		}),
		option: (provider, state) => ({
			...provider,
			fontSize: 13,
			fontWeight: 500,
			padding: '3px 5px 3px 5px',
			borderBottom: '0.5px solid #ccc',
			backgroundColor: state.isFocused ? '#245D6B' : '#fff',
			color: state.isFocused ? '#fff' : '#245D6B',

			'&:hover': { cursor: 'pointer', backgroundColor: '#245D6B', boxShadow: '#245D6B' },
		}),
	};

	const [mealData, setMealData] = useState({
		logic: { value: meal.logic, label: meal.logic, name: 'logic' },
		intolerance: meal.intolerance,
		title: meal.title,
	});

	const [addProduct, setAddProduct] = useState({
		label: 'ieškoti...',
		value: 'ieškoti',
	});

	const onEditMeal = (e) => {
		const name = e?.name || e.target.name;
		switch (name) {
			case 'logic':
				setMealData((prevState) => ({ ...prevState, logic: e }));
				handleMealUpdate(meal.id, name, e.value);
				break;
			case 'intolerance':
				setMealData((prevState) => ({
					...prevState,
					[e.target.name]:
						mealData.intolerance === e.target.value ? null : e.target.value,
				}));
				handleMealUpdate(
					meal.id,
					name,
					mealData.intolerance === e.target.value ? null : e.target.value,
				);
				break;
			case 'title':
				setMealData((prevState) => ({ ...prevState, title: e.target.value }));
				break;
			default:
				return;
		}
	};

	const onDeleteMeal = (meal_id) => {
		const confirm = window.confirm('Trinti valgį?');
		if (confirm) {
			deletedMealRef.current.classList.add(styles.deleted);
			setTimeout(() => {
				handleMealDelete(meal_id);
			}, 500);
		}
	};

	const onAddMealProduct = (new_prod) => {
		setAddProduct({ value: 'ieškoti...', label: 'ieškoti...' });
		handleMealProductAdd({ ...new_prod, meal_id: meal.id });
	};

	const loadProductOptions = (inputValue, callback) => {
		if (inputValue && inputValue.length > 2) {
			axiosPrivate
				.get(`/admin/plans/products?search=${inputValue}`)
				.then((response) => {
					const options = response.data.map((item) => ({
						label: item.title,
						value: item.id,
						b_100: +item.proteins,
						a_100: +item.carbs,
						r_100: +item.fat,
					}));

					callback(options);
				})
				.catch(() => {
					callback([]);
				});
		}
	};

	return (
		<div ref={deletedMealRef} className={styles.meal}>
			<div className={styles.mealHeader}>
				<div className={styles.mealParams}>
					<LogicSelect
						isSearchable={false}
						components={{ DropdownIndicator: null, IndicatorSeparator: null }}
						styles={customLogicStyles}
						defaultOptions={[mealData.logic]}
						name="logic"
						options={options}
						onChange={onEditMeal}
						value={mealData.logic}
					/>

					<CheckboxMeal
						id={meal.id}
						label="be glitimo"
						value="gluten_free"
						check={mealData.intolerance}
						onEditMeal={onEditMeal}
					/>
					<CheckboxMeal
						id={meal.id}
						label="be laktozės"
						value="lactose_free"
						check={mealData.intolerance}
						onEditMeal={onEditMeal}
					/>
					<span onClick={() => onDeleteMeal(meal.id)}>
						<DeleteX_icon icon={styles.icon} />
					</span>
				</div>
				<form
					className={styles.title}
					onSubmit={(e) => {
						form.current.blur();
						e.preventDefault();
					}}
				>
					<input
						ref={form}
						type="text"
						name="title"
						value={mealData.title}
						onChange={onEditMeal}
						onBlur={(e) => handleMealUpdate(meal.id, e.target.name, e.target.value)}
					/>
				</form>
			</div>

			<div className={styles.products}>
				{meal.products.map((prod) => (
					<ProdItem
						key={prod.id}
						prod={prod}
						handleMealProductEdit={handleMealProductEdit}
						handleMealProductDelete={handleMealProductDelete}
					/>
				))}
				<div className={styles.addProduct}>
					<AddProductSelect
						components={{
							DropdownIndicator: null,
							IndicatorSeparator: null,
							LoadingIndicator: null,
						}}
						cacheOptions
						menuPosition="fixed"
						isSearchable={true}
						loadOptions={loadProductOptions}
						defaultOptions={false}
						loadingMessage={() => null}
						menuIsOpen={isMenuOpen.length > 2}
						styles={customAddProdStyles}
						name="product_id"
						onChange={onAddMealProduct}
						onInputChange={setIsMenuOpen}
						value={addProduct}
					/>
				</div>
			</div>

			<div className={styles.bar}>
				<div>
					<span>B</span>
					<span>{Math.round(meal.b)} g</span>
				</div>
				<div>
					<span>A</span>
					<span>{Math.round(meal.a)} g</span>
				</div>
				<div>
					<span>R</span>
					<span>{Math.round(meal.r)} g</span>
				</div>
				<div className={styles.kcal}>
					<span>Kcal</span>
					<span>{Math.round(kcal(meal.b, meal.a, meal.r))} kcal</span>
				</div>
			</div>
		</div>
	);
};

export default Meal;
