import styles from "./about.module.css";

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <h1 className={styles.title}>О нас</h1>

                <p className={styles.lead}>
                    Gloria - место, где подросток может прочитать историю человека,
                    который столкнулся с той же трудностью и смог её преодолеть.
                    Не инструкция и не лекция, а живой опыт настоящих людей.
                </p>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Зачем это нужно</h2>
                    <p className={styles.text}>
                        В сложный момент кажется, что ты один такой. На самом деле кто-то
                        уже проходил через это - и справился. Мы подбираем именно такие
                        истории и добавляем к ним один маленький шаг, который можно
                        сделать уже сегодня.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Наши принципы</h2>
                    <div className={styles.values}>
                        <div className={styles.valueCard}>
                            <div className={styles.valueTitle}>Анонимно</div>
                            <p className={styles.valueText}>
                                Никаких имён и лишних вопросов. Ты делишься ровно тем,
                                чем сам захочешь.
                            </p>
                        </div>

                        <div className={styles.valueCard}>
                            <div className={styles.valueTitle}>В своём темпе</div>
                            <p className={styles.valueText}>
                                Никто не торопит. Можно вернуться завтра, через неделю
                                или когда будешь готов.
                            </p>
                        </div>

                        <div className={styles.valueCard}>
                            <div className={styles.valueTitle}>Без осуждения</div>
                            <p className={styles.valueText}>
                                Здесь не оценивают и не советуют свысока. Только истории
                                тех, кто прошёл похожее.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.team}>
                    <div className={styles.teamTitle}>Команда Treble</div>
                    <p className={styles.teamText}>
                        Gloria - наш проект для HTML Challenge. Мы делали его для тех,
                        кому сейчас тяжело, и хотели, чтобы сайт ощущался спокойным
                        и безопасным местом.
                    </p>
                </div>
            </div>
        </div>
    );
}
