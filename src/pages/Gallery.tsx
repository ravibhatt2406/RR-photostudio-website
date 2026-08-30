import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Film, Play, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { portfolioPhotos, portfolioCategories } from "@/lib/portfolio";
import { videoList, VideoItem } from "@/lib/videos";

const Gallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const photos = portfolioPhotos;
  const categories = portfolioCategories;

  useEffect(() => {
    document.title = "Gallery | Pre-Wedding & Wedding Cinematography | RR Wedding Filmer Udaipur";
  }, []);

  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredPhotos = useMemo(() => {
    if (activeTab === "all") return photos;
    if (activeTab === "videos") return [];
    return photos.filter((p) => p.categoryFolder === activeTab);
  }, [photos, activeTab]);

  // Lightbox Navigation for Photos
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

  // Lock scroll when video lightbox or photo lightbox is active
  useEffect(() => {
    if (selectedPhotoIndex !== null || selectedVideo !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPhotoIndex, selectedVideo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex !== null) {
        if (e.key === "ArrowLeft") handlePrevPhoto();
        if (e.key === "ArrowRight") handleNextPhoto();
        if (e.key === "Escape") setSelectedPhotoIndex(null);
      }
      if (selectedVideo !== null) {
        if (e.key === "Escape") setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, selectedVideo, filteredPhotos]);

  const totalItemCount = photos.length + videoList.length;

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 rounded-full mb-4 border border-gold/20">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold text-gold tracking-wider uppercase">
                Visual Portfolio & Cinematography
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4">
              Our Full Gallery
            </h1>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore our complete collection of wedding photography, candid moments,
              pre-wedding shoots, and luxury wedding films in Udaipur & destination venues.
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
            <div className="flex justify-center overflow-x-auto pb-2 scrollbar-none">
              <TabsList className="bg-secondary/80 p-1.5 rounded-full border border-border/60 gap-1 h-auto flex-nowrap">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all whitespace-nowrap data-[state=active]:bg-gradient-gold data-[state=active]:text-foreground data-[state=active]:shadow-md"
                >
                  All Work ({totalItemCount})
                </TabsTrigger>
                {categories.map((cat) => {
                  const count = photos.filter((p) => p.categoryFolder === cat.id).length;
                  return (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="rounded-full px-6 py-2.5 text-sm font-medium transition-all whitespace-nowrap data-[state=active]:bg-gradient-gold data-[state=active]:text-foreground data-[state=active]:shadow-md"
                    >
                      {cat.label} ({count})
                    </TabsTrigger>
                  );
                })}
                <TabsTrigger
                  value="videos"
                  className="rounded-full px-6 py-2.5 text-sm font-medium transition-all whitespace-nowrap data-[state=active]:bg-gradient-gold data-[state=active]:text-foreground data-[state=active]:shadow-md"
                >
                  Videos ({videoList.length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Photo Grid - All Work */}
            <TabsContent value="all" className="mt-8">
              {photos.length === 0 && videoList.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-xl font-serif">More stories coming soon.</p>
                </div>
              ) : (
                <>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <span className="text-xs font-semibold text-gold tracking-wide uppercase">
                            {photo.categoryLabel}
                          </span>
                          <p className="text-xs text-white/80 mt-1 font-medium">Click to view full size</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section for Videos in All Work */}
                  {videoList.length > 0 && (
                    <div className="mt-20 pt-16 border-t border-border">
                      <div className="text-center max-w-2xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 rounded-full mb-3 border border-gold/20">
                          <Film className="w-4 h-4 text-gold" />
                          <span className="text-xs font-semibold text-gold tracking-wider uppercase">
                            Wedding Cinematography
                          </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                          Featured Wedding & Pre-Wedding Films
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videoList.map((video) => (
                          <div
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className="bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-gold/60 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
                          >
                            <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                              <video
                                src={video.src}
                                preload="metadata"
                                muted
                                playsInline
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-gold/90 text-foreground flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gold transition-all duration-300">
                                  <Play className="w-6 h-6 fill-current ml-1" />
                                </div>
                              </div>
                              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/30">
                                {video.categoryLabel}
                              </span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-gold transition-colors">
                                  {video.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 font-medium">
                                  {video.subtitle}
                                </p>
                              </div>
                              <div className="mt-4 text-xs font-semibold text-gold flex items-center gap-1">
                                <span>Watch Film</span>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            {/* Photo Grid - Category Specific (e.g. Pre Wedding) */}
            {categories.map((cat) => {
              const catPhotos = photos.filter((p) => p.categoryFolder === cat.id);
              return (
                <TabsContent key={cat.id} value={cat.id} className="mt-8">
                  {catPhotos.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <p className="text-xl font-serif">More stories coming soon.</p>
                    </div>
                  ) : (
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                      {catPhotos.map((photo, idx) => (
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <span className="text-xs font-semibold text-gold tracking-wide uppercase">
                              {photo.categoryLabel}
                            </span>
                            <p className="text-xs text-white/80 mt-1 font-medium">Click to view full size</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              );
            })}

            {/* Video Tab Content */}
            <TabsContent value="videos" className="mt-8">
              {videoList.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-xl font-serif">More stories coming soon.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videoList.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className="bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-gold/60 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
                    >
                      <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                        <video
                          src={video.src}
                          preload="metadata"
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gold/90 text-foreground flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gold transition-all duration-300">
                            <Play className="w-7 h-7 fill-current ml-1" />
                          </div>
                        </div>
                        <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/30">
                          {video.categoryLabel}
                        </span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-gold transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2 font-medium">
                            {video.subtitle}
                          </p>
                        </div>
                        <div className="mt-6 text-sm font-semibold text-gold flex items-center gap-1.5">
                          <span>Watch Cinematic Film</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Photo Lightbox Dialog */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <Dialog open={selectedPhotoIndex !== null} onOpenChange={() => setSelectedPhotoIndex(null)}>
          <DialogOverlay className="bg-black/95 backdrop-blur-md z-50" />
          <DialogContent className="max-w-6xl w-[95vw] h-[90vh] bg-transparent border-none p-0 flex flex-col items-center justify-center shadow-none focus:outline-none z-50">
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 z-50 p-3 text-white/80 hover:text-white bg-black/60 hover:bg-gold hover:text-black rounded-full transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-black/60 hover:bg-gold hover:text-black rounded-full transition-all"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-white bg-black/60 hover:bg-gold hover:text-black rounded-full transition-all"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="relative max-w-full max-h-[82vh] flex items-center justify-center overflow-hidden">
              <img
                src={filteredPhotos[selectedPhotoIndex].src}
                alt={filteredPhotos[selectedPhotoIndex].categoryLabel}
                className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

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

      {/* Video Lightbox Modal */}
      {selectedVideo !== null && (
        <Dialog open={selectedVideo !== null} onOpenChange={() => setSelectedVideo(null)}>
          <DialogOverlay className="bg-black/95 backdrop-blur-md z-50" />
          <DialogContent className="max-w-5xl w-[95vw] bg-black/90 border border-gold/30 p-4 sm:p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center z-50">
            <div className="w-full flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-gold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                  {selectedVideo.categoryLabel}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70">{selectedVideo.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-gold hover:text-black rounded-full transition-all"
                aria-label="Close Video Player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
              <video
                src={selectedVideo.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
