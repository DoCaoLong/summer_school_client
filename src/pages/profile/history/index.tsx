import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand";
import style from "./style.module.css";
import { ProfileLayout } from "@/layouts";
import Card from "@mui/material/Card";

const History: NextPageWithLayout = () => {
    const [isLoading] = useProfileStore((state: IProfileState) => [
        state.isLoading,
    ]);

    return (
        <>
            <Seo title="Lịch sử mua hàng" description="" url="" />
            {!isLoading && (
                <Card title={"Lịch sử mua hàng"}>
                    <div className={style.edit_profile_body}>
                        Lịch sử mua hàng
                    </div>
                </Card>
            )}
        </>
    );
};
export default History;
History.Layout = ProfileLayout;
