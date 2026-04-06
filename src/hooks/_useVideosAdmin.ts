import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosInstance } from 'axios';

import { axiosPrivate } from '../api/axios';
interface AdmninVirtuveDto {
	category: string;
	commentsCount: number;
	createdAt: Date;
	duration: string;
	id: string;
	isActive: true;
	likesCount: number;
	imageS3Key: string;
	title: string;
	viewsTotal: number;
}

const fetchData = async (axiosPrivate: AxiosInstance): Promise<AdmninVirtuveDto> => {
	try {
		const { data } = await axiosPrivate.get<AdmninVirtuveDto>('/admin/virtuve');
		console.log('data: ', data);
		return data;
	} catch (err) {
		if (err instanceof AxiosError) throw new Error(err.message || err.response?.data.status || 'Error');
		throw new Error('Unknown error');
	}
};

const useVideosAdmin = () => {
	return useQuery<AdmninVirtuveDto>({
		queryKey: ['admin-videos'],
		queryFn: () => fetchData(axiosPrivate),
		retry: false,
	});
};

export default useVideosAdmin;
