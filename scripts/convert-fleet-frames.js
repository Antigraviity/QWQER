/**
 * Converts fleet-hero-sequence frames:
 *   Frame00000.png → Frame00.webp
 *   Frame00001.png → Frame01.webp
 *   ...
 *   Frame00191.png → Frame191.webp
 * 
 * Also processes closing-fleet-hero-sequence if it exists.
 * 
 * Usage: node scripts/convert-fleet-frames.js
 * Requires: sharp (already in devDependencies)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIRS = [
  'public/fleet-hero-sequence',
  'public/closing-fleet-hero-sequence',
];

async function convertDir(dir) {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) {
    console.log(`⏭  Skipping ${dir} (not found)`);
    return;
  }

  const files = fs.readdirSync(fullDir)
    .filter(f => /^Frame\d+\.png$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log(`⏭  No PNG frames found in ${dir}`);
    return;
  }

  console.log(`\n📁 Processing ${dir} (${files.length} frames)...`);

  for (let i = 0; i < files.length; i++) {
    const oldFile = files[i];
    const oldPath = path.join(fullDir, oldFile);

    // New name: Frame00, Frame01, ... Frame191
    const newName = `Frame${String(i).padStart(2, '0')}.webp`;
    const newPath = path.join(fullDir, newName);

    try {
      await sharp(oldPath)
        .webp({ quality: 80 })
        .toFile(newPath);

      // Delete old PNG
      fs.unlinkSync(oldPath);

      if (i % 20 === 0 || i === files.length - 1) {
        console.log(`  ✅ ${i + 1}/${files.length} — ${oldFile} → ${newName}`);
      }
    } catch (err) {
      console.error(`  ❌ Failed: ${oldFile} — ${err.message}`);
    }
  }

  console.log(`✅ Done: ${dir}`);
}

(async () => {
  console.log('🚀 Fleet frame converter: PNG → WebP + rename\n');
  for (const dir of DIRS) {
    await convertDir(dir);
  }
  console.log('\n🎉 All done!');
})();
