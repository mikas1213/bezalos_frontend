import type { Dispatch, SetStateAction } from 'react';

import type { ModalState } from '../../pages/types';
import type { UploadVideoFormValues } from '../../pages/types';
export interface VideosNavProps {
	isModalOpen: ModalState;
	setIsModalOpen: Dispatch<SetStateAction<ModalState>>;
	setFormValues: Dispatch<SetStateAction<UploadVideoFormValues>>;
}
