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

const PUBLIC_DIR = path.join(__dirname, "public");

// Folders to SKIP (hero sequence images)
const SKIP_FOLDERS = ["Sequence 1", "Sequence 2", "Sequence 3", "resumes"];

// Extensions to convert
const CONVERT_EXTENSIONS = [".png", ".jpg", ".jpeg"];

// Track all conversions for code reference updates
const conversions = [];

function shouldSkip(filePath) {
  return SKIP_FOLDERS.some((folder) => filePath.includes(folder));
}

function getAllImages(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_FOLDERS.includes(entry.name)) {
        results.push(...getAllImages(fullPath));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (CONVERT_EXTENSIONS.includes(ext) && !shouldSkip(fullPath)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function convertImage(inputPath) {
  const dir = path.dirname(inputPath);
  const nameWithoutExt = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(dir, `${nameWithoutExt}.webp`);

  // Skip if webp already exists with same name
  if (fs.existsSync(outputPath)) {
    console.log(`  SKIP (webp exists): ${path.relative(PUBLIC_DIR, inputPath)}`);
    conversions.push({
      original: path.relative(PUBLIC_DIR, inputPath).replace(/\\/g, "/"),
      webp: path.relative(PUBLIC_DIR, outputPath).replace(/\\/g, "/"),
    });
    return;
  }

  try {
    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);

    const origSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = (((origSize - newSize) / origSize) * 100).toFixed(1);

    console.log(
      `  CONVERTED: ${path.relative(PUBLIC_DIR, inputPath)} → .webp (${savings}% smaller)`
    );

    conversions.push({
      original: path.relative(PUBLIC_DIR, inputPath).replace(/\\/g, "/"),
      webp: path.relative(PUBLIC_DIR, outputPath).replace(/\\/g, "/"),
    });
  } catch (err) {
    console.error(`  ERROR: ${path.relative(PUBLIC_DIR, inputPath)} - ${err.message}`);
  }
}

async function main() {
  console.log("🔍 Scanning for images to convert...\n");

  const images = getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to convert.\n`);

  for (const img of images) {
    await convertImage(img);
  }

  console.log(`\n✅ Done! ${conversions.length} images processed.`);

  // Write conversions map for reference update script
  fs.writeFileSync(
    path.join(__dirname, "conversions-map.json"),
    JSON.stringify(conversions, null, 2)
  );
  console.log("\n📝 Conversions map saved to conversions-map.json");
  console.log("   Run: node update-image-refs.js to update code references.");
}

main();
