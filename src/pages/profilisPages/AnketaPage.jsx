import { useState } from 'react';
import InformationSoon from '../../components/information_soon/InformationSoon';
import Container from '../../components/UI/Container';
import Anketa from '../../components/profilis/anketa/Anketa';
import ProgressBar from '../../components/profilis/anketa/ProgressBar';
import StepIndicator from '../../components/profilis/anketa/StepIndicator';
import StepInfo from '../../components/profilis/anketa/StepInfo';
import Pagination from '../../components/profilis/anketa/Pagination';

import FiziniaiDuomenys from '../../components/profilis/anketa/sections/FiziniaiDuomenys';
import Tikslai from '../../components/profilis/anketa/sections/Tikslai';
import DarboGrafikas from '../../components/profilis/anketa/sections/DarboGrafikas';
import Sveikata from '../../components/profilis/anketa/sections/Sveikata';
import DabartiniaiIprociai from '../../components/profilis/anketa/sections/DabartiniaiIprociai';
import Rutinos from '../../components/profilis/anketa/sections/Rutinos';
import PapildomaInfo from '../../components/profilis/anketa/sections/PapildomaInfo';

import { v4 as uuidv4 } from 'uuid';

const AnketaPage = () => {
    const [formData, setFormData] = useState({
        gender: 'Moteris',
        age: '',
        height: '',
        weight: '',
        activity_steps: '',
        goal: '',
        schedule: '',
        feeding: false,
        feeding_desc: '',
        health_problems: false,
        health_problems_desc: '',
        diet: false,
        diet_desc: '',
        intolerance: false, 
        intolerance_desc: '',
        breakfast: false,
        breakfast_time: '--:--',
        breakfast_desc: '',
        lunch: false,
        lunch_time: '--:--',
        lunch_desc: '',
        snack: false,
        snack_time: '--:--',
        snack_desc: '',
        dinner: false,
        dinner_time: '--:--',
        dinner_desc: '',
        routines: {
            workday: [{
                id: 'dfb14c64-7a61-4d3c-9e02-df3c8b55b28f',
                eat: 'Galiu valgyti betkada', 
                get_up: '08:00', 
                go_sleep: '22:30', 
                sport: '12:30',
                breakfast: '09:00',
                lunch: '13:15',
                snack: '16:10',
                dinner: '18:30'
            },
            {
                id: '4a9e56b1-6bf6-4286-a9de-e243c89dfd2b',
                eat: 'Negaliu valgyti betkada', 
                get_up: '07:15', 
                go_sleep: '23:00', 
                sport: '13:00',
                breakfast: '00:00',
                lunch: '00:00',
                snack: '00:00',
                dinner: '00:00'
            }],
            day_off: [{
                id: 'c1a853fa-553f-45a7-83d9-71215f19e707',
                eat: 'Galiu valgyti betkada', 
                get_up: '00:00', 
                go_sleep: '00:00', 
                sport: '00:00',
                breakfast: '00:00',
                lunch: '00:00',
                snack: '00:00',
                dinner: '00:00'
            }]
        } 
    });
    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 7;

    const steps = [
        { id: 1, title: 'Fiziniai duomenys', icon: '👤' },
        { id: 2, title: 'Tikslas', icon: '🎯' },
        { id: 3, title: 'Darbo grafikas', icon: '📅' },
        { id: 4, title: 'Sveikata', icon: '💚' },
        { id: 5, title: 'Dabartiniai tavo mitybos įpročiai', icon: '🍽️' },
        { id: 6, title: 'Nauja tavo mitybos rutina', icon: '📋' },
        { id: 7, title: 'Papildoma informacija', icon: '📝' },
    ];
    const handleForm = (e, prop, id) => {
        
        let name = e.target?.name || e.current?.name || e?.name;
        const value = e.target?.value ?? e.current?.value ?? e?.value ?? '';

        setFormData(prev => {
            if(['breakfast', 'lunch', 'snack', 'dinner'].includes(name) && !prev[name]) {
                
                return ({...prev, [name]: value, [`${name}_desc`]: '', [`${name}_time`]: '00:0-'});
            }

            if(['feeding', 'health_problems', 'diet', 'intolerance'].includes(name) && prev[name]) {
                return ({...prev, [name]: value, [`${name}_desc`]: ''});
            }

            if(['workday', 'day_off'].includes(prop)) {
                if(name.indexOf('eat') > -1) name = name.split('_').shift();
                const index = prev.routines[prop].findIndex(el => el.id === id);

                if(index > -1) {
                    const updatedRoutines = prev.routines[prop].map((routine, i) => i === index ? { 
                        ...routine, [name]: value 
                    } : routine);
                    return {
                        ...prev,
                        routines: { ...prev.routines, [prop]: updatedRoutines }
                    };
                }
            }

            return ({...prev, [name]: value});
        });
    }

    const addRoutine = (routine) => {
        setFormData(prev => ({
            ...prev,
            routines: {
                ...prev.routines,
                [routine]: [...prev.routines[routine], {
                    id: uuidv4(),
                    eat: 'Galiu valgyti betkada', 
                    get_up: '00:00', 
                    go_sleep: '00:00', 
                    sport: '00:00',
                    breakfast: '00:00',
                    lunch: '00:00',
                    snack: '00:00',
                    // dinner: '00:00'
                }]
            }
        }));
    };

    const deleteRoutine = (type, id) => {
        setFormData(prev => ({
            ...prev,
            routines: {
                ...prev.routines,
                [type]: [...prev.routines[type].filter(r => r.id !== id)]
            }
        }));
    };

    const isValidFormPage = () => {

        setErrors({});
        if(currentStep === 1) {
            const requiredFields = ['age','height', 'weight', 'activity_steps'];

            let newErrors = {};
            requiredFields.forEach(field => {
                if(formData[field].trim() === '') {
                    newErrors[field] = `Laukas yra privalomas`;
                } else if(isNaN(formData[field].replace(',', '.'))) {
                    newErrors[field] = `Įvesti galima tik skaičius`;
                } else if (Number(formData[field].replace(',', '.')) < 0) {
                    newErrors[field] = `Skaičiai turi būti tik teigiami`;
                }
            });

            setErrors(prev => ({...prev, ...newErrors}));
            return Object.keys(newErrors).length === 0;

        } else if(currentStep === 2) {
            let newErrors = {};
            if(formData.goal.trim() === '') {
                newErrors.goal = 'Pasirinkite tikslą';
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;

        } else if(currentStep === 3) {
            let newErrors = {};
            if(formData.schedule.trim() === '') {
                newErrors.schedule = 'Pasirinkite darbo grafiką';
            } else if(formData.feeding && formData.feeding_desc === '') {
                newErrors.feeding_desc = 'Laukas yra privalomassss';
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;

        } else if(currentStep === 4) {
            let newErrors = {};
            if(formData.health_problems && formData.health_problems_desc.trim() === '') {
                newErrors.health_problems_desc = 'Laukas yra privalomas';
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;

        } else if(currentStep === 5) {
            let newErrors = {};
            if(formData.diet && formData.diet_desc === '') {
                newErrors.diet_desc = 'Laukas yra privalomas'
            } 
            if(formData.intolerance && formData.intolerance_desc === '') {
                newErrors.intolerance_desc = 'Laukas yra privalomas'
            }
            if(!formData.breakfast && formData.breakfast_desc === '') {
                newErrors.breakfast_desc = 'Laukas yra privalomas';
            }
            if(!formData.lunch && formData.lunch_desc === '') {
                newErrors.lunch_desc = 'Laukas yra privalomas';
            }
            if(!formData.snack && formData.snack_desc === '') {
                newErrors.snack_desc = 'Laukas yra privalomas';
            }
            if(!formData.dinner && formData.dinner_desc === '') {
                newErrors.dinner_desc = 'Laukas yra privalomas';
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;

        } else {
            return false;
        }
    };


    const renderSections = () => {
        switch (currentStep) {
            case 1:
                return <FiziniaiDuomenys formData={formData} handleForm={handleForm} errors={errors} />
            case 2:
                return <Tikslai formData={formData} handleForm={handleForm} errors={errors.goal} setErrors={setErrors} />
            case 3:
                return <DarboGrafikas formData={formData} handleForm={handleForm} errors={errors} setErrors={setErrors} />
            case 4: 
                return <Sveikata formData={formData} handleForm={handleForm} errors={errors.health_problems_desc} setErrors={setErrors} />
            case 5: 
                return <DabartiniaiIprociai formData={formData} handleForm={handleForm} errors={errors} setErrors={setErrors}/>
            case 6: 
                return <Rutinos formData={formData} handleForm={handleForm} addRoutine={addRoutine} deleteRoutine={deleteRoutine} />
            case 7: 
                return <PapildomaInfo formData={formData} handleForm={handleForm} />
            default:
                return <div>Step {currentStep}</div>;
        }
    };

    return (
        // <Container>
        //     <Anketa>
        //         <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        //         <StepIndicator steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        //         <StepInfo steps={steps} totalSteps={totalSteps} currentStep={currentStep} />
        //         { renderSections() }
        //         <Pagination 
        //             currentStep={currentStep} 
        //             setCurrentStep={setCurrentStep} 
        //             totalSteps={totalSteps} 
        //             isValidFormPage={isValidFormPage}
        //         />
        //     </Anketa>
        // </Container>
        <InformationSoon />
    );
};

export default AnketaPage;