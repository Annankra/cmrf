import type { Metadata } from "next";
import { JsonLd, donateActionJsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
    title: "Donate to CMRF — Tax-Deductible Medical Mission Giving",
    description:
        "Your tax-deductible donation funds free medical outreaches, eye care, dental services, and clean water for 12,000+ people annually. CMMRF-USA is a registered 501(c)(3) nonprofit.",
    openGraph: {
        title: "Donate to CMRF — Tax-Deductible Medical Mission Giving",
        description:
            "Your tax-deductible gift directly funds medical outreaches, clean water boreholes, and eye clinics for communities in need. CMMRF-USA is a 501(c)(3).",
        url: "https://www.cmrfgh.com/donate",
        type: "website",
    },
    twitter: {
        title: "Donate to CMRF — Tax-Deductible Medical Mission Giving",
        description:
            "Your donation directly funds free medical care for 700+ communities across Ghana and Africa.",
    },
    alternates: {
        canonical: "https://www.cmrfgh.com/donate",
    },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", url: "https://www.cmrfgh.com" },
                { name: "Donate", url: "https://www.cmrfgh.com/donate" },
            ])} />
            <JsonLd data={donateActionJsonLd()} />
            {children}
        </>
    );
}
