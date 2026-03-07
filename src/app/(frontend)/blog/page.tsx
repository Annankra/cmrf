import type { Metadata } from "next";
import { getPosts, getMediaUrl } from "@/lib/payload";
import { BlogClientPage } from "./BlogClientPage";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "CMRF Blog — stories, updates, and reports from our medical missions and community outreach across Ghana and Africa.",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    image: string;
    featured: boolean;
};

// Helper to safely format dates from either ISO strings or legacy text formats
function formatDate(dateString: string): string {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (!isNaN(d.getTime()) && dateString.includes("-")) {
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(d);
    }
    return dateString;
}

export default async function BlogPage() {
    const cmsPosts = await getPosts();

    const posts: Post[] = cmsPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        date: formatDate(p.date),
        tags: p.tags?.map((t) => typeof t === 'string' ? t : t.tag || "").filter(Boolean) || [],
        image: getMediaUrl(p.image) || FALLBACK_IMAGE,
        featured: p.featured ?? false,
    }));

    return <BlogClientPage initialPosts={posts} />;
}
