'use client';
import { useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { findSimilarStories, type Story } from "../lib/api";
import styles from "./search.module.css";

const SUGGESTIONS = [
    "Тревога перед экзаменами",
    "Ссора с родителями",
    "Расставание с другом/подругой",
    "Буллинг в школе",
    "Неуверенность в себе",
    "Проблемы со сном",
];

type Status = "idle" | "loading" | "error";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [results, setResults] = useState<Story[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const submit = async (prompt: string) => {
        const trimmed = prompt.trim();
        if (!trimmed || status === "loading") return;

        setStatus("loading");
        setError(null);

        try {
            const stories = await findSimilarStories(trimmed);
            setResults(stories);
            setStatus("idle");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Что-то пошло не так");
            setStatus("error");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Напиши что тебя беспокоит?</h1>

                <div className={styles.promptBox}>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Расскажи своими словами, что происходит…"
                        rows={3}
                        className={styles.promptInput}
                    />
                    <button
                        type="button"
                        aria-label="Отправить"
                        disabled={query.trim().length === 0 || status === "loading"}
                        onClick={() => submit(query)}
                        className={styles.sendBtn}
                    >
                        <ArrowUp size={18} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                </div>

                {status === "error" && (
                    <p className={styles.statusMessage}>{error}</p>
                )}

                {status === "loading" && (
                    <p className={styles.statusMessage}>We got you bro...</p>
                )}

                {results !== null && status !== "loading" && (
                    <div className={styles.resultsBlock}>
                        {results.length === 0 ? (
                            <p className={styles.statusMessage}>
                                Сорри не смогли найти историю под твой запрос - попробуй описать иначе.
                            </p>
                        ) : (
                            <div className={styles.results}>
                                {results.map((story) => (
                                    <Link
                                        key={story.id}
                                        href={`/stories/${story.id}`}
                                        className={styles.resultCard}
                                    >
                                        <h2 className={styles.resultTitle}>{story.title}</h2>
                                        <p className={styles.resultExcerpt}>{story.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className={styles.suggestionsBlock}>
                    <span className={styles.suggestionsLabel}>Популярные темы</span>
                    <div className={styles.suggestions}>
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => {
                                    setQuery(s);
                                    submit(s);
                                }}
                                className={styles.suggestion}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
