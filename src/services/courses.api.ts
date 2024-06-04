import { axiosConfig } from "@/configs";
import { ICourse, IResponseList } from "@/interfaces/index.type";

export const courseApi = {
    getCourse: (param: any) => {
        return axiosConfig
            .get("/courses", param)
            .then<IResponseList<ICourse[]>>((res) => res.data);
    },
};
