import type { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';

import Modal from '../../../../components/Shared/Modal';
import { UploadVideoModal } from '../components/UploadVideoModal';
import { VideoRow, VideoRowHeader } from '../components/VideoRow';
import { VideosNav } from '../components/VideosNav';
import { useDeleteVideo } from '../hooks/useDeleteVideo';
import useVideosAdmin from '../hooks/useVideosAdmin';

import type { ModalState, UploadVideoFormValues } from './types';
const emptyForm: UploadVideoFormValues = {
	title: '',
	description: '',
	category: 'Vebinaras',
	duration: '00:00:00',
	isActive: true,
	imageS3Key: '',
	videoS3Key: '',
	videoS3SnippetKey: '',
	action: 'insert',
	video: null,
	photo: null,
	participants: '',
	videoTags: [],
};

export const AdminVirtuvePage = () => {
	const [isModalOpen, setIsModalOpen] = useState<ModalState>({ isOpen: false, action: null });
	const [formValues, setFormValues] = useState<UploadVideoFormValues>(emptyForm);
	const { data: videos, isLoading } = useVideosAdmin();
	const handleDeleteVideo = useDeleteVideo();

	const handleFormInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | MouseEvent<HTMLDivElement>) => {
		const target = (e.currentTarget ?? e.target) as HTMLInputElement & HTMLElement;
		let value: unknown = target.value ?? target.dataset.value;
		const name = target.name || target.dataset.name;
		if (['video', 'photo'].includes(name as 'video' | 'photo')) {
			value = target.files?.[0] ?? null;
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
