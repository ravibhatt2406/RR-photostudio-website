export interface PhotoItem {
  src: string;
  categoryFolder: string;
  categoryLabel: string;
  filename: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  count: number;
}

export interface PortfolioDataReport {
  categoriesFoundCount: number;
  imagesFoundCount: number;
  categoriesDetected: string[];
  missingImages: string[];
  duplicateImages: string[];
  brokenImports: string[];
  invalidPaths: string[];
}

const IGNORED_FOLDERS = new Set(["rotate", "videos"]);

/**
 * Formats folder names into human-readable category labels.
 * Examples:
 * - "haldi-mehendi" -> "Haldi & Mehendi"
 * - "baby-shower" -> "Baby Shower"
 * - "pre-wedding" -> "Pre Wedding"
 */
export const formatCategoryLabel = (folderName: string): string => {
  if (!folderName) return "";
  if (folderName.toLowerCase() === "haldi-mehendi") {
    return "Haldi & Mehendi";
  }
  return folderName
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Eager glob import of all supported image files under src/assets/portfolio
const photoModules = import.meta.glob(
  "/src/assets/portfolio/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

const loadPortfolioData = () => {
  const photoList: PhotoItem[] = [];
  const categoryMap = new Map<string, number>();
  const seenSrcSet = new Set<string>();
  
  const missingImages: string[] = [];
  const duplicateImages: string[] = [];
  const brokenImports: string[] = [];
  const invalidPaths: string[] = [];

  Object.entries(photoModules).forEach(([pathStr, mod]: [string, any]) => {
    const src = mod?.default || mod;

    if (!src || typeof src !== "string") {
      brokenImports.push(pathStr);
      return;
    }

    if (seenSrcSet.has(src)) {
      duplicateImages.push(pathStr);
      return;
    }

    const parts = pathStr.split("/");
    const portIdx = parts.indexOf("portfolio");

    if (portIdx === -1 || portIdx >= parts.length - 2) {
      invalidPaths.push(pathStr);
      return;
    }

    const categoryFolder = parts[portIdx + 1];

    if (IGNORED_FOLDERS.has(categoryFolder) || categoryFolder.startsWith(".")) {
      return;
    }

    const filename = parts[parts.length - 1];

    seenSrcSet.add(src);

    photoList.push({
      src,
      categoryFolder,
      categoryLabel: formatCategoryLabel(categoryFolder),
      filename,
    });

    categoryMap.set(
      categoryFolder,
      (categoryMap.get(categoryFolder) || 0) + 1
    );
  });

  const PREFERRED_ORDER = ["candid", "traditional", "haldi-mehendi"];

  const categories: CategoryItem[] = Array.from(categoryMap.entries())
    .map(([id, count]) => ({
      id,
      label: formatCategoryLabel(id),
      count,
    }))
    .sort((a, b) => {
      const idxA = PREFERRED_ORDER.indexOf(a.id);
      const idxB = PREFERRED_ORDER.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.label.localeCompare(b.label);
    });

  const report: PortfolioDataReport = {
    categoriesFoundCount: categories.length,
    imagesFoundCount: photoList.length,
    categoriesDetected: categories.map((c) => c.label),
    missingImages,
    duplicateImages,
    brokenImports,
    invalidPaths,
  };

  return {
    photos: photoList,
    categories,
    allImageUrls: photoList.map((p) => p.src),
    report,
  };
};

const portfolioData = loadPortfolioData();

export const portfolioPhotos = portfolioData.photos;
export const portfolioCategories = portfolioData.categories;
export const allPortfolioUrls = portfolioData.allImageUrls;
export const portfolioReport = portfolioData.report;

if (typeof window !== "undefined") {
  console.log(
    `[PortfolioLoader] Loaded ${portfolioReport.imagesFoundCount} images across ${portfolioReport.categoriesFoundCount} categories:`,
    portfolioReport.categoriesDetected.join(", ")
  );
  if (portfolioReport.duplicateImages.length > 0) {
    console.warn(`[PortfolioLoader] Duplicates:`, portfolioReport.duplicateImages);
  }
  if (portfolioReport.brokenImports.length > 0) {
    console.warn(`[PortfolioLoader] Broken imports:`, portfolioReport.brokenImports);
  }
}
