#!/usr/bin/env node
/**
 * seed-posts.mjs
 *
 * Reads legacy-posts.json produced by the scraper session and creates
 * Payload CMS Post documents via the REST API.
 *
 * Prerequisites:
 *   1. The Next.js dev server must be running (`npm run dev`)
 *   2. A Payload admin user must exist (email/password via env vars below)
 *
 * Usage:
 *   PAYLOAD_EMAIL=admin@example.com PAYLOAD_PASSWORD=yourpass node scripts/seed-posts.mjs
 *
 * Environment variables:
 *   PAYLOAD_EMAIL    — admin login email (required)
 *   PAYLOAD_PASSWORD — admin login password (required)
 *   PAYLOAD_URL      — base URL (default: http://localhost:3000)
 *   DRY_RUN          — set to "true" to skip actual creation
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://localhost:3000';
const PAYLOAD_EMAIL = process.env.PAYLOAD_EMAIL;
const PAYLOAD_PASSWORD = process.env.PAYLOAD_PASSWORD;
const DRY_RUN = process.env.DRY_RUN === 'true';

if (!PAYLOAD_EMAIL || !PAYLOAD_PASSWORD) {
    console.error('❌ Set PAYLOAD_EMAIL and PAYLOAD_PASSWORD environment variables.');
    process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Payload REST API helpers ────────────────────────────────────────────────

let authToken = null;

async function login() {
    console.log('🔑 Logging in to Payload CMS...');
    const res = await fetch(`${PAYLOAD_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: PAYLOAD_EMAIL, password: PAYLOAD_PASSWORD }),
    });
    if (!res.ok) {
        throw new Error(`Login failed: ${res.status} ${await res.text()}`);
    }
    const data = await res.json();
    authToken = data.token;
    console.log('  ✅ Logged in successfully');
}

function authHeaders() {
    return {
        Authorization: `JWT ${authToken}`,
        'Content-Type': 'application/json',
    };
}

async function checkExistingPost(slug) {
    const res = await fetch(
        `${PAYLOAD_URL}/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
        { headers: authHeaders() }
    );
    const data = await res.json();
    return data.docs?.length > 0;
}

async function uploadMediaFromUrl(imageUrl, altText) {
    try {
        // Download the image
        const imageRes = await fetch(imageUrl);
        if (!imageRes.ok) return null;

        const buffer = await imageRes.arrayBuffer();
        const contentType = imageRes.headers.get('content-type') || 'image/jpeg';

        // Determine file extension from content type
        const extMap = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' };
        const ext = extMap[contentType] || 'jpg';

        // Create a clean filename from the alt text
        const filename = (altText || 'image')
            .replace(/[^a-z0-9]/gi, '-')
            .replace(/-+/g, '-')
            .toLowerCase()
            .slice(0, 60) + `.${ext}`;

        // Upload via Payload REST API using FormData
        const formData = new FormData();
        formData.append('file', new Blob([buffer], { type: contentType }), filename);
        formData.append('alt', altText || '');

        const res = await fetch(`${PAYLOAD_URL}/api/media`, {
            method: 'POST',
            headers: { Authorization: `JWT ${authToken}` },
            body: formData,
        });

        if (!res.ok) {
            const errText = await res.text();
            console.warn(`    ⚠ Media upload failed for ${filename}: ${errText.slice(0, 200)}`);
            return null;
        }

        const data = await res.json();
        return data.doc?.id || null;
    } catch (err) {
        console.warn(`    ⚠ Media upload error: ${err.message}`);
        return null;
    }
}

async function createPost(postData) {
    const res = await fetch(`${PAYLOAD_URL}/api/posts`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(postData),
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Create post failed: ${res.status} ${errText.slice(0, 500)}`);
    }

    return res.json();
}

// ── Markdown → Lexical JSON conversion ──────────────────────────────────────

/**
 * Pre-process raw markdown:
 *  - Strip `&nbsp;` entities
 *  - Merge continuation lines (lines ending with `  ` or `\`) into one line
 *  - Collapse runs of 3+ blank lines into 2
 */
function preprocessMarkdown(md) {
    let out = md;

    // Remove HTML entities
    out = out.replace(/&nbsp;/g, ' ');
    out = out.replace(/&amp;/g, '&');

    // Merge continuation lines (markdown "  \n" = <br>). Treat them
    // as part of the same paragraph by replacing "  \n" with a single space.
    out = out.replace(/ {2,}\n(?!\n)/g, ' ');
    out = out.replace(/\\\n(?!\n)/g, ' ');

    // Collapse excessive blank lines
    out = out.replace(/\n{3,}/g, '\n\n');

    return out.trim();
}

/**
 * Convert a markdown string to Payload Lexical rich text JSON.
 *
 * Supports: paragraphs, headings (h1-h6), bold, italic, unordered lists,
 * ordered lists, images (skipped), links, and blockquotes.
 */
