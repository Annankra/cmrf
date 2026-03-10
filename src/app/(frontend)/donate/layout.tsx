import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Donate",
    description:
        "Support CMRF's medical missions — your tax-deductible donation funds free healthcare, clean water, and education for underserved communities across Ghana and Africa.",
    openGraph: {
        title: "Donate to CMRF — Heal the Future",
        description:
            "Your tax-deductible gift directly funds medical outreaches, clean water boreholes, and scholarships for communities in need. CMMRF-USA is a 501(c)(3).",
        url: "https://www.cmrfgh.com/donate",
        type: "website",
    },
    twitter: {
        title: "Donate to CMRF — Heal the Future",
        description:
            "Your donation directly funds free medical care for 600+ communities across Ghana and Africa.",
    },
    alternates: {
        canonical: "https://www.cmrfgh.com/donate",
    },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
