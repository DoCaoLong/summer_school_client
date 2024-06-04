import { LayoutProps } from "@/common";
import style from "./style.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export function HomeLayout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <div className={style.homeLayout}>{children}</div>
            <Footer />
        </>
    );
}
