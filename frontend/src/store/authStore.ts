import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    _id: string;
    firstName: string;
    lastName?: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    isActive: boolean;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    clearAuth: () => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            setAuth: (user, token) => {
                localStorage.setItem('accessToken', token);
                set({ user, accessToken: token, isAuthenticated: true });
            },
            clearAuth: () => {
                localStorage.removeItem('accessToken');
                set({ user: null, accessToken: null, isAuthenticated: false });
            },
            updateUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);