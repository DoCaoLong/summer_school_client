import { axiosConfig } from "@/configs";

export const profileApi = {
    getProfile: () => {
        return axiosConfig.get("/user-profile").then((res) => res.data);
    },
};
