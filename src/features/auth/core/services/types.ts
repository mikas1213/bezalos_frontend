export type UserRole = 1213 | 2324;
export interface UserData {
    user_id: string;
    user_name: string;
    user_role: UserRole;
    is_course: boolean;
    str_cus_id: string;
    user_subscription: boolean;
    user_s_subscription: boolean;
    u_status: "profilis" | "virtuve" | "free";
    s_status:
        | "free"
        | "Profilis"
        | "Virtuvė"
        | "Cancel_profilis"
        | "Canceled_profilis"
        | "Cancel_virtuve"
        | "Canceled_virtuve"
        | "UNPAID";
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirmed: string;
    initialTarget: "profilis" | "virtuve" | "abu" | "nezinau";
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

export interface AuthResponse {
    status: "success";
    accessToken: string;
    user: UserData;
}

export interface MessageResponse {
    status: "success";
    message: string;
}

export interface ValidateResetTokenResponse {
    status: "success";
    email: string;
}

export interface ErrorResponse {
    status: "fail" | "error";
    message: string;
}
