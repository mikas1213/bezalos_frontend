import styles from './ServiceForm.module.css';
import { useState } from 'react';
import Input from '../Input';
import Select from '../Select';
import Textarea from '../Textarea';
import ActionBtns from '../ActionBtns';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
import { BookImage } from 'lucide-react';

const options = [true, false];

const ServiceForm = ({ isLoading, isModalOpen, formValues, setFormValues, handleServiceForm, handleSubmit, handleModalOpen }) => {
    const [photoPreview, setPhotoPreview] = useState(formValues.image_m);
    
    return (
        <div className={styles.flexColumn}>
            <section className={`${styles.section} ${styles.flexRow}`}>
                
                <div className={styles.flexColumn}>
                    <Input placeholder='Pavadinimas' label='Pavadinimas' name='title' value={formValues.title} handleServiceForm={handleServiceForm} />
                    <div className={styles.flexRow}>
                        <Input placeholder='€' label='Kaina' name='base_price' value={formValues.base_price} handleServiceForm={handleServiceForm} />
                        <Input placeholder='vnt.' label='Kiekis' name='quantity' value={formValues.quantity} handleServiceForm={handleServiceForm} />
                        <Input placeholder='%' label='Nuolaida %' name='discount' value={formValues.discount} handleServiceForm={handleServiceForm} />
                        <Input placeholder='Eilė' label='Eilė' name='sort' value={formValues.sort} handleServiceForm={handleServiceForm} />
                    </div>

                    <div className={styles.flexRow}>
                        <Select options={options} label='Populiari' name='popular' value={formValues.popular} setNewItem={setFormValues} />
                        <Select options={options} label='Aktyvi' name='is_active' value={formValues.is_active} setNewItem={setFormValues} />

                        <div className={`${styles.flexColumn} ${styles.gap_02}`}>
                            <span className={styles.inputLabel}>Foto</span>
                            <div className={styles.fileUpload}>
                                <input 
                                    type='file' 
                                    accept='image/*' 
                                    name='photo' 
                                    id='fileInput' 
                                    className={styles.inputFile} 
                                    onChange={e => {
                                        const selectedFile = e.target.files[0];
                                        setFormValues(prev => ({ ...prev, photo: selectedFile }));
                                        setPhotoPreview(URL.createObjectURL(selectedFile));
                                    }}
                                />
                                <div 
                                    className={styles.uploadFileBtn}
                                    onClick={() => {
                                        document.getElementById('fileInput').click();
                                    }}
                                >
                                    <FaRegArrowAltCircleUp className={styles.icon} />
                                    <span>Pasirinkti foto</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Textarea placeholder='Aprašymas' label='Grid aprašymas' name='grid_desc' value={formValues.grid_desc} handleServiceForm={handleServiceForm} maxLength={150}/>  
                </div>
                {photoPreview ? <img src={photoPreview} alt='Preview' style={{borderRadius: '0.5rem', width: '16rem', objectFit: 'cover'}} /> :
                    <div style={{width: '16rem', backgroundColor: 'var(--color-background-secondary)', display: 'grid', placeItems: 'center', borderRadius: '0.5rem'}}>
                        <BookImage style={{color: 'var(--grey-light)', width: '5rem', height: '5rem'}} />
                    </div>
                }
            </section>

            <section className={`${styles.section} ${styles.flexColumn}`}>
                <Textarea placeholder='Aprašymas' label='Paslaugos aprašymas' name='basic_desc' value={formValues.basic_desc} handleServiceForm={handleServiceForm} maxLength={300} />

                {formValues.details.map((detail, i) => (
                    <section key={detail.id} className={`${styles.section}`}>
                        <div className={styles.flexRow}>
                            <Input placeholder='Icon' label='icon' name='icon' dataValue={detail.id} value={detail.icon} handleServiceForm={handleServiceForm} />
                            <Input placeholder='Antraštė' label='Antraštė' name='title' dataValue={detail.id} value={detail.title} formValues={formValues} handleServiceForm={handleServiceForm} />
                        </div>
                        <Textarea placeholder='Aprašymas' label='Ypatybės' name='desc' dataValue={detail.id || i} value={detail.desc} formValues={formValues} handleServiceForm={handleServiceForm} maxLength={950} />
                    </section>
                ))}
            </section>

            <ActionBtns 
                isLoading={isLoading} 
                isModalOpen={isModalOpen} 
                setFormValues={setFormValues} 
                handleSubmit={handleSubmit} 
                handleModalOpen={handleModalOpen} 
            />
        </div>
    );
};

export default ServiceForm;