import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://www.cmrfgh.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/admin/*", "/api/*", "/_next/*"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
