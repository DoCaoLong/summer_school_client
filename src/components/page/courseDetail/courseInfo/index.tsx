import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { courseApi } from "@/services";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import style from "./style.module.css";

export default function CourseInfo() {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const idCourse = router?.query?.courseId as string;

    const params: { populate: string } = {
        populate: "teacher, teacher.avatar, image",
    };

    const {
        isError,
        data: courseDetail,
        error,
    } = useQuery({
        queryKey: [QR_KEY.COURSE_DETAIL, idCourse],
        enabled: !!idCourse,
        retry: false,
        queryFn: () => courseApi.getCourseById(idCourse, { params }),
        staleTime: QR_TIME_CACHE,
    });

    if (isError) {
        toast.error(`Có lỗi sảy ra vui lòng thử lại sau (${error})`);
    }

    const imgCourse =
        courseDetail &&
        courseDetail?.data?.attributes?.image?.data?.attributes?.url;

    const backgroundImageStyle = {
        backgroundImage: `url(${
            !!imgCourse
                ? `${baseUrl}${imgCourse}`
                : "https://source.unsplash.com/random"
        })`,
    };
    return (
        <div className={style.course_info}>
            <div style={backgroundImageStyle} className={style.course_bg}></div>
            <div className={style.course_info_content}>
                <div className={style.info_banner}>
                    <div className={style.info_banner_content}>
                        <p className={style.info_banner_text}>Khóa học</p>
                        <h1 className={style.info_banner_name}>
                            {courseDetail?.data?.attributes?.name}
                        </h1>
                        <div className={style.info_banner_time}>
                            <div className={style.info_banner_timelecture}>
                                <p className={style.info_banner_text}>
                                    Khai giảng
                                </p>
                                <p>
                                    {dayjs(courseDetail?.data?.attributes
                                        ?.startDate).format('DD-MM-YYYY') ?? 0}
                                </p>
                            </div>
                            <div className={style.info_banner_session}>
                                <p className={style.info_banner_text}>
                                    Thời lượng
                                </p>
                                <p>
                                    {courseDetail?.data?.attributes
                                        ?.numberOfSessions ?? 0}{" "}
                                    Buổi
                                </p>
                            </div>
                        </div>
                        <Button
                            size="large"
                            variant="contained"
                            color="secondary"
                            // onClick={handleAgree}
                        >
                            Đăng ký khóa học
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
