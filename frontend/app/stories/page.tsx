import Link from "next/link";
import Clouds from "../components/Clouds";
import { getAllStories } from "../lib/api";
import styles from "./stories.module.css";

const STRINGS = [
    "M20,0 C10,26 30,44 20,70 C11,94 27,108 21,130",
    "M20,0 C30,24 10,44 21,70 C31,94 13,110 19,130",
    "M20,0 C11,28 31,46 19,72 C9,96 28,110 21,130",
    "M20,0 C29,26 11,46 22,72 C32,96 14,110 20,130",
];

export default async function StoriesPage() {
    const stories = await getAllStories();

    return (
        <div className={styles.page}>
            <Clouds
                className={styles.cloudsBg}
                style={{ height: 200 }}
                colors={['#C4DEFF', '#DCEBFF', '#FFFFFF']}
            />
            <div className={styles.inner}>
                <h1 className={styles.title}>Истории</h1>
                <div className={styles.grid}>
                    {stories.map((story, i) => (
                        <div key={story.id} className={styles.item}>
                            <Link href={`/stories/${story.id}`} className={styles.balloonLink}>
                                <div className={styles.balloon}>
                                    <span className={styles.balloonLabel}>текст {i + 1}</span>
                                    <h2 className={styles.balloonTitle}>{story.title}</h2>
                                </div>
                            </Link>
                            <svg
                                className={styles.string}
                                width="40"
                                height="130"
                                viewBox="0 0 40 130"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d={STRINGS[i % STRINGS.length]}
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
