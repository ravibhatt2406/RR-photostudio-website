import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Film } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { portfolioPhotos, portfolioCategories } from "@/lib/portfolio";

// Dynamic Video Glob Import
const videoModules = import.meta.glob(
  "/src/assets/portfolio/videos/*.{mp4,MP4}",
  { eager: true }
);
const videoList = Object.entries(videoModules).map(([path, mod]: [string, any]) => {
  const filename = path.split("/").pop() || "";
  return {
    src: mod.default || mod,
    filename,
  };
});

const videoTitles = [
  { title: "A Royal Promise", location: "City Palace, Udaipur" },
  { title: "Lakeside Reverie", location: "Lake Pichola Heritage" },
  { title: "Timeless Highlights", location: "Fateh Garh Palace" },
  { title: "Eternal Vows", location: "Jagmandir Island Palace" },
  { title: "Haldi & Mehendi Festivities", location: "The Leela Palace" },
  { title: "Candid Pre-Wedding", location: "Udaivilas Grounds" },
  { title: "Symphony of Hearts", location: "Chittorgarh Fort" },
  { title: "Forever & Always", location: "Sunset Serenade" },
];

const Gallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const photos = portfolioPhotos;
  const categories = portfolioCategories;

  useEffect(() => {
    document.title = "Gallery | RR Wedding Filmer | Wedding Photographer in Udaipur";
  }, []);

  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredPhotos = useMemo(() => {
    if (activeTab === "all") return photos;
    return photos.filter((p) => p.categoryFolder === activeTab);
  }, [photos, activeTab]);

  // Lightbox Navigation
  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredPhotos.length - 1
    );
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! < filteredPhotos.length - 1 ? prev! + 1 : 0
    );
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "Escape") setSelectedPhotoIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4">
              Our Full Gallery
            </h1>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore our complete high-resolution collection of candid wedding moments,
              cinematic portraits, haldi & mehendi celebrations, and baby showers.
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
            <div className="flex justify-center overflow-x-auto pb-2">
              <TabsList className="bg-secondary/80 p-1.5 rounded-full border border-border/60 gap-1 h-auto">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-gradient-gold data-[state=active]:text-foreground data-[state=active]:shadow-md"
                >
                  All Work ({photos.length})
                </TabsTrigger>
                {categories.map((cat) => {
                  const count = photos.filter((p) => p.categoryFolder === cat.id).length;
                  return (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-gradient-gold data-[state=active]:text-foreground data-[state=active]:shadow-md"
                    >
                      {cat.label} ({count})
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Photo Grid - All Work */}
            <TabsContent value="all" className="mt-8">
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid bg-secondary/30 border border-border/50 hover:border-gold/60 transition-all duration-300 shadow-sm hover:shadow-xl"
                  >
                    <img
                      src={photo.src}
                      alt={`RR Wedding Filmer - ${photo.categoryLabel}`}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-xs font-semibold text-gold tracking-wide uppercase">
                        {photo.categoryLabel}
                      </span>
                      <p className="text-xs text-white/80 mt-1 font-medium">Click to view full size</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Photo Grid - Per Category */}
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-8">
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {photos
                    .filter((p) => p.categoryFolder === cat.id)
                    .map((photo, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedPhotoIndex(filteredPhotos.indexOf(photo))}
                        className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid bg-secondary/30 border border-border/50 hover:border-gold/60 transition-all duration-300 shadow-sm hover:shadow-xl"
                      >
                        <img
                          src={photo.src}
                          alt={`RR Wedding Filmer - ${photo.categoryLabel}`}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <span className="text-xs font-semibold text-gold tracking-wide uppercase">
                            {photo.categoryLabel}
                          </span>
                          <p className="text-xs text-white/80 mt-1 font-medium">Click to view full size</p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Films Section */}
          <div className="mt-24 pt-16 border-t border-border">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 rounded-full mb-3 border border-gold/20">
                <Film className="w-4 h-4 text-gold" />
                <span className="text-xs font-semibold text-gold tracking-wider uppercase">Cinematic Films</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Wedding Films & Teasers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoList.map((video, idx) => {
                const meta = videoTitles[idx % videoTitles.length];
                return (
                  <div
                    key={idx}
                    className="bg-card rounded-2xl overflow-hidden border border-border hover:border-gold/40 shadow-md transition-all duration-300 group"
                  >
                    <div className="relative aspect-video bg-black">
                      <video
                        src={video.src}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="font-serif text-xl font-bold text-foreground">
                        {meta.title}
                      </h3>
                      <p className="text-sm text-gold font-medium mt-1">
                        {meta.location}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Dialog */}
      {selectedPhotoIndex !== null && (
        <Dialog open={selectedPhotoIndex !== null} onOpenChange={() => setSelectedPhotoIndex(null)}>
          <DialogOverlay className="bg-black/95 backdrop-blur-md" />
          <DialogContent className="max-w-6xl w-[95vw] h-[90vh] bg-transparent border-none p-0 flex flex-col items-center justify-center shadow-none focus:outline-none">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-black/60 hover:bg-gold hover:text-black rounded-full transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Arrow */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-black/60 hover:bg-gold hover:text-black rounded-full transition-all"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-black/60 hover:bg-gold hover:text-black rounded-full transition-all"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Preview Container */}
            <div className="relative max-w-full max-h-[82vh] flex items-center justify-center overflow-hidden">
              <img
                src={filteredPhotos[selectedPhotoIndex].src}
                alt={filteredPhotos[selectedPhotoIndex].categoryLabel}
                className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image Footer Info */}
            <div className="mt-4 text-center text-white/90">
              <span className="inline-block px-3 py-1 bg-gold text-foreground text-xs font-semibold rounded-full mb-1">
                {filteredPhotos[selectedPhotoIndex].categoryLabel}
              </span>
              <p className="text-xs text-white/70">
                {selectedPhotoIndex + 1} of {filteredPhotos.length}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
