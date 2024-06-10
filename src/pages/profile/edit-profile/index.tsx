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
import { useGetObjectUser, usePostMedia } from "@/hooks";
import { ChangeEvent, FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { profileApi } from "@/services/profile.api";
import { IReqProfile } from "@/interfaces/req.type";
import { IUser } from "@/interfaces/index.type";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface FormData {
    fullName: string;
    username: string;
    email: string;
    dateOfBirth: string;
    objectUser: number;
}

const EditProfile: NextPageWithLayout = () => {
    const [profile] = useProfileStore((state: IProfileState) => [
        state.profile
    ]);
    const { handlePostMedia } = usePostMedia();

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
                        {profile && <FormProfile profile={profile} />}
                    </div>
                </Card>
            </div>
            {/* )} */}
        </>
    );
};
export default EditProfile;

const FormProfile: FC<{ profile: IUser }> = ({ profile }) => {
    const { dataObjectUser } = useGetObjectUser()
    const [updateProfileForm] = useProfileStore(state => [state.updateProfileForm])
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("Full name is required"),
        username: Yup.string().required("Username is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        dateOfBirth: Yup.string().required("Ngày tháng năm sinh is required"),
        objectUser: Yup.number().required("Nghành nghề không được bỏ trống"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            fullName: profile.attributes.fullName,
            username: profile.attributes.username,
            email: profile?.attributes?.email ?? "",
            dateOfBirth: profile.attributes.dateOfBirth ? dayjs(profile.attributes.dateOfBirth).format('YYYY-MM-DD') : 'YYYY-MM-DD',
            objectUser: profile?.attributes?.object_user?.id || 1,
        },
    });
    const onSubmit = (values: FormData) => {
        // return console.log(values)
        updateProfileForm({
            fullName: values.fullName,
            username: values.username,
            email: values.email,
            dateOfBirth: dayjs(values.dateOfBirth).isValid() ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : undefined,
            objectUserId:values.objectUser
        })
    }
    return (
        <>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className={style.form_input}
            >
                <div className={style.rowInput}>
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="fullName"
                                label="Họ và tên"
                                variant="outlined"
                                fullWidth
                                error={!!errors.fullName}
                                helperText={errors?.fullName?.message}
                                size="medium"
                            // InputProps={{
                            //     readOnly: true,
                            // }}
                            // disabled
                            />
                        )}
                    />
                    {
                        dataObjectUser.length > 0 &&
                        <Controller
                        name="objectUser"
                        control={control}
                        render={({ field }) => (
                            // <TextField
                            //     {...field}
                            //     id="objectUser"
                            //     label="Nghành nghề"
                            //     variant="outlined"
                            //     fullWidth
                            //     error={!!errors.objectUser}
                            //     helperText={
                            //         errors?.objectUser?.message
                            //     }
                            //     size="medium"
                            //     InputProps={{
                            //         readOnly: true,
                            //     }}
                            // // disabled
                            // />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Nghành nghề</InputLabel>
                                <Select
                                    {...field}
                                    labelId="demo-simple-select-label"
                                    id="objectUser"
                                    // value={age}
                                    label="Nghành nghề"
                                // onChange={handleChange}
                                >
                                    {
                                        dataObjectUser.map(i => (
                                            <MenuItem key={i.id} value={i.id}>{i.attributes.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )}
                    />
                    }
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
                            // InputProps={{
                            //     readOnly: true,
                            // }}
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
                                type="date"
                                error={!!errors.dateOfBirth}
                                helperText={
                                    errors.dateOfBirth?.message
                                }
                                size="medium"
                            // InputProps={{
                            //     readOnly: true,
                            // }}
                            // disabled
                            />
                        )}
                    />
                </div>
                <div>
                    <Button type="submit" variant="contained" style={{ backgroundColor: 'var(--secondary-cl)', textTransform: 'unset' }}>
                        Lưu thông tin
                    </Button>
                </div>
            </form>
        </>
    )
}

EditProfile.Layout = ProfileLayout;
