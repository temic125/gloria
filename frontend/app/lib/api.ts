const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type Tag = {
    id: string;
    name: string;
};

export type Story = {
    id: string;
    title: string;
    excerpt: string;
    summary: string;
    tags: Tag[];
};

export async function findSimilarStories(prompt: string): Promise<Story[]> {
    const res = await fetch(`${API_URL}/stories/find_similar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        cache: "no-store",
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail ?? `Запрос не удался (${res.status})`);
    }

    return res.json();
}

export async function getAllStories(): Promise<Story[]> {
    const res = await fetch(`${API_URL}/stories`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error(`Не удалось загрузить истории (${res.status})`);
    }

    return res.json();
}

export async function getStoryById(id: string): Promise<Story | null> {
    const res = await fetch(`${API_URL}/stories/${id}`, { cache: "no-store" });

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Не удалось загрузить историю (${res.status})`);
    }

    return res.json();
}
