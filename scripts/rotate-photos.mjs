import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';

const rootDir = process.cwd();
const rootPortfolioDir = path.join(rootDir, 'portfolio');
const srcPortfolioDir = path.join(rootDir, 'src', 'assets', 'portfolio');

function slugifyFolder(folderName) {
  if (folderName.toLowerCase().includes('haldi')) return 'haldi-mehendi';
  return folderName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function processImage(inputPath, outputPath, rotateDegrees = 0) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    if (ext === '.cr3') return false;

    let pipeline = sharp(inputPath);
    if (rotateDegrees !== 0) {
      pipeline = pipeline.rotate(rotateDegrees);
    } else {
      pipeline = pipeline.rotate();
    }

    await pipeline
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    return true;
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('--- Starting Portfolio Processing Script ---');

  const mainPhotosDir = path.join(rootPortfolioDir, 'photos');
  if (fs.existsSync(mainPhotosDir)) {
    const subdirs = fs.readdirSync(mainPhotosDir);

    // 1. Process specific category folders
    for (const sd of subdirs) {
      if (sd === 'all photos') continue;
      const sdPath = path.join(mainPhotosDir, sd);
      if (fs.statSync(sdPath).isDirectory()) {
        const catSlug = slugifyFolder(sd);
        const targetDir = path.join(srcPortfolioDir, catSlug);
        fs.mkdirSync(targetDir, { recursive: true });

        const files = fs.readdirSync(sdPath);
        let count = 0;
        for (const file of files) {
          const filePath = path.join(sdPath, file);
          if (fs.statSync(filePath).isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
              const cleanName = path.parse(file).name.replace(/[^a-zA-Z0-9._-]/g, '_') + '.jpg';
              const outPath = path.join(targetDir, cleanName);
              if (!fs.existsSync(outPath)) {
                const ok = await processImage(filePath, outPath, 0);
                if (ok) count++;
              }
            }
          }
        }
        console.log(`Category '${sd}' -> '${catSlug}': ${count} new images processed.`);
      }
    }
  }

  // 1b. Process Pre Wedding folder if present directly in root portfolio
  const preWeddingNames = ['Pre Wedding', 'pre-wedding', 'Pre-Wedding'];
  for (const pwName of preWeddingNames) {
    const pwDir = path.join(rootPortfolioDir, pwName);
    if (fs.existsSync(pwDir) && fs.statSync(pwDir).isDirectory()) {
      const targetDir = path.join(srcPortfolioDir, 'pre-wedding');
      fs.mkdirSync(targetDir, { recursive: true });

      const files = fs.readdirSync(pwDir);
      let count = 0;
      for (const file of files) {
        const filePath = path.join(pwDir, file);
        if (fs.statSync(filePath).isFile()) {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            const cleanName = path.parse(file).name.replace(/[^a-zA-Z0-9._-]/g, '_') + '.jpg';
            const outPath = path.join(targetDir, cleanName);
            if (!fs.existsSync(outPath)) {
              const ok = await processImage(filePath, outPath, 0);
              if (ok) count++;
            }
          }
        }
      }
      console.log(`Pre-wedding photos from '${pwName}': ${count} new images processed into 'pre-wedding'.`);
    }
  }

  // 2. Process rotated candid photos if present
  const rotateDir = path.join(rootPortfolioDir, 'candid photos rotate');
  if (fs.existsSync(rotateDir)) {
    const targetDir = path.join(srcPortfolioDir, 'candid');
    fs.mkdirSync(targetDir, { recursive: true });
    const files = fs.readdirSync(rotateDir);
    let rCount = 0;
    for (const file of files) {
      const filePath = path.join(rotateDir, file);
      if (fs.statSync(filePath).isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          const outPath = path.join(targetDir, `rotated_${rCount + 1}.jpg`);
          if (!fs.existsSync(outPath)) {
            const ok = await processImage(filePath, outPath, -90);
            if (ok) rCount++;
          }
        }
      }
    }
    console.log(`Processed ${rCount} rotated candid photos into 'candid'.`);
  }

  // 3. Deduplicate images per category by hash
  if (fs.existsSync(srcPortfolioDir)) {
    const categories = fs.readdirSync(srcPortfolioDir);
    let totalDeleted = 0;
    categories.forEach(cat => {
      const dir = path.join(srcPortfolioDir, cat);
      if (cat !== 'videos' && cat !== 'rotate' && fs.statSync(dir).isDirectory()) {
        const seenHashes = new Set();
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const fp = path.join(dir, file);
          if (fs.statSync(fp).isFile()) {
            const h = crypto.createHash('md5').update(fs.readFileSync(fp)).digest('hex');
            if (seenHashes.has(h)) {
              fs.unlinkSync(fp);
              totalDeleted++;
            } else {
              seenHashes.add(h);
            }
          }
        });
      }
    });
    if (totalDeleted > 0) {
      console.log(`Deduplicated portfolio images. Removed ${totalDeleted} duplicates.`);
    }
  }

  console.log('--- Portfolio Processing Complete ---');
}

main();
