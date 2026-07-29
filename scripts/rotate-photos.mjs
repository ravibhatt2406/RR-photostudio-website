import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const rootPortfolioDir = path.join(rootDir, 'portfolio');
const srcPortfolioDir = path.join(rootDir, 'src', 'assets', 'portfolio');

const categories = ['candid', 'cinematic', 'baby-shower', 'haldi-mehendi'];

// Ensure target directories exist
categories.forEach(cat => {
  fs.mkdirSync(path.join(srcPortfolioDir, cat), { recursive: true });
});
fs.mkdirSync(path.join(srcPortfolioDir, 'rotate'), { recursive: true });
fs.mkdirSync(path.join(srcPortfolioDir, 'videos'), { recursive: true });

async function processImage(inputPath, outputPath, rotateDegrees = 0) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    if (ext === '.cr3') {
      console.log(`Skipping raw file: ${path.basename(inputPath)}`);
      return false;
    }

    let pipeline = sharp(inputPath);

    if (rotateDegrees !== 0) {
      pipeline = pipeline.rotate(rotateDegrees);
    } else {
      // Auto rotate based on EXIF if present
      pipeline = pipeline.rotate();
    }

    // Resize to max 1920px width/height for web optimization while preserving aspect ratio
    await pipeline
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    console.log(`Processed: ${path.basename(inputPath)} -> ${path.relative(rootDir, outputPath)}`);
    return true;
  } catch (err) {
    console.error(`Error processing ${path.basename(inputPath)}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('--- Starting Portfolio Processing Script ---');

  // 1. Process files in src/assets/portfolio/rotate/ or root portfolio/photos rotate/
  const rotateSources = [
    path.join(srcPortfolioDir, 'rotate'),
    path.join(rootPortfolioDir, 'photos rotate')
  ];

  let rotateCount = 0;
  for (const dir of rotateSources) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isFile()) {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            const cat = categories[rotateCount % categories.length];
            const outName = `rotated_${rotateCount + 1}.jpg`;
            const outPath = path.join(srcPortfolioDir, cat, outName);
            const success = await processImage(fullPath, outPath, -90);
            if (success) {
              rotateCount++;
              if (dir === path.join(srcPortfolioDir, 'rotate')) {
                try { fs.unlinkSync(fullPath); } catch (e) {}
              }
            }
          }
        }
      }
    }
  }

  // 2. Process root portfolio/photos/
  const mainPhotosDir = path.join(rootPortfolioDir, 'photos');
  if (fs.existsSync(mainPhotosDir)) {
    const files = fs.readdirSync(mainPhotosDir);
    let photoCount = 0;
    for (const file of files) {
      const fullPath = path.join(mainPhotosDir, file);
      if (fs.statSync(fullPath).isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          const cat = categories[photoCount % categories.length];
          const cleanName = file.replace(/[^a-zA-Z0-9._-]/g, '_');
          const outName = `photo_${photoCount + 1}.jpg`;
          const outPath = path.join(srcPortfolioDir, cat, outName);
          const success = await processImage(fullPath, outPath, 0);
          if (success) {
            photoCount++;
          }
        }
      }
    }
  }

  // 3. Process root portfolio/vedio/ to src/assets/portfolio/videos/
  const videoDir = path.join(rootPortfolioDir, 'vedio');
  if (fs.existsSync(videoDir)) {
    const files = fs.readdirSync(videoDir);
    for (const file of files) {
      const fullPath = path.join(videoDir, file);
      if (fs.statSync(fullPath).isFile() && path.extname(file).toLowerCase() === '.mp4') {
        const outPath = path.join(srcPortfolioDir, 'videos', file);
        if (!fs.existsSync(outPath)) {
          console.log(`Copying video: ${file}`);
          fs.copyFileSync(fullPath, outPath);
        }
      }
    }
  }

  // 4. Ensure rotate folder is emptied
  const rotateDir = path.join(srcPortfolioDir, 'rotate');
  if (fs.existsSync(rotateDir)) {
    const files = fs.readdirSync(rotateDir);
    for (const file of files) {
      try { fs.unlinkSync(path.join(rotateDir, file)); } catch (e) {}
    }
  }

  console.log('--- Portfolio Processing Complete ---');
}

main();
