import { NextPageWithLayout } from "@/common";
import { MainLayout } from "@/layouts";
import { Container } from "@mui/material";
import style from "./style.module.css";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { blogApi } from "@/services/blog.api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { IBlog } from "@/interfaces/blog.type";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";

const Blog: NextPageWithLayout = () => {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const idBlog = router?.query?.blogId as string;
    const params: any = {
        populate: "*",
    };
    const { data: blogDetail } = useQuery({
        queryKey: [QR_KEY.BLOG_DETAIL, idBlog],
        enabled: !!idBlog,
        retry: false,
        queryFn: () => blogApi.getBlogById(idBlog, { params }),
        staleTime: QR_TIME_CACHE,
    });
    console.log(blogDetail);
    return (
        <Container maxWidth="md">
            <div className={style.blogPage}>
                <h1 className={style.blogPage_title}>
                    {blogDetail?.data?.attributes?.title}
                </h1>
                <p className={style.blogDetailCreateAt}>
                    {dayjs(blogDetail?.data?.attributes?.createdAt).format(
                        "DD-MM-YYYY"
                    )}
                </p>
                <Image
                    fetchPriority="high"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    src={`${baseUrl}${
                        blogDetail?.data?.attributes?.thumbnail?.data
                            ?.attributes?.url ?? ""
                    }
                                    `}
                    alt={
                        blogDetail?.data?.attributes?.thumbnail?.data
                            ?.attributes?.name ?? "image-thumnail"
                    }
                    priority={true}
                />
                <p className={style.blogDetailDesc}>
                    {blogDetail?.data?.attributes?.content}
                </p>
            </div>
        </Container>
    );
};
export default Blog;
Blog.Layout = MainLayout;
