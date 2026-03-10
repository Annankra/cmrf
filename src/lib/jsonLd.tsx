// ── JSON-LD Structured Data Helpers for CMRF ──
// These functions generate schema.org JSON-LD objects that are injected
// as <script type="application/ld+json"> in page components.

const SITE_URL = "https://www.cmrfgh.com";
const ORG_NAME = "Christian Medical Missions Resource Foundation";
const ORG_SHORT = "CMRF";

// ─── Organization / NonprofitOrganization ───
export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "NonprofitOrganization",
        name: ORG_NAME,
        alternateName: ORG_SHORT,
        url: SITE_URL,
        logo: `${SITE_URL}/cmrflogo.png`,
        description:
            "Mobilizing Christians and resources worldwide to show God's love through free medical care, community outreach, and humanitarian services across Ghana and Africa.",
        foundingDate: "1991",
        founder: {
            "@type": "Person",
            name: "Dr. Samuel Akanyam Annankra",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Accra",
            addressCountry: "GH",
        },
        contactPoint: {
            "@type": "ContactPoint",
            email: "cmmrf@usa.com",
            contactType: "customer service",
        },
        sameAs: [],
        nonprofitStatus: "https://schema.org/Nonprofit501c3",
    };
}

// ─── WebSite ───
export function webSiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${ORG_SHORT} — ${ORG_NAME}`,
        url: SITE_URL,
        publisher: {
            "@type": "NonprofitOrganization",
            name: ORG_NAME,
        },
    };
}

// ─── BreadcrumbList ───
export function breadcrumbJsonLd(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

// ─── Article (for blog posts) ───
export function articleJsonLd(opts: {
    title: string;
    description: string;
    url: string;
    imageUrl?: string | null;
    datePublished: string;
    dateModified?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: opts.title,
        description: opts.description,
        url: opts.url,
        ...(opts.imageUrl && { image: opts.imageUrl }),
        datePublished: opts.datePublished,
        ...(opts.dateModified && { dateModified: opts.dateModified }),
        author: {
            "@type": "Organization",
            name: ORG_NAME,
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: ORG_NAME,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/cmrflogo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": opts.url,
        },
    };
}

// ─── Event ───
export function eventJsonLd(opts: {
    name: string;
    description: string;
    url: string;
    startDate: string;
    endDate?: string;
    location: string;
    imageUrl?: string | null;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: opts.name,
        description: opts.description,
        url: opts.url,
        startDate: opts.startDate,
        ...(opts.endDate && { endDate: opts.endDate }),
        ...(opts.imageUrl && { image: opts.imageUrl }),
        location: {
            "@type": "Place",
            name: opts.location,
            address: {
                "@type": "PostalAddress",
                addressLocality: opts.location,
                addressCountry: "GH",
            },
        },
        organizer: {
            "@type": "Organization",
            name: ORG_NAME,
            url: SITE_URL,
        },
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
    };
}

// ─── MedicalClinic ───
export function medicalClinicJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: `${ORG_SHORT} Medical Clinic`,
        url: `${SITE_URL}/clinic`,
        description:
            "Free medical consultation, eye care, and dental services for underserved communities since 1991.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Accra",
            addressCountry: "GH",
        },
        medicalSpecialty: [
            "https://schema.org/PrimaryCare",
            "https://schema.org/Optometric",
            "https://schema.org/Dentistry",
        ],
        parentOrganization: {
            "@type": "NonprofitOrganization",
            name: ORG_NAME,
            url: SITE_URL,
        },
    };
}

// ─── Utility: render JSON-LD as a script tag string ───
// Usage in JSX: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
export function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
