import axios from '../../../../api/axios';
import { axiosPrivate } from '../../../../api/axios';

import type {
	AuthResponse,
	ForgotPasswordRequest,
	LoginRequest,
	MessageResponse,
	SignupRequest,
	UpdatePasswordRequest,
	ValidateResetTokenResponse,
} from './types';

class AuthService {
	async signup(data: SignupRequest): Promise<MessageResponse> {
		const response = await axios.post('/auth/signup', data);
		return response.data;
	}

	async login(data: LoginRequest): Promise<AuthResponse> {
		const response = await axios.post('/auth/login', data, { withCredentials: true });
		return response.data;
	}

	async refresh(): Promise<AuthResponse> {
		const response = await axiosPrivate.get('/auth/refresh');
		return response.data;
	}

	async me(accessToken: string): Promise<AuthResponse> {
		const response = await axiosPrivate.get('/auth/me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	}

	async logout(): Promise<void> {
		await axiosPrivate.post('/auth/logout');
	}

	async forgotPassword(data: ForgotPasswordRequest): Promise<MessageResponse> {
		const response = await axios.post('/auth/forgot-password', data);
		return response.data;
	}

	async validateResetToken(token: string): Promise<ValidateResetTokenResponse> {
		const response = await axios.get(`/auth/reset-password/${token}`);
		return response.data;
	}

	async updatePassword(token: string, data: UpdatePasswordRequest): Promise<MessageResponse> {
		const response = await axios.patch(`/auth/reset-password/${token}`, data);
		return response.data;
	}
}

export const authService = new AuthService();
