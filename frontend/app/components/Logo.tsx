import Image from "next/image";
import Link from "next/link";
import styles from "./logo.module.css";

export default function Logo({ light = false }: { light?: boolean }) {
    return (
        <Link href="/" className={styles.logo}>
            <Image src="/gloria_icon.svg" alt="" width={28} height={28} />
            <span className={`${styles.wordmark} ${light ? styles.light : ''}`}>Gloria</span>
        </Link>
    );
}
