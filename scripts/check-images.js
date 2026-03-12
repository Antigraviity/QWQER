var fs = require('fs');
var path = require('path');

var blogPostsPath = path.join(__dirname, '..', 'components', 'resources', 'blog-posts.json');
var publicBlogDir = path.join(__dirname, '..', 'public', 'blog');

var posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));
var files = fs.readdirSync(publicBlogDir);
var fileSet = {};
files.forEach(function(f) { fileSet[f] = true; });

var missing = [];
var found = [];

posts.forEach(function(post, i) {
    var imgPath = post.image; // e.g. /blog/some-slug.webp
    var filename = imgPath.replace('/blog/', '');
    if (fileSet[filename]) {
        found.push(filename);
    } else {
        // Try to find a matching file
        var slug = post.slug;
        var candidates = files.filter(function(f) {
            return f.indexOf(slug.substring(0, 20)) > -1;
        });
        missing.push({
            index: i,
            title: post.title,
            slug: post.slug,
            expectedFile: filename,
            candidates: candidates
        });
    }
});

console.log('Found: ' + found.length + '/' + posts.length);
console.log('Missing: ' + missing.length);
console.log('');
missing.forEach(function(m) {
    console.log('MISSING #' + m.index + ': ' + m.title);
    console.log('  Expected: ' + m.expectedFile);
    console.log('  Candidates: ' + JSON.stringify(m.candidates));
    console.log('');
});
