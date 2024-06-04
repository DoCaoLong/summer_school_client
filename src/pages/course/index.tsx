import { NextPageWithLayout } from "@/common";
import { MainLayout } from "@/layouts";
import { Avatar, Button, Container, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { courseApi } from "@/services";
import { ICourse } from "@/interfaces/course.type";
import Image from "next/image";
import style from "./style.module.css";

const Course: NextPageWithLayout = () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const IS_MB = useMediaQuery("(max-width:1023px)");
    const params: any = {
        populate: "image",
    };
    const { data: course } = useQuery({
        queryKey: [QR_KEY.COURSE],
        queryFn: () => courseApi.getCourse({ params }),
        staleTime: QR_TIME_CACHE,
    });
    const dataCourse = course?.data ?? [];
    return (
        <Container maxWidth={`${IS_MB ? "lg" : "md"}`}>
            <div className={style.coursePage}>
                <h2 className={style.course_title}>
                    Tất Cả Khóa Học <br /> Lộ Trình
                    <span className={style.blue_color}> Frontend master </span>
                </h2>

                <p className={style.course_desc}>
                    Để trở thành Lập trình viên Frontend bạn sẽ phải trải qua lộ{" "}
                    <span className={`${style.blue_color} ${style.font_bold}`}>
                        trình học hơn 7 tháng
                    </span>{" "}
                    và hoàn thành
                    <span className={`${style.blue_color} ${style.font_bold}`}>
                        {" "}
                        5 dự án thực tế{" "}
                    </span>
                    trong một môi trường học giống như khi bạn đi làm.
                </p>

                <div className={style.course_list}>
                    {dataCourse?.map((item: ICourse, index: number) => (
                        <div key={index} className={style.course_item}>
                            <div className={style.course_item_left}>
                                <Image
                                    fetchPriority="high"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    src={`${baseUrl}${item?.attributes?.image?.data?.attributes?.url}`}
                                    alt={`${item?.attributes?.image?.data?.attributes?.name}`}
                                    priority={true}
                                />
                            </div>
                            <div className={style.course_item_right}>
                                <h3 className={style.course_name}>
                                    {item?.attributes?.name}
                                </h3>
                                <div className={style.course_info}>
                                    <div className={style.course_author}>
                                        <div
                                            className={style.course_author_img}
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="https://source.unsplash.com/random"
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                }}
                                            />
                                        </div>
                                        <p className={style.course_author_name}>
                                            Leesin
                                        </p>
                                    </div>
                                    <p className={style.course_time}>
                                        17/10/2024
                                    </p>
                                </div>
                                <Button
                                    size="large"
                                    variant="outlined"
                                    color="secondary"
                                    // onClick={handleAgree}
                                >
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};
export default Course;
Course.Layout = MainLayout;
