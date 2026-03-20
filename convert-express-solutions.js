const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'express-solutions');

async function convert() {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
    
    for (const file of files) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(dir, file.replace('.png', '.webp'));
        
        if (fs.existsSync(outputPath)) {
            console.log(`Skipping ${file} (webp already exists)`);
            continue;
        }
        
        await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath);
        
        const pngSize = (fs.statSync(inputPath).size / 1024).toFixed(0);
        const webpSize = (fs.statSync(outputPath).size / 1024).toFixed(0);
        console.log(`Converted ${file}: ${pngSize}KB -> ${webpSize}KB`);
    }
    
    console.log('\nDone! You can now delete the .png files if desired.');
}

convert().catch(console.error);
