
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run the Vite build
console.log('Building the app...');
execSync('npm run build', { stdio: 'inherit' });

// Create icon placeholder files
console.log('Creating extension icons...');
const iconSizes = [16, 48, 128];
const iconColors = {
  16: '#0A4B94',
  48: '#0A4B94',
  128: '#0A4B94',
};

// Function to create a simple colored square icon
const createIconSVG = (size, color) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="${color}" />
    <text x="${size/2}" y="${size/2 + 5}" font-family="Arial" font-size="${size/3}" 
    fill="white" text-anchor="middle">TM</text>
  </svg>`;
};

// Save icons to the dist directory
iconSizes.forEach(size => {
  const svgContent = createIconSVG(size, iconColors[size]);
  fs.writeFileSync(path.join('dist', `icon${size}.svg`), svgContent);
  
  // For simplicity we're using SVG files directly
  // In a production environment, you might want to convert these to PNG
  fs.writeFileSync(path.join('dist', `icon${size}.png`), svgContent);
});

console.log('Extension build complete! The extension is ready in the "dist" folder.');
