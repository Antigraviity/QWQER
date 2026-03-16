const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const blogContent = `<h2>1. Introduction</h2>
<p>If you look at how businesses operated five or six years ago, hyperlocal delivery was mostly an add-on. Today, it has become the backbone of urban commerce.</p>
<p>Customers don't just want products. They want them within hours.</p>
<p><strong>Hyperlocal delivery didn't just need more riders. It needed a smarter, more structured model.</strong></p>`;

async function main() {
    const post = await prisma.post.upsert({
        where: { slug: 'hyperlocal-delivery-rise' },
        update: {
            title: 'Why Hyperlocal Delivery Needed a Smarter Model - and How QWQER Express Responded',
            excerpt: 'Hyperlocal delivery didn\'t just need more riders. It needed a smarter, more structured model.',
            content: blogContent,
            image: '/blog/1.webp',
            readTime: '8 min read',
            date: 'March 5, 2026',
            published: true,
        },
        create: {
            slug: 'hyperlocal-delivery-rise',
            title: 'Why Hyperlocal Delivery Needed a Smarter Model - and How QWQER Express Responded',
            excerpt: 'Hyperlocal delivery didn\'t just need more riders. It needed a smarter, more structured model.',
            content: blogContent,
            image: '/blog/1.webp',
            readTime: '8 min read',
            date: 'March 5, 2026',
            published: true,
        },
    });

    console.log('Blog post upserted:', post.slug, post.title);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
