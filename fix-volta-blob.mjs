import { put } from '@vercel/blob';
import { readFileSync } from 'fs';

const BLOB_TOKEN = "vercel_blob_rw_UmiFf0vtTpz6CXTl_B5bns3Ifb4aNvprYRU2AMjKcc9GYqe";
const PROJECT_ROOT = "/Users/danielannankra/dev/cmrf";

// The 5 Volta 2017 images — upload with just filename (no prefix), no random suffix
const FILES = [
  { filename: "dsc02925.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc02925.webp` },
  { filename: "dsc02964.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc02964.webp` },
  { filename: "dsc02996.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc02996.webp` },
  { filename: "dsc02909.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc02909.webp` },
  { filename: "dsc03019.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc03019.webp` },
  // Thumbnails
  { filename: "dsc02925-400x300.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc02925-400x300.webp` },
  { filename: "dsc02964-400x300.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc02964-400x300.webp` },
  { filename: "dsc02996-400x300.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc02996-400x300.webp` },
  { filename: "dsc02909-400x300.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc02909-400x300.webp` },
  { filename: "dsc03019-400x300.webp", localPath: `${PROJECT_ROOT}/public/media/volta-2017/dsc03019-400x300.webp` },
];

async function main() {
  for (const file of FILES) {
    console.log(`Uploading ${file.filename} (no prefix, no random suffix)...`);
    const fileBuffer = readFileSync(file.localPath);
    
    const blob = await put(file.filename, fileBuffer, {
      access: 'public',
      contentType: 'image/webp',
      token: BLOB_TOKEN,
      addRandomSuffix: false,  // CRITICAL: match Payload's default
    });
    
    console.log(`  -> ${blob.url}`);
  }

  // Verify the static handler URL pattern will work
  console.log("\n=== VERIFICATION ===");
  for (const file of FILES.slice(0, 5)) {
    const expectedUrl = `https://umiff0vttpz6cxtl.public.blob.vercel-storage.com/${file.filename}`;
    const resp = await fetch(expectedUrl, { method: 'HEAD' });
    console.log(`  ${file.filename} -> Status: ${resp.status}`);
  }

  console.log("\nDone!");
}

main().catch(e => { console.error(e); process.exit(1); });
