import styles from './PromotionForm.module.css';
import { useState, useEffect, useRef } from 'react';
import Input from '../Input';
import Select from '../Select';
import CheckBox from '../CheckBox';
import ActionBtns from '../ActionBtns';
import { ChevronLeft } from 'lucide-react';

const PromotionForm = ({ isLoading, isModalOpen, services, formValues, setFormValues, handleServiceForm, handleModalOpen, handleSubmit }) => {

    const servicesRef = useRef(null);
    const [isOpen, setIsOpen] = useState(formValues.specific_products.length > 0);
    const [servicesHeight, setServicesHeight] = useState(0);
    
    useEffect(() => {
        if(servicesRef.current) {
            setServicesHeight(servicesRef.current.scrollHeight);
        }
    }, []);

    return (
        <div className={styles.flexCol}>
            <div className={styles.flexRow}>
                <Input placeholder='kodas' label='Kodas' name='promo_code' className={styles.promo_code} value={formValues.promo_code.toUpperCase()} handleServiceForm={handleServiceForm} />
                <Select options={['Procentai', 'Eurai']} label='Nuolaidos tipas' name='promo_type' className={styles.promo_type} value={formValues.promo_type} setNewItem={setFormValues} handleServiceForm={handleServiceForm} />
                <Input placeholder={formValues.promo_type === 'Procentai' ? '%' : '€'} label={`Vertė (${formValues.promo_type === 'Procentai' ? '%' : '€'})`} name='promo_value' className={styles.promo_value} value={formValues.promo_value} handleServiceForm={handleServiceForm} />
                
            </div>

            <div className={styles.flexRow}>
                <Input placeholder='0' label='Panaudojimų limitas' name='usage_limit' className={styles.usage_limit} value={formValues.usage_limit} handleServiceForm={handleServiceForm} />
                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Galiojimo laikas</span>
                    <input type='datetime-local' name='valid_until' onChange={handleServiceForm}/>
                </div>
            </div>

            <div className={`${styles.services} ${isOpen ? styles.open : ''}`}>
                <span className={styles.inputLabel}>Pasirinkti konkrečią paslaugą</span>
                <div className={styles.addServicesContainer}>
                    <div className={styles.title} onClick={() => setIsOpen(on => !on)}>
                        Paslaugos
                        <ChevronLeft className={styles.iconTitle} />
                    </div>
                    <div ref={servicesRef} className={styles.servicesList} style={{ height: isOpen ? `${servicesHeight}px` : '0'}}>
                        {services.map(service => 
                            <CheckBox 
                                key={service.id}
                                name='specific_products' 
                                value={service.id} 
                                label={service.title} 
                                handleServiceForm={handleServiceForm} 
                                checked={formValues.specific_products.includes(service.id)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div>
                <ActionBtns isLoading={isLoading} isModalOpen={isModalOpen} setFormValues={setFormValues} handleModalOpen={handleModalOpen} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default PromotionForm;