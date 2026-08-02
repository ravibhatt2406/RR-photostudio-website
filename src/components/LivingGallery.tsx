import React, { useState, useEffect, useRef } from "react";

// Fallback images directly imported to guarantee gallery is NEVER empty on any environment
import heroWedding from "@/assets/hero-wedding.jpg";
import portfolio1 from "@/assets/portfolio-new-1.jpg";
import portfolio2 from "@/assets/portfolio-new-2.jpg";
import portfolio3 from "@/assets/portfolio-new-3.jpg";
import portfolio4 from "@/assets/portfolio-new-4.jpg";
import portfolio5 from "@/assets/portfolio-new-5.jpg";

const staticFallbackImages = [
  heroWedding,
  portfolio1,
  portfolio2,
  portfolio3,
  portfolio4,
  portfolio5,
];

import { allPortfolioUrls } from "@/lib/portfolio";

const allImageUrls: string[] =
  allPortfolioUrls.length > 0 ? allPortfolioUrls : staticFallbackImages;

if (typeof window !== "undefined") {
  console.log(
    `[LivingGallery] Discovered ${allPortfolioUrls.length} unique portfolio images via portfolio loader.`
  );
  if (allPortfolioUrls.length === 0) {
    console.warn(
      `[LivingGallery] No portfolio images discovered via loader. Using ${staticFallbackImages.length} static fallback assets.`
    );
  }
}

const GRID_CELL_COUNT = 12; // 3 rows of 4 on desktop, 6 rows of 2 on mobile

interface CellState {
  currentUrl: string;
  nextUrl: string | null;
  isFading: boolean;
}

const getRandomImage = (urls: string[], excludeSet: Set<string>): string => {
  if (urls.length === 0) return "";
  const available = urls.filter((url) => !excludeSet.has(url));
  if (available.length === 0) {
    return urls[Math.floor(Math.random() * urls.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
};

const createInitialCells = (
  urls: string[],
  recentSet: Set<string>
): CellState[] => {
  if (urls.length === 0) return [];
  const initialSet = new Set<string>();
  const initialCells: CellState[] = [];
  const count = Math.min(GRID_CELL_COUNT, urls.length);

  for (let i = 0; i < count; i++) {
    const url = getRandomImage(urls, initialSet);
    initialSet.add(url);
    recentSet.add(url);
    initialCells.push({
      currentUrl: url,
      nextUrl: null,
      isFading: false,
    });
  }

  return initialCells;
};

export const LivingGallery: React.FC = () => {
  const recentUrlsRef = useRef<Set<string>>(new Set());

  const [cells, setCells] = useState<CellState[]>(() =>
    createInitialCells(allImageUrls, recentUrlsRef.current)
  );

  // Interval for living gallery cell swapping
  useEffect(() => {
    if (allImageUrls.length <= 1) return;

    const interval = setInterval(() => {
      if (document.visibilityState !== "visible") return;

      setCells((prevCells) => {
        if (prevCells.length === 0) return prevCells;

        const currentVisibleUrls = new Set(prevCells.map((c) => c.currentUrl));
        const numToSwap = Math.min(3, prevCells.length);

        const indicesToSwap: number[] = [];
        while (indicesToSwap.length < numToSwap) {
          const randomIndex = Math.floor(Math.random() * prevCells.length);
          if (!indicesToSwap.includes(randomIndex)) {
            indicesToSwap.push(randomIndex);
          }
        }

        const newCells = [...prevCells];

        indicesToSwap.forEach((cellIdx) => {
          const excludeSet = new Set([
            ...currentVisibleUrls,
            ...recentUrlsRef.current,
          ]);

          const newUrl = getRandomImage(allImageUrls, excludeSet);

          recentUrlsRef.current.add(newUrl);
          if (recentUrlsRef.current.size > 15) {
            const firstValue = Array.from(recentUrlsRef.current)[0];
            recentUrlsRef.current.delete(firstValue);
          }

          newCells[cellIdx] = {
            ...newCells[cellIdx],
            nextUrl: newUrl,
            isFading: true,
          };
        });

        return newCells;
      });

      // After opacity transition (~700ms), finish the swap
      setTimeout(() => {
        setCells((prevCells) =>
          prevCells.map((cell) => {
            if (cell.isFading && cell.nextUrl) {
              return {
                currentUrl: cell.nextUrl,
                nextUrl: null,
                isFading: false,
              };
            }
            return cell;
          })
        );
      }, 750);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  if (cells.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px]">
        {cells.map((cell, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl bg-secondary/50 shadow-md group cursor-pointer border border-border/40 hover:border-gold/50 transition-all duration-300"
          >
            {/* Current Image */}
            <img
              src={cell.currentUrl}
              alt={`Wedding photography in Udaipur - RR Wedding Filmer ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-750 ease-in-out group-hover:scale-105 transition-transform ${
                cell.isFading ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
            />

            {/* Next Image (Crossfading in) */}
            {cell.nextUrl && (
              <img
                src={cell.nextUrl}
                alt={`Wedding photography in Udaipur - RR Wedding Filmer ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-750 ease-in-out group-hover:scale-105 transition-transform ${
                  cell.isFading ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            )}

            {/* Subtle Gradient Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivingGallery;
