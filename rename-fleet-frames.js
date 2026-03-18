const fs = require("fs");
const path = require("path");

const SOURCE_DIR = path.join(__dirname, "public", "fleet-hero-sequence");

// Get all png files sorted
const files = fs.readdirSync(SOURCE_DIR)
  .filter(f => f.endsWith(".png"))
  .sort();

console.log(`Found ${files.length} images to rename.\n`);

files.forEach((file, index) => {
  const paddedIndex = index.toString().padStart(2, "0");
  const newName = `Frame${paddedIndex}.png`;
  const oldPath = path.join(SOURCE_DIR, file);
  const newPath = path.join(SOURCE_DIR, newName);

  if (file !== newName) {
    fs.renameSync(oldPath, newPath);
    console.log(`  ${file} → ${newName}`);
  } else {
    console.log(`  ${newName} (already correct)`);
  }
});

console.log(`\n✅ Renamed ${files.length} files.`);
