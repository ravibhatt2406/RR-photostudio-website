import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const sourceVideoDir = path.join(rootDir, 'portfolio', 'vedio');
const targetVideoDir = path.join(rootDir, 'src', 'assets', 'portfolio', 'videos');

if (!fs.existsSync(targetVideoDir)) {
  fs.mkdirSync(targetVideoDir, { recursive: true });
}

if (!fs.existsSync(sourceVideoDir)) {
  console.log('Source video directory portfolio/vedio does not exist.');
  process.exit(0);
}

const files = fs.readdirSync(sourceVideoDir);

console.log('--- Starting Web Video Compression & Sync ---');

files.forEach((file) => {
  if (path.extname(file).toLowerCase() === '.mp4') {
    const inputPath = path.join(sourceVideoDir, file);
    // Sanitize filename for clean web URL and git tracking
    const cleanFileName = file.replace(/[^a-zA-Z0-9._-]/g, '_');
    const outputPath = path.join(targetVideoDir, cleanFileName);

    const inputStat = fs.statSync(inputPath);
    const inputMB = (inputStat.size / (1024 * 1024)).toFixed(2);

    if (fs.existsSync(outputPath)) {
      const outputStat = fs.statSync(outputPath);
      const outputMB = (outputStat.size / (1024 * 1024)).toFixed(2);
      if (outputStat.size < 80 * 1024 * 1024) {
        console.log(`Skipping already compressed ${cleanFileName} (${outputMB} MB).`);
        return;
      }
    }

    console.log(`Compressing ${file} (${inputMB} MB) -> ${cleanFileName}...`);

    try {
      const cmd = `ffmpeg -y -i "${inputPath}" -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k "${outputPath}"`;
      execSync(cmd, { stdio: 'inherit' });

      if (fs.existsSync(outputPath)) {
        const newStat = fs.statSync(outputPath);
        const newMB = (newStat.size / (1024 * 1024)).toFixed(2);
        console.log(`Successfully compressed ${file} to ${newMB} MB`);
      }
    } catch (err) {
      console.error(`Failed to compress ${file}:`, err.message);
    }
  }
});

console.log('--- Video Compression & Sync Complete ---');
