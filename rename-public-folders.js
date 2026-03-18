const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "public");

// ── FOLDER RENAMES ──
const FOLDER_RENAMES = {
  "Express clients": "express-clients",
  "QWQER Express Solutions": "express-solutions",
  "Trusted by top companies Fleet": "fleet-trusted",
  "Types of Fleet Services": "fleet-services",
  "Why do customers choose us": "fleet-why-choose",
  "Why Join QWQER Express as a Rider  Rider Vendor": "express-rider-vendor",
  "Why vendors work with us": "fleet-vendor-benefits",
};

// ── FILE RENAMES (within specific folders) ──
const FILE_RENAMES = {
  // Root level files
  "": {
    "Fleet truck mascot.png": "fleet-truck-mascot.png",
    "Fleet truck mascot.webp": "fleet-truck-mascot.webp",
    "hero-image.png": null, // keep
    "hero-image.webp": null,
    "illustration_mascot_3d.png": "mascot-3d-illustration.png",
    "illustration_mascot_3d.webp": "mascot-3d-illustration.webp",
    "mascot-footer.png": null,
    "mascot-footer.webp": null,
    "mascot-img.png": null,
    "mascot-img.webp": null,
    "mascot-running.png": null,
    "mascot-running.webp": null,
    "mascot-thumbsup.png": null,
    "mascot-thumbsup.webp": null,
    "qwqer-logo.png": null,
    "qwqer-logo.webp": null,
  },
  // Express clients → express-clients
  "express-clients": {
    "apollo-phar.webp": "apollo-pharmacy.webp",
    "Bakingo.webp": "bakingo.webp",
    "Bigbask.webp": "bigbasket.webp",
    "Fnp.webp": "fnp.webp",
    "KFC.webp": "kfc.webp",
    "Magicpin.webp": "magicpin.webp",
    "mcd.webp": "mcdonalds.webp",
    "More.webp": "more.webp",
    "Ratnadeep.webp": "ratnadeep.webp",
    "Rebel.webp": "rebel-foods.webp",
    "Spar.webp": "spar.webp",
    "Sweet_karam_coffee.webp": "sweet-karam-coffee.webp",
    "Tata 1mg.webp": "tata-1mg.webp",
    "zepto (1).webp": "zepto.webp",
    "zomato.webp": null,
  },
  // Express solutions
  "express-solutions": {
    "Batch Deliveries.webp": "batch-deliveries.webp",
    "Mid-mile to Last-mile Fulfilment.webp": "mid-mile-last-mile-fulfilment.webp",
    "Multi-drop Distribution.webp": "multi-drop-distribution.webp",
    "On-Demand Deliveries.webp": "on-demand-deliveries.webp",
    "Same-Day Deliveries.webp": "same-day-deliveries.webp",
    "Scheduled Deliveries.webp": "scheduled-deliveries.webp",
  },
  // Fleet trusted logos
  "fleet-trusted": {
    "berger.webp": null,
    "bigbasket.webp": null,
    "epsilon.webp": null,
    "flipkart.webp": null,
    "greenlam.webp": null,
    "pidilite.webp": null,
    "saint-gobain.webp": null,
    "yokohama.webp": null,
    "zepto.webp": null,
    "zomato.webp": null,
    "blue dart DHL.jpg": "blue-dart-dhl.jpg",
  },
  // Fleet services
  "fleet-services": {
    "Full Truck Load transportation.webp": "full-truck-load.webp",
    "Intracity transportation.webp": "intracity-transportation.webp",
    "Project Transportation.webp": "project-transportation.webp",
  },
  // Fleet why choose
  "fleet-why-choose": {
    "Compliance & Safety First.webp": "compliance-safety.webp",
    "Customisable and Scalable Solutions.webp": "scalable-solutions.webp",
    "Enterprise-Grade Reliability.webp": "enterprise-reliability.webp",
    "Operational Control & Visibility.webp": "operational-control.webp",
    "Trusted Partner Mindset.webp": "trusted-partner.webp",
  },
  // Express rider vendor
  "express-rider-vendor": {
    "Consistent Order Flow.webp": "consistent-order-flow.webp",
    "Flexible Working Model.webp": "flexible-working-model.webp",
    "Grow With the Platform.webp": "grow-with-platform.webp",
    "On-Time, Transparent Payouts.webp": "on-time-payouts.webp",
    "Tech-Enabled Operations.webp": "tech-enabled-operations.webp",
  },
  // Fleet vendor benefits
  "fleet-vendor-benefits": {
    "Consistent Business Opportunities.webp": "consistent-opportunities.webp",
    "On-Time Payments.webp": "on-time-payments.webp",
    "Operational Support.webp": "operational-support.webp",
    "Scalable Growth.webp": "scalable-growth.webp",
    "Transparent Processes.webp": "transparent-processes.webp",
  },
  // Fleet clients
  "fleet-clients": {
    "Berger-1.webp": "berger.webp",
    "Bigbask.webp": "bigbasket.webp",
    "Blue-Dart.webp": "blue-dart.webp",
    "Epsilon-1.webp": "epsilon.webp",
    "Flipkart.webp": "flipkart.webp",
    "Greenlam-1.webp": "greenlam.webp",
    "pidilite-1.webp": "pidilite.webp",
    "Saint-Gobain-1.webp": "saint-gobain.webp",
    "Yokohama-1.webp": "yokohama.webp",
    "zepto-1.webp": "zepto.webp",
    "zomato.webp": null,
  },
  // Leaders
  "leaders": {
    "Aditya.webp": "aditya.webp",
    "clement.webp": null,
    "girish.webp": null,
    "Prakash.jpg.webp": "prakash.webp",
    "Rakesh.jpg.webp": "rakesh.webp",
    "remya.webp": null,
    "resmi.webp": null,
    "Vineetha Chidambaran - COO Express.webp": "vineetha-chidambaran.webp",
  },
  // Home clients
  "clients": {
    "697841be7293923c88b98940_qwqer-w-p-500.png": "qwqer-client-logo.png",
    "697841be7293923c88b98940_qwqer-w-p-500.webp": "qwqer-client-logo.webp",
    "apollo-phar.webp": "apollo-pharmacy.webp",
    "mcd.webp": "mcdonalds.webp",
    "pidilite.webp": null,
    "zepto.webp": null,
    "zomato.webp": null,
  },
};

