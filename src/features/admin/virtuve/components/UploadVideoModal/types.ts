import type { Dispatch, SetStateAction } from 'react';
import type { ChangeEvent } from 'react';

import type { ModalState, UploadVideoFormValues } from '../../pages/types';
export interface UploadVideoModalProps {
	isModalOpen: ModalState;
	setIsModalOpen: Dispatch<SetStateAction<ModalState>>;
	formValues: UploadVideoFormValues;
	setFormValues: Dispatch<SetStateAction<UploadVideoFormValues>>;
	handleFormInput: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
