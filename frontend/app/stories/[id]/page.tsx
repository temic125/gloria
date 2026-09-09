import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryById } from "../../lib/api";
import styles from "./story.module.css";

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const story = await getStoryById(id);

    if (!story) {
        notFound();
    }

    const topic = story.tags[0]?.name ?? "История";

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <Link href="/stories" className={styles.back}>← Все истории</Link>
                <span className={styles.topic}>{topic}</span>
                <h1 className={styles.title}>{story.title}</h1>
                <p className={styles.body}>{story.summary}</p>
            </div>
        </div>
    );
}
