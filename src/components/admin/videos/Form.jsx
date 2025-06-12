import styles from './Form.module.css';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Textarea from '../../Shared/Textarea';
import FilterChip from '../../Shared/FilterChip';
import UploadFile from '../../Shared/UploadFile';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import axios from '../../../api/axios';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { useUploadVideo } from '../../../hooks/useUploadVideo';
import { useQueryClient } from '@tanstack/react-query';

const filters = [
    {label: 'Vebinaras', value: 'vebinaras'}, 
    {label: 'Trumpai', value: 'trumpai'}, 
    {label: 'Emocinis valgymas', value: 'emocinis valgymas'}, 
    {label: 'Mityba', value: 'mityba'}, 
    {label: 'Valgymo psichologija', value: 'valgymo psichologija'}
];

// Format file size
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Form = ({ isModalOpen, formValues, setFormValues, handleFormInput }) => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const [socket, setSocket] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    
    const uploadVideoMutation = useUploadVideo(socket, isModalOpen.action, setUploadProgress, setVideoProgress, setMessage, setUploading);

    useEffect(() => {
        const initializeSocket = async () => {
            let socketUrl = '';
            try {
                const { data } = await axiosPrivate.get('/config');
                socketUrl = data;
                console.log('socketUrl: ', socketUrl);

            } catch (err) {
                console.log('socketUrl: ', socketUrl)
                // socketUrl = process.env.NODE_ENV === 'development' 
                    // ? 'http://localhost:3003' 
                    // : 'https://bezalos.lt';
            }


            // const socket_server = process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : 'https://bezalos.dulevicius.dev';
            
            const newSocket = io(socketUrl, {
                transports: ['websocket', 'polling'],
                upgrade: false,
                rememberUpgrade: false,
                timeout: 60000
            });
            setSocket(newSocket);

            newSocket.on('uploadStageChange', (data) => {
                setMessage(data.message);
            });


            newSocket.on('videoUploadProgress', (data) => {
                setVideoProgress(data.percentage);
                setMessage(`Įkeliamas video į AWS: ${data.percentage}% (${data.loadedMB}/${data.totalMB} MB)`);
            });

            newSocket.on('videoUploadComplete', () => {
                toast.success(`Video sėkmingai įkeltas į AWS S3!`);
                queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
                setMessage('Video sėkmingai įkeltas į AWS S3!');
                setUploading(false);
            });

            newSocket.on('uploadError', (data) => {
                toast.error(data.message);
                setUploading(false);
            });
        }
        initializeSocket();
        // return () => newSocket.close();
        return () => {
            if(socket) socket.close();
        }
    }, []);
    
    const handleCheckboxChange = (value) => {
        setFormValues(prev => {
            const selectedFilter = prev.search_tag && prev.search_tag.split(', ') ? prev.search_tag.split(', ') : [];
            const newSelectedFilter = selectedFilter.includes(value) 
            ? selectedFilter.filter(item => item !== value)
            : [...selectedFilter, value];

            return {
                ...prev,
                search_tag: newSelectedFilter.join(', ')
            };
        });
    };

    const isChecked = (value) => {
        if (!formValues.search_tag) return false;
        return formValues.search_tag.split(', ').includes(value);
    };

    // const uploadDirect = async () => {
    //     if (!socket) {
    //         toast.error('Socket connection neprieinamas');
    //         return;
    //     }

        // if (!formValues.video) {
        //     toast.error('Video failas yra privalomas');
        //     return;
        // }

    //     try {
    //         setUploading(true);
    //         setMessage('Pradedamas failų įkėlimas...');
    //         setUploadProgress(0);
    //         setVideoProgress(0);

    //         const formData = new FormData();
    //         formData.append('video', formValues.video);
    //         formData.append('photo', formValues.photo);
    //         formData.append('title', formValues.title);
    //         formData.append('description', formValues.description);
    //         formData.append('video_type', formValues.video_type);
    //         formData.append('category', formValues.category);
    //         formData.append('duration', formValues.duration);
    //         formData.append('is_active', formValues.is_active);
    //         formData.append('search_tag', formValues.search_tag);

    //         const response = await axiosPrivate.post(`/admin/videos`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'X-Socket-ID': socket.id,
    //             },
    //             onUploadProgress: (progressEvent) => {
    //                 const progress = Math.round(
    //                     (progressEvent.loaded * 100) / progressEvent.total
    //                 );
    //                 setUploadProgress(progress);
    //                 if (progress < 100) {
    //                     setMessage(`Siunčiama į serverį: ${progress}%`);
    //                 } else {
    //                     setMessage('Failai gauti serveryje, pradedamas video upload į AWS...');
    //                 }
    //             }
    //         });

    //     } catch (error) {
    //         toast.error(error.response?.data?.message || error.message);
    //         setMessage('Klaida įkeliant failus');
    //         setUploading(false);
    //     }
    // };


    const handleUpload = async () => {
        // if (!formValues.video) {
        //     toast.error('Nope, reik foto! 🏞');
        //     return;
        // }

        setUploading(true);
        setUploadProgress(0);
        setMessage('');

        try {
            // await uploadDirect();
            uploadVideoMutation.mutate(formValues, {
                onSettled: () => {
                    setUploading(false);
                    document.getElementById('video').value = '';
                }
            });
        } catch (error) {
            setMessage('Nepavyko įkelti video');
        } finally {
            setUploading(false);
            setUploadProgress(0);
            document.getElementById('video').value = '';
        }
    };

    
    return (
        <div className={styles.form}>
            <Input 
                label='Pavadinimas' 
                name='title' 
                value={formValues.title || ''} 
                handleFormInput={handleFormInput} 
                className={styles.title}
            />

            <Textarea
                placeholder='Aprašymas'
                name='description'
                maxLength={1200}
                value={formValues.description}
                formValues={formValues}
                handleFormInput={handleFormInput}
                className={styles.description}
            />

            <Select 
                label='Video type' 
                name='video_type' 
                value={formValues.video_type}
                options={['virtuve', 'kursai']} 
                formValues={formValues}
                handleFormInput={handleFormInput} 
                className={styles.fourInputs}
            />

            <Select 
                label='Kategorija' 
                name='category' 
                value={formValues.category}
                options={['Vebinaras', 'Kursai', 'Trumpai']} 
                formValues={formValues}
                handleFormInput={handleFormInput} 
                className={styles.fourInputs}
            />

            <Input 
                label='Trukmė' 
                name='duration' 
                value={formValues.duration} 
                handleFormInput={handleFormInput} 
                className={styles.fourInputs}
            />

            <Select 
                label='Aktyvus' 
                name='is_active' 
                value={formValues.is_active ? 'Taip' : 'Ne'}
                options={['Taip', 'Ne']} 
                formValues={formValues}
                handleFormInput={handleFormInput} 
                className={styles.fourInputs}
            />

            <div className={styles.filterChips}>
                {filters.map(filter => <FilterChip 
                    key={filter.label} 
                    label={filter.label}
                    value={filter.value}
                    isChecked={isChecked(filter.value)}
                    onChange={handleCheckboxChange}
                />)}
            </div>

            <UploadFile 
                label='Video failas'
                buttonTitle='Pasirinkti failą'
                name='video'
                accept='video/*'
                handleFormInput={handleFormInput}
                className={styles.fourInputs}
            />

            <UploadFile 
                label='Foto failas'
                buttonTitle='Pasirinkti failą'
                name='photo'
                accept='image/*'
                handleFormInput={handleFormInput}
                className={styles.fourInputs}
            />
            <div>
                <span>Video:</span>
                {formValues.video?.name}<br />
                {formatFileSize(formValues.video?.size || 0)}<br />
                {formValues.video?.type}
            </div>
            <div>
                <span>Foto:</span>
                {formValues.image?.name}
            </div>




            <div className={styles.uploadFiles} style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>

                {/* File Selection */}
                {/* <div style={{ marginBottom: '20px' }}>
                    <input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleFormInput}
                        disabled={uploading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px dashed #dee2e6',
                            borderRadius: '8px',
                            background: '#f8f9fa',
                            cursor: uploading ? 'not-allowed' : 'pointer',
                            fontSize: '16px'
                        }}
                    />
                </div> */}

                {/* Selected File Info */}
                {formValues.video && (
                    <div style={{
                        background: '#e3f2fd',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #2196f3'
                    }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Pasirinktas failas:</h4>
                    <p style={{ margin: '5px 0', color: '#424242' }}>
                        <strong>Pavadinimas:</strong> {formValues.video?.name}
                    </p>
                    <p style={{ margin: '5px 0', color: '#424242' }}>
                        <strong>Dydis:</strong> {formatFileSize(formValues.video?.size || 0)}
                    </p>
                    <p style={{ margin: '5px 0', color: '#424242' }}>
                        <strong>Tipas:</strong> {formValues.video?.type || 'Nenurodytas'}
                    </p>
                    </div>
                )}

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={isModalOpen.action === 'insert' && !formValues.video || uploading}
                    style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '8px',
                        background: uploading ? '#ffc107' : (formValues.video ? '#007bff' : '#6c757d'),
                        color: uploading ? '#212529' : 'white',
                        cursor: (isModalOpen.action === 'insert' && !formValues.video || uploading) ? 'not-allowed' : 'pointer',
                        marginBottom: '20px',
                        transition: 'background-color 0.3s'
                    }}
                >
                    {uploading ? `Įkeliama... ${uploadProgress}%` : 'Įkelti Video'}
                </button>

                {/* Progress Bar */}
                {/* {uploading && (
                    <div style={{ marginBottom: '20px' }}>
                    <div style={{
                        width: '100%',
                        height: '20px',
                        background: '#e9ecef',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginBottom: '10px'
                    }}>
                        <div style={{
                        width: `${uploadProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #28a745, #20c997)',
                        transition: 'width 0.3s ease'
                        }}></div>
                    </div>
                    <p style={{ textAlign: 'center', margin: 0, fontWeight: 'bold' }}>
                        {uploadProgress}% užbaigta
                    </p>
                    </div>
                )} */}

                {/* Message */}
                {/* {message && (
                    <div style={{
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    background: message.includes('Klaida') ? '#f8d7da' : '#d4edda',
                    color: message.includes('Klaida') ? '#721c24' : '#155724',
                    border: `1px solid ${message.includes('Klaida') ? '#f5c6cb' : '#c3e6cb'}`
                    }}>
                    {message}
                    </div>
                )} */}
            </div>



            {/* NEW */}
            <div className={styles.uploadFiles}>
                {/* <button onClick={uploadDirect} disabled={uploading}>
                    {uploading ? 'Įkeliama...' : 'Įkelti video'}
                </button> */}

                {uploading && (
                    <div className={styles.uploadProgress}>
                    {/* Server upload progress */}
                    <div>
                        <label>Siuntimas į serverį:</label>
                        <div className={styles.progressBar}>
                        <div 
                            className={styles.progressFill} 
                            style={{ width: `${uploadProgress}%` }}
                        />
                        </div>
                        <span>{uploadProgress}%</span>
                    </div>

                    {/* Video S3 upload progress */}
                    {uploadProgress === 100 && (
                        <div>
                            <label>Video įkėlimas į AWS S3:</label>
                            <div className={styles.progressBar}>
                                <div 
                                    className={`${styles.progressFill} ${styles.video}`} 
                                    style={{ width: `${videoProgress}%` }}
                                />
                            </div>
                            <span>{videoProgress}%</span>
                        </div>
                    )}
                    </div>
                )}

                <p>{message}</p>
            </div>
        </div>
    );
};

export default Form;
