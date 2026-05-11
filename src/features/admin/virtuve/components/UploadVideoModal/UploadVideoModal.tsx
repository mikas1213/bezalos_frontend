import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';
import io, { type Socket } from 'socket.io-client';

import { axiosPrivate } from '../../../../../api/axios';
import Input from '../../../../../components/Shared';
import { ButtonCancel, ButtonSave } from '../../../../../components/Shared/Buttons';
import File from '../../../../../components/Shared/File';
import FilterChip from '../../../../../components/Shared/FilterChip';
import Select from '../../../../../components/Shared/Select';
import Textarea from '../../../../../components/Shared/Textarea';
import UploadArea from '../../../../../components/Shared/UploadArea';
import { useAddTag } from '../../../../../hooks/tagsHooks/useAddTag';
import { useDeleteTag } from '../../../../../hooks/tagsHooks/useDeleteTag';
import { useTags } from '../../../../../hooks/tagsHooks/useTags';
import { useUploadVideo } from '../../hooks/useUploadVideo';
import { ProgressBar } from '../ProgressBar/ProgressBar';

import type { UploadVideoModalProps } from './types';

import styles from './UploadVideoModal.module.scss';

const formatFileSize = (bytes: number) => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const UploadVideoModal = ({
	isModalOpen,
	setIsModalOpen,
	formValues,
	setFormValues,
	handleFormInput,
}: UploadVideoModalProps) => {
	const queryClient = useQueryClient();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [videoProgress, setVideoProgress] = useState(0);
	const [uploadError, setUploadError] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [message, setMessage] = useState('');

	const uploadVideoMutation = useUploadVideo({
		socket,
		action: isModalOpen.action!,
		isVideo: !!formValues.video,
		setUploadProgress,
		setVideoProgress,
		setMessage,
		setUploading,
		setUploadSuccess,
		setUploadError,
	});

	useEffect(() => {
		const initializeSocket = async () => {
			let socketUrl = '';
			try {
				const { data } = await axiosPrivate.get('/config');
				socketUrl = data;
			} catch (err) {
				if (err instanceof Error) {
					socketUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : 'https://bezalos.lt';
				}
			}

			const newSocket = io(socketUrl, {
				transports: ['websocket', 'polling'],
				upgrade: false,
				rememberUpgrade: false,
				timeout: 60000,
				reconnection: true,
				reconnectionDelay: 1000,
				reconnectionDelayMax: 5000,
				reconnectionAttempts: Infinity,
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
				setTimeout(() => {
					if (newSocket) newSocket.disconnect();
				}, 1000);
			});

			newSocket.on('uploadError', (data) => {
				console.log('uploadError', data.message);
				toast.error(data.message);
				setUploading(false);
				setUploadError(true);
			});
		};
		initializeSocket();
		return () => {
			if (socket) socket.close();
		};
	}, []);

	const { data } = useTags('virtuve');
	const categories = data?.categories ?? [];
	const tags = data?.tags ?? [];

	const addTagMutation = useAddTag();
	const deleteTagMutation = useDeleteTag();

	const [isEditMode, setIsEditMode] = useState(false);
	const [addedTags, setAddedTags] = useState<string[]>([]);
	const [deletedTags, setDeletedTags] = useState<Set<string>>(new Set());
	const [newTagInput, setNewTagInput] = useState('');

	const localTags = useMemo(() => [...tags.filter((t) => !deletedTags.has(t)), ...addedTags], [tags, deletedTags, addedTags]);

	const handleDeleteTag = (tag: string) => {
		if (addedTags.includes(tag)) {
			setAddedTags((prev) => prev.filter((t) => t !== tag));
		} else {
			setDeletedTags((prev) => new Set([...prev, tag]));
		}
		setFormValues((prev) => ({
			...prev,
			videoTags: prev.videoTags?.filter((t) => t !== tag) ?? [],
		}));
	};

	const handleAddTag = () => {
		const trimmed = newTagInput.trim();
		if (!trimmed || localTags.includes(trimmed)) return;
		setAddedTags((prev) => [...prev, trimmed]);
		setNewTagInput('');
	};

	const handleSaveEdit = async () => {
		try {
			await Promise.all([
				...Array.from(deletedTags).map((tag) => deleteTagMutation.mutateAsync({ feature: 'virtuve', tag })),
				...addedTags.map((tag) => addTagMutation.mutateAsync({ feature: 'virtuve', tag })),
			]);
			setAddedTags([]);
			setDeletedTags(new Set());
			setIsEditMode(false);
		} catch {
			// klaidos tvarkomos hook'uose per toast
		}
	};

	const handleCancelEdit = () => {
		setAddedTags([]);
		setDeletedTags(new Set());
		setIsEditMode(false);
	};

	const isSaving = addTagMutation.isPending || deleteTagMutation.isPending;

	const handleCheckboxChange = (value: string) => {
		setFormValues((prev) => {
			const selectedFilter = prev.videoTags ? prev.videoTags : [];
			const newSelectedFilter = selectedFilter.includes(value)
				? selectedFilter.filter((item) => item !== value)
				: [...selectedFilter, value];

			return {
				...prev,
				videoTags: newSelectedFilter,
			};
		});
	};

	const isChecked = (value: string) => {
		if (!formValues.videoTags) return false;
		return formValues.videoTags.includes(value);
	};

	const removeFile = (file: 'video' | 'photo') => {
		setFormValues((prevState) => ({ ...prevState, [file]: null }));
		const el = document.getElementById(file) as HTMLInputElement | null;
		if (el) el.value = '';
	};

	const handleUpload = async () => {
		if (!formValues.title) {
			toast.error('Pavadinimas❗️');
			return;
		}
		if (!formValues.description) {
			toast.error('Aprašymas❗️');
			return;
		}
		if (formValues.duration === '00:00:00') {
			toast.error('Video trukmė');
			return;
		}

		if (!formValues.video && isModalOpen.action === 'insert') {
			toast.error('Nope, reik video! 🎥');
			return;
		}
		if (!formValues.photo && isModalOpen.action === 'insert') {
			toast.error('Nope, reik foto! 🏞');
			return;
		}

		setUploading(true);
		setUploadProgress(0);
		setMessage('');
		setUploadError(false);
		setUploadSuccess(false);

		uploadVideoMutation.mutate(formValues);
	};

	const handleCancelUpload = () => {
		if (socket && socket.connected) {
			console.log('🔌 Manually disconnecting socket...');
			socket.disconnect();
		}
		setFormValues({
			action: null,
			title: '',
			description: '',
			category: 'Vebinaras',
			participants: '',
			duration: '00:00:00',
			isActive: true,
			videoTags: [],
			imageS3Key: '',
			videoS3Key: '',
			videoS3SnippetKey: '',
			photo: null,
			video: null,
		});
		setIsModalOpen({ action: null, isOpen: false });
	};

	return (
		<div className={styles.form}>
			<Input
				label="Pavadinimas"
				name="title"
				value={formValues.title || ''}
				handleFormInput={handleFormInput}
				className={styles.span_4}
			/>

			<Input
				label="Dalyviai"
				name="participants"
				value={formValues.participants || ''}
				handleFormInput={handleFormInput}
				className={styles.span_4}
			/>

			<Textarea
				placeholder="Aprašymas"
				name="description"
				maxLength={1500}
				value={formValues.description}
				formValues={formValues}
				handleFormInput={handleFormInput}
				className={styles.span_full}
			/>

			<Select
				label="Kategorija"
				name="category"
				value={formValues.category}
				options={categories}
				handleFormInput={handleFormInput}
				className={styles.span_2}
			/>

			<Input
				label="Trukmė"
				name="duration"
				value={formValues.duration}
				handleFormInput={handleFormInput}
				className={styles.span_2}
			/>

			<Select
				label="Aktyvus"
				name="isActive"
				value={formValues.isActive ? 'Taip' : 'Ne'}
				options={['Taip', 'Ne']}
				handleFormInput={handleFormInput}
				className={styles.span_2}
			/>

			<div className={styles.filterChips}>
				<div className={styles.tagsRow}>
					{localTags.map((tag) => (
						<FilterChip
							key={tag}
							label={tag}
							value={tag}
							isChecked={isChecked(tag)}
							onChange={handleCheckboxChange}
							onRemove={isEditMode ? () => handleDeleteTag(tag) : undefined}
						/>
					))}
					<button
						type="button"
						className={styles.editBtn}
						onClick={isEditMode ? handleSaveEdit : () => setIsEditMode(true)}
						disabled={isSaving}
					>
						{isEditMode ? (
							<>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="20 6 9 17 4 12" />
								</svg>
								{isSaving ? 'Saugoma...' : 'Atlikta'}
							</>
						) : (
							<>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M12 20h9" />
									<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
								</svg>
								Redaguoti
							</>
						)}
					</button>
				</div>
				{isEditMode && (
					<div className={styles.editPanel}>
						<input
							className={styles.addTagInput}
							value={newTagInput}
							onChange={(e) => setNewTagInput(e.target.value)}
							placeholder="Naujo filtro pavadinimas..."
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleAddTag();
								if (e.key === 'Escape') setIsEditMode(false);
							}}
							autoFocus
						/>
						<button type="button" className={styles.addTagBtn} onClick={handleAddTag} disabled={!newTagInput.trim()}>
							Pridėti
						</button>
						{(addedTags.length > 0 || deletedTags.size > 0) && (
							<button type="button" className={styles.cancelEditBtn} onClick={handleCancelEdit}>
								Atšaukti pakeitimus
							</button>
						)}
					</div>
				)}
			</div>

			{formValues.video ? (
				<File
					name="video"
					fileName={formValues.video?.name}
					fileSize={formatFileSize(formValues.video?.size || 0)}
					fileType={formValues.video?.type}
					className={styles.span_4}
					uploading={uploading}
					uploadSuccess={uploadSuccess}
					onClick={() => removeFile('video')}
				/>
			) : (
				<UploadArea name="video" accept="video/*" handleFormInput={handleFormInput} className={styles.span_4} />
			)}

			{formValues.photo ? (
				<File
					name="photo"
					fileName={formValues.photo?.name}
					fileSize={formatFileSize(formValues.photo?.size || 0)}
					fileType={formValues.photo?.type}
					className={styles.span_4}
					uploading={uploading}
					uploadSuccess={uploadSuccess}
					onClick={() => removeFile('photo')}
				/>
			) : (
				<UploadArea name="photo" accept="image/*" handleFormInput={handleFormInput} className={styles.span_4} />
			)}
			<ProgressBar
				uploadError={uploadError}
				uploadSuccess={uploadSuccess}
				uploadProgress={uploadProgress}
				videoProgress={videoProgress}
				message={message}
			/>

			<ButtonCancel
				label={uploading ? 'Loading...' : uploadSuccess ? 'Uždaryti' : 'Atšaukti'}
				className={uploadSuccess ? styles.span_full : styles.span_4}
				uploading={uploading}
				onClick={handleCancelUpload}
			/>

			{!uploadSuccess && (
				<ButtonSave
					label={uploading ? 'Loading...' : isModalOpen.action === 'insert' ? 'Išsaugoti' : 'Atnaujinti'}
					className={styles.span_4}
					uploading={uploading}
					onClick={handleUpload}
				/>
			)}
		</div>
	);
};
