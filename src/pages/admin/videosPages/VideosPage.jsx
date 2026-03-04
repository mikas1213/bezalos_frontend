import toast from 'react-hot-toast';
import { useState } from 'react';
import { axiosPrivate } from '../../../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useVideosAdmin from '../../../hooks/useVideosAdmin';

import VideosNav from '../../../components/admin/videos/VideosNav';
import VideoRow, { VideoRowHeader } from '../../../components/admin/videos/VideoRow';
import Modal from '../../../components/Shared/Modal';
import Form from '../../../components/admin/videos/Form';

const emptyForm = {
    title: '',
    description: '',
    video_type: 'virtuve', 
    category: 'Vebinaras', 
    duration: '00:00:00',
    is_active: true,
    search_tag: 'vebinaras',
};

const VideosPage = () => {

    const [isModalOpen, setIsModalOpen] = useState({isOpen: false, action: ''});
    const [formValues, setFormValues] = useState(emptyForm);
    const { data, isLoading } = useVideosAdmin();
    const queryClient = useQueryClient();

    const handleDeleteVideo = useMutation({
        mutationFn: video => axiosPrivate.delete(`/admin/videos/${video.id}`, {data: {
            video_s3_key: video.video_s3_key,
            image_s3_key: video.image_s3_key,
        }}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
        },
        onError: (err) => {
            toast.error(err.message || 'Klaida!');
        }
    });

    const handleFormInput = e => {
        let value = e.target.value ?? e.target.dataset.value;
        const name = e.target.name || e.target.dataset.name;

        if(['video', 'photo'].includes(name)) {
            value = e.target.files[0];
        } else if(name === 'is_active') {
            value = value === 'Taip';
        }
        setFormValues(prev => ({...prev, [name]: value}));
    }

    return (
        <div>
            {isModalOpen.isOpen && <Modal>
                <Form 
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    formValues={formValues} 
                    handleFormInput={handleFormInput} 
                    setFormValues={setFormValues} 
                />
            </Modal>}

            <VideosNav isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setFormValues={setFormValues} />
            <VideoRowHeader />
            {!isLoading && data && data.map(video => <VideoRow 
                key={video.id} 
                video={video} 
                setIsModalOpen={setIsModalOpen} 
                setFormValues={setFormValues} 
                handleDeleteVideo={handleDeleteVideo}
            />)}
        </div>
    );
};

export default VideosPage;