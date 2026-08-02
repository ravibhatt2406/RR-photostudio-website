import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const targetVideoDir = path.join(rootDir, 'src', 'assets', 'portfolio', 'videos');
const rawVideoDir = path.join(rootDir, 'portfolio', 'vedio');

if (!fs.existsSync(targetVideoDir)) {
  fs.mkdirSync(targetVideoDir, { recursive: true });
}

// Clean old files
const existingFiles = fs.readdirSync(targetVideoDir);
existingFiles.forEach(file => {
  const fp = path.join(targetVideoDir, file);
  if (fs.statSync(fp).isFile()) {
    fs.unlinkSync(fp);
  }
});

const sourceFiles = fs.existsSync(rawVideoDir) ? fs.readdirSync(rawVideoDir) : [];

console.log('--- Starting Web Video Optimization for Vercel (< 50MB total) ---');

sourceFiles.forEach((file) => {
  if (path.extname(file).toLowerCase() === '.mp4') {
    const inputPath = path.join(rawVideoDir, file);
    const cleanFileName = file.replace(/[^a-zA-Z0-9._-]/g, '_');
    const outputPath = path.join(targetVideoDir, cleanFileName);

    console.log(`Compressing ${file} for web deployment...`);

    try {
      const cmd = `ffmpeg -y -i "${inputPath}" -vf "scale='min(960,iw)':-2" -c:v libx264 -crf 34 -preset fast -b:v 500k -maxrate 750k -bufsize 1000k -c:a aac -b:a 96k "${outputPath}"`;
      execSync(cmd, { stdio: 'inherit' });

      if (fs.existsSync(outputPath)) {
        const newStat = fs.statSync(outputPath);
        const newMB = (newStat.size / (1024 * 1024)).toFixed(2);
        console.log(`Optimized ${cleanFileName}: ${newMB} MB`);
      }
    } catch (err) {
      console.error(`Failed to compress ${file}:`, err.message);
    }
  }
});

let totalSize = 0;
fs.readdirSync(targetVideoDir).forEach(f => {
  const s = fs.statSync(path.join(targetVideoDir, f)).size;
  totalSize += s;
});
console.log(`--- Optimization Complete. Total videos folder size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB ---`);
