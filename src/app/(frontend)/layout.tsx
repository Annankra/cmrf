import { Plus_Jakarta_Sans, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { SmoothPageTransition } from "@/components/animation/SmoothPageTransition";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/lib/jsonLd";

const plusJakarta = Plus_Jakarta_Sans({
    variable: "--font-heading",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    variable: "--font-drama",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
    display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
});

export const metadata = {
    metadataBase: new URL("https://www.cmrfgh.com"),
    title: {
        default: "CMRF — Christian Medical Missions Resource Foundation",
        template: "%s | CMRF",
    },
    description: "Mobilizing Christians and resources worldwide to show God's love through free medical care, community outreach, and humanitarian services across Ghana and Africa.",
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    alternates: {
        canonical: "https://www.cmrfgh.com",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.cmrfgh.com",
        siteName: "CMRF — Christian Medical Missions Resource Foundation",
        title: "CMRF — Compassion is the Medicine",
        description: "30+ years of free medical care, 600+ communities served. Mobilizing resources worldwide to show God's love through word and positive acts of deed.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "CMRF — Christian Medical Missions Resource Foundation",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CMRF — Compassion is the Medicine",
        description: "30+ years of free medical care, 600+ communities served across Ghana and Africa.",
        images: ["/og-image.jpg"],
    },
    other: {
        "theme-color": "#1A1A1A",
    },
};

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                {/* Preconnect to critical external origins */}
                <link rel="preconnect" href="https://images.unsplash.com" />
                <link rel="dns-prefetch" href="https://images.unsplash.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://maps.googleapis.com" />
                <link rel="dns-prefetch" href="https://js.stripe.com" />
                {/* Global JSON-LD Structured Data */}
                <JsonLd data={organizationJsonLd()} />
                <JsonLd data={webSiteJsonLd()} />
            </head>
            <body
                className={`${plusJakarta.variable} ${cormorant.variable} ${ibmPlexMono.variable} antialiased`}
            >
                <NoiseOverlay />
                <Navbar />
                <main>
                    <SmoothPageTransition>
                        {children}
                    </SmoothPageTransition>
                </main>
                <Footer />
            </body>
        </html>
    );
}
