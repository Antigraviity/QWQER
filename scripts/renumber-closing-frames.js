/**
 * Renumbers closing-fleet-hero-sequence frames:
 *   Frame52.webp → Frame00.webp
 *   Frame53.webp → Frame01.webp
 *   ...
 *   Frame191.webp → Frame139.webp
 * 
 * Usage: node scripts/renumber-closing-frames.js
 */

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'closing-fleet-hero-sequence');

// Get all webp files and sort by numeric value
const files = fs.readdirSync(dir)
    .filter(f => /^Frame\d+\.webp$/i.test(f))
    .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
    });

console.log(`Found ${files.length} frames (${files[0]} to ${files[files.length - 1]})`);
console.log(`Renumbering to Frame00.webp - Frame${String(files.length - 1).padStart(2, '0')}.webp\n`);

// First pass: rename to temp names to avoid conflicts
files.forEach((file, i) => {
    const oldPath = path.join(dir, file);
    const tmpPath = path.join(dir, `_tmp_${String(i).padStart(3, '0')}.webp`);
    fs.renameSync(oldPath, tmpPath);
});

// Second pass: rename from temp to final names
for (let i = 0; i < files.length; i++) {
    const tmpPath = path.join(dir, `_tmp_${String(i).padStart(3, '0')}.webp`);
    const newName = `Frame${String(i).padStart(2, '0')}.webp`;
    const newPath = path.join(dir, newName);
    fs.renameSync(tmpPath, newPath);
    if (i % 20 === 0 || i === files.length - 1) {
        console.log(`  ✅ ${i + 1}/${files.length} → ${newName}`);
    }
}

console.log(`\n🎉 Done! ${files.length} frames renumbered.`);
