import styles from './Form.module.css';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Textarea from '../../Shared/Textarea';
import FilterChip from '../../Shared/FilterChip';
import UploadArea from '../../Shared/UploadArea';
import File from '../../Shared/File';
import ProgressBar from './ProgressBar';
import ActionBtn from './ActionBtn';
import SpinnerOnBtn from '../../Shared/SpinnerOnBtn';

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { useUploadVideo } from '../../../hooks/useUploadVideo';
import { useQueryClient } from '@tanstack/react-query';

// import useMediaQuery from '../../../hooks/useMediaQuery';

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
    // const mQuery = useMediaQuery();
    
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const [socket, setSocket] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);
    const [uploadError, setUploadError] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    
    const uploadVideoMutation = useUploadVideo(socket, isModalOpen.action, setUploadProgress, setVideoProgress, setMessage, setUploading, setUploadError);
    console.log('uploadVideoMutation: ', '\nisLoading: ', uploadVideoMutation.isLoading, '\nisError: ', uploadVideoMutation.isError, '\nisPending: ', uploadVideoMutation.isPending, '\nisSuccess: ', uploadVideoMutation.isSuccess)
    useEffect(() => {
        const initializeSocket = async () => {
            let socketUrl = '';
            try {
                const { data } = await axiosPrivate.get('/config');
                socketUrl = data;
            } catch (err) {
                socketUrl = process.env.NODE_ENV === 'development' 
                    ? 'http://localhost:3003' 
                    : 'https://bezalos.lt';
            }
            
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
                setMessage(`Įkeliamas video į AWS: ${data.loadedMB} MB iš ${data.totalMB} MB`);
            });

            newSocket.on('videoUploadComplete', () => {
                toast.success(`Video sėkmingai įkeltas į AWS S3!`);
                queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
                setMessage('Video sėkmingai įkeltas į AWS S3! ✅');
                setUploading(false);
                setUploadSuccess(true);
            });

            newSocket.on('uploadError', (data) => {
                toast.error(data.message);
                setUploading(false);
                setUploadError(true);
            });
        }
        initializeSocket();
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

    const removeFile = (file) =>  {
        setFormValues(prevState => {
            const newState = { ...prevState };
            delete newState[file];
            return newState;
        });
        document.getElementById(file).value = '';
    }

    const handleUpload = async () => {
        // if (!formValues.video) {
        //     toast.error('Nope, reik foto! 🏞');
        //     return;
        // }

        setUploading(true);
        setUploadProgress(0);
        setMessage('');
        setUploadError(false);
        setUploadSuccess(false);

        uploadVideoMutation.mutate(formValues);
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
                className={styles.span_2}
            />

            <Select 
                label='Kategorija' 
                name='category' 
                value={formValues.category}
                options={['Vebinaras', 'Kursai', 'Trumpai']} 
                formValues={formValues}
                handleFormInput={handleFormInput} 
                className={styles.span_2}
            />

            <Input 
                label='Trukmė' 
                name='duration' 
                value={formValues.duration} 
                handleFormInput={handleFormInput} 
                className={styles.span_2}
            />

            <Select 
                label='Aktyvus' 
                name='is_active' 
                value={formValues.is_active ? 'Taip' : 'Ne'}
                options={['Taip', 'Ne']} 
                formValues={formValues}
                handleFormInput={handleFormInput} 
                className={styles.span_2}
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

            {formValues.video ?
                <File 
                    name='video'
                    fileName={formValues.video?.name}
                    fileSize={formatFileSize(formValues.video?.size || 0)}
                    fileType={formValues.video?.type}
                    className={styles.span_4} 
                    uploading={uploading}
                    uploadSuccess={uploadSuccess}
                    onClick={() => removeFile('video')}
                /> :
                <UploadArea
                    name='video'
                    accept='video/*'
                    handleFormInput={handleFormInput}
                    className={styles.span_4}
                />
            }
    
            {formValues.photo ?
                <File 
                    name='photo'
                    fileName={formValues.photo?.name}
                    fileSize={formatFileSize(formValues.photo?.size || 0)}
                    fileType={formValues.photo?.type}
                    className={styles.span_4} 
                    uploading={uploading}
                    uploadSuccess={uploadSuccess}
                    onClick={() => removeFile('photo')}
                /> : 
                <UploadArea 
                    name='photo'
                    accept='image/*'
                    handleFormInput={handleFormInput}
                    className={styles.span_4}
                />
            }
            <ProgressBar 
                uploadError={uploadError}
                uploadSuccess={uploadSuccess}
                uploadProgress={uploadProgress}
                videoProgress={videoProgress}
                message={message}
            />

            {/* <ActionBtn label={'Atšaukti'} className={styles.span_4} /> */}
            {/* <ActionBtn label={'Įkelti Video'} className={styles.span_4} /> */}
{/* 
            <button className={styles.span_4}>Atšaukti</button>
            <button className={styles.span_4}>
                Įkelti Video
                <SpinnerOnBtn />
            </button> */}

            {/* <div className={styles.uploadFiles} style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}> */}
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
            {/* </div> */}
        </div>
    );
};

export default Form;
