import { axiosConfig } from "@/configs";
import { ICourseOrder, IResponseList } from "@/interfaces/index.type";

export const courseOrderApi = {
    getKnow: (param: any) => {
        return axiosConfig
            .get("/user-course-order", param)
            .then<IResponseList<ICourseOrder[]>>((res) => res.data);
    },
};
