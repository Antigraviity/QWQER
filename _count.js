const blogData = require('./app/api/seed-all-blogs/blog-data.json');
const resourcesPosts = require('./components/resources/blog-posts.json');

const dbSlugs = new Set(blogData.map(p => p.slug));
const resSlugs = new Set(resourcesPosts.map(p => p.slug));

const onlyInDb = [...dbSlugs].filter(s => !resSlugs.has(s));
const onlyInRes = [...resSlugs].filter(s => !dbSlugs.has(s));

console.log('Only in DB seed, not in Resources: ' + onlyInDb.length);
onlyInDb.forEach((s, i) => console.log('  ' + (i+1) + '. ' + s));
console.log('');
console.log('Only in Resources, not in DB seed: ' + onlyInRes.length);
onlyInRes.forEach((s, i) => console.log('  ' + (i+1) + '. ' + s));
console.log('');
console.log('============================');
console.log('blog-data.json (DB seed): ' + blogData.length);
console.log('blog-posts.json (Resources): ' + resourcesPosts.length);
console.log('============================');
