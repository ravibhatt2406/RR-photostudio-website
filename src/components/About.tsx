import { MapPin, Award, Users, Heart } from "lucide-react";
import rrLogo from "@/assets/rr-wedding-filmer-logo.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6">
              <span className="text-sm font-medium text-gold tracking-wide">About Us</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Preserving Moments,
              <span className="text-primary"> Creating Legacies</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded with a passion for storytelling through images, <strong>RR Wedding Filmer</strong> has been
              the trusted name in Udaipur for capturing life&apos;s most precious moments. Capturing Forever, we bring artistic passion and dedication to every project.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our team of skilled photographers combines traditional Rajasthani artistry with modern
              cinematic techniques to create stunning visual narratives. From intimate baby showers to
              grand royal weddings, we capture the essence of every celebration with artistic excellence.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Award Winning</h4>
                  <p className="text-sm text-muted-foreground">Recognized excellence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Expert Team</h4>
                  <p className="text-sm text-muted-foreground">Skilled professionals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Heart className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Passionate</h4>
                  <p className="text-sm text-muted-foreground">Love what we do</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Local Experts</h4>
                  <p className="text-sm text-muted-foreground">Know every location</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Studio Location</p>
                <p className="text-sm text-muted-foreground">Parshuram Chourhaya, Udaipur</p>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Main Image Card */}
              <div className="bg-gradient-burgundy p-8 rounded-3xl shadow-elevated">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={rrLogo}
                    alt="RR Wedding Filmer"
                    className="h-40 w-auto object-contain mb-6"
                  />
                  <h3 className="font-serif text-3xl font-bold text-primary-foreground mb-2">
                    RR Wedding Filmer
                  </h3>
                  <p className="text-primary-foreground/80 text-lg mb-6">
                    Capturing Forever
                  </p>
                  <div className="w-16 h-1 bg-gold rounded-full" />
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-2xl shadow-elevated border border-border">
                <div className="text-center">
                  <div className="font-serif text-4xl font-bold text-gold mb-1">10+</div>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gold text-foreground px-4 py-2 rounded-full shadow-gold">
                <span className="text-sm font-semibold">Est. 2014</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
