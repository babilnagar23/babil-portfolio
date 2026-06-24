const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/favicon.png');
const appDir = path.join(__dirname, '../src/app');
const publicDir = path.join(__dirname, '../public');

async function generateIcons() {
  if (!fs.existsSync(inputFile)) {
    console.error('Input file not found at:', inputFile);
    return;
  }

  try {
    // Generate favicons in public dir
    await sharp(inputFile).resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'));
    await sharp(inputFile).resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'));
    await sharp(inputFile).resize(48, 48).toFile(path.join(publicDir, 'favicon-48x48.png'));
    
    // Apple touch icon
    await sharp(inputFile).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    // OG Image and Twitter image
    await sharp(inputFile).resize(1200, 630, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } }).toFile(path.join(appDir, 'opengraph-image.png'));
    await sharp(inputFile).resize(1200, 630, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } }).toFile(path.join(appDir, 'twitter-image.png'));
    
    // We will just use public/favicon.png directly as the standard favicon since browsers support PNG favicons.
    // Or we can just copy it to favicon.ico if we want, but PNG works best.
    fs.copyFileSync(inputFile, path.join(publicDir, 'favicon.ico'));

    // Create a copy in public/avatar.png to use in components
    fs.copyFileSync(inputFile, path.join(publicDir, 'avatar.png'));

    console.log('Successfully generated icons and OG images.');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
