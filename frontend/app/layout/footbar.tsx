import Logo from "../components/Logo";
import styles from "./css/footer.module.css";

export default function Footbar() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <Logo />
                    <p className={styles.tagline}>Настоящие истории. Настоящие люди.</p>
                </div>
            </div>
            <div className={styles.bottom}>Проект для HTML Challenge · Команда Treble</div>
        </footer>
    );
}
