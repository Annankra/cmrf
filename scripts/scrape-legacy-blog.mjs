#!/usr/bin/env node
/**
 * scrape-legacy-blog.mjs
 *
 * Fetches every blog post from the legacy Squarespace site (cmrfgh.com/cmrf),
 * extracts structured content, cleans up Squarespace artifacts, and writes
 * to scripts/legacy-posts.json.
 *
 * Usage: node scripts/scrape-legacy-blog.mjs
 */

import { writeFileSync } from 'fs';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── All known legacy post URLs ──────────────────────────────────────────────
const LEGACY_POSTS = [
    { url: 'https://www.cmrfgh.com/cmrf/2025/2/4/tamale-medical-outreach-bringing-hope-and-healing-to-over-2500-lives' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/2/4/2024-was-a-year-of-impact-and-transformation' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/2/4/-bringing-hope-and-healing-to-tamale-' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/15/nungua-lorry-park-medical-outreach-with-hon-dr-agnes-naa-momo-lartey' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/15/cmrf-inaugurates-ad-hoc-committee-to-operationalize-haatso-clinic' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/15/report-medical-outreach-in-wulensi' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/success-of-the-nungua-free-medical-outreach-with-hon-dr-naa-momo-lartey' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/hon-dr-agnes-naa-momo-larteys-free-medical-outreach-to-krowor' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/report-successful-2024-hohoe-medical-outreach' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/15/our-1st-medical-evangelism-to-wulensi-with-fhi' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/2024-hohoe-missions-and-outreach' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/dedication-and-commissioning-of-a-new-dental-unit' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/kbc-2024-medical-outreach-was-a-success' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/rev-lewis-fiadjoe-celebrates-60th-birthday-with-acts-of-compassion-for-the-vulnerable' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/celebrating-60-years-of-gods-faithfulness-the-journey-of-rev-lewis-fiadjoe' },
    { url: 'https://www.cmrfgh.com/cmrf/2025/1/14/kbc-2024-medical-outreach-tamale' },
    { url: 'https://www.cmrfgh.com/cmrf/2024missionscalendar' },
    { url: 'https://www.cmrfgh.com/cmrf/2023/10/10/sam-annankra-day-a-tribute-to-a-true-hero' },
    { url: 'https://www.cmrfgh.com/cmrf/2023/9/27/keta-2023-medical-evangelism-in-loving-memory-of-madam-florence-geshie-fiadjoe-acolatse' },
    { url: 'https://www.cmrfgh.com/cmrf/2023/7/31/2023-kadjebi-missions-amp-outreach' },
    { url: 'https://www.cmrfgh.com/cmrf/2023/3/3/service-to-humanity-is-service-to-god' },
    { url: 'https://www.cmrfgh.com/cmrf/2023/2/28/training-for-tamale-mission' },
    { url: 'https://www.cmrfgh.com/cmrf/2023/3/2/compassionate-christians' },
    { url: 'https://www.cmrfgh.com/cmrf/2023/2/28/koinonia-baptist-church-shalom-baptist-church-in-partnership-with-christian-missions-resource-foundation-embarks-on-medical-missions' },
    { url: 'https://www.cmrfgh.com/cmrf/2022/11/15/training-program-for-atebubu-bantama-medical-evangelismnbsp' },
    { url: 'https://www.cmrfgh.com/cmrf/missions-kpando-2022-campaign-was-successful' },
    { url: 'https://www.cmrfgh.com/cmrf/2022/7/18/missions-kpando-starts-today' },
    { url: 'https://www.cmrfgh.com/cmrf/2022/6/5/every-day-is-pentecost' },
    { url: 'https://www.cmrfgh.com/cmrf/2022/6/5/the-cmrf-model-duly-launched' },
    { url: 'https://www.cmrfgh.com/cmrf/2022/5/28/it-is-our-story' },
    { url: 'https://www.cmrfgh.com/cmrf/2022/5/24/reaching-the-unreached-the-cmrf-model' },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function parseDateFromUrl(url) {
    const match = url.match(/\/cmrf\/(\d{4})\/(\d{1,2})\/(\d{1,2})\//);
    if (match) {
        const [, year, month, day] = match;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T12:00:00.000Z`;
    }
    const yearMatch = url.match(/\/cmrf\/(\d{4})/);
    if (yearMatch) return `${yearMatch[1]}-01-01T12:00:00.000Z`;
    return null;
}

function deriveSlug(url) {
    const parts = url.split('/');
    let slug = parts[parts.length - 1];
    slug = slug.replace(/^-+|-+$/g, '');
    slug = slug.replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').toLowerCase();
    return slug || 'untitled';
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Squarespace content cleanup ─────────────────────────────────────────────

/**
 * Remove non-content elements from the parsed HTML before conversion.
 */
function cleanHtmlTree(root) {
    // Remove <style> tags
    root.querySelectorAll('style').forEach((el) => el.remove());

    // Remove <script> tags
    root.querySelectorAll('script').forEach((el) => el.remove());

    // Remove social icon blocks
    root.querySelectorAll('.sqs-svg-icon--wrapper, .social-icons-style-border, .sqs-svg-icon--list, [class*="social-icon"]').forEach((el) => el.remove());

    // Remove Squarespace footer blocks
    root.querySelectorAll('footer, .footer, .sqs-block-summary-v2, .sqs-block-newsletter, [data-block-type="44"]').forEach((el) => el.remove());

    // Remove navigation / header
    root.querySelectorAll('nav, header, .header-inner, .header-nav').forEach((el) => el.remove());

    // Remove gallery grid CSS blocks (these are style blocks the parser misses)
    root.querySelectorAll('.sqs-gallery-block-grid').forEach((el) => {
        // Keep up to 5 gallery images, remove the rest to avoid massive image dumps
        const imgs = el.querySelectorAll('img');
        if (imgs.length > 5) {
            // Keep first 5 images, wrap them in simple <p> tags
            const keeper = [];
            for (let i = 0; i < Math.min(5, imgs.length); i++) {
                keeper.push(imgs[i].outerHTML);
            }
            el.set_content(keeper.join('\n'));
        }
    });

    // Remove share buttons / like buttons
    root.querySelectorAll('.squarespace-social-buttons, .sqs-share-buttons, .blog-item-actions, .blog-meta-item--tags').forEach((el) => el.remove());

    // Remove author bylines that link to Squarespace author pages
    root.querySelectorAll('a[href*="?author="]').forEach((el) => el.remove());

    return root;
}

/**
 * Aggressively clean markdown output to remove Squarespace artifacts.
 */
function cleanMarkdown(md) {
    let cleaned = md;

    // Remove CSS block rules: .fe-block-xxx { ... } and #block-yui_xxx { ... }
    cleaned = cleaned.replace(/\.(fe-block|sqs-block|sqs-gallery)[^\n]*\{[^}]*\}/g, '');
    cleaned = cleaned.replace(/#block-[^\n]*\{[^}]*\}/g, '');
    cleaned = cleaned.replace(/\{[^}]*mix-blend-mode[^}]*\}/g, '');
    cleaned = cleaned.replace(/\{[^}]*box-shadow[^}]*\}/g, '');
    cleaned = cleaned.replace(/\{[^}]*border:\s*none[^}]*\}/g, '');
    cleaned = cleaned.replace(/\{[^}]*margin-right[^}]*\}/g, '');
    cleaned = cleaned.replace(/\{[^}]*margin-bottom[^}]*\}/g, '');

    // Remove any remaining CSS-like lines
    cleaned = cleaned.replace(/^\.[a-zA-Z_-][a-zA-Z0-9_-]*\s*\{[^}]*\}\s*$/gm, '');
    cleaned = cleaned.replace(/^#[a-zA-Z_][a-zA-Z0-9_\\.-]*\s.*\{[^}]*\}\s*$/gm, '');

    // Remove orphaned CSS selectors that span multiple lines
    cleaned = cleaned.replace(/#block-yui[^]*?(?:\}|border: none;[^\n]*)/g, '');

    // Remove social media link blocks (empty links to instagram/facebook)
    cleaned = cleaned.replace(/\[\s*\n*\s*\]\(https:\/\/www\.(instagram|facebook|twitter|youtube)\.[^\)]+\)/g, '');
    cleaned = cleaned.replace(/\[\s*\]\(https:\/\/www\.(instagram|facebook|twitter|youtube)\.[^\)]+\)/g, '');

    // Remove "Christian Missions Resources Foundation (CMRF)" footer line
    cleaned = cleaned.replace(/^Christian Missions Resources? Foundation \(CMRF\)\s*$/gm, '');

    // Remove &nbsp; entities
    cleaned = cleaned.replace(/&nbsp;/g, ' ');

    // Remove empty image links: [![](url)](url)
    cleaned = cleaned.replace(/\[!\[\]\([^\)]*\)\]\([^\)]*\)/g, '');

    // Clean up excessive whitespace — max 2 consecutive newlines
    cleaned = cleaned.replace(/\n{4,}/g, '\n\n');

    // Remove lines that are just whitespace
    cleaned = cleaned.replace(/^\s+$/gm, '');

    // Trim leading/trailing whitespace
    cleaned = cleaned.trim();

    return cleaned;
}

/**
 * Deduplicate content by detecting repeated long text blocks.
 * Squarespace sometimes serves the same content block twice.
 */
function deduplicateContent(md) {
    const lines = md.split('\n');
    const paragraphs = [];
    let currentParagraph = [];

    for (const line of lines) {
        if (line.trim() === '') {
            if (currentParagraph.length > 0) {
                paragraphs.push(currentParagraph.join('\n'));
                currentParagraph = [];
            }
        } else {
            currentParagraph.push(line);
        }
    }
    if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph.join('\n'));
    }

    // Deduplicate paragraphs (keep first occurrence)
    const seen = new Set();
    const unique = [];
    for (const p of paragraphs) {
        // Normalize for comparison (lowercase, strip extra spaces)
        const normalized = p.toLowerCase().replace(/\s+/g, ' ').trim();
        // Only dedup paragraphs longer than 50 chars (avoid removing short common phrases)
        if (normalized.length > 50 && seen.has(normalized)) {
            continue; // skip duplicate
        }
        seen.add(normalized);
        unique.push(p);
    }

    return unique.join('\n\n');
}

/**
 * Limit embedded images in the body to MAX_BODY_IMAGES to avoid
 * massive image dumps from Squarespace gallery blocks.
 */
function limitImages(md, maxImages = 8) {
    let count = 0;
    return md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match) => {
        count++;
        if (count <= maxImages) return match;
        return ''; // remove excess images
    });
}

// ── Main scraper ────────────────────────────────────────────────────────────

const turndown = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
});

// Custom image rule
turndown.addRule('images', {
    filter: 'img',
    replacement: (content, node) => {
        let src = node.getAttribute('data-src') || node.getAttribute('src') || '';
        const alt = node.getAttribute('alt') || '';
        if (!src || src.startsWith('data:')) return '';
        // Remove Squarespace URL parameters for cleaner URLs
        src = src.split('?')[0];
        return `\n\n![${alt}](${src})\n\n`;
    },
});

// Remove empty anchors (Squarespace navigation remnants)
turndown.addRule('emptyAnchors', {
    filter: (node) => node.nodeName === 'A' && (!node.textContent || node.textContent.trim() === ''),
    replacement: () => '',
});

async function scrapePost(entry, index) {
    const { url } = entry;
    const slug = deriveSlug(url);
    console.log(`[${index + 1}/${LEGACY_POSTS.length}] Fetching: ${slug}`);

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!res.ok) {
            console.warn(`  ⚠ HTTP ${res.status} for ${url}`);
            return null;
        }

        const html = await res.text();
        const root = parse(html);

        // --- Title ---
        const ogTitle = root.querySelector('meta[property="og:title"]')?.getAttribute('content');
        const h1 = root.querySelector('article h1, .entry-title, .BlogItem-title');
        const pageTitle = root.querySelector('title')?.text;
        let title = ogTitle || h1?.text || pageTitle || slug;
        title = title.replace(/\s*[—–-]\s*CMRF\s*$/, '').trim();

        // --- OG Image (hero image) ---
        const ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;

        // --- OG Description (excerpt) ---
        const ogDesc = root.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';

        // --- Extract ONLY the blog article content ---
        // Try increasingly broad selectors to find the right content container
        let contentEl =
            root.querySelector('.BlogItem-content') ||
            root.querySelector('article .entry-content') ||
            root.querySelector('article .blog-item-content') ||
            root.querySelector('article .sqs-layout');

        // If none found, try the main article area but exclude nav/header/footer
        if (!contentEl) {
            contentEl = root.querySelector('article');
        }
        if (!contentEl) {
            // Last resort — grab the main content area
            contentEl = root.querySelector('#content, main, [role="main"]');
        }

        if (!contentEl) {
            console.warn(`  ⚠ Could not find content container`);
            return null;
        }

        // Clean the HTML tree before conversion
        cleanHtmlTree(contentEl);

        // Remove the title h1 from the content (it's stored separately)
        const contentH1 = contentEl.querySelector('h1');
        if (contentH1) contentH1.remove();

        // Remove date and author meta elements
        contentEl.querySelectorAll('.Blog-date, .BlogItem-dateWrapper, time, .blog-meta-item').forEach((el) => el.remove());

        let bodyHtml = contentEl.innerHTML || contentEl.outerHTML;

        // Convert to markdown
        let bodyMarkdown = turndown.turndown(bodyHtml).trim();

        // Apply aggressive cleanup
        bodyMarkdown = cleanMarkdown(bodyMarkdown);
        bodyMarkdown = deduplicateContent(bodyMarkdown);
        bodyMarkdown = limitImages(bodyMarkdown, 8);

        // Remove the title if repeated at top
        if (bodyMarkdown.startsWith(`# ${title}`)) {
            bodyMarkdown = bodyMarkdown.slice(`# ${title}`.length).trim();
        }

        // Extract image URLs from the cleaned markdown
        const imageMatches = [...bodyMarkdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)];
        const images = imageMatches.map((m) => m[1]);

        const heroImage = ogImage || images[0] || null;

        // Build excerpt
        let excerpt = ogDesc;
        if (!excerpt) {
            excerpt = bodyMarkdown
                .replace(/!\[.*?\]\(.*?\)/g, '')
                .replace(/#{1,6}\s/g, '')
                .replace(/\*\*/g, '')
                .replace(/\n+/g, ' ')
                .trim()
                .slice(0, 250);
        }

        const date = parseDateFromUrl(url) || '2022-01-01T12:00:00.000Z';

        return {
            slug,
            title,
            date,
            legacyUrl: url,
            heroImage,
            excerpt: excerpt.slice(0, 300),
            bodyMarkdown,
            images,
        };
    } catch (err) {
        console.error(`  ✗ Error scraping ${url}: ${err.message}`);
        return null;
    }
}

async function main() {
    console.log(`\n🕷  Scraping ${LEGACY_POSTS.length} legacy blog posts...\n`);

    const results = [];
    for (let i = 0; i < LEGACY_POSTS.length; i++) {
        const result = await scrapePost(LEGACY_POSTS[i], i);
        if (result) results.push(result);
        if (i < LEGACY_POSTS.length - 1) await sleep(500);
    }

    const outPath = path.join(__dirname, 'legacy-posts.json');
    writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');

    console.log(`\n✅ Done! Scraped ${results.length}/${LEGACY_POSTS.length} posts.`);
    console.log(`   Output: ${outPath}\n`);

    for (const p of results) {
        const bodyLen = p.bodyMarkdown.length;
        const imgCount = p.images.length;
        console.log(`  • ${p.slug} — ${bodyLen} chars, ${imgCount} images`);
    }
}

main().catch(console.error);
