import { axiosConfig } from "@/configs";
import {
    ICourse,
    IResponseDetail,
    IResponseList,
} from "@/interfaces/index.type";

export const courseApi = {
    getCourse: (param: any) => {
        return axiosConfig
            .get("/courses", param)
            .then<IResponseList<ICourse[]>>((res) => res.data);
    },
    getCourseById: (id: number | string, param: any) => {
        return axiosConfig
            .get(`/courses/${id}`, param)
            .then<IResponseList<ICourse>>((res) => res.data);
    },
};
