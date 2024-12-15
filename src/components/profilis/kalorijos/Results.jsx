import styles from './Results.module.css';
import { useEffect, useRef } from 'react';
import { Flame } from 'lucide-react';
import ProgressBar from './ProgressBar';
import ButtonCTA from './ButtonCTA';
import CountUp from 'react-countup';

const Results = ({ calculations }) => {


    const authors = ['Harrris_old', 'Harris_new', 'Mifflin'];
    const formulas = {
        'Harrris_old': {
            'Moteris': {
                constant: 655.0955,
                weight: 9.5634,
                height: 1.8496,
                age: 4.6756
            },
            'Vyras': {
                constant: 66.4730,
                weight: 13.7516,
                height: 5.0033,
                age: 6.755
            }
        },
        'Harris_new': {
            'Moteris': {
                constant: 447.593,
                weight: 9.247,
                height: 3.098,
                age: 4.330
            },
            'Vyras': {
                constant: 88.362,
                weight: 13.397,
                height: 4.799,
                age: 5.677
            }
        },
        'Mifflin': {
            'Moteris': {
                constant: 161,
                weight: 10,
                height: 6.25,
                age: 5
            },
            'Vyras': {
                constant: 5,
                weight: 10,
                height: 6.25,
                age: 5
            }
        }
    }

    const author = authors[1];
    const { constant, weight, height, age } = formulas[author][calculations.gender];
    
    const isValidInput = (
        !isNaN(calculations.weight) && 
        !isNaN(calculations.height) && 
        !isNaN(calculations.age) &&
        Number(calculations.weight) > 0 &&
        Number(calculations.height) > 0 &&
        Number(calculations.age) > 0
    );
    let kcal = isValidInput ? (weight * calculations.weight) + (height * calculations.height) - (age * calculations.age) : 0;
    
    if(isValidInput && kcal > 0) {
        switch(author) {
            case 'Harrris_old':
            case 'Harris_new':
                kcal = (constant + kcal) * calculations.ratio;
                break;
            case 'Mifflin':
                if(calculations.gender === 'Moteris') {
                    kcal = (kcal - constant) * calculations.ratio;
                } else {
                    kcal = (kcal + constant) * calculations.ratio;
                }
                break;
            default: 
                kcal = 0;
                break;
        }
    }

    const prevKcal = useRef(0);
    useEffect(() => {
        prevKcal.current = kcal;
    }, [kcal]);

    
    return (
        <div className={styles.results}>
            <div className={styles.calories}>
                <Flame />
                <div className={styles.kcalContainer}>
                    <span className={styles.number}>
                        {kcal > 0 ? <CountUp
                            key={kcal}
                            start={prevKcal.current}
                            end={kcal}
                            decimals={0}
                            duration={1}
                            separator=''
                        /> : 0}
                   
                    </span>
                    <small className={styles.unit}>kcal</small>
                </div>
            </div>

            <ProgressBar kcal={kcal} />
            <ButtonCTA />
        </div>
    );
};

export default Results;

/*
Harris-Benedict 
old (1919)
Vyrams: BMR = 66.4730 + (13.7516 × svoris) + (5.0033 × ūgis) - (6.755 × amžius)
Moterims: BMR = 655.0955 + (9.5634 × svoris) + (1.8496 × ūgis) - (4.6756 × amžius)

new (1984)
Vyrams: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years) 
Moterims: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)

Mifflin-St Jeor (1990)
Vyrams: BMR = (10 × svoris kg) + (6.25 × ūgis cm) - (5 × amžius) + 5
Moterims: BMR = (10 × svoris kg) + (6.25 × ūgis cm) - (5 × amžius) - 161
*/