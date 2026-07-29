import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const videoDir = path.join(process.cwd(), 'src', 'assets', 'portfolio', 'videos');

if (!fs.existsSync(videoDir)) {
  console.log('Video directory does not exist.');
  process.exit(0);
}

const files = fs.readdirSync(videoDir);

console.log('--- Starting Video Compression for Web ---');

files.forEach((file) => {
  if (path.extname(file).toLowerCase() === '.mp4') {
    const filePath = path.join(videoDir, file);
    const stat = fs.statSync(filePath);
    const sizeMB = stat.size / (1024 * 1024);

    console.log(`Checking ${file}: ${sizeMB.toFixed(2)} MB`);

    if (sizeMB > 25) {
      console.log(`Compressing ${file} for web...`);
      const tempPath = path.join(videoDir, `temp_${file}`);

      try {
        // Compress using ffmpeg: H.264, AAC, 720p/1080p, CRF 26 for high visual quality & small file size
        const cmd = `ffmpeg -y -i "${filePath}" -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 128k "${tempPath}"`;
        execSync(cmd, { stdio: 'inherit' });

        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(filePath);
          fs.renameSync(tempPath, filePath);
          const newStat = fs.statSync(filePath);
          console.log(`Successfully compressed ${file}: ${(newStat.size / (1024 * 1024)).toFixed(2)} MB`);
        }
      } catch (err) {
        console.error(`Failed to compress ${file}:`, err.message);
        if (fs.existsSync(tempPath)) {
          try { fs.unlinkSync(tempPath); } catch (e) {}
        }
      }
    } else {
      console.log(`${file} is already under 25MB.`);
    }
  }
});

console.log('--- Video Compression Complete ---');
