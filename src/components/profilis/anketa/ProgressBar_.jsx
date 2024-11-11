import styles from './ProgressBar.module.css';
import { useState } from 'react';

const ProgressBar = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 7;

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));


    return (
        <div className="progressBarContainer">
            <div className={styles.numbers}>
                {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                        key={i}
                        className={`${styles.num} ${i + 1 <= currentStep ? `${styles.active}` : ''}`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>

            <div className={styles.progressBar}>
                <div
                    className={styles.progressBarFill}
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
            </div>


        <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
            >
              {/* <ChevronLeftIcon className="w-5 h-5 inline-block mr-1" /> */}
              Atgal
            </button>
            {currentStep < totalSteps ? <button
                onClick={nextStep}
                className="px-4 py-2 bg-[#084747] text-white rounded-md hover:bg-[#063636] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#084747]"
              >
                Toliau
                {/* <ChevronRightIcon className="w-5 h-5 inline-block ml-1" /> */}
              </button>
              :
              <button
                type="submit"
                className="px-6 py-2 bg-[#084747] text-white font-semibold rounded-md hover:bg-[#063636] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#084747]"
              >
                Pateikti
              </button>
            }
        </div>
    );
};

export default ProgressBar;