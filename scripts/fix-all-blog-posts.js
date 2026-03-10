var fs = require('fs');
var path = require('path');

var blogPostsPath = path.join(__dirname, '..', 'components', 'resources', 'blog-posts.json');
var blogDataPath = path.join(__dirname, '..', 'app', 'api', 'seed-all-blogs', 'blog-data.json');
var publicBlogDir = path.join(__dirname, '..', 'public', 'blog');

var posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));
var seedData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
var files = fs.readdirSync(publicBlogDir).filter(function(f) { return f.endsWith('.webp'); });

var fileSet = {};
files.forEach(function(f) { fileSet[f] = true; });

// Build multiple lookup maps from seed data
var seedByTitle = {};
var seedBySlug = {};
seedData.forEach(function(s) {
    var slug = s.slug;
    if (slug.indexOf('post/') === 0) slug = slug.slice(5);
    seedByTitle[s.title.toLowerCase().trim()] = slug;
    seedBySlug[slug] = true;
    // Also index by partial title words
});

// All actual file stems (without .webp)
var allStems = files.map(function(f) { return f.replace('.webp', ''); });

function findBestMatch(slug, title) {
    // 1. Exact match
    if (fileSet[slug + '.webp']) return slug;
    
    // 2. Match from seed data by title
    var seedSlug = seedByTitle[title.toLowerCase().trim()];
    if (seedSlug && fileSet[seedSlug + '.webp']) return seedSlug;
    
    // 3. Remove trailing number suffix and try
    var cleanSlug = slug.replace(/-\d+$/, '');
    if (fileSet[cleanSlug + '.webp']) return cleanSlug;
    
    // 4. Find stem where cleanSlug is a prefix
    var prefixMatches = allStems.filter(function(s) {
        return s.indexOf(cleanSlug) === 0;
    });
    if (prefixMatches.length === 1) return prefixMatches[0];
    
    // 5. Find stem where slug words overlap significantly
    var slugWords = cleanSlug.split('-');
    var bestMatch = null;
    var bestScore = 0;
    allStems.forEach(function(stem) {
        var stemWords = stem.split('-');
        var overlap = 0;
        slugWords.forEach(function(w) {
            if (w.length > 2 && stemWords.indexOf(w) > -1) overlap++;
        });
        var score = overlap / Math.max(slugWords.length, 1);
        if (score > bestScore && score >= 0.6) {
            bestScore = score;
            bestMatch = stem;
        }
    });
    if (bestMatch) return bestMatch;
    
    // 6. Try matching by title words against filenames
    var titleWords = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    bestMatch = null;
    bestScore = 0;
    allStems.forEach(function(stem) {
        var overlap = 0;
        titleWords.forEach(function(w) {
            if (w.length > 2 && stem.indexOf(w) > -1) overlap++;
        });
        var score = overlap / Math.max(titleWords.length, 1);
        if (score > bestScore && score >= 0.5) {
            bestScore = score;
            bestMatch = stem;
        }
    });
    if (bestMatch) return bestMatch;
    
    return null;
}

var fixedCount = 0;
var stillMissing = [];

posts.forEach(function(post, i) {
    var currentFile = post.image.replace('/blog/', '');
    if (fileSet[currentFile]) return; // already correct
    
    var match = findBestMatch(post.slug, post.title);
    if (match) {
        console.log('FIX #' + i + ': ' + post.title);
        console.log('  ' + post.slug + ' -> ' + match);
        post.slug = match;
        post.image = '/blog/' + match + '.webp';
        fixedCount++;
    } else {
        stillMissing.push({ index: i, title: post.title, slug: post.slug });
    }
});

fs.writeFileSync(blogPostsPath, JSON.stringify(posts, null, 2), 'utf8');

console.log('');
console.log('Fixed: ' + fixedCount);
if (stillMissing.length > 0) {
    console.log('Still missing: ' + stillMissing.length);
    stillMissing.forEach(function(m) {
        console.log('  #' + m.index + ': ' + m.title + ' (' + m.slug + ')');
    });
} else {
    console.log('All images matched!');
}
