import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
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
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';

const AnketaPage = () => {
    const { anketa: formData, setAnketa: setFormData, user_id } = useOutletContext();
    
    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
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
        let value = e.target?.value ?? e.current?.value ?? e?.value ?? '';
        
        setFormData(prev => {

            if(['breakfast', 'lunch', 'snack', 'dinner'].includes(name) && !prev[name]) {
                return ({...prev, [name]: value, [`${name}_desc`]: '', [`${name}_time`]: '--:--'});
            }

            if(['feeding', 'health_problems', 'diet', 'intolerance'].includes(name) && prev[name]) {
                return ({...prev, [name]: value, [`${name}_desc`]: ''});
            }

            if(['workday', 'day_off'].includes(prop)) {
                if(name.indexOf('eat') > -1) name = name.split('_').shift();
                
                const index = prev.routines[prop].findIndex(el => el.day_id === id);

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
                    day_id: uuidv4(),
                    eat: 'Galiu valgyti betkada', 
                    get_up: '--:--', 
                    go_sleep: '--:--', 
                    sport: '--:--',
                    breakfast_time: '--:--',
                    lunch_time: '--:--',
                    snack_time: '--:--',
                    dinner_time: '--:--'
                }]
            }
        }));
    };

    const deleteRoutine = (type, id) => {
        setFormData(prev => ({
            ...prev,
            routines: {
                ...prev.routines,
                [type]: [...prev.routines[type].filter(r => r.day_id !== id)]
            }
        }));
    };

    const isValidFormPage = () => {
        setErrors({});
        if(currentStep === 1) {
            const requiredFields = ['age', 'height', 'weight', 'activity_steps'];
            const errorTexts = {
                age: 'Neįvestas amžius',
                height: 'Neįvestas ūgis',
                weight: 'Neįvestas svoris',
                activity_steps: 'Neįvestas aktyvumas'
            }
            let newErrors = {};
            requiredFields.forEach(field => {
                if(formData[field].trim() === '') {
                    newErrors[field] = errorTexts[field];
                } else if(isNaN(formData[field].replace(',', '.'))) {
                    newErrors[field] = 'Galimi tik skaičiai';
                } else if (Number(formData[field].replace(',', '.')) < 0) {
                    newErrors[field] = 'Galimi tik teigiami skaičiai';
                }
            });

            setErrors(prev => ({...prev, ...newErrors}));
            return Object.keys(newErrors).length === 0;

        } else if(currentStep === 2) {
            let newErrors = {};
            if(formData.goal.trim() === '') {
                newErrors.goal = 'Nepasirinktas tikslas';
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;

        } else if(currentStep === 3) {
            let newErrors = {};
            if(formData.schedule.trim() === '') {
                newErrors.schedule = 'Nepasirinktas darbo grafikas';
            } else if(formData.feeding && formData.feeding_desc === '') {
                newErrors.feeding_desc = 'Trūksta informacijos';
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;

        } else if(currentStep === 4) {
            let newErrors = {};
            if(formData.health_problems && formData.health_problems_desc.trim() === '') {
                newErrors.health_problems_desc = 'Trūksta informacijos';
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

            const [bh, bm] = formData.breakfast_time.split(':');
            const [lh, lm] = formData.lunch_time.split(':');
            const [sh, sm] = formData.snack_time.split(':');
            const [dh, dm] = formData.dinner_time.split(':');

            if(!formData.breakfast && (bh === '--' || bm === '--')) {
                newErrors.breakfast_time = 'Nepasirinkta'
            }
            if(!formData.lunch && (lh === '--' || lm === '--')) {
                newErrors.lunch_time = 'Nepasirinkta'
            }
            if(!formData.snack && (sh === '--' || sm === '--')) {
                newErrors.snack_time = 'Nepasirinkta'
            }
            if(!formData.dinner && (dh === '--' || dm === '--')) {
                newErrors.dinner_time = 'Nepasirinkta'
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;

        } else if(currentStep === 6) {
            let newErrors = {};
            const gali_negali = {
                'Galiu valgyti betkada': ['get_up', 'go_sleep'],
                'Negaliu valgyti betkada': ['get_up', 'go_sleep', 'breakfast_time', 'lunch_time', 'snack_time', 'dinner_time']
            };
            
            const days = formData.routines.workday.concat(formData.routines.day_off);

            days.forEach(day => {
                gali_negali[day.eat].forEach(field => {
                    const [h, m] = day[field].split(':');
                    if(h === '--' || m === '--') {
                        newErrors[`${field}_${day.day_id}`] = {
                            [field]: 'Nepasirinkta'
                        };
                    }
                });
            });

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        } else if(currentStep === 7) {
            return true;
        } else {
            return false;
        }
    };

    const axiosPrivate = useAxiosPrivate();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const submitAnketa_api = async () => {
        try {
            setIsLoading(true);
            await axiosPrivate.post(`/profile/anketa/${user_id}`, formData);
            await delay(1200);
            setIsLoading(false); 

        } catch (err) {
            const { status } = err;
            const { message = 'Klaida! ' } = err.response.data;
            const { page = 7 } = err.response.data;
            const { field } = err.response.data;

            if(status === 400) {
                setCurrentStep(page);
                setErrors({ [field]: message });
                throw new Error('Klaida!');
            } else {
                throw new Error(message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const submitAnketa = () => {
        toast.promise(
            submitAnketa_api(),
            {
               loading: 'Saugoma...',
               success: <b>{formData.user_id ? 'Anketa atnaujinta!' : 'Anketa išsaugota!'}</b>,
               error: err => <b>{err.message}</b>,
            },
            {
                success: { duration: 3000 },
                error: { duration: 3000 }
            }
        );
    };

    const renderSections = () => {
        switch (currentStep) {
            case 1:
                return <FiziniaiDuomenys formData={formData} handleForm={handleForm} errors={errors} setErrors={setErrors} />
            case 2:
                return <Tikslai formData={formData} handleForm={handleForm} errors={errors.goal} setErrors={setErrors} />
            case 3:
                return <DarboGrafikas formData={formData} handleForm={handleForm} errors={errors} setErrors={setErrors} />
            case 4: 
                return <Sveikata formData={formData} handleForm={handleForm} errors={errors.health_problems_desc} setErrors={setErrors} />
            case 5: 
                return <DabartiniaiIprociai formData={formData} handleForm={handleForm} errors={errors} setErrors={setErrors} />
            case 6: 
                return <Rutinos formData={formData} handleForm={handleForm} addRoutine={addRoutine} deleteRoutine={deleteRoutine} errors={errors} setErrors={setErrors} />
            case 7: 
                return <PapildomaInfo formData={formData} handleForm={handleForm} setErrors={setErrors} />
            default:
                return <div>Step {currentStep}</div>;
        }
    };

    return (
        <Container>
            <Anketa>
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                <StepIndicator 
                    steps={steps} 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} i
                    isValidFormPage={isValidFormPage} 
                />
                <StepInfo steps={steps} totalSteps={totalSteps} currentStep={currentStep} />
                { renderSections() }
                <Pagination 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep} 
                    totalSteps={totalSteps} 
                    isValidFormPage={isValidFormPage}
                    formData={formData}
                    isLoading={isLoading}
                    submitAnketa={submitAnketa}
                />
            </Anketa>
        </Container>
    );
};

export default AnketaPage;
