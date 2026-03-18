const fs = require("fs");
const path = require("path");

const PROJECT_DIR = __dirname;

// Directories to scan
const CODE_DIRS = ["app", "components", "lib"];
const CODE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".css"];
const SKIP = ["node_modules", ".next", ".git"];

// ── Complete path replacement map (old → new) ──
// This covers ALL folder + file renames
const REPLACEMENTS = [
  // ── FOLDER: Express clients → express-clients ──
  ["/Express clients/KFC.png", "/express-clients/kfc.webp"],
  ["/Express clients/KFC.webp", "/express-clients/kfc.webp"],
  ["/Express clients/Rebel.png", "/express-clients/rebel-foods.webp"],
  ["/Express clients/Rebel.webp", "/express-clients/rebel-foods.webp"],
  ["/Express clients/Tata 1mg.png", "/express-clients/tata-1mg.webp"],
  ["/Express clients/Tata 1mg.webp", "/express-clients/tata-1mg.webp"],
  ["/Express clients/zepto (1).png", "/express-clients/zepto.webp"],
  ["/Express clients/zepto (1).webp", "/express-clients/zepto.webp"],
  ["/Express clients/apollo-phar.png", "/express-clients/apollo-pharmacy.webp"],
  ["/Express clients/apollo-phar.webp", "/express-clients/apollo-pharmacy.webp"],
  ["/Express clients/mcd.png", "/express-clients/mcdonalds.webp"],
  ["/Express clients/mcd.webp", "/express-clients/mcdonalds.webp"],
  ["/Express clients/Bigbask.png", "/express-clients/bigbasket.webp"],
  ["/Express clients/Bigbask.webp", "/express-clients/bigbasket.webp"],
  ["/Express clients/Magicpin.png", "/express-clients/magicpin.webp"],
  ["/Express clients/Magicpin.webp", "/express-clients/magicpin.webp"],
  ["/Express clients/Bakingo.png", "/express-clients/bakingo.webp"],
  ["/Express clients/Bakingo.webp", "/express-clients/bakingo.webp"],
  ["/Express clients/Fnp.png", "/express-clients/fnp.webp"],
  ["/Express clients/Fnp.webp", "/express-clients/fnp.webp"],
  ["/Express clients/More.png", "/express-clients/more.webp"],
  ["/Express clients/More.webp", "/express-clients/more.webp"],
  ["/Express clients/Ratnadeep.png", "/express-clients/ratnadeep.webp"],
  ["/Express clients/Ratnadeep.webp", "/express-clients/ratnadeep.webp"],
  ["/Express clients/Spar.png", "/express-clients/spar.webp"],
  ["/Express clients/Spar.webp", "/express-clients/spar.webp"],
  ["/Express clients/Sweet_karam_coffee.png", "/express-clients/sweet-karam-coffee.webp"],
  ["/Express clients/Sweet_karam_coffee.webp", "/express-clients/sweet-karam-coffee.webp"],
  ["/Express clients/zomato.jpg", "/express-clients/zomato.webp"],
  ["/Express clients/zomato.webp", "/express-clients/zomato.webp"],

  // ── FOLDER: QWQER Express Solutions → express-solutions ──
  ["/QWQER Express Solutions/Batch Deliveries.png", "/express-solutions/batch-deliveries.webp"],
  ["/QWQER Express Solutions/Batch Deliveries.webp", "/express-solutions/batch-deliveries.webp"],
  ["/QWQER Express Solutions/Mid-mile to Last-mile Fulfilment.png", "/express-solutions/mid-mile-last-mile-fulfilment.webp"],
  ["/QWQER Express Solutions/Mid-mile to Last-mile Fulfilment.webp", "/express-solutions/mid-mile-last-mile-fulfilment.webp"],
  ["/QWQER Express Solutions/Multi-drop Distribution.png", "/express-solutions/multi-drop-distribution.webp"],
  ["/QWQER Express Solutions/Multi-drop Distribution.webp", "/express-solutions/multi-drop-distribution.webp"],
  ["/QWQER Express Solutions/On-Demand Deliveries.png", "/express-solutions/on-demand-deliveries.webp"],
  ["/QWQER Express Solutions/On-Demand Deliveries.webp", "/express-solutions/on-demand-deliveries.webp"],
  ["/QWQER Express Solutions/Same-Day Deliveries.png", "/express-solutions/same-day-deliveries.webp"],
  ["/QWQER Express Solutions/Same-Day Deliveries.webp", "/express-solutions/same-day-deliveries.webp"],
  ["/QWQER Express Solutions/Scheduled Deliveries.png", "/express-solutions/scheduled-deliveries.webp"],
  ["/QWQER Express Solutions/Scheduled Deliveries.webp", "/express-solutions/scheduled-deliveries.webp"],

  // ── FOLDER: Trusted by top companies Fleet → fleet-trusted ──
  ["/Trusted by top companies Fleet/berger.png", "/fleet-trusted/berger.webp"],
  ["/Trusted by top companies Fleet/berger.webp", "/fleet-trusted/berger.webp"],
  ["/Trusted by top companies Fleet/bigbasket.png", "/fleet-trusted/bigbasket.webp"],
  ["/Trusted by top companies Fleet/bigbasket.webp", "/fleet-trusted/bigbasket.webp"],
  ["/Trusted by top companies Fleet/epsilon.png", "/fleet-trusted/epsilon.webp"],
  ["/Trusted by top companies Fleet/epsilon.webp", "/fleet-trusted/epsilon.webp"],
  ["/Trusted by top companies Fleet/flipkart.png", "/fleet-trusted/flipkart.webp"],
  ["/Trusted by top companies Fleet/flipkart.webp", "/fleet-trusted/flipkart.webp"],
  ["/Trusted by top companies Fleet/greenlam.png", "/fleet-trusted/greenlam.webp"],
  ["/Trusted by top companies Fleet/greenlam.webp", "/fleet-trusted/greenlam.webp"],
  ["/Trusted by top companies Fleet/pidilite.png", "/fleet-trusted/pidilite.webp"],
  ["/Trusted by top companies Fleet/pidilite.webp", "/fleet-trusted/pidilite.webp"],
  ["/Trusted by top companies Fleet/saint-gobain.png", "/fleet-trusted/saint-gobain.webp"],
  ["/Trusted by top companies Fleet/saint-gobain.webp", "/fleet-trusted/saint-gobain.webp"],
  ["/Trusted by top companies Fleet/yokohama.png", "/fleet-trusted/yokohama.webp"],
  ["/Trusted by top companies Fleet/yokohama.webp", "/fleet-trusted/yokohama.webp"],
  ["/Trusted by top companies Fleet/zepto.png", "/fleet-trusted/zepto.webp"],
  ["/Trusted by top companies Fleet/zepto.webp", "/fleet-trusted/zepto.webp"],
  ["/Trusted by top companies Fleet/zomato.png", "/fleet-trusted/zomato.webp"],
  ["/Trusted by top companies Fleet/zomato.webp", "/fleet-trusted/zomato.webp"],
  ["/Trusted by top companies Fleet/blue dart DHL.jpg", "/fleet-trusted/blue-dart-dhl.jpg"],

  // ── FOLDER: Types of Fleet Services → fleet-services ──
  ["/Types of Fleet Services/Full Truck Load transportation.png", "/fleet-services/full-truck-load.webp"],
  ["/Types of Fleet Services/Full Truck Load transportation.webp", "/fleet-services/full-truck-load.webp"],
  ["/Types of Fleet Services/Intracity transportation.png", "/fleet-services/intracity-transportation.webp"],
  ["/Types of Fleet Services/Intracity transportation.webp", "/fleet-services/intracity-transportation.webp"],
  ["/Types of Fleet Services/Project Transportation.png", "/fleet-services/project-transportation.webp"],
  ["/Types of Fleet Services/Project Transportation.webp", "/fleet-services/project-transportation.webp"],

  // ── FOLDER: Why do customers choose us → fleet-why-choose ──
  ["/Why do customers choose us/Compliance & Safety First.png", "/fleet-why-choose/compliance-safety.webp"],
  ["/Why do customers choose us/Compliance & Safety First.webp", "/fleet-why-choose/compliance-safety.webp"],
  ["/Why do customers choose us/Customisable and Scalable Solutions.png", "/fleet-why-choose/scalable-solutions.webp"],
  ["/Why do customers choose us/Customisable and Scalable Solutions.webp", "/fleet-why-choose/scalable-solutions.webp"],
  ["/Why do customers choose us/Enterprise-Grade Reliability.png", "/fleet-why-choose/enterprise-reliability.webp"],
  ["/Why do customers choose us/Enterprise-Grade Reliability.webp", "/fleet-why-choose/enterprise-reliability.webp"],
  ["/Why do customers choose us/Operational Control & Visibility.png", "/fleet-why-choose/operational-control.webp"],
  ["/Why do customers choose us/Operational Control & Visibility.webp", "/fleet-why-choose/operational-control.webp"],
  ["/Why do customers choose us/Trusted Partner Mindset.png", "/fleet-why-choose/trusted-partner.webp"],
  ["/Why do customers choose us/Trusted Partner Mindset.webp", "/fleet-why-choose/trusted-partner.webp"],

  // ── FOLDER: Why Join QWQER Express... → express-rider-vendor ──
  ["/Why Join QWQER Express as a Rider  Rider Vendor/Consistent Order Flow.png", "/express-rider-vendor/consistent-order-flow.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/Consistent Order Flow.webp", "/express-rider-vendor/consistent-order-flow.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/Flexible Working Model.png", "/express-rider-vendor/flexible-working-model.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/Flexible Working Model.webp", "/express-rider-vendor/flexible-working-model.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/Grow With the Platform.png", "/express-rider-vendor/grow-with-platform.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/Grow With the Platform.webp", "/express-rider-vendor/grow-with-platform.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/On-Time, Transparent Payouts.png", "/express-rider-vendor/on-time-payouts.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/On-Time, Transparent Payouts.webp", "/express-rider-vendor/on-time-payouts.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/Tech-Enabled Operations.png", "/express-rider-vendor/tech-enabled-operations.webp"],
  ["/Why Join QWQER Express as a Rider  Rider Vendor/Tech-Enabled Operations.webp", "/express-rider-vendor/tech-enabled-operations.webp"],

  // ── FOLDER: Why vendors work with us → fleet-vendor-benefits ──
  ["/Why vendors work with us/Consistent Business Opportunities.png", "/fleet-vendor-benefits/consistent-opportunities.webp"],
  ["/Why vendors work with us/Consistent Business Opportunities.webp", "/fleet-vendor-benefits/consistent-opportunities.webp"],
  ["/Why vendors work with us/On-Time Payments.png", "/fleet-vendor-benefits/on-time-payments.webp"],
  ["/Why vendors work with us/On-Time Payments.webp", "/fleet-vendor-benefits/on-time-payments.webp"],
  ["/Why vendors work with us/Operational Support.png", "/fleet-vendor-benefits/operational-support.webp"],
  ["/Why vendors work with us/Operational Support.webp", "/fleet-vendor-benefits/operational-support.webp"],
  ["/Why vendors work with us/Scalable Growth.png", "/fleet-vendor-benefits/scalable-growth.webp"],
  ["/Why vendors work with us/Scalable Growth.webp", "/fleet-vendor-benefits/scalable-growth.webp"],
  ["/Why vendors work with us/Transparent Processes.png", "/fleet-vendor-benefits/transparent-processes.webp"],
  ["/Why vendors work with us/Transparent Processes.webp", "/fleet-vendor-benefits/transparent-processes.webp"],

  // ── fleet-clients file renames ──
  ["/fleet-clients/Berger-1.png", "/fleet-clients/berger.webp"],
  ["/fleet-clients/Berger-1.webp", "/fleet-clients/berger.webp"],
  ["/fleet-clients/Bigbask.png", "/fleet-clients/bigbasket.webp"],
  ["/fleet-clients/Bigbask.webp", "/fleet-clients/bigbasket.webp"],
  ["/fleet-clients/Blue-Dart.png", "/fleet-clients/blue-dart.webp"],
  ["/fleet-clients/Blue-Dart.webp", "/fleet-clients/blue-dart.webp"],
  ["/fleet-clients/Epsilon-1.png", "/fleet-clients/epsilon.webp"],
  ["/fleet-clients/Epsilon-1.webp", "/fleet-clients/epsilon.webp"],
  ["/fleet-clients/Flipkart.jpg", "/fleet-clients/flipkart.webp"],
  ["/fleet-clients/Flipkart.webp", "/fleet-clients/flipkart.webp"],
  ["/fleet-clients/Greenlam-1.png", "/fleet-clients/greenlam.webp"],
  ["/fleet-clients/Greenlam-1.webp", "/fleet-clients/greenlam.webp"],
  ["/fleet-clients/pidilite-1.png", "/fleet-clients/pidilite.webp"],
  ["/fleet-clients/pidilite-1.webp", "/fleet-clients/pidilite.webp"],
  ["/fleet-clients/Saint-Gobain-1.png", "/fleet-clients/saint-gobain.webp"],
  ["/fleet-clients/Saint-Gobain-1.webp", "/fleet-clients/saint-gobain.webp"],
  ["/fleet-clients/Yokohama-1.png", "/fleet-clients/yokohama.webp"],
  ["/fleet-clients/Yokohama-1.webp", "/fleet-clients/yokohama.webp"],
  ["/fleet-clients/zepto-1.png", "/fleet-clients/zepto.webp"],
  ["/fleet-clients/zepto-1.webp", "/fleet-clients/zepto.webp"],
  ["/fleet-clients/zomato.jpg", "/fleet-clients/zomato.webp"],

  // ── leaders file renames ──
  ["/leaders/Aditya.webp", "/leaders/aditya.webp"],
  ["/leaders/Prakash.jpg.webp", "/leaders/prakash.webp"],
  ["/leaders/Rakesh.jpg.webp", "/leaders/rakesh.webp"],
  ["/leaders/Vineetha Chidambaran - COO Express.webp", "/leaders/vineetha-chidambaran.webp"],

  // ── clients file renames ──
  ["/clients/697841be7293923c88b98940_qwqer-w-p-500.png", "/clients/qwqer-client-logo.webp"],
  ["/clients/697841be7293923c88b98940_qwqer-w-p-500.webp", "/clients/qwqer-client-logo.webp"],
  ["/clients/apollo-phar.webp", "/clients/apollo-pharmacy.webp"],
  ["/clients/mcd.webp", "/clients/mcdonalds.webp"],

  // ── Root file renames ──
  ["/Fleet truck mascot.png", "/fleet-truck-mascot.webp"],
  ["/Fleet truck mascot.webp", "/fleet-truck-mascot.webp"],
  ["/illustration_mascot_3d.png", "/mascot-3d-illustration.webp"],
  ["/illustration_mascot_3d.webp", "/mascot-3d-illustration.webp"],
];

function getCodeFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getCodeFiles(fullPath));
    } else if (CODE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
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
    let count = 0;

    for (const [from, to] of REPLACEMENTS) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        modified = true;
        count++;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`  ✏️  ${path.relative(PROJECT_DIR, filePath)} (${count} replacements)`);
      totalReplacements += count;
      filesModified++;
    }
  }
}

console.log(`\n✅ Updated ${totalReplacements} references across ${filesModified} files.`);
