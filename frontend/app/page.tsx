import Link from "next/link";
import Clouds from "./components/Clouds";
import styles from "./page.module.css";

const NOTES = [
    "Ты важен!",
    "Гордись собой!",
    "Тебя слышат!",
    "Это пройдёт!",
    "Лучшее впереди!",
    "Маленькие шаги меняют многое!",
];

export default function Home() {
    return (
        <div>
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.sticky}>♡ Ты важен!</div>
                    <h1 className={styles.title}>
                        Настоящие истории<br />
                        Настоящие люди
                    </h1>
                    <div className={styles.ctaRow}>
                        <Link href="/search" className={styles.ctaButton}>
                            Поделись что на уме!
                        </Link>
                    </div>
                </div>
                <Clouds className={styles.cloudsBg} style={{ height: 220 }} />
            </section>

            <section id="teens" className={styles.howSection}>
                <div className={styles.howInner}>
                    <div className={styles.notes}>
                        {NOTES.map((note) => (
                            <span key={note} className={styles.note}>{note}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section id="how-it-works" className={styles.explainerSection}>
                <div className={styles.explainerCard}>
                    <strong>Gloria</strong> подбирает тебе реальные истории людей, которые
                    столкнулись с той же трудностью и смогли её преодолеть.
                    Анонимно, в своём темпе, с одним маленьким шагом,
                    который ты можешь сделать уже сегодня.
                </div>
            </section>
        </div>
    );
}
