import { authApi } from "@/services";
import { profileApi } from "@/services/profile.api";
import { IProfileState } from "@/store/zustand/type";
import { create } from "zustand";

export const useProfileStore = create<IProfileState>()((set) => ({
    profile: null,
    isLoading: true,
    getProfile: async () => {
        if (localStorage.getItem("accessToken")) {
            try {
                const res = await profileApi.getProfile();
                set((state) => ({ profile: res.data, isLoading: false }));
            } catch (error) {
                console.log(error);
                set((state) => ({ isLoading: false }));
            }
        } else {
            set((state) => ({ isLoading: false }));
        }
    },
    logoutProfile: async () => {
        // await authApi.logout();
        localStorage.removeItem("accessToken");
        set(() => ({ profile: null }));
    },
    // putProfile: (payload) => {
    //   set((state) => ({ profile: { ...state.profile, ...payload } }));
    // },
}));
