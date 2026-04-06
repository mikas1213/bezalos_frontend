import type { ChangeEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosPrivate } from '../../../../api/axios';
import Modal from '../../../../components/Shared/Modal';
import { UploadVideoModal } from '../components/UploadVideoModal';
import { VideoRow, VideoRowHeader } from '../components/VideoRow';
import { VideosNav } from '../components/VideosNav';
import useVideosAdmin from '../hooks/useVideosAdmin';
import type { AdmninVirtuveDto } from '../types';

import type { ModalState, UploadVideoFormValues } from './types';
const emptyForm: UploadVideoFormValues = {
	title: '',
	description: '',
	// video_type: 'virtuve',
	category: 'Vebinaras',
	duration: '00:00:00',
	isActive: true,
	videoS3Key: '',
	imageS3Key: '',
	action: 'insert',
	video: null,
	photo: null,
	participants: '',
	videoTags: [],
	// is_active: true,
	// search_tag: 'vebinaras',
};

export const AdminVirtuvePage = () => {
	const [isModalOpen, setIsModalOpen] = useState<ModalState>({ isOpen: false, action: null });
	const [formValues, setFormValues] = useState(emptyForm);
	const { data: videos, isLoading } = useVideosAdmin();
	const queryClient = useQueryClient();

	const handleDeleteVideo = useMutation<void, Error, AdmninVirtuveDto>({
		mutationFn: (video) =>
			axiosPrivate.delete(`/admin/videos/${video.id}`, {
				data: {
					videoS3Key: video.videoS3Key,
					imageS3Key: video.imageS3Key,
				},
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
		},
		onError: (err) => {
			toast.error(err.message || 'Klaida!');
		},
	});

	const handleFormInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		let value: unknown = e.target.value ?? e.target.dataset.value;
		const name = e.target.name || e.target.dataset.name;

		if (['video', 'photo'].includes(name as 'video' | 'photo')) {
			value = (e.target as HTMLInputElement).files?.[0] ?? null;
		} else if (name === 'isActive') {
			value = value === 'Taip';
		}
		setFormValues((prev) => ({ ...prev, [name as 'video' | 'photo']: value }));
	};

	return (
		<div>
			{isModalOpen.isOpen && (
				<Modal>
					<UploadVideoModal
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						formValues={formValues}
						handleFormInput={handleFormInput}
						setFormValues={setFormValues}
					/>
				</Modal>
			)}

			<VideosNav isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setFormValues={setFormValues} />
			<VideoRowHeader />
			{!isLoading &&
				videos?.map((video) => (
					<VideoRow
						key={video.id}
						video={video}
						setIsModalOpen={setIsModalOpen}
						setFormValues={setFormValues}
						handleDeleteVideo={handleDeleteVideo}
					/>
				))}
		</div>
	);
};
