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

async function processFolder(dir, prefix) {
  console.log(`\n========================================`);
  console.log(`Processing: ${dir}`);
  console.log(`========================================\n`);

  // Get all png files sorted
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith(".png"))
    .sort();

  console.log(`Found ${files.length} PNG files.\n`);

  // Step 1: Rename to serial format
  console.log("Step 1: Renaming files...\n");
  const renamedFiles = [];

  for (let i = 0; i < files.length; i++) {
    const paddedIndex = i.toString().padStart(3, "0");
    const newName = `${prefix}${paddedIndex}.png`;
    const oldPath = path.join(dir, files[i]);
    const newPath = path.join(dir, newName);

    if (files[i] !== newName) {
      // Use temp name first to avoid conflicts
      const tempPath = path.join(dir, `_temp_${paddedIndex}.png`);
      fs.renameSync(oldPath, tempPath);
      renamedFiles.push({ temp: tempPath, final: newPath, webp: path.join(dir, `${prefix}${paddedIndex}.webp`) });
      console.log(`  ${files[i]} → ${newName}`);
    } else {
      renamedFiles.push({ temp: oldPath, final: newPath, webp: path.join(dir, `${prefix}${paddedIndex}.webp`) });
      console.log(`  ${newName} (already correct)`);
    }
  }

  // Move temp files to final names
  for (const f of renamedFiles) {
    if (f.temp !== f.final && fs.existsSync(f.temp)) {
      fs.renameSync(f.temp, f.final);
    }
  }

  console.log(`\n✅ Renamed ${files.length} files.\n`);

  // Step 2: Convert to WebP
  console.log("Step 2: Converting to WebP...\n");
  let totalOrigSize = 0;
  let totalNewSize = 0;

  for (const f of renamedFiles) {
    try {
      await sharp(f.final).webp({ quality: 85 }).toFile(f.webp);
      const origSize = fs.statSync(f.final).size;
      const newSize = fs.statSync(f.webp).size;
      totalOrigSize += origSize;
      totalNewSize += newSize;
      console.log(`  ${path.basename(f.final)} → .webp  (${(origSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB)`);
    } catch (err) {
      console.error(`  ERROR: ${path.basename(f.final)} - ${err.message}`);
    }
  }

  // Step 3: Delete original PNG files
  console.log("\nStep 3: Deleting original PNG files...");
  for (const f of renamedFiles) {
    if (fs.existsSync(f.final)) {
      fs.unlinkSync(f.final);
    }
  }

  const savings = (((totalOrigSize - totalNewSize) / totalOrigSize) * 100).toFixed(1);
  console.log(`\n✅ Done! ${renamedFiles.length} files converted.`);
  console.log(`   Total: ${(totalOrigSize/1024/1024).toFixed(1)}MB → ${(totalNewSize/1024/1024).toFixed(1)}MB (${savings}% smaller)`);

  return renamedFiles.length;
}

async function main() {
  // Process fleet-hero-sequence (already renamed to Frame00.png etc, just convert to webp)
  const fleetDir = path.join(__dirname, "public", "fleet-hero-sequence");
  const fleetFiles = fs.readdirSync(fleetDir).filter(f => f.endsWith(".png"));
  
  if (fleetFiles.length > 0) {
    console.log(`\n========================================`);
    console.log(`Processing: fleet-hero-sequence (WebP conversion only)`);
    console.log(`========================================\n`);
    
    let totalOrig = 0, totalNew = 0;
    for (const file of fleetFiles.sort()) {
      const inputPath = path.join(fleetDir, file);
      const outputPath = path.join(fleetDir, file.replace(".png", ".webp"));
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
    // Delete PNGs
    for (const file of fleetFiles) {
      fs.unlinkSync(path.join(fleetDir, file));
    }
    console.log(`\n✅ fleet-hero-sequence: ${fleetFiles.length} files converted. ${(totalOrig/1024/1024).toFixed(1)}MB → ${(totalNew/1024/1024).toFixed(1)}MB`);
  } else {
    console.log("\nfleet-hero-sequence: No PNG files found (may already be converted).");
  }

  // Process closing-fleet-hero-sequence (rename + convert)
  const closingDir = path.join(__dirname, "public", "closing-fleet-hero-sequence");
  await processFolder(closingDir, "Frame");

  console.log("\n🎉 All done!");
}

main();
