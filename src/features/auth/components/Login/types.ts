export interface LoginProps {
    onSuccess: () => void;
}
export interface FormData {
    email: string;
    password: string;
}
export interface FormErrors {
    email?: string;
    password?: string;
}
export interface ApiErrorResponse {
    status: "fail";
    message: string;
    error: {
        statusCode: number;
        status: "fail";
        isOperational: boolean;
        errors?: {
            email?: string[];
            password?: string[];
        };
    };
}
