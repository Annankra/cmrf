import { getPayload } from 'payload';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables manually to avoid next/env import errors in ES modules
const projectDir = process.cwd();
const envPath = path.resolve(projectDir, '.env');
if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of envLines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const index = trimmed.indexOf('=');
            if (index !== -1) {
                const key = trimmed.slice(0, index).trim();
                const value = trimmed.slice(index + 1).trim();
                process.env[key] = value;
            }
        }
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to download and upload media using local API
async function uploadMediaFromUrl(payload: any, imageUrl: string, altText: string) {
    try {
        console.log(`    📥 Fetching image: ${imageUrl.slice(0, 80)}...`);
        const imageRes = await fetch(imageUrl);
        if (!imageRes.ok) {
            console.warn(`    ⚠ Failed to fetch image: ${imageRes.statusText}`);
            return null;
        }

        const arrayBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = imageRes.headers.get('content-type') || 'image/jpeg';

        const extMap: Record<string, string> = { 
            'image/jpeg': 'jpg', 
            'image/png': 'png', 
            'image/webp': 'webp', 
            'image/gif': 'gif' 
        };
        const ext = extMap[contentType] || 'jpg';

        const filename = (altText || 'image')
            .replace(/[^a-z0-9]/gi, '-')
            .replace(/-+/g, '-')
            .toLowerCase()
            .slice(0, 60) + `.${ext}`;

        const doc = await payload.create({
            collection: 'media',
            data: {
                alt: altText || '',
            },
            file: {
                data: buffer,
                name: filename,
                mimetype: contentType,
                size: buffer.byteLength,
            },
        });
        console.log(`    ✅ Media uploaded locally (ID: ${doc.id})`);
        return doc.id;
    } catch (err: any) {
        console.warn(`    ⚠ Media upload error: ${err.message}`);
        return null;
    }
}

// Markdown Preprocessor
function preprocessMarkdown(md: string) {
    let out = md;
    out = out.replace(/&nbsp;/g, ' ');
    out = out.replace(/&amp;/g, '&');
    out = out.replace(/ {2,}\n(?!\n)/g, ' ');
    out = out.replace(/\\\n(?!\n)/g, ' ');
    out = out.replace(/\n{3,}/g, '\n\n');
    return out.trim();
}

// Markdown to Lexical JSON Converter
function markdownToLexical(rawMarkdown: string) {
    const markdown = preprocessMarkdown(rawMarkdown);
    const lines = markdown.split('\n');
    const children: any[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.trim() === '') {
            i++;
            continue;
        }

        if (line.trim().match(/^!\[[^\]]*\]\([^)]+\)$/)) {
            i++;
            continue;
        }

        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            let text = headingMatch[2].trim();
            text = text.replace(/^\*\*(.+)\*\*$/, '$1');
            children.push(createHeadingNode(level, text));
            i++;
            continue;
        }

        if (line.match(/^\s*[-*+]\s+/)) {
            const items = [];
            while (i < lines.length && lines[i].match(/^\s*[-*+]\s+/)) {
                items.push(lines[i].replace(/^\s*[-*+]\s+/, '').trim());
                i++;
            }
            children.push(createListNode('bullet', items));
            continue;
        }

        if (line.match(/^\s*\d+\.\s+/)) {
            const items = [];
            while (i < lines.length && lines[i].match(/^\s*\d+\.\s+/)) {
                items.push(lines[i].replace(/^\s*\d+\.\s+/, '').trim());
                i++;
            }
            children.push(createListNode('number', items));
            continue;
        }

        if (line.startsWith('> ')) {
            const quoteLines = [];
            while (i < lines.length && lines[i].startsWith('> ')) {
                quoteLines.push(lines[i].replace(/^>\s?/, ''));
                i++;
            }
            children.push(createQuoteNode(quoteLines.join(' ')));
            continue;
        }

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

function createHeadingNode(level: number, text: string) {
    return {
        type: 'heading',
        tag: `h${level}`,
        children: parseInlineFormatting(text),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
    };
}

function createParagraphNode(text: string) {
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

function createListNode(listType: 'bullet' | 'number', items: string[]) {
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

function createQuoteNode(text: string) {
    return {
        type: 'quote',
        children: parseInlineFormatting(text),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
    };
}

function parseInlineFormatting(text: string) {
    if (!text || text.trim() === '') {
        return [createTextNode(' ', 0)];
    }

    const nodes: any[] = [];
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(!\[([^\]]*)\]\(([^)]+)\))|(\[([^\]]+)\]\(([^)]+)\))/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            const plain = text.slice(lastIndex, match.index);
            if (plain) nodes.push(createTextNode(plain, 0));
        }

        if (match[1]) {
            nodes.push(createTextNode(match[2], 1));
        } else if (match[3]) {
            nodes.push(createTextNode(match[4], 2));
        } else if (match[5]) {
            // Drop inline images
        } else if (match[8]) {
            nodes.push(createLinkNode(match[9], match[10]));
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        const remaining = text.slice(lastIndex);
        if (remaining) nodes.push(createTextNode(remaining, 0));
    }

    if (nodes.length === 0) {
        return [createTextNode(text, 0)];
    }

    return nodes;
}

