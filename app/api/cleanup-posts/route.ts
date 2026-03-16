import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

const VALID_SLUGS = [
  "why-hyperlocal-delivery-needed-a-smarter-model---and-how-qwqer-express-responded",
  "transportation-that-moves-business-forward-the-new-qwqer-fleet-strategy",
  "how-to-choose-the-right-transportation-partner-for-intracity-movement",
  "reliable-delivery-service",
  "fast-delivery-as-a-customer-loyalty-strategy",
  "hyperlocal-delivery-in-india",
  "why-fast-delivery-is-becoming-the-new-loyalty-strategy-for-modern-businesses",
  "how-pharmacies-can-benefit-from-hyperlocal-delivery",
  "how-restaurants-can-deliver-meals-faster-without-food-aggregators---duplicate---18315",
  "a-guide-for-home-based-businesses-for-pickup-and-delivery",
  "hyperlocal-delivery-helps-restaurants-to-deliver-smoother",
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
  "the-qwqer-way-to-self-care-2",
  "qwqer-hyperlocal-delivery-a-story-2",
  "qwqer-delivery-boy-a-story-2",
  "qwqer-services-and-its-manifold-advantages-2",
  "qwqer-a-flexible-solution-for-your-business-deliveries",
  "beyond-budget-cuts-smart-cost-control-strategies-for-modern-fleet-leaders",
  "strategic-foresight-for-fleet-leaders-turning-market-volatility-into-competitive-advantage",
  "whats-next-for-modern-fleet-management-key-trends-improving-operational-efficiency-this-year",
  "the-rise-of-hyperlocal-delivery-in-india-why-its-changing-the-retail-game",
];

export async function GET() {
  try {
    const allPosts = await db.post.findMany({ select: { id: true, slug: true } });
    const toDelete = allPosts.filter((p: any) => !VALID_SLUGS.includes(p.slug));

    let deletedCount = 0;
    if (toDelete.length > 0) {
      const deleteIds = toDelete.map((p: any) => p.id);
      const result = await db.post.deleteMany({ where: { id: { in: deleteIds } } });
      deletedCount = result.count;
    }

    // Check which valid slugs are missing from DB
    const dbSlugs = allPosts.map((p: any) => p.slug);
    const missing = VALID_SLUGS.filter(s => !dbSlugs.includes(s));

    const remaining = await db.post.count();

    return NextResponse.json({
      message: 'Cleanup done!',
      before: allPosts.length,
      deleted: deletedCount,
      remaining,
      missingFromDB: missing,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
