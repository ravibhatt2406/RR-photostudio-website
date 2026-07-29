import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LivingGallery from "@/components/LivingGallery";
import VideoStrip from "@/components/VideoStrip";

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-secondary/60 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6 border border-gold/20">
            <span className="text-sm font-medium text-gold tracking-wider uppercase">Our Living Portfolio</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Authentic Moments,
            <span className="text-primary"> Masterfully Captured</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experience our dynamic gallery of real weddings, pre-wedding shoots,
            and cinematic films in Udaipur & beyond.
          </p>
        </div>

        {/* 1. Living Photo Gallery */}
        <div className="mb-16">
          <LivingGallery />
        </div>

        {/* 2. Video Strip */}
        <div className="my-16">
          <VideoStrip />
        </div>

        {/* 3. CTA Button to Full Gallery */}
        <div className="text-center mt-16 animate-fade-up">
          <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border border-gold/30 p-8 rounded-3xl shadow-lg">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              Explore Our Complete Visual Collection
            </h3>
            <p className="text-muted-foreground mb-6">
              Dive deeper into our complete portfolio categorized by Candid Moments, Cinematic Films, Baby Showers, and Haldi & Mehendi.
            </p>
            <Link to="/gallery">
              <Button
                variant="gold"
                size="lg"
                className="px-8 shadow-gold text-base font-semibold group rounded-full"
              >
                View Full Gallery
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
