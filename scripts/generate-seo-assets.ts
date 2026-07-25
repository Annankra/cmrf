import sharp from "sharp";
import path from "path";
import fs from "fs";

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function generateSeoAssets() {
  console.log("🚀 Generating SEO Assets & Optimizing Images...");

  // 1. Convert & Compress surgery.png (3.3MB) -> public/surgery.webp (<150KB)
  const surgeryPath = path.join(PUBLIC_DIR, "surgery.png");
  if (fs.existsSync(surgeryPath)) {
    console.log("📸 Optimizing surgery.png -> surgery.webp...");
    await sharp(surgeryPath)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(PUBLIC_DIR, "surgery.webp"));
    console.log("✅ Created public/surgery.webp");
  }

  // 2. Compress cmrflogo.png (685KB) -> public/cmrflogo.webp
  const logoPath = path.join(PUBLIC_DIR, "cmrflogo.png");
  if (fs.existsSync(logoPath)) {
    console.log("📸 Optimizing cmrflogo.png -> cmrflogo.webp...");
    await sharp(logoPath)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(PUBLIC_DIR, "cmrflogo.webp"));
    console.log("✅ Created public/cmrflogo.webp");
  }

  // 3. Generate 1200x630 OpenGraph Banner Image (public/og-image.jpg)
  console.log("🖼️ Generating 1200x630 public/og-image.jpg...");
  
  // Background image (childerndoctor.jpg or surgery.webp)
  const heroBackdropPath = fs.existsSync(path.join(PUBLIC_DIR, "childerndoctor.jpg"))
    ? path.join(PUBLIC_DIR, "childerndoctor.jpg")
    : surgeryPath;

  const width = 1200;
  const height = 630;

  // Create an SVG overlay with branded dark gradient, text, and logo
  const svgOverlay = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0A0A14" stop-opacity="0.88" />
          <stop offset="60%" stop-color="#111115" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#1A1A22" stop-opacity="0.96" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#CC5833" />
          <stop offset="100%" stop-color="#2E4036" />
        </linearGradient>
      </defs>
      
      <!-- Dark backdrop filter -->
      <rect width="${width}" height="${height}" fill="url(#grad)" />

      <!-- Top decorative accent line -->
      <rect x="0" y="0" width="${width}" height="8" fill="url(#accentGrad)" />

      <!-- Tagline pill badge -->
      <rect x="80" y="90" width="340" height="38" rx="19" fill="#CC5833" fill-opacity="0.2" stroke="#CC5833" stroke-opacity="0.4" stroke-width="1.5" />
      <text x="100" y="114" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#CC5833" letter-spacing="2">
        30+ YEARS OF MEDICAL MISSIONS
      </text>

      <!-- Main Headline -->
      <text x="80" y="210" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="#FFFFFF">
        CMRF — Christian Medical
      </text>
      <text x="80" y="275" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="#FFFFFF">
        Missions Resource Foundation
      </text>

      <!-- Subtitle -->
      <text x="80" y="345" font-family="Arial, sans-serif" font-size="24" fill="#CCCCCC">
        Mobilizing resources to bring free medical care &amp; hope across Ghana
      </text>

      <!-- Impact Stats Bar -->
      <g transform="translate(80, 440)">
        <!-- Stat 1 -->
        <text x="0" y="30" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#CC5833">700+</text>
        <text x="0" y="55" font-family="Arial, sans-serif" font-size="14" fill="#888888">Communities Served</text>

        <!-- Stat 2 -->
        <text x="240" y="30" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#CC5833">12,000+</text>
        <text x="240" y="55" font-family="Arial, sans-serif" font-size="14" fill="#888888">Annual Patients</text>

        <!-- Stat 3 -->
        <text x="500" y="30" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#CC5833">501(c)(3)</text>
        <text x="500" y="55" font-family="Arial, sans-serif" font-size="14" fill="#888888">US Tax Exempt NGO</text>
      </g>

      <!-- Domain footer -->
      <text x="80" y="565" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#666666" letter-spacing="1">
        WWW.CMRFGH.COM
      </text>
    </svg>
  `;

  await sharp(heroBackdropPath)
    .resize(width, height, { fit: "cover" })
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, "og-image.jpg"));

  console.log("✅ Created public/og-image.jpg (1200x630)");

  // 4. Generate App Router Favicons & Icons in src/app/
  console.log("🎨 Generating favicons in public/ & src/app/...");

  // Generate 32x32 favicon png & ico
  const faviconSvg = `
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="16" fill="#111115" />
      <path d="M32 12V52M12 32H52" stroke="#CC5833" stroke-width="10" stroke-linecap="round" />
    </svg>
  `;

  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, "favicon.ico"));

  await sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"));

  const appDir = path.join(process.cwd(), "src", "app");
  await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(appDir, "icon.png"));

  await sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(appDir, "apple-icon.png"));

  console.log("✅ Created public/favicon.ico, public/apple-touch-icon.png, src/app/icon.png, src/app/apple-icon.png");
}

generateSeoAssets().catch(console.error);
