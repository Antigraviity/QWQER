const fs = require("fs");
const path = require("path");

const PROJECT_DIR = __dirname;
const CONVERSIONS_FILE = path.join(PROJECT_DIR, "conversions-map.json");

// Directories to scan for code references
const CODE_DIRS = ["app", "components", "lib"];

// File extensions to scan
const CODE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".css", ".json"];

// Files/folders to skip
const SKIP = ["node_modules", ".next", ".git", "convert-to-webp.js", "update-image-refs.js", "conversions-map.json"];

if (!fs.existsSync(CONVERSIONS_FILE)) {
  console.error("❌ conversions-map.json not found. Run convert-to-webp.js first.");
  process.exit(1);
}

const conversions = JSON.parse(fs.readFileSync(CONVERSIONS_FILE, "utf8"));

// Build replacement map: original filename → webp filename
const replacements = [];
for (const c of conversions) {
  const origExt = path.extname(c.original);
  const origBase = c.original;
  const webpBase = c.webp;

  // Create variants of how this file might be referenced in code
  // e.g. "/Express clients/Bakingo.png" → "/Express clients/Bakingo.webp"
  replacements.push({
    from: origBase,
    to: webpBase,
  });
}

function getCodeFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (SKIP.some((s) => entry.name === s)) continue;

    if (entry.isDirectory()) {
      results.push(...getCodeFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (CODE_EXTENSIONS.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

let totalReplacements = 0;
let filesModified = 0;

for (const codeDir of CODE_DIRS) {
  const fullDir = path.join(PROJECT_DIR, codeDir);
  const files = getCodeFiles(fullDir);

  for (const filePath of files) {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;
    let fileReplacements = 0;

    for (const rep of replacements) {
      // Match the reference with or without leading slash
      const fromVariants = [
        `/${rep.from}`,
        rep.from,
      ];
      const toVariants = [
        `/${rep.to}`,
        rep.to,
      ];

      for (let i = 0; i < fromVariants.length; i++) {
        if (content.includes(fromVariants[i])) {
          content = content.split(fromVariants[i]).join(toVariants[i]);
          modified = true;
          fileReplacements++;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`  ✏️  ${path.relative(PROJECT_DIR, filePath)} (${fileReplacements} replacements)`);
      totalReplacements += fileReplacements;
      filesModified++;
    }
  }
}

console.log(`\n✅ Updated ${totalReplacements} references across ${filesModified} files.`);

// Also check if any old PNG/JPG files can be deleted (optional)
console.log("\n💡 Tip: Once verified, you can delete the original .png/.jpg files to save space.");
console.log("   The .webp files are already in the same directories.");
