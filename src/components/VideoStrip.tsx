import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { videoList } from "@/lib/videos";

export const VideoStrip: React.FC = () => {
  if (videoList.length === 0) return null;

  return (
    <div className="w-full my-16">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20">
          Featured Films
        </span>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
          Cinematic Stories in Motion
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 relative">
        <Carousel opts={{ loop: true, align: "center" }} className="w-full">
          <CarouselContent>
            {videoList.map((video, idx) => {
              return (
                <CarouselItem key={idx} className="basis-full md:basis-11/12 lg:basis-11/12">
                  <div className="p-2">
                    <div className="relative rounded-2xl overflow-hidden bg-black/90 shadow-2xl border border-gold/20 aspect-video group">
                      <video
                        src={video.src}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Caption in Serif Font */}
                    <div className="text-center mt-5">
                      <h4 className="font-serif text-2xl font-bold text-foreground">
                        {video.title}
                      </h4>
                      <p className="text-sm text-gold font-medium mt-1">
                        {video.subtitle}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4 md:-left-6 bg-background/80 hover:bg-gold text-foreground border-gold/40 hover:text-black" />
          <CarouselNext className="hidden sm:flex -right-4 md:-right-6 bg-background/80 hover:bg-gold text-foreground border-gold/40 hover:text-black" />
        </Carousel>
      </div>
    </div>
  );
};

export default VideoStrip;
