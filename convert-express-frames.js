const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Install sharp if not present
try {
  require.resolve("sharp");
} catch (e) {
  console.log("Installing sharp...");
  execSync("npm install sharp --save-dev", { cwd: __dirname, stdio: "inherit" });
}

const sharp = require("sharp");

const DIR = path.join(__dirname, "public", "express-hero-sequence");

async function main() {
  // Get all png files sorted
  const files = fs.readdirSync(DIR).filter(f => f.endsWith(".png")).sort();
  console.log(`Found ${files.length} PNG files to process.\n`);

  // Step 1: Rename to serial format with temp names first (avoid conflicts)
  console.log("Step 1: Renaming files...\n");
  const tempNames = [];
  for (let i = 0; i < files.length; i++) {
    const paddedIndex = i.toString().padStart(3, "0");
    const tempName = `_temp_${paddedIndex}.png`;
    fs.renameSync(path.join(DIR, files[i]), path.join(DIR, tempName));
    tempNames.push(tempName);
  }
  // Now rename temp to final
  for (let i = 0; i < tempNames.length; i++) {
    const paddedIndex = i.toString().padStart(3, "0");
    const finalName = `Frame${paddedIndex}.png`;
    fs.renameSync(path.join(DIR, tempNames[i]), path.join(DIR, finalName));
    console.log(`  ${files[i]} → ${finalName}`);
  }
  console.log(`\n✅ Renamed ${files.length} files.\n`);

  // Step 2: Convert to WebP
  console.log("Step 2: Converting to WebP...\n");
  let totalOrig = 0, totalNew = 0;
  const pngFiles = fs.readdirSync(DIR).filter(f => f.endsWith(".png")).sort();

  for (const file of pngFiles) {
    const inputPath = path.join(DIR, file);
    const outputPath = path.join(DIR, file.replace(".png", ".webp"));
    try {
      await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
      const origSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      totalOrig += origSize;
      totalNew += newSize;
      console.log(`  ${file} → .webp  (${(origSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB)`);
    } catch (err) {
      console.error(`  ERROR: ${file} - ${err.message}`);
    }
  }

  // Step 3: Delete original PNGs
  console.log("\nStep 3: Deleting original PNG files...");
  for (const file of pngFiles) {
    fs.unlinkSync(path.join(DIR, file));
  }

  const savings = (((totalOrig - totalNew) / totalOrig) * 100).toFixed(1);
  console.log(`\n✅ Done! ${pngFiles.length} files converted.`);
  console.log(`   Total: ${(totalOrig/1024/1024).toFixed(1)}MB → ${(totalNew/1024/1024).toFixed(1)}MB (${savings}% smaller)`);
}

main();
