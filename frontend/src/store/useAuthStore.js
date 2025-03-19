import { create } from 'zustand';
import {axiosInstance} from '../lib/axios';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try { 
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data, isCheckingAuth: false });
        }
        catch (error) {
            set({ authUser: null, isCheckingAuth: false });
            console.error(error);
        }
    },


    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            set({ authUser: res.data, isSigningUp: false });
        }
        catch (error) {
            set({ isSigningUp: false });
            console.error(error);
        }
    }
}));