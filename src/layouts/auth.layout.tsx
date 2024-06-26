/* eslint-disable react-hooks/exhaustive-deps */
import { LayoutProps } from "@/common";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function AuthLayout({ children }: LayoutProps) {
    const router = useRouter();
    const [isLoading, profile] = useProfileStore((state: IProfileState) => [
        state.isLoading,
        state.profile,
    ]);
    useEffect(() => {
        if (!isLoading && !profile) {
            router.push("/auth/login");
        }
    }, [isLoading, profile]);
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}
