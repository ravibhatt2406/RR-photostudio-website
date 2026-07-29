import React, { useState, useEffect, useRef } from "react";

// Dynamically import all images from src/assets/portfolio subfolders
const imageModules = import.meta.glob('/src/assets/portfolio/**/*.{jpg,jpeg,png,webp}', { eager: true });
const allImageUrls: string[] = Object.values(imageModules).map((mod: any) => mod.default || mod);

const GRID_CELL_COUNT = 12; // 3 rows of 4 on desktop, 6 rows of 2 on mobile

interface CellState {
  currentUrl: string;
  nextUrl: string | null;
  isFading: boolean;
}

export const LivingGallery: React.FC = () => {
  const [cells, setCells] = useState<CellState[]>([]);
  const recentUrlsRef = useRef<Set<string>>(new Set());

  // Helper to pick a random item from array excluding specific items
  const getRandomImage = (excludeSet: Set<string>): string => {
    const available = allImageUrls.filter((url) => !excludeSet.has(url));
    if (available.length === 0) {
      // Fallback if all are excluded
      return allImageUrls[Math.floor(Math.random() * allImageUrls.length)];
    }
    return available[Math.floor(Math.random() * available.length)];
  };

  // Initialize cells on mount
  useEffect(() => {
    if (allImageUrls.length === 0) return;

    const initialSet = new Set<string>();
    const initialCells: CellState[] = [];

    for (let i = 0; i < Math.min(GRID_CELL_COUNT, allImageUrls.length); i++) {
      const url = getRandomImage(initialSet);
      initialSet.add(url);
      recentUrlsRef.current.add(url);
      initialCells.push({
        currentUrl: url,
        nextUrl: null,
        isFading: false,
      });
    }

    setCells(initialCells);
  }, []);

  // Interval for living gallery cell swapping
  useEffect(() => {
    if (allImageUrls.length <= GRID_CELL_COUNT) return;

    const interval = setInterval(() => {
      if (document.visibilityState !== "visible") return;

      setCells((prevCells) => {
        if (prevCells.length === 0) return prevCells;

        const currentVisibleUrls = new Set(prevCells.map((c) => c.currentUrl));
        const numToSwap = Math.min(3, prevCells.length);

        // Pick numToSwap random distinct cell indices
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

          const newUrl = getRandomImage(excludeSet);

          // Update recent URLs history (keep last ~15 images)
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

  if (allImageUrls.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading living photo gallery...
      </div>
    );
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