// Track all path changes for code updates
const pathChanges = [];

// ── Step 1: Rename folders ──
console.log("═══ Step 1: Renaming folders ═══\n");
for (const [oldName, newName] of Object.entries(FOLDER_RENAMES)) {
  const oldPath = path.join(PUBLIC_DIR, oldName);
  const newPath = path.join(PUBLIC_DIR, newName);
  if (fs.existsSync(oldPath)) {
    if (fs.existsSync(newPath)) {
      console.log(`  SKIP (target exists): ${oldName} → ${newName}`);
    } else {
      fs.renameSync(oldPath, newPath);
      console.log(`  ✅ ${oldName} → ${newName}`);
    }
    pathChanges.push({ from: oldName, to: newName, type: "folder" });
  } else {
    console.log(`  ⚠️  Not found: ${oldName}`);
  }
}

// ── Step 2: Rename files ──
console.log("\n═══ Step 2: Renaming files ═══\n");
for (const [folder, renames] of Object.entries(FILE_RENAMES)) {
  const dirPath = folder === "" ? PUBLIC_DIR : path.join(PUBLIC_DIR, folder);
  if (!fs.existsSync(dirPath)) {
    console.log(`  ⚠️  Folder not found: ${folder}`);
    continue;
  }

  for (const [oldFile, newFile] of Object.entries(renames)) {
    if (newFile === null) continue; // keep as-is

    const oldFilePath = path.join(dirPath, oldFile);
    const newFilePath = path.join(dirPath, newFile);

    if (fs.existsSync(oldFilePath)) {
      if (fs.existsSync(newFilePath) && oldFilePath !== newFilePath) {
        console.log(`  SKIP (target exists): ${folder}/${oldFile}`);
      } else {
        fs.renameSync(oldFilePath, newFilePath);
        console.log(`  ✅ ${folder}/${oldFile} → ${newFile}`);
      }
      const fromPath = folder ? `${folder}/${oldFile}` : oldFile;
      const toPath = folder ? `${folder}/${newFile}` : newFile;
      pathChanges.push({ from: fromPath, to: toPath, type: "file" });
    }
  }
}

// ── Step 3: Build full path change map (accounting for folder renames) ──
const fullPathChanges = [];

for (const change of pathChanges) {
  if (change.type === "folder") {
    // Folder rename: every file in the folder has its path changed
    const newDirPath = path.join(PUBLIC_DIR, change.to);
    if (fs.existsSync(newDirPath)) {
      const files = fs.readdirSync(newDirPath);
      for (const file of files) {
        // Check if this file was also renamed
        const fileRenameEntry = FILE_RENAMES[change.to];
        if (fileRenameEntry && fileRenameEntry[file] !== undefined && fileRenameEntry[file] !== null) {
          // File was also renamed — the file rename entry handles it
        } else {
          // File was NOT renamed, only folder changed
          fullPathChanges.push({
            from: `/${change.from}/${file}`,
            to: `/${change.to}/${file}`,
          });
        }
      }
    }
  }

  if (change.type === "file") {
    // Check if the folder was also renamed
    const folderParts = change.from.split("/");
    const fileFolderOld = folderParts.length > 1 ? folderParts[0] : "";
    const folderRename = Object.entries(FOLDER_RENAMES).find(([k, v]) => v === fileFolderOld || k === fileFolderOld);

    let origFolder = fileFolderOld;
    // Find the original folder name
    for (const [oldF, newF] of Object.entries(FOLDER_RENAMES)) {
      if (newF === fileFolderOld) {
        origFolder = oldF;
        break;
      }
    }

    const oldFileName = folderParts.length > 1 ? folderParts.slice(1).join("/") : change.from;
    const newFileName = change.to.includes("/") ? change.to.split("/").slice(1).join("/") : change.to;

    fullPathChanges.push({
      from: origFolder ? `/${origFolder}/${oldFileName}` : `/${oldFileName}`,
      to: `/${change.to}`,
    });
  }
}

// Save the change map
fs.writeFileSync(
  path.join(__dirname, "path-changes.json"),
  JSON.stringify(fullPathChanges, null, 2)
);

console.log(`\n═══ Summary ═══`);
console.log(`Folder renames: ${Object.keys(FOLDER_RENAMES).length}`);
console.log(`File renames: ${pathChanges.filter(c => c.type === "file").length}`);
console.log(`Total path changes: ${fullPathChanges.length}`);
console.log(`\n📝 Path changes saved to path-changes.json`);
console.log(`   Next: Run 'node update-all-refs.js' to update code references.`);
