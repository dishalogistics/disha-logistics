import api from "./axiosInstance";

export interface RegisterData {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    role?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface OTPData {
    email: string;
    otp: string;
    purpose: "REGISTER" | "LOGIN" | "RESET_PASSWORD";
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    email: string;
    otp: string;
    newPassword: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const authApi = {
    register: (data: RegisterData) => api.post("/auth/register", data),

    verifyOTP: (data: OTPData) => api.post("/auth/verify-otp", data),

    login: (data: LoginData) => api.post("/auth/login", data),

    logout: () => api.post("/auth/logout"),

    refresh: () => api.post("/auth/refresh"),

    forgotPassword: (data: ForgotPasswordData) =>
        api.post("/auth/forgot-password", data),

    resetPassword: (data: ResetPasswordData) =>
        api.post("/auth/reset-password", data),

    changePassword: (data: ChangePasswordData) =>
        api.post("/auth/change-password", data),

    getMe: () => api.get("/auth/me"),
};
