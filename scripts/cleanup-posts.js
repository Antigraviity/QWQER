// Script to clean database: keep only the 57 correct blog posts
// Run with: node scripts/cleanup-posts.js

const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const VALID_SLUGS = [
  "why-hyperlocal-delivery-needed-a-smarter-model---and-how-qwqer-express-responded",
  "transportation-that-moves-business-forward-the-new-qwqer-fleet-strategy",
  "how-to-choose-the-right-transportation-partner-for-intracity-movement",
  "reliable-delivery-service",
  "fast-delivery-as-a-customer-loyalty-strategy",
  "hyperlocal-delivery-in-india",
  "how-pharmacies-can-benefit-from-hyperlocal-delivery",
  "hyperlocal-delivery-helps-restaurants-to-deliver-smoother",
  "a-guide-for-home-based-businesses-for-pickup-and-delivery",
  "the-best-solution-for-business-with-hyperlocal-delivery",
  "hyperlocal-delivery-solutions-for-grocery-stores",
  "how-qwqers-hyperlocal-delivery-helps-small-businesses",
  "choosing-the-right-mini-truck-for-every-business",
  "hyperlocal-delivery-advantages-for-pharmacies",
  "pickup-and-drop-services-scale-startups-to-enterprises",
  "how-qwqer-helps-retailers-manage-seasonal-delivery-spikes",
  "best-shopify-delivery-app-for-merchants-qwqer",
  "on-demand-truck-booking-for-b2b-enterprises",
  "last-mile-vs-hyperlocal-vs-local-vs-express-delivery",
  "pickup-and-drop-services-for-ecommerce-sellers",
  "streamline-business-deliveries-with-qwqer-api",
  "right-vehicle-for-every-load-qwqer-load-capacity",
  "most-trusted-express-delivery-partner-for-pharma-industry",
  "top-industries-that-benefit-from-pickup-and-drop-services",
  "online-truck-booking-vs-traditional-methods",
  "truck-booking-service-tips-for-seasonal-business-success",
  "how-qwqer-pickup-and-drop-simplify-daily-logistics",
  "qwqer-pickup-and-drop-and-truck-booking-in-chennai",
  "qwqer-pickup-drop-and-truck-booking-live-in-hyderabad",
  "qwqer-pickup-drop-and-truck-booking-live-in-bangalore",
  "online-truck-booking-will-shape-the-future-of-logistics",
  "intercity-and-intracity-truck-booking-services",
  "how-sme-reduces-downtime-using-qwqer-truck-booking",
  "why-choosing-qwqer-as-the-right-truck-delivery-service",
  "how-qwqer-truck-booking-solve-top-logistic-challenges",
  "why-businesses-choose-qwqer-truck-transport-service",
  "how-qwqer-truck-booking-transforms-with-tech-logistics",
  "how-qwqer-saves-your-budget-on-truck-booking-services",
  "how-qwqer-express-pickup-and-drop-helps-individuals",
  "how-qwqer-express-pickup-and-drop-helps-businesses",
  "what-is-qwqer-fleet-truck-delivery-services",
  "how-small-business-can-win-delivery-season",
  "how-to-choose-the-right-delivery-partner",
  "top-challenges-in-hyperlocal-delivery",
  "pickup-and-drop-services-for-small-businesses",
  "qwqer-joins-ondc-transforming-indias-logistics",
  "get-your-daily-needs-delivered-at-your-doorstep",
  "vanakkam-coimbatore-bring-everything-home-with-qwqer",
  "feed-your-delivery-needs-with-qwqer",
  "qwqer-a-flexible-solution-for-your-business-deliveries",
  "qwqer-services-and-its-manifold-advantages",
  "bengaluru-is-qwqer-than-ever-before",
  "post/qwqer-for-her",
  "beyond-budget-cuts-smart-cost-control-strategies-for-modern-fleet-leaders",
  "strategic-foresight-for-fleet-leaders-turning-market-volatility-into-competitive-advantage",
  "whats-next-for-modern-fleet-management-key-trends-improving-operational-efficiency-this-year",
  "the-rise-of-hyperlocal-delivery-in-india-why-its-changing-the-retail-game",
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("No DATABASE_URL found in .env");
    process.exit(1);
  }

  let db;
  try {
    const pool = new Pool({
      connectionString: connectionString.trim(),
      ssl: { rejectUnauthorized: false }
    });
    const adapter = new PrismaPg(pool);
    db = new PrismaClient({ adapter });
  } catch (e) {
    db = new PrismaClient();
  }

  try {
    // Get all posts
    const allPosts = await db.post.findMany({ select: { id: true, slug: true, title: true } });
    console.log(`Total posts in database: ${allPosts.length}`);

    // Find posts to delete (not in valid slugs list)
    const toDelete = allPosts.filter(p => !VALID_SLUGS.includes(p.slug));
    const toKeep = allPosts.filter(p => VALID_SLUGS.includes(p.slug));

    console.log(`Posts to KEEP: ${toKeep.length}`);
    console.log(`Posts to DELETE: ${toDelete.length}`);

    if (toDelete.length > 0) {
      console.log("\nDeleting posts with these slugs:");
      toDelete.forEach(p => console.log(`  - ${p.slug} (${p.title})`));

      const deleteIds = toDelete.map(p => p.id);
      const result = await db.post.deleteMany({
        where: { id: { in: deleteIds } }
      });
      console.log(`\nDeleted ${result.count} posts.`);
    } else {
      console.log("No posts to delete. Database is already clean.");
    }

    // Verify
    const remaining = await db.post.count();
    console.log(`\nRemaining posts in database: ${remaining}`);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
