import { Button } from "@/components/ui/button";
import { Camera, Play } from "lucide-react";
import heroImage from "@/assets/hero-new.jpg";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wedding Photography by RR Wedding Filmer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-40 right-20 w-20 h-20 border border-gold/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-gold/10 rounded-full animate-float" style={{ animationDelay: "4s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full border border-gold/30 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Camera className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-cream">Premium Photography Studio in Udaipur</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Capturing Your
            <span className="block text-gradient-gold">Precious Moments</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-cream/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.6s" }}>
            We specialize in creating timeless memories through wedding photography,
            cinematic films, and capturing every special moment of your life&apos;s celebrations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection("#contact")}
              className="group"
            >
              Book a Session
              <Camera className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={() => scrollToSection("#portfolio")}
              className="group"
            >
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
              View Portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-cream/20 animate-fade-up" style={{ animationDelay: "1s" }}>
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">500+</div>
              <div className="text-sm text-cream/70">Weddings Captured</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">10+</div>
              <div className="text-sm text-cream/70">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">1000+</div>
              <div className="text-sm text-cream/70">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-cream/60 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
