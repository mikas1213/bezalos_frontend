import axios from "../../../api/axios";
import { axiosPrivate } from "../../../api/axios";

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirmed: string;
    initialTarget: 'profilis' | 'virtuve' | 'abu' | 'nezinau';
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface UpdatePasswordRequest {
    password: string;
    passwordConfirmed: string;
}

export interface UserData {
    user_id: string;
    user_name: string;
    user_role: 1213 | 2324;
    is_course: boolean;
    str_cus_id: string;
    user_subscription: boolean;
    user_s_subscription: boolean;
    u_status: 'profilis' | 'virtuve' | 'free';
    s_status: 'free' | 'Profilis' | 'Virtuvė' | 'Cancel_profilis' | 'Canceled_profilis' | 'Cancel_virtuve' | 'Canceled_virtuve' | 'UNPAID';
}

export interface AuthResponse {
    status: 'success';
    accessToken: string;
    user: UserData;
}

export interface MessageResponse {
    status: 'success';
    message: string;
}

export interface ValidateResetTokenResponse {
    status: 'success';
    email: string;
}

export interface ErrorResponse {
    status: 'fail' | 'error';
    message: string;
}

class AuthService {
    async signup(data: SignupRequest): Promise<MessageResponse> {
        const response = await axios.post('/auth/signup', data);
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

    async me(accessToken: string): Promise<AuthResponse> {
        const response = await axiosPrivate.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
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
};

export const authService = new AuthService();