function markdownToLexical(rawMarkdown) {
    const markdown = preprocessMarkdown(rawMarkdown);
    const lines = markdown.split('\n');
    const children = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Skip empty lines
        if (line.trim() === '') {
            i++;
            continue;
        }

        // --- Standalone image lines → skip (they create empty gaps) ---
        if (line.trim().match(/^!\[[^\]]*\]\([^)]+\)$/)) {
            i++;
            continue;
        }

        // --- Headings ---
        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            let text = headingMatch[2].trim();
            // Strip wrapping bold markers: ### **text** → text (rendered as bold heading)
            text = text.replace(/^\*\*(.+)\*\*$/, '$1');
            children.push(createHeadingNode(level, text));
            i++;
            continue;
        }

        // --- Unordered list ---
        if (line.match(/^\s*[-*+]\s+/)) {
            const items = [];
            while (i < lines.length && lines[i].match(/^\s*[-*+]\s+/)) {
                items.push(lines[i].replace(/^\s*[-*+]\s+/, '').trim());
                i++;
            }
            children.push(createListNode('bullet', items));
            continue;
        }

        // --- Ordered list ---
        if (line.match(/^\s*\d+\.\s+/)) {
            const items = [];
            while (i < lines.length && lines[i].match(/^\s*\d+\.\s+/)) {
                items.push(lines[i].replace(/^\s*\d+\.\s+/, '').trim());
                i++;
            }
            children.push(createListNode('number', items));
            continue;
        }

        // --- Blockquote ---
        if (line.startsWith('> ')) {
            const quoteLines = [];
            while (i < lines.length && lines[i].startsWith('> ')) {
                quoteLines.push(lines[i].replace(/^>\s?/, ''));
                i++;
            }
            children.push(createQuoteNode(quoteLines.join(' ')));
            continue;
        }

        // --- Default: paragraph ---
        // Collect contiguous non-blank, non-special lines into one paragraph
        const paragraphLines = [];
        while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !lines[i].match(/^#{1,6}\s/) &&
            !lines[i].match(/^\s*[-*+]\s+/) &&
            !lines[i].match(/^\s*\d+\.\s+/) &&
            !lines[i].startsWith('> ') &&
            !lines[i].trim().match(/^!\[[^\]]*\]\([^)]+\)$/)
        ) {
            paragraphLines.push(lines[i].trim());
            i++;
        }
        if (paragraphLines.length > 0) {
            children.push(createParagraphNode(paragraphLines.join(' ')));
        }
    }

    return {
        root: {
            type: 'root',
            children: children.length > 0 ? children : [createParagraphNode('')],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
        },
    };
}

function createHeadingNode(level, text) {
    const tag = `h${level}`;
    return {
        type: 'heading',
        tag,
        children: parseInlineFormatting(text),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
    };
}

function createParagraphNode(text) {
    return {
        type: 'paragraph',
        children: parseInlineFormatting(text),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        textFormat: 0,
        textStyle: '',
    };
}

function createListNode(listType, items) {
    return {
        type: 'list',
        listType,
        tag: listType === 'number' ? 'ol' : 'ul',
        start: 1,
        children: items.map((item, idx) => ({
            type: 'listitem',
            children: parseInlineFormatting(item),
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
            value: idx + 1,
        })),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
    };
}

function createQuoteNode(text) {
    return {
        type: 'quote',
        children: parseInlineFormatting(text),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
    };
}

/**
 * Parse inline markdown formatting (bold, italic, links) into
 * Lexical text/link nodes. Inline images are silently dropped.
 */
function parseInlineFormatting(text) {
    if (!text || text.trim() === '') {
        return [createTextNode(' ', 0)];
    }

    const nodes = [];

    // Regex: **bold**, *italic*, [text](url), ![alt](url)
    // Order matters: bold (**) before italic (*), inline image before link
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(!\[([^\]]*)\]\(([^)]+)\))|(\[([^\]]+)\]\(([^)]+)\))/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Plain text before match
        if (match.index > lastIndex) {
            const plain = text.slice(lastIndex, match.index);
            if (plain) nodes.push(createTextNode(plain, 0));
        }

        if (match[1]) {
            // **bold**
            nodes.push(createTextNode(match[2], 1));
        } else if (match[3]) {
            // *italic*
            nodes.push(createTextNode(match[4], 2));
        } else if (match[5]) {
            // ![alt](url) — inline image → skip silently
        } else if (match[8]) {
            // [text](url)
            nodes.push(createLinkNode(match[9], match[10]));
        }

        lastIndex = match.index + match[0].length;
    }

    // Remaining text
    if (lastIndex < text.length) {
        const remaining = text.slice(lastIndex);
        if (remaining) nodes.push(createTextNode(remaining, 0));
    }

    if (nodes.length === 0) {
        return [createTextNode(text, 0)];
    }

    return nodes;
}

function createTextNode(text, format = 0) {
    return {
        type: 'text',
        text,
        format, // 0=normal, 1=bold, 2=italic, 3=bold+italic
        style: '',
        detail: 0,
        mode: 'normal',
        version: 1,
    };
}

function createLinkNode(text, url) {
    return {
        type: 'link',
        children: [createTextNode(text, 0)],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 3,
        fields: {
            linkType: 'custom',
            newTab: true,
            url,
        },
    };
}