function createTextNode(text: string, format = 0) {
    return {
        type: 'text',
        text,
        format,
        style: '',
        detail: 0,
        mode: 'normal',
        version: 1,
    };
}

// Auto-tag generation helper
function generateTags(title: string, bodyMarkdown: string) {
    const tags: string[] = [];
    const combined = (title + ' ' + (bodyMarkdown || '')).toLowerCase();

    if (combined.includes('outreach') || combined.includes('medical')) tags.push('Medical Outreach');
    if (combined.includes('tamale')) tags.push('Tamale');
    if (combined.includes('hohoe')) tags.push('Hohoe');
    if (combined.includes('wulensi')) tags.push('Wulensi');
    if (combined.includes('nungua') || combined.includes('krowor')) tags.push('Nungua');
    if (combined.includes('kpando')) tags.push('Kpando');
    if (combined.includes('haatso')) tags.push('Haatso');
    if (combined.includes('dental')) tags.push('Dental');
    if (combined.includes('eye care') || combined.includes('optical')) tags.push('Eye Care');
    if (combined.includes('training')) tags.push('Training');
    if (combined.includes('prison')) tags.push('Prisons');
    if (combined.includes('prayer') || combined.includes('evangelism')) tags.push('Evangelism');
    if (combined.includes('clinic')) tags.push('Clinic');

    if (tags.length === 0) tags.push('CMRF');
    return tags.slice(0, 4);
}

