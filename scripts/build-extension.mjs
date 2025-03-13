
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get directory name properly in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Check if vite is installed
console.log('Checking for Vite installation...');
try {
  // Try to get vite version to check if it's installed
  execSync('npx vite --version', { stdio: 'ignore' });
  console.log('Vite is already installed');
} catch (error) {
  console.log('Vite is not installed, installing it now...');
  try {
    execSync('npm install vite --save-dev', { stdio: 'inherit' });
    console.log('Vite installed successfully');
  } catch (installError) {
    console.error('Failed to install Vite:', installError.message);
    process.exit(1);
  }
}

// Run the Vite build with error handling
console.log('Building the app...');
try {
  // First check if @vitejs/plugin-react-swc is installed
  try {
    execSync('npm list @vitejs/plugin-react-swc', { stdio: 'ignore' });
  } catch (error) {
    console.log('@vitejs/plugin-react-swc is not installed, installing it now...');
    execSync('npm install @vitejs/plugin-react-swc --save-dev', { stdio: 'inherit' });
  }

  // Try the standard npm run build first
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.log('Standard build failed, trying with npx vite build...');
  try {
    // If that fails, try using npx to run vite directly
    execSync('npx vite build', { stdio: 'inherit' });
  } catch (innerError) {
    console.error('Build failed. Please ensure all required dependencies are installed.');
    console.error('Try running: npm install');
    process.exit(1);
  }
}

// Copy manifest.json to dist folder
console.log('Copying manifest.json to dist folder...');
const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
const manifestDestPath = path.join(distDir, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  fs.copyFileSync(manifestPath, manifestDestPath);
} else {
  console.warn('Warning: manifest.json not found in public folder');
}

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
  fs.writeFileSync(path.join(distDir, `icon${size}.svg`), svgContent);
  
  // For simplicity we're using SVG files directly
  // In a production environment, you might want to convert these to PNG
  fs.writeFileSync(path.join(distDir, `icon${size}.png`), svgContent);
});

console.log('Extension build complete! The extension is ready in the "dist" folder.');
