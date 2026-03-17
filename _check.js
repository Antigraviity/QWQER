const blogData = require('./app/api/seed-all-blogs/blog-data.json');
const matches = blogData.filter(p => p.slug.includes('best-solution') || p.slug.includes('hyperlocal-delivery'));
console.log('Matching slugs in blog-data.json:');
matches.forEach(p => console.log('  ' + p.slug));
