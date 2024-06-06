import { axiosConfig } from "@/configs";
import {
    ICourse,
    IResponseDetail,
    IResponseList,
} from "@/interfaces/index.type";

export interface IObjectUserApi {
    id: number;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        uid: string | number | null;
    };
}

export const objectUserApi = {
    getObjectUser: () => {
        return axiosConfig
            .get("/object-users")
            .then<IResponseList<IObjectUserApi[]>>((res) => res.data);
    },
};
