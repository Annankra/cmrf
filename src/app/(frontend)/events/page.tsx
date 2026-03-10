import type { Metadata } from "next";
import { getEvents, getMediaUrl } from "@/lib/payload";
import { EventsClientPage } from "./EventsClientPage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Events",
    description:
        "Upcoming CMRF medical outreaches, mission trips, and community events across Ghana and Africa.",
    openGraph: {
        title: "CMRF Events — Upcoming Medical Outreaches",
        description: "Upcoming medical missions, community outreaches, and events across Ghana and Africa.",
        url: "https://www.cmrfgh.com/events",
        type: "website",
    },
    twitter: {
        title: "CMRF Events — Medical Missions & Outreaches",
        description: "Upcoming CMRF medical outreaches, mission trips, and community events.",
    },
    alternates: { canonical: "https://www.cmrfgh.com/events" },
};

// Fallback data when CMS has no entries yet
const fallbackUpcoming = [
    {
        id: "1",
        slug: "tamale-outreach-2025",
        title: "2025 Tamale Medical Outreach",
        description:
            "Join us for a multi-day medical evangelistic outreach in Tamale, serving over 2,500 people across five communities with free healthcare, counselling, and spiritual support.",
        date: "January 24 – February 1, 2025",
        location: "Tamale, Northern Region",
        category: "Medical Outreach",
        featured: true,
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format",
    },
    {
        id: "2",
        slug: "haatso-mission-2025",
        title: "Haatso Community Medical Mission",
        description:
            "A one-day medical mission for the people in Haatso, providing general medical, dental and eye care. Resources provided freely to the community.",
        date: "March 2025",
        location: "Haatso, Greater Accra",
        category: "Community Mission",
        featured: false,
        image: "https://images.unsplash.com/photo-1559757175-7cb056fba93d?w=800&q=80&auto=format",
    },
    {
        id: "3",
        slug: "annual-soup-kitchen-2025",
        title: "Joy FM Easter Soup Kitchen",
        description:
            "CMRF partners with Joy FM for the annual Easter Soup Kitchen, providing meals and care to the vulnerable in our communities.",
        date: "April 2025",
        location: "Accra, Ghana",
        category: "Community Service",
        featured: false,
        image: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=800&q=80&auto=format",
    },
];

// Helper to safely format dates from either ISO strings or legacy text formats
function formatDate(dateString: string): string {
    // Legacy fallback string support
    if (!dateString) return "";
    if (dateString.includes(" – ") || dateString.includes("202")) {
        // Simple heuristic: if it contains an en-dash or year string, and isn't a pure ISO, leave it as is.
        // But let's just try to parse it. If it's valid ISO, format it.
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
    return dateString;
}

export default async function EventsPage() {
    const cmsEvents = await getEvents();

    // Use CMS data if available, otherwise fall back to placeholders
    const events =
        cmsEvents.length > 0
            ? cmsEvents.map((e) => ({
                id: String(e.id),
                slug: e.slug,
                title: e.title,
                description: e.description,
                date: e.startDate && e.endDate && e.startDate !== e.endDate
                    ? `${formatDate(e.startDate)} – ${formatDate(e.endDate)}`
                    : formatDate(e.startDate || ""),
                location: e.location,
                category: e.category,
                featured: e.featured ?? false,
                image:
                    getMediaUrl(e.image) ||
                    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format",
            }))
            : fallbackUpcoming;

    // Sort: featured first
    const sorted = [...events].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return <EventsClientPage events={sorted} />;
}
