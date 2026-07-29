import { Camera, Film, Baby, Heart, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    description: "Capture every precious moment of your big day with our expert wedding photography services. From traditional ceremonies to candid moments, we create timeless memories.",
    features: ["Full Day Coverage", "Candid & Traditional Shots", "Album Design", "Photo Editing"],
  },
  {
    icon: Film,
    title: "Cinematic Photography",
    description: "Experience storytelling through stunning cinematic films. Our videography team creates movie-quality wedding films that you'll treasure forever.",
    features: ["4K Video Quality", "Drone Coverage", "Highlight Reels", "Full Documentary"],
  },
  {
    icon: Baby,
    title: "Baby Shower Photography",
    description: "Celebrate the joy of new beginnings with beautiful baby shower photography. We capture the love, laughter, and anticipation of this special celebration.",
    features: ["Event Coverage", "Creative Portraits", "Family Photos", "Quick Delivery"],
  },
  {
    icon: Camera,
    title: "Pre-Wedding Shoots",
    description: "Create stunning pre-wedding memories at Udaipur's most beautiful locations. Our creative team brings your love story to life through artistic photography.",
    features: ["Location Scouting", "Outfit Consultation", "Makeup Coordination", "Digital Album"],
  },
  {
    icon: Users,
    title: "Event Photography",
    description: "From birthdays to corporate events, we cover all types of celebrations with the same passion and professionalism that defines RR Wedding Filmer.",
    features: ["Full Event Coverage", "Group Photos", "Candid Moments", "Same-Day Preview"],
  },
  {
    icon: Sparkles,
    title: "Special Functions",
    description: "Ring ceremonies, haldi, sangeet, reception - we cover every function with dedicated teams ensuring no moment goes uncaptured.",
    features: ["Multi-Team Coverage", "Traditional & Modern", "Lighting Setup", "Premium Editing"],
  },
];

const Services = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6">
            <span className="text-sm font-medium text-gold tracking-wide">Our Services</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Photography Services We
            <span className="text-primary"> Offer</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From intimate ceremonies to grand celebrations, we offer comprehensive photography 
            and videography services tailored to your unique needs and vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card p-8 rounded-2xl border border-border hover:border-gold/50 transition-all duration-500 hover:shadow-elevated animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-foreground" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                onClick={scrollToContact}
              >
                Book This Service
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground mb-4">
            Need a custom package? We create personalized solutions for your special day.
          </p>
          <Button variant="gold" size="lg" onClick={scrollToContact}>
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
