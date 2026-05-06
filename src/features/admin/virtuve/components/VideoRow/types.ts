import type { Dispatch, SetStateAction } from 'react';

import type { UseMutationResult } from '@tanstack/react-query';

import type { ModalState, UploadVideoFormValues } from '../../pages/types';
import type { AdmninVirtuveDto } from '../../types';
import type { DeletePayload } from '../../types';

export interface VideoRowProps {
	video: AdmninVirtuveDto;
	setIsModalOpen: Dispatch<SetStateAction<ModalState>>;
	setFormValues: Dispatch<SetStateAction<UploadVideoFormValues>>;
	handleDeleteVideo: UseMutationResult<void, Error, DeletePayload>;
}
