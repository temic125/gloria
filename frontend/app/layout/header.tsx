'use client';
import Link from "next/link";
import { useState } from "react";
import Logo from "../components/Logo";
import styles from "./css/header.module.css";

const NAV_LINKS = [
    { href: "/#teens", label: "Для подростков" },
    { href: "/#how-it-works", label: "Как это работает" },
    { href: "/stories", label: "Истории" },
    { href: "/about", label: "О нас" },
];

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Logo />

                <nav className={styles.nav}>
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className={styles.navLink}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <Link href="/search" className={styles.startBtn}>Начать</Link>
                </div>

                <button
                    className={styles.burger}
                    aria-label="Открыть меню"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
                <div className={styles.drawerOverlay} onClick={closeDrawer} />
                <div className={styles.drawerPanel}>
                    <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Закрыть меню">×</button>
                    <Logo />
                    <nav className={styles.drawerNav}>
                        {NAV_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} onClick={closeDrawer}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className={styles.drawerActions}>
                        <Link href="/search" onClick={closeDrawer} className={styles.startBtn}>Начать</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
