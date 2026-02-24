import { Plus_Jakarta_Sans, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
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