function createLinkNode(text: string, url: string) {
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

// Main seeder function
async function main() {
    console.log('🌱 Connecting to database and initializing Payload Local API...');
    const config = (await import('../src/payload.config')).default;
    const payload = await getPayload({ config });

    // 1. Create Admin User
    const existingUsers = await payload.find({
        collection: 'users',
        limit: 1,
    });

    if (existingUsers.totalDocs === 0) {
        console.log('👤 Creating default admin user...');
        await payload.create({
            collection: 'users',
            data: {
                email: 'admin@cmrfgh.com',
                password: 'adminpassword123',
                role: 'admin',
            },
        });
        console.log('  ✅ Admin user created: admin@cmrfgh.com / adminpassword123');
    } else {
        console.log('  ✅ Admin user already exists.');
    }

    // 2. Seed Posts from legacy-posts.json
    console.log('📦 Reading legacy-posts.json...');
    const postsPath = path.join(__dirname, 'legacy-posts.json');
    let posts = [];
    try {
        posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
        console.log(`  Found ${posts.length} posts to seed.`);
    } catch (err: any) {
        console.error(`  ❌ Failed to read legacy-posts.json: ${err.message}`);
    }

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        console.log(`\n📄 [${i + 1}/${posts.length}] Seeding post: ${post.title}`);

        const exists = await payload.find({
            collection: 'posts',
            where: { slug: { equals: post.slug } },
            limit: 1,
        });

        if (exists.totalDocs > 0) {
            console.log('  ⏭  Post already exists. Skipping.');
            continue;
        }

        let mediaId = null;
        if (post.heroImage) {
            mediaId = await uploadMediaFromUrl(payload, post.heroImage, post.title);
        }

        const lexicalContent = markdownToLexical(post.bodyMarkdown);
        const tags = generateTags(post.title, post.bodyMarkdown).map(tag => ({ tag }));

        const postData: any = {
            title: post.title,
            slug: post.slug,
            date: post.date,
            excerpt: post.excerpt || post.title.slice(0, 150),
            content: lexicalContent,
            tags,
            featured: i === 0,
            legacyUrl: post.legacyUrl,
        };

        if (mediaId) {
            postData.image = mediaId;
        }

        const createdPost = await payload.create({
            collection: 'posts',
            data: postData,
        });
        console.log(`  ✅ Created post (ID: ${createdPost.id})`);
    }

    // 3. Seed Events
    console.log('\n📅 Seeding events...');
    const eventsToSeed = [
        {
            slug: 'tamale-outreach-2025',
            title: '2025 Tamale Medical Outreach',
            description: 'Join us for a multi-day medical evangelistic outreach in Tamale, serving over 2,500 people across five communities with free healthcare, counselling, and spiritual support.',
            startDate: '2025-01-24T00:00:00.000Z',
            endDate: '2025-02-01T23:59:59.000Z',
            location: 'Tamale, Northern Region',
            category: 'Medical Outreach',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format',
        },
        {
            slug: 'haatso-mission-2025',
            title: 'Haatso Community Medical Mission',
            description: 'A one-day medical mission for the people in Haatso, providing general medical, dental and eye care. Resources provided freely to the community.',
            startDate: '2025-03-15T00:00:00.000Z',
            endDate: '2025-03-15T23:59:59.000Z',
            location: 'Haatso, Greater Accra',
            category: 'Community Mission',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80&auto=format',
        },
        {
            slug: 'annual-soup-kitchen-2025',
            title: 'Joy FM Easter Soup Kitchen',
            description: 'CMRF partners with Joy FM for the annual Easter Soup Kitchen, providing meals and care to the vulnerable in our communities.',
            startDate: '2025-04-20T00:00:00.000Z',
            endDate: '2025-04-20T23:59:59.000Z',
            location: 'Accra, Ghana',
            category: 'Community Service',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=800&q=80&auto=format',
        },
    ];

    for (const event of eventsToSeed) {
        console.log(`\nEvent: ${event.title}`);
        const exists = await payload.find({
            collection: 'events',
            where: { slug: { equals: event.slug } },
            limit: 1,
        });

        if (exists.totalDocs > 0) {
            console.log('  ⏭  Event already exists. Skipping.');
            continue;
        }

        const mediaId = await uploadMediaFromUrl(payload, event.imageUrl, event.title);
        if (!mediaId) {
            console.warn('  ❌ Failed to upload event image. Skipping event creation.');
            continue;
        }

        const createdEvent = await payload.create({
            collection: 'events',
            data: {
                title: event.title,
                slug: event.slug,
                startDate: event.startDate,
                endDate: event.endDate,
                location: event.location,
                category: event.category,
                featured: event.featured,
                description: event.description,
                image: mediaId,
                content: {
                    root: {
                        type: 'root',
                        children: [createParagraphNode(event.description)],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        version: 1,
                    },
                },
            },
        });
        console.log(`  ✅ Created event (ID: ${createdEvent.id})`);
    }

    // 4. Seed Gallery Albums
    console.log('\n📸 Seeding gallery albums...');
    const albumsToSeed = [
        {
            slug: 'medical-outreach-2024',
            title: 'Medical Outreach 2024',
            description: 'Images from our medical mission deployments across Ghana',
            year: '2024',
            coverUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format',
            galleryUrls: [
                'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format',
                'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80&auto=format',
                'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80&auto=format',
            ]
        },
        {
            slug: 'kpando-2022',
            title: 'Kpando \'22',
            description: 'Mission to Kpando, Volta Region',
            year: '2022',
            coverUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format',
            galleryUrls: [
                'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format',
                'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80&auto=format',
            ]
        },
        {
            slug: 'children-2023',
            title: 'Children 2023',
            description: 'The children we serve and impact across communities',
            year: '2023',
            coverUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format',
            galleryUrls: [
                'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format',
                'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=600&q=80&auto=format',
            ]
        }
    ];

    for (const album of albumsToSeed) {
        console.log(`\nAlbum: ${album.title}`);
        const exists = await payload.find({
            collection: 'albums',
            where: { slug: { equals: album.slug } },
            limit: 1,
        });

        if (exists.totalDocs > 0) {
            console.log('  ⏭  Album already exists. Skipping.');
            continue;
        }

        const coverMediaId = await uploadMediaFromUrl(payload, album.coverUrl, `${album.title} Cover`);
        if (!coverMediaId) {
            console.warn('  ❌ Failed to upload cover image. Skipping album.');
            continue;
        }

        const galleryImages = [];
        for (let j = 0; j < album.galleryUrls.length; j++) {
            const imgUrl = album.galleryUrls[j];
            const mediaId = await uploadMediaFromUrl(payload, imgUrl, `${album.title} Image ${j+1}`);
            if (mediaId) {
                galleryImages.push({
                    image: mediaId,
                    caption: `Captured during ${album.title}`,
                });
            }
        }

        const createdAlbum = await payload.create({
            collection: 'albums',
            data: {
                title: album.title,
                slug: album.slug,
                year: album.year,
                coverImage: coverMediaId,
                description: album.description,
                galleryImages,
            },
        });
        console.log(`  ✅ Created album (ID: ${createdAlbum.id})`);
    }

    console.log('\n🌟 Seeding process completed successfully!');
}

main().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
