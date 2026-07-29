import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya & Rahul Sharma",
    event: "Wedding Photography",
    location: "Udaipur",
    rating: 5,
    text: "RR Wedding Filmer captured our wedding beautifully. Every emotion, every ritual, every candid moment - they didn't miss a thing. The team was professional, creative, and so easy to work with. Our album is a treasure!",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Anjali Mehra",
    event: "Baby Shower",
    location: "Hiranmagri",
    rating: 5,
    text: "The baby shower photos exceeded all expectations! The team created such a warm, comfortable atmosphere and captured the joy of our celebration perfectly. Every photo tells a story of love and anticipation.",
    avatar: "AM",
  },
  {
    id: 3,
    name: "Vikram & Neha Singh",
    event: "Pre-Wedding Shoot",
    location: "Lake Pichola",
    rating: 5,
    text: "Our pre-wedding shoot at Lake Pichola was magical! The photographer knew all the best spots and times for perfect lighting. The cinematic video they created still gives us goosebumps every time we watch it.",
    avatar: "VS",
  },
  {
    id: 4,
    name: "Rajesh Agarwal",
    event: "Corporate Event",
    location: "Udaipur",
    rating: 5,
    text: "We hired RR Wedding Filmer for our company's annual function and they delivered exceptional work. Professional, punctual, and the photos were outstanding. Highly recommend for any event coverage!",
    avatar: "RA",
  },
  {
    id: 5,
    name: "Kavita & Suresh Joshi",
    event: "Destination Wedding",
    location: "City Palace",
    rating: 5,
    text: "Choosing RR Wedding Filmer for our destination wedding was the best decision. They coordinated perfectly across multiple venues and captured every ceremony beautifully. The video edit was absolutely cinematic!",
    avatar: "KJ",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-burgundy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 border border-gold/10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-60 h-60 border border-gold/10 rounded-full" />
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gold/20 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-gold/10 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-6">
            <span className="text-sm font-medium text-gold tracking-wide">Testimonials</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            What Our Clients
            <span className="text-gold"> Say</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Don&apos;t just take our word for it - hear from the families and couples 
            whose special moments we had the honor of capturing.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-background/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gold/20">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-gold rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-foreground" />
            </div>

            {/* Content */}
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-primary-foreground leading-relaxed mb-8 italic">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-foreground">
                    {testimonials[activeIndex].avatar}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-primary-foreground">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-gold font-medium">
                  {testimonials[activeIndex].event}
                </p>
                <p className="text-sm text-primary-foreground/60">
                  {testimonials[activeIndex].location}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/20 hover:bg-gold/80 rounded-full flex items-center justify-center transition-colors group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground group-hover:text-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/20 hover:bg-gold/80 rounded-full flex items-center justify-center transition-colors group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground group-hover:text-foreground" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gold w-8"
                    : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
