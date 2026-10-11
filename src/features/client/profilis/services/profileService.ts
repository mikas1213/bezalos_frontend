import { axiosPrivate } from '../../../../api/axios';
import type { AnketaForm, NewRecipePayload, NewRecipeResponse, Product, ProfileDto } from '../types';

class ProfileService {
	/** GET /profile/:id grąžina masyvą su viena eilute; čia jis išpakuojamas. */
	async getProfile(userId: string): Promise<ProfileDto> {
		const response = await axiosPrivate.get<ProfileDto[]>(`/profile/${userId}`);
		const profile = response.data[0];
		if (!profile) {
			throw new Error('Profilis nerastas');
		}
		return profile;
	}

	async getProducts(): Promise<Product[]> {
		const response = await axiosPrivate.get<Product[]>('/profile/products');
		return response.data;
	}

	async createRecipe(userId: string, recipe: NewRecipePayload): Promise<NewRecipeResponse> {
		const response = await axiosPrivate.post<NewRecipeResponse>(`/profile/new-recipe/${userId}`, recipe);
		return response.data;
	}

	async deleteRecipe(recipeId: string): Promise<void> {
		await axiosPrivate.delete(`/profile/new-recipe/${recipeId}`);
	}

	/** Backend'as grąžina atgal išvalytą kūną, bet jis nenaudingas (routines ten jau JSON string). */
	async saveAnketa(userId: string, anketa: AnketaForm): Promise<void> {
		await axiosPrivate.post(`/profile/anketa/${userId}`, anketa);
	}
}

export const profileService = new ProfileService();
