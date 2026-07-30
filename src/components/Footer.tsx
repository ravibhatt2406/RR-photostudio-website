import { Heart, MapPin, Phone, Mail } from "lucide-react";
import rrLogo from "@/assets/rr-wedding-filmer-logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={rrLogo} alt="RR Wedding Filmer" className="h-12 w-auto object-contain" />
              <div>
                <h3 className="font-serif text-xl font-bold">RR Wedding Filmer</h3>
                <p className="text-xs text-background/60 tracking-widest uppercase">Capturing Forever</p>
              </div>
            </div>
            <p className="text-background/70 leading-relaxed mb-6">
              Capturing Forever. Your trusted photography partner in Udaipur, Rajasthan.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/60">
              <MapPin className="w-4 h-4" />
              <span>Parshuram Chourhaya, Udaipur</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Portfolio", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(`#${link.toLowerCase()}`);
                    }}
                    className="text-background/70 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                "Wedding Photography",
                "Cinematic Videos",
                "Pre-Wedding Shoots",
                "Baby Shower Coverage",
                "Event Photography",
                "Portrait Sessions",
              ].map((service) => (
                <li key={service}>
                  <span className="text-background/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+917878339024" className="text-background/70 hover:text-gold transition-colors">
                  +91 78783 39024
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:rrweddingfilmer@gmail.com" className="text-background/70 hover:text-gold transition-colors">
                  rrweddingfilmer@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-background/60 mb-3">Follow us for more:</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/rr.wedding.udaipur?igsh=MW4zc2V1NWVkM3hycg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-gold transition-colors group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-background/70 group-hover:text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/1HM5XC4oX1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-gold transition-colors group"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-background/70 group-hover:text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-gold transition-colors group"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-background/70 group-hover:text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {currentYear} RR Wedding Filmer. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-background/60">
              Made with <Heart className="w-4 h-4 text-gold fill-gold" /> in Udaipur, Rajasthan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
