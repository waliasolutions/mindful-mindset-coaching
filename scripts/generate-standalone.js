
// Script to generate standalone HTML, CSS, and JS files
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure the build directory exists
const buildDir = path.resolve(__dirname, '../build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

try {
  console.log('🔄 Starting standalone generation process...');
  
  // Step 1: Run the build standalone script
  console.log('🔄 Setting up directory structure and base files...');
  execSync('npx ts-node src/utils/buildStandalone.ts', { stdio: 'inherit' });
  
  // Step 2: Generate HTML from React components
  console.log('🔄 Generating HTML from React components...');
  execSync('npx ts-node -e "require(\'./src/utils/generateStandaloneHTML\').generateHTML()"', { stdio: 'inherit' });
  
  // Step 3: Extract CSS from React components
  console.log('🔄 Extracting CSS from React components...');
  execSync('npx ts-node -e "require(\'./src/utils/extractCSSFromReact\').extractCSS()"', { stdio: 'inherit' });
  
  // Step 4: Convert React logic to vanilla JS
  console.log('🔄 Converting React logic to vanilla JavaScript...');
  execSync('npx ts-node -e "require(\'./src/utils/convertReactToVanillaJS\').convertToVanillaJS()"', { stdio: 'inherit' });
  
  console.log('✅ Standalone generation completed successfully!');
  console.log(`📂 Standalone files are available in: ${path.resolve(buildDir, 'standalone')}`);
} catch (error) {
  console.error('❌ Error generating standalone files:', error);
  process.exit(1);
}
