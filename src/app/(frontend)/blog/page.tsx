import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "CMRF Blog — stories, updates, and reports from our medical missions and community outreach across Ghana and Africa.",
};

// Placeholder data — will come from CMS
const posts = [
    {
        slug: "tamale-outreach-2025",
        title: "2025 Tamale Medical Outreach Brings Hope and Healing to Over 2,500 Lives",
        excerpt:
            "CMRF, together with its partners, successfully conducted its first 2025 medical evangelistic outreach in Tamale, serving over 2,500 people across five communities.",
        date: "February 4, 2025",
        tags: ["Medical Outreach", "Tamale", "2025"],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format",
        featured: true,
    },
    {
        slug: "2024-year-of-impact",
        title: "2024 Was A Year of Impact and Transformation",
        excerpt:
            "In 2024, CMRF's medical evangelistic outreaches impacted thousands across Ghana, providing healthcare and spiritual support. Over 5,800 received medical consultations.",
        date: "February 4, 2025",
        tags: ["Year in Review", "Impact", "2024"],
        image: "https://images.unsplash.com/photo-1559757175-7cb056fba93d?w=800&q=80&auto=format",
        featured: false,
    },
    {
        slug: "bringing-hope-to-tamale",
        title: "🌟 Bringing Hope and Healing to Tamale!",
        excerpt:
            "Join us for the Tamale Medical Evangelistic Outreach from January 24th to February 1st, 2025. This initiative offers free healthcare, counselling, and spiritual support.",
        date: "January 20, 2025",
        tags: ["Announcement", "Tamale"],
        image: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=800&q=80&auto=format",
        featured: false,
    },
    {
        slug: "haatso-medical-mission",
        title: "CMRF Organizes Medical Mission in Haatso",
        excerpt:
            "The Christian Missions Resource Foundation organized a one-day medical mission for the people in Haatso, providing general medical, dental and eye care freely.",
        date: "December 2024",
        tags: ["Community Mission", "Haatso"],
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80&auto=format",
        featured: false,
    },
];

export default function BlogPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Stories & Updates
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        CMRF{" "}
                        <span className="font-drama text-[var(--color-clay)]">Blog.</span>
                    </h1>
                </div>
            </section>

            {/* Posts */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    {/* Featured Post */}
                    {posts
                        .filter((p) => p.featured)
                        .map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="card block overflow-hidden group mb-12 no-underline"
                            >
                                <div className="grid md:grid-cols-2">
                                    <div
                                        className="h-64 md:h-auto bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${post.image}')` }}
                                    />
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full bg-[var(--color-clay)]/10 text-[var(--color-clay)] text-xs font-semibold mb-4 w-fit"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            Featured
                                        </span>
                                        <h2
                                            className="text-2xl md:text-3xl font-bold text-[var(--color-charcoal)] mb-3"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {post.title}
                                        </h2>
                                        <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} /> {post.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    {/* Post Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts
                            .filter((p) => !p.featured)
                            .map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="card block overflow-hidden group no-underline"
                                >
                                    <div
                                        className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${post.image}')` }}
                                    />
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 rounded-full bg-[var(--color-moss)]/5 text-[var(--color-moss)] text-xs"
                                                    style={{ fontFamily: "var(--font-mono)" }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3
                                            className="text-lg font-bold text-[var(--color-charcoal)] mb-2 line-clamp-2"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-[var(--color-muted)] line-clamp-2 mb-3">
                                            {post.excerpt}
                                        </p>
                                        <span className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
                                            <Calendar size={10} /> {post.date}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
}
