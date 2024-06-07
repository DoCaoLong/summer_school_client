import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand";
import style from "./style.module.css";
import { ProfileLayout } from "@/layouts";
import { Card } from "@/components/card";
import { Avatar, useMediaQuery } from "@mui/material";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/services";
import CourseItem from "@/components/courseItem";
import { IOrderCourse } from "@/interfaces/orderCourse.type";
import { ICourseDetail } from "@/interfaces/course.type";
import Image from "next/image";
import Link from "next/link";

const History: NextPageWithLayout = () => {
    const [isLoading] = useProfileStore((state: IProfileState) => [
        state.isLoading,
    ]);

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const IS_MB = useMediaQuery("(max-width:1023px)");
    const params: { populate: string } = {
        populate: "teacher, teacher.avatar, image",
    };
    const { data: courseOrder } = useQuery({
        queryKey: [QR_KEY.COURSE_ORDER],
        queryFn: () => courseApi.getCourseOrder({ params }),
        staleTime: QR_TIME_CACHE,
    });
    const dataCourseOrder = courseOrder?.data ?? [];
    console.log(dataCourseOrder);

    return (
        <>
            <Seo title="Khóa học đã đăng ký" description="" url="" />
            <Card title={"Khóa học đã đăng ký"}>
                <div className={style.edit_profile_body}>
                    <div className={style.profile_his_list}>
                        {dataCourseOrder?.map((item: IOrderCourse) => (
                            <Link
                                href={`/khoa-hoc/${item?.courses[0]?.id}`}
                                key={item?.id}
                                className={style.profile_his_item}
                            >
                                <div className={style.his_item_img}>
                                    <Image
                                        fetchPriority="high"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={`${baseUrl}${item?.courses[0]?.image?.url}`}
                                        alt={item?.courses[0]?.image?.name}
                                        priority={true}
                                    />
                                </div>
                                <div className={style.his_content}>
                                    <div className={style.his_name}>
                                        {item?.courses[0]?.name}
                                    </div>
                                    <div className={style.his_author}>
                                        <Avatar
                                            alt={
                                                item?.courses[0]?.teacher?.name
                                            }
                                            src={`${baseUrl}${item?.courses[0]?.teacher?.avatar?.url}`}
                                            sx={{
                                                width: 36,
                                                height: 36,
                                            }}
                                        />
                                        <p>{item?.courses[0]?.teacher?.name}</p>
                                    </div>
                                    <div className={style.his_course_info}>
                                        <p
                                            className={
                                                style.his_numberOfSessions
                                            }
                                        >
                                            {item?.courses[0]?.numberOfSessions}{" "}
                                            Buổi
                                        </p>
                                        <p className={style.his_startDate}>
                                            {item?.courses[0]?.startDate}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Card>
        </>
    );
};
export default History;
History.Layout = ProfileLayout;
