import toast from 'react-hot-toast';
import { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useVideosAdmin from '../../../hooks/useVideosAdmin';

import VideosNav from '../../../components/admin/videos/VideosNav';
import VideoRow, { VideoRowHeader } from '../../../components/admin/videos/VideoRow';
import AddNewVideoModal from '../../../components/admin/videos/AddNewVideoModal';
import Modal from '../../../components/Shared/Modal';
import ActionBtns from '../../../components/admin/videos/ActionBtns';

const VideosPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({});
    const { data: {data, images} = [], isLoading } = useVideosAdmin();

    const queryClient = useQueryClient();
    
    const handleDeleteVideo = useMutation({
        mutationFn: id => axiosPrivate.delete(`/admin/videos/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-videos'] })
        },
        onError: (err) => {
            toast.error(err.message || 'Klaida!')
        }
    });

    return (
        <div>
            {isModalOpen && <Modal>
                testafsd adsf ads fad fads fadsfaf 
                <ActionBtns isLoading={isLoading} setIsModalOpen={setIsModalOpen} />
            </Modal>}

            <VideosNav isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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