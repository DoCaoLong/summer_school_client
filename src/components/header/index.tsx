import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useMediaQuery } from "@mui/material";

export default function Header() {
    const IS_MB = useMediaQuery("(max-width:1023px)");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    function handleActiveHambuger() {
        document.body.classList.toggle(style.body_active);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 66) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Check if current path is the homepage on component mount
        setIsHomePage(window.location.pathname === "/");

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`${style.header} ${style.container_fluid} ${
                isHomePage && isScrolled
                    ? style.scrolled
                    : !isHomePage && style.scrolled
            }`}
        >
            <div className={style.header_left}>
                <div
                    onClick={() => handleActiveHambuger()}
                    className={style.hamburger}
                    id={style.hamburger}
                >
                    <span className={style.line}></span>
                    <span className={style.line}></span>
                    <span className={style.line}></span>
                </div>
                <Link href="/" className={style.header_logo}>
                    LOGO
                </Link>
            </div>
            <nav className={style.nav}>
                <ul className={style.nav_ul}>
                    <li
                        onClick={() => handleActiveHambuger()}
                        className={style.nav_li}
                    >
                        <Link href="/">Trang chủ</Link>
                    </li>
                    <li
                        onClick={() => handleActiveHambuger()}
                        className={style.nav_li}
                    >
                        <Link href={"course"}>
                            Khoá học{" "}
                            <FaChevronDown
                                style={IS_MB ? { display: "none" } : {}}
                                size={14}
                            />
                        </Link>
                        <ul className={style.nav_submenu}>
                            <li>
                                <Link href="#">Khóa học Frontend Web</Link>
                            </li>
                            <li>
                                <Link href="#">Khóa học Backend Nodejs</Link>
                            </li>
                            <li>
                                <Link href="#">Khóa học Fullstack</Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        onClick={() => handleActiveHambuger()}
                        className={style.nav_li}
                    >
                        <Link href="#">Bài viết</Link>
                    </li>
                </ul>
            </nav>
            <button className={style.header_btn_login}>Đăng nhập</button>
        </div>
    );
}
