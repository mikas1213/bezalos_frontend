import { axiosPublic } from '../../../../api/axios';
type DataUrl = `data:${string};base64,${string}`;
export interface PaslaugaDetails {
	desc: string;
	icon: string;
	title: string;
	id: number;
}

export interface PaslaugaDto {
	id: string;
	title: string;
	grid_desc: string;
	basic_desc: string;
	details: PaslaugaDetails[];
	slug: string;
	quantity: number;
	sort: number;
	is_active: boolean;
	base_price: string;
	discount: number;
	created_at: Date;
	updated_at: Date;
	image_s: DataUrl;
	image_m: DataUrl;
	image_l: DataUrl;
	category: string;
	status: string;
	current_price: string;
}
class PaslaugosService {
	async getPaslaugos(): Promise<PaslaugaDto[]> {
		const response = await axiosPublic.get<PaslaugaDto[]>('/services');
		return response.data;
	}

	async getPaslauga(slug: string | undefined): Promise<PaslaugaDto> {
		const response = await axiosPublic.get<PaslaugaDto>(`/services/${slug}`);
		return response.data;
	}
}

export const paslaugosService = new PaslaugosService();
