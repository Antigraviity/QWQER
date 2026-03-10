// Run this script to fix blog image paths in blog-data.json
// Usage: node scripts/fix-blog-images.js

var fs = require('fs');
var path = require('path');

var dataPath = path.join(__dirname, '..', 'app', 'api', 'seed-all-blogs', 'blog-data.json');
var data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

var fixedCount = 0;

data.forEach(function(blog) {
    var slug = blog.slug;
    if (slug.indexOf('post/') === 0) {
        slug = slug.slice(5);
    }
    var correctImage = '/blog/' + slug + '.webp';
    if (blog.image !== correctImage) {
        console.log('FIX: ' + blog.slug);
        console.log('  OLD: ' + blog.image);
        console.log('  NEW: ' + correctImage);
        blog.image = correctImage;
        fixedCount++;
    }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('');
console.log('Done! Fixed ' + fixedCount + ' blog image paths.');
console.log('Now re-run the seed-all-blogs API to update the database.');
