import { axiosPrivate, axiosPublic } from '../../../../api/axios';

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
		const response = await axiosPublic.post('/auth/signup', data);
		return response.data;
	}

	async login(data: LoginRequest): Promise<AuthResponse> {
		const response = await axiosPrivate.post('/auth/login', data);
		return response.data;
	}

	async refresh(): Promise<AuthResponse> {
		const response = await axiosPrivate.get('/auth/refresh');
		return response.data;
	}

	async logout(): Promise<void> {
		await axiosPrivate.post('/auth/logout');
	}

	async forgotPassword(data: ForgotPasswordRequest): Promise<MessageResponse> {
		const response = await axiosPublic.post('/auth/forgot-password', data);
		return response.data;
	}

	async validateResetToken(token: string): Promise<ValidateResetTokenResponse> {
		const response = await axiosPublic.get(`/auth/reset-password/${token}`);
		return response.data;
	}

	async updatePassword(token: string, data: UpdatePasswordRequest): Promise<MessageResponse> {
		const response = await axiosPublic.patch(`/auth/reset-password/${token}`, data);
		return response.data;
	}
}

export const authService = new AuthService();