// ── Auto-tag generation ─────────────────────────────────────────────────────

function generateTags(title, bodyMarkdown) {
    const tags = [];
    const titleLower = title.toLowerCase();
    const bodyLower = (bodyMarkdown || '').toLowerCase().slice(0, 2000);
    const combined = titleLower + ' ' + bodyLower;

    if (combined.includes('outreach') || combined.includes('medical')) tags.push('Medical Outreach');
    if (combined.includes('tamale')) tags.push('Tamale');
    if (combined.includes('hohoe')) tags.push('Hohoe');
    if (combined.includes('keta')) tags.push('Keta');
    if (combined.includes('kadjebi')) tags.push('Kadjebi');
    if (combined.includes('wulensi')) tags.push('Wulensi');
    if (combined.includes('nungua') || combined.includes('krowor')) tags.push('Nungua');
    if (combined.includes('kpando')) tags.push('Kpando');
    if (combined.includes('atebubu')) tags.push('Atebubu');
    if (combined.includes('haatso')) tags.push('Haatso');
    if (combined.includes('dental')) tags.push('Dental');
    if (combined.includes('eye care') || combined.includes('optical')) tags.push('Eye Care');
    if (combined.includes('training') || combined.includes('workshop')) tags.push('Training');
    if (combined.includes('birthday') || combined.includes('celebration')) tags.push('Celebration');
    if (combined.includes('calendar') || combined.includes('mission')) tags.push('Missions');
    if (combined.includes('prison')) tags.push('Prisons');
    if (combined.includes('prayer') || combined.includes('evangelism')) tags.push('Evangelism');
    if (combined.includes('clinic')) tags.push('Clinic');

    // Ensure at least one tag
    if (tags.length === 0) tags.push('CMRF');

    // Limit to 4 tags max
    return tags.slice(0, 4);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
    const postsPath = path.join(__dirname, 'legacy-posts.json');
    let posts;
    try {
        posts = JSON.parse(readFileSync(postsPath, 'utf-8'));
    } catch (err) {
        console.error(`❌ Could not read ${postsPath}: ${err.message}`);
        console.error('   Run the scraper first: node scripts/scrape-legacy-blog.mjs');
        process.exit(1);
    }

    console.log(`\n📦 Seeding ${posts.length} posts into Payload CMS...`);
    console.log(`   URL: ${PAYLOAD_URL}`);
    console.log(`   Dry run: ${DRY_RUN}\n`);

    if (!DRY_RUN) {
        await login();
    }

    let created = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        console.log(`[${i + 1}/${posts.length}] ${post.slug}`);

        if (DRY_RUN) {
            const lexical = markdownToLexical(post.bodyMarkdown);
            console.log(`  📝 Title: ${post.title}`);
            console.log(`  📅 Date: ${post.date}`);
            console.log(`  📄 Excerpt: ${post.excerpt?.slice(0, 80)}...`);
            console.log(`  🏷  Tags: ${generateTags(post.title, post.bodyMarkdown).join(', ')}`);
            console.log(`  📖 Lexical nodes: ${lexical.root.children.length}`);
            console.log(`  🖼  Hero image: ${post.heroImage ? 'yes' : 'no'}`);
            created++;
            continue;
        }

        try {
            // Check if post already exists
            const exists = await checkExistingPost(post.slug);
            if (exists) {
                console.log(`  ⏭  Already exists, skipping`);
                skipped++;
                continue;
            }

            // Upload hero image
            let heroMediaId = null;
            if (post.heroImage) {
                console.log(`  📸 Uploading hero image...`);
                heroMediaId = await uploadMediaFromUrl(post.heroImage, post.title);
                if (heroMediaId) {
                    console.log(`  ✅ Hero image uploaded (ID: ${heroMediaId})`);
                }
            }

            // Convert markdown to Lexical
            const lexicalContent = markdownToLexical(post.bodyMarkdown);

            // Generate tags
            const tags = generateTags(post.title, post.bodyMarkdown).map((tag) => ({ tag }));

            // Build the post data
            const postData = {
                title: post.title,
                slug: post.slug,
                date: post.date,
                excerpt: post.excerpt || post.title,
                content: lexicalContent,
                tags,
                featured: i === 0, // Feature the first (most recent) post
                legacyUrl: post.legacyUrl,
            };

            // Only include image if we successfully uploaded one
            if (heroMediaId) {
                postData.image = heroMediaId;
            }

            // Create the post
            const result = await createPost(postData);
            console.log(`  ✅ Created (ID: ${result.doc?.id})`);
            created++;
        } catch (err) {
            console.error(`  ✗ Failed: ${err.message}`);
            failed++;
        }

        // Small delay between writes
        await sleep(300);
    }

    console.log(`\n──────────────────────────────`);
    console.log(`✅ Created: ${created}`);
    console.log(`⏭  Skipped: ${skipped}`);
    console.log(`✗  Failed:  ${failed}`);
    console.log(`──────────────────────────────\n`);
}

main().catch(console.error);
