import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getMediaUrl, getMediaAlt } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const p = await params;
    const post = await getPostBySlug(p.slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

// Helper to safely format dates
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

export default async function BlogPostPage({ params }: PageProps) {
    const p = await params;
    const post = await getPostBySlug(p.slug);

    if (!post) {
        notFound();
    }

    const coverImageUrl = getMediaUrl(post.image) || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80&auto=format";
    const tags = post.tags?.map((t) => t.tag || "").filter(Boolean) || [];

    return (
        <article>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                    style={{ backgroundImage: `url('${coverImageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-16">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-[var(--color-clay)]/20 text-[var(--color-clay)] backdrop-blur-md rounded-full text-xs tracking-wider uppercase"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-cream)] mb-6 max-w-5xl leading-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-[var(--color-cream)]/70 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                        <span>{formatDate(post.date)}</span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <div className="max-w-3xl mx-auto prose prose-lg md:prose-xl prose-headings:font-heading prose-p:font-sans prose-a:text-[var(--color-clay)] text-[var(--color-charcoal)]">
                        {post.content ? (
                            <RichText data={post.content} />
                        ) : (
                            <p className="opacity-50 italic">No content provided.</p>
                        )}
                    </div>
                </div>
            </section>
        </article>
    );
}
