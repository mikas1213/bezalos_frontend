import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';
import toast from 'react-hot-toast';

export const useUploadVideo = (socket, action, isVideo, setUploadProgress, setVideoProgress, setMessage, setUploading, setUploadError) => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (formValues) => {
            const formData = new FormData();
            formData.append('title', formValues.title);
            formData.append('image_s3_key', formValues.image_s3_key);
            formData.append('video_s3_key', formValues.video_s3_key);
            formData.append('description', formValues.description);
            formData.append('video_type', formValues.video_type);
            formData.append('category', formValues.category);
            formData.append('duration', formValues.duration);
            formData.append('is_active', formValues.is_active);
            formData.append('search_tag', formValues.search_tag);
            formData.append('video', formValues.video);
            formData.append('photo', formValues.photo);
            formData.append('action', formValues.action);

            const api = action === 'insert' ? `/admin/videos` : `/admin/videos/${formValues.id}`;
            const response = await axiosPrivate.post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Socket-ID': socket?.id,
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(progress);
                    setMessage(
                        progress < 100
                            ? `Siunčiama į serverį . . . `
                            : 'Failai gauti serveryje, pradedamas video upload į AWS...'
                    );
                }
            });
            return response.data;
        },

        onMutate: () => {
            setUploading(true);
            setUploadProgress(0);
            setVideoProgress(0);
            setMessage('Pradedamas failų įkėlimas...');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || error.message);
            setMessage('Klaida įkeliant failus ');
            setUploading(false);
            setUploadError(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
            if(action === 'update' && !isVideo) {
                toast.success(`Video sėkmingai atnaujintas! ✅`);
                setUploading(false);
            }
        }
    });
};
