var fs = require('fs');
var path = require('path');

var blogPostsPath = path.join(__dirname, '..', 'components', 'resources', 'blog-posts.json');
var publicBlogDir = path.join(__dirname, '..', 'public', 'blog');

var posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));
var files = fs.readdirSync(publicBlogDir);
var fileSet = {};
files.forEach(function(f) { fileSet[f] = true; });

var missing = [];
var found = 0;

posts.forEach(function(post, i) {
    var imgPath = post.image;
    var filename = imgPath.replace('/blog/', '');
    if (fileSet[filename]) {
        found++;
    } else {
        missing.push({
            index: i,
            title: post.title,
            slug: post.slug,
            expectedFile: filename
        });
    }
});

console.log('Found: ' + found + '/' + posts.length);
console.log('Missing: ' + missing.length);
console.log('');
missing.forEach(function(m) {
    console.log('MISSING #' + m.index + ': ' + m.title);
    console.log('  Slug: ' + m.slug);
    console.log('  Expected file: ' + m.expectedFile);
    console.log('');
});
