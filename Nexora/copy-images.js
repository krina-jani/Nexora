const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\23f4d73b-0b8d-4062-a0da-985263e5b5e9';
const destDir = 'src\\assets';

const files = fs.readdirSync(srcDir);
const targets = ['rpo_service', 'career_support', 'career_growth', 'pro_services', 'custom_services'];

targets.forEach(target => {
  const match = files.find(f => f.startsWith(target) && f.endsWith('.png'));
  if (match) {
    fs.copyFileSync(path.join(srcDir, match), path.join(destDir, `${target}.png`));
    console.log(`Copied ${target}`);
  }
});
