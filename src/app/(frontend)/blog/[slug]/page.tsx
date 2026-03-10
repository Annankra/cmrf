import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getMediaUrl, getMediaAlt } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const p = await params;
    const post = await getPostBySlug(p.slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    const imageUrl = getMediaUrl(post.image);

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            url: `https://www.cmrfgh.com/blog/${p.slug}`,
            ...(imageUrl && {
                images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            ...(imageUrl && { images: [imageUrl] }),
        },
        alternates: { canonical: `https://www.cmrfgh.com/blog/${p.slug}` },
    };
}

// Helper to safely format dates
function formatDate(dateString: string): string {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (!isNaN(d.getTime()) && dateString.includes("-")) {
        // If it's a blog post date from Payload, it's typically just "YYYY-MM-DD" or similar ISO.
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

    const coverImageUrl = getMediaUrl(post.image) || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80&auto=format";  // fallback for legacy posts without hero images
    const tags = post.tags?.map((t) => t.tag || "").filter(Boolean) || [];

    return (
        <article>
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", url: "https://www.cmrfgh.com" },
                { name: "Blog", url: "https://www.cmrfgh.com/blog" },
                { name: post.title, url: `https://www.cmrfgh.com/blog/${p.slug}` },
            ])} />
            <JsonLd data={articleJsonLd({
                title: post.title,
                description: post.excerpt,
                url: `https://www.cmrfgh.com/blog/${p.slug}`,
                imageUrl: getMediaUrl(post.image),
                datePublished: post.date,
                dateModified: post.updatedAt,
            })} />
            {/* Hero */}
            <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden pt-40 pb-16">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 opacity-70 mix-blend-overlay"
                    style={{ backgroundImage: `url('${coverImageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 w-full">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="hero-anim px-4 py-1.5 border border-white/10 bg-black/40 text-white backdrop-blur-md rounded-full text-[10px] tracking-widest uppercase font-bold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1
                        className="hero-anim text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-5xl leading-[1.1] tracking-tight text-balance"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {post.title}
                    </h1>
                    <div className="hero-anim flex items-center gap-4 text-[var(--color-clay)] text-xs uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                        <span>{formatDate(post.date)}</span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section bg-transparent relative z-10 border-t border-white/5">
                <div className="container-main px-6 md:px-12">
                    <div className="max-w-3xl mx-auto prose prose-lg md:prose-xl prose-invert prose-headings:font-heading prose-headings:text-white prose-p:font-sans prose-p:text-white/70 prose-p:font-light prose-a:text-[var(--color-clay)] text-white/70 selection:bg-[var(--color-clay)]/30 selection:text-white">
                        {post.content ? (
                            <RichText data={post.content} />
                        ) : (
                            <p className="text-white/30 italic font-mono text-sm uppercase tracking-widest">No content mapped to this dossier.</p>
                        )}
                    </div>
                </div>
            </section>
        </article>
    );
}
