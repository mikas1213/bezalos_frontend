import { useState } from 'react';

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

const AnketaPage = () => {

    const [formData, setFormData] = useState({
        gender: 'Moteris',
        age: '',
        height: '',
        weight: '',
        steps: '',
        workday: 'Galiu valgyti betkada',
        day_off: 'Galiu valgyti betkada'  
    });
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
    const handleForm = e => {
        const name = e.target?.name || e.current?.name;
        const value = e.target?.value || e.current?.value; 

        setFormData(prev => ({...prev, [name]: value}))
    }

    const renderSections = () => {
        switch (currentStep) {
            case 1:
                return <FiziniaiDuomenys formData={formData} handleForm={handleForm} />
            case 2:
                return <Tikslai formData={formData} setFormData={setFormData} />
            case 3:
                return <DarboGrafikas formData={formData} setFormData={setFormData} />
            case 4: 
                return <Sveikata />
            case 5: 
                return <DabartiniaiIprociai />
            case 6: 
                return <Rutinos formData={formData} handleForm={handleForm} />
            case 7: 
                return <PapildomaInfo />
            default:
                return <div>Step {currentStep}</div>;
        }
    };

    return (
        <Container>
            <Anketa>
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                <StepIndicator steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
                <StepInfo steps={steps} totalSteps={totalSteps} currentStep={currentStep} />
                { renderSections() }
                <Pagination currentStep={currentStep} setCurrentStep={setCurrentStep} totalSteps={totalSteps} />
            </Anketa>
        </Container>
    );
};

export default AnketaPage;