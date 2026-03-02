const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const iconConfigs = [
  { name: 'favicon.png', size: 32 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

const inputSvg = path.join(__dirname, '../public/icon.svg');
const outputDir = path.join(__dirname, '../public');

async function generateFavicon() {
  console.log('🎨 Generating favicon files...');

  for (const { name, size } of iconConfigs) {
    try {
      console.log(`  📦 Creating ${name} (${size}x${size})`);
      await sharp(inputSvg)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 10, g: 10, b: 10, alpha: 1 }
        })
        .png()
        .toFile(path.join(outputDir, name));
    } catch (error) {
      console.error(`  ❌ Error creating ${name}:`, error.message);
    }
  }

  console.log('✅ Favicon files generated successfully!');
  console.log('\n📝 Note: For favicon.ico, you can use an online converter:');
  console.log('   https://favicon.io/favicon-converter/');
  console.log('   Upload the icon.png (32x32) to generate favicon.ico');
}

generateFavicon().catch(console.error);