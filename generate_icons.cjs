const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, 'public', 'icon.svg');

async function generateIcons() {
  try {
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(__dirname, 'public', 'icon-192x192.png'));
    
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(__dirname, 'public', 'icon-512x512.png'));
      
    console.log('Icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

generateIcons();
