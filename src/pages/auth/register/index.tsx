import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LoadingButton } from "@mui/lab";
import { Container, useMediaQuery } from "@mui/material";
import { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import { useMutation } from "react-query";
import * as Yup from "yup";
import style from "../style.module.css";
// import { IRegister } from "@/interfaces/index.type";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/common";
import { SignLayout } from "@/layouts";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { IObjectUserApi, objectUserApi } from "@/services/objectUser.api";
import { authApi } from "@/services";

const RegisterPage: NextPageWithLayout = () => {
    const IS_MB = useMediaQuery("(max-width:767px)");
    const router = useRouter();

    const { data: objectUsers } = useQuery({
        queryKey: [QR_KEY.OBJECT_USER],
        queryFn: () => objectUserApi.getObjectUser(),
        staleTime: QR_TIME_CACHE,
    });

    const dataObjectUser = objectUsers?.data || [];

    const validationSchema = Yup.object({
        username: Yup.string().required("Vui lòng nhập họ và tên"),
        // telephone: Yup.string()
        //     .required("Vui lòng nhập số điện thoại")
        //     .matches(validate.phoneVn, {
        //         message: "Vui lòng nhập đúng định dạng",
        //     }),
        email: Yup.string()
            .required("Vui lòng nhập email")
            .matches(validate.email, {
                message: "Vui lòng nhập đúng định dạng",
            }),
        dateOfBirth: Yup.string().required("Vui lòng chọn ngày sinh"),
        password: Yup.string().required("Vui lòng nhập mật khẩu"),
        objectUserId: Yup.string().required("Vui lòng chọn đối tượng học")
        .notOneOf(["0"], "Vui lòng chọn chức vụ"),

        // password: Yup.string()
        //   .required("Password is required")
        //   .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        //   .max(32, "Mật khẩu nhiều nhất 32 ký tự")
        //   .matches(validate.password, {
        //     message:
        //       "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 kí tự",
        //   }),
    });

    type FormData = Yup.InferType<typeof validationSchema>;

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            // telephone: "",
            dateOfBirth: "",
            objectUserId: "0",
        },
    });

    const onSubmit = (data: FormData) => {
        mutate(data);
        // console.log("data :>> ", data);
    };

    const { mutate } = useMutation({
        mutationFn: (body: any) => authApi.register(body),
        onSuccess: async () => {
            reset();
            toast.success("Đăng ký thành công");
            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
        },
        onError: (error) => {
            const err = error as AxiosError<any>;
            console.log()
            if (
                err?.response?.data?.error?.message ==
                "This attribute must be unique"
            ) {
                toast.error("Email hoặc tên đăng nhập này đã tồn tại!");
            } else {
                toast.error(`${err?.response?.data?.error?.message ?? ""}`);
            }
        },
    });

    return (
        <>
            <Container>
                <div className={style.loginWraper}>
                    {/* <div className={style.loginLeft}></div> */}
                    <div className={style.loginRight}>
                        <form
                            className={style.loginForm}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <p className={style.loginTitle}>Đăng ký</p>
                            <div className={IS_MB ? undefined : style.formRow}>
                                <div className={style.wrapInput}>
                                    <input
                                        {...register("username", {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="Họ và tên"
                                        className={style.input}
                                    />
                                    {errors.username && (
                                        <p className={style.textErr}>
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>
                                {/* <div className={style.wrapInput}>
                                    <input
                                        {...register("telephone", {
                                            required: true,
                                        })}
                                        type="number"
                                        placeholder="Số điện thoại"
                                        className={style.input}
                                    />
                                    {errors.telephone && (
                                        <p className={style.textErr}>
                                            {errors.telephone.message}
                                        </p>
                                    )}
                                </div> */}
                                <div className={style.wrapInput}>
                                    <input
                                        {...register("email", {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="Email"
                                        className={style.input}
                                    />
                                    {errors.email && (
                                        <p className={style.textErr}>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={IS_MB ? undefined : style.formRow}>
                                <div className={style.wrapInput}>
                                    <select
                                        {...register("objectUserId", {
                                            required: true,
                                        })}
                                        name="objectUserId"
                                        id="objectUserId"
                                        className={style.input}
                                    >
                                        <option value={0}>
                                            Chọc chức vụ
                                        </option>
                                        {dataObjectUser?.map(
                                            (
                                                item: IObjectUserApi,
                                                index: number
                                            ) => (
                                                <option
                                                    key={item.id}
                                                    value={item?.id}
                                                >
                                                    {item?.attributes?.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {errors.objectUserId && (
                                        <p className={style.textErr}>
                                            {errors.objectUserId.message}
                                        </p>
                                    )}
                                </div>
                                <div className={style.wrapInput}>
                                    <input
                                        {...register("dateOfBirth", {
                                            required: true,
                                        })}
                                        className={style.input}
                                        type="date"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                    />
                                    {errors.dateOfBirth && (
                                        <p className={style.textErr}>
                                            {errors.dateOfBirth.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={style.wrapInput}>
                                <input
                                    {...register("password", {
                                        required: true,
                                    })}
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className={style.input}
                                />
                                {errors.password && (
                                    <p className={style.textErr}>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className={style.wrapInput}>
                                <LoadingButton
                                    type="submit"
                                    style={{
                                        backgroundColor: "var(--primary-cl)",
                                        padding: IS_MB
                                            ? "12px 20px"
                                            : "20px 14px",
                                        width: "100%",
                                        borderRadius: "8px",
                                        fontWeight: "bold",
                                        margin: "14px 0",
                                    }}
                                    // loading={isLoading}
                                    variant="contained"
                                >
                                    Đăng ký
                                </LoadingButton>
                            </div>

                            <div className={style.wrapInput}>
                                <p className={style.formRegisText}>
                                    Bạn đã có có tài khoản?{" "}
                                    <Link href="/auth/login">
                                        Đăng nhập ngay
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
};
RegisterPage.Layout = SignLayout;
export default RegisterPage;
