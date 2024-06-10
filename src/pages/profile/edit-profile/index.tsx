import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { Card } from "@/components/card";
import { ProfileLayout } from "@/layouts";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import style from "./style.module.css";
import { usePostMedia } from "@/hooks";
import { ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { profileApi } from "@/services/profile.api";
import { IReqProfile } from "@/interfaces/req.type";

interface FormData {
    name: string;
    email: string;
    dateOfBirth: string;
    objectUser: string;
}

const EditProfile: NextPageWithLayout = () => {
    const [profile, putProfile] = useProfileStore((state: IProfileState) => [
        state.profile,
        state.putProfile,
    ]);
    const { handlePostMedia } = usePostMedia();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        dateOfBirth: Yup.string().required("Ngày tháng năm sinh is required"),
        objectUser: Yup.string().required("Nghành nghề không được bỏ trống"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: profile?.attributes?.fullName
                ? profile?.attributes?.fullName
                : profile?.attributes?.username ?? "",
            email: profile?.attributes?.email ?? "",
            dateOfBirth:
                dayjs(profile?.attributes?.dateOfBirth).format("DD-MM-YYYY") ??
                "",
            objectUser: profile?.attributes?.object_user?.name ?? "",
        },
    });

    const { mutate: handleUpdateProfile, status } = useMutation({
        mutationKey: ["PUT_PROFILE"],
        mutationFn: (body: IReqProfile) => profileApi.putProfile(body),
        onSuccess: (res) => {
            console.log(res)
            // putProfile(res);
            // resultLoad({
            //     message: "Đã thay đổi thông tin cá nhân",
            //     color: "success",
            // });
        },
        // onError: () => {
        //     resultLoad({
        //         color: "error",
        //         message: "Có lỗi xảy ra",
        //     });
        // },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    // const onChangeMedia = async (e: ChangeEvent<HTMLInputElement>) => {
    //     handlePostMedia({
    //         e,
    //         callBack: (data) => {
    //             handleUpdateProfile({ media_id: data[0].mediaId });
    //         },
    //     });
    // };

    return (
        <>
            <Seo title="Thông tin tài khoản" description="" url="" />
            {/* {!isLoading && ( */}
            <div className={style.account_page_body}>
                <Card title={"Thông tin tài khoản"}>
                    <div className={style.edit_profile_body}>
                        <form
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                            className={style.form_input}
                        >
                            <div className={style.rowInput}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="name"
                                            label="Họ và tên"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                            size="medium"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            // disabled
                                        />
                                    )}
                                />
                                <Controller
                                    name="objectUser"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="objectUser"
                                            label="Nghành nghề"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.objectUser}
                                            helperText={
                                                errors?.objectUser?.message
                                            }
                                            size="medium"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            // disabled
                                        />
                                    )}
                                />
                            </div>
                            <div className={style.rowInput}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="email"
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            size="medium"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            // disabled
                                        />
                                    )}
                                />
                                <Controller
                                    name="dateOfBirth"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="dateOfBirth"
                                            label="Ngày tháng năm sinh"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.dateOfBirth}
                                            helperText={
                                                errors.dateOfBirth?.message
                                            }
                                            size="medium"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            // disabled
                                        />
                                    )}
                                />
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
            {/* )} */}
        </>
    );
};
export default EditProfile;
EditProfile.Layout = ProfileLayout;
