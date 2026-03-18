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

const DIR = path.join(__dirname, "public", "fleet-hero-sequence");

async function main() {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith(".png")).sort();
  console.log(`Converting ${files.length} PNG files to WebP...\n`);

  for (const file of files) {
    const inputPath = path.join(DIR, file);
    const outputPath = path.join(DIR, file.replace(".png", ".webp"));

    try {
      await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
      const origSize = (fs.statSync(inputPath).size / 1024).toFixed(0);
      const newSize = (fs.statSync(outputPath).size / 1024).toFixed(0);
      console.log(`  ${file} → .webp  (${origSize}KB → ${newSize}KB)`);
    } catch (err) {
      console.error(`  ERROR: ${file} - ${err.message}`);
    }
  }

  // Delete original PNG files
  console.log("\nDeleting original PNG files...");
  for (const file of files) {
    fs.unlinkSync(path.join(DIR, file));
  }

  console.log("\n✅ Done! All frames converted to WebP.");
}

main();
