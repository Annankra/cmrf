import { getPosts, getMediaUrl } from "@/lib/payload";
import type { Media } from "@/payload-types";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const baseUrl = "https://www.cmrfgh.com";

  let posts: Array<{
    title: string;
    slug: string;
    excerpt?: string;
    date?: string;
    image?: Media | number | null;
  }> = [];

  try {
    const fetched = await getPosts();
    posts = fetched.map((p) => ({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      date: (p.date || p.createdAt || p.updatedAt) as string,
      image: p.image as Media | number | null,
    }));
  } catch {
    // Fallback if CMS is initializing
    posts = [
      {
        title: "CMRF Tamale 2026 Medical Outreach Impact Report",
        slug: "tamale-2026-medical-outreach-report",
        excerpt: "CMRF and partners delivered free medical care, dental, and vision services to over 1,900 people across five communities in Tamale.",
        date: "2026-02-19T00:00:00.000Z",
      },
    ];
  }

  const itemsXml = posts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date || Date.now()).toUTCString();
      const imageUrl = getMediaUrl(post.image);

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt || post.title}]]></description>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ""}
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CMRF — Christian Medical Missions Resource Foundation</title>
    <link>${baseUrl}</link>
    <description>Latest mission stories, outreach reports, and field updates from CMRF across Ghana and Africa.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
