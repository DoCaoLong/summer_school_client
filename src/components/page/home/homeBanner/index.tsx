import { Button, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import style from "./style.module.css";
export const HomeBanner: FC = () => {
    const IS_MB = useMediaQuery("(max-width:767px)");
    const imgMB =
        "https://cdn.sanity.io/images/qa41whrn/staging/0bc0ba3aed0566e74b233cab3485e6d6039650e9-1536x1536.jpg?w=720&q=80&auto=format";
    const imgPC =
        "https://cdn.sanity.io/images/qa41whrn/staging/26f2ce14a23a1f32577f37954b1356a9bccbaeac-1440x500.jpg?w=2160&q=80&auto=format";
    return (
        <div className={style.homeBanner}>
            <Image
                fetchPriority="high"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
                src={IS_MB ? imgMB : imgPC}
                alt="..."
                priority={true}
            />
            <div className={style.banner_contents}>
                <div className={style.banner_content_text}>
                    <h1>
                        Học Lập Trình Frontend{" "}
                        <span className={style.cl_blue}>
                            Thực Chiến Trên Dự Án
                        </span>
                    </h1>
                    <h2>
                        Điều quý giá nhất là sự chân thành, tận tâm, cùng nhau
                        cố gắng để tạo ra những điều tốt đẹp trên hành trình trở
                        thành lập trình viên Frontend
                    </h2>
                </div>
                <div className={style.banner_content_btn}>
                    <Button
                        color={"secondary"}
                        size="large"
                        variant="contained"
                    >
                        Xem ngay
                    </Button>
                </div>
            </div>
        </div>
    );
};
