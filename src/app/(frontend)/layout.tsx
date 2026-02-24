import { Plus_Jakarta_Sans, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

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
    title: {
        default: "CMRF — Christian Medical Missions Resource Foundation",
        template: "%s | CMRF",
    },
    description: "Mobilizing Christians and resources worldwide to show God's love through free medical care, community outreach, and humanitarian services across Ghana and Africa.",
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
                alt: "CMRF Medical Outreach",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CMRF — Compassion is the Medicine",
        description: "30+ years of free medical care, 600+ communities served across Ghana and Africa.",
    },
};

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${plusJakarta.variable} ${cormorant.variable} ${ibmPlexMono.variable} antialiased`}
            >
                <NoiseOverlay />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
