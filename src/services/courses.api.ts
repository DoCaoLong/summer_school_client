import { axiosConfig } from "@/configs";
import {
    ICourse,
    ICourseOrder,
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
    postOrderCourse: (body: any) => {
        return axiosConfig
            .post(`/user-course-order`, body)
            .then<IResponseList<ICourseOrder>>((res) => res.data);
    },
};
