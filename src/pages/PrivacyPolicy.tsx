import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Update document title
    document.title = "Privacy Policy | RR Wedding Filmer";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Privacy Policy for RR Wedding Filmer explaining how personal information is collected, used, stored, and protected."
      );
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute(
        "href",
        "https://rrweddingfilmerudaipur.vercel.app/privacy-policy"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Header Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6 border border-gold/20">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold text-gold tracking-wider uppercase">
                Legal & Compliance
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy – RR Wedding Filmer
            </h1>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-4 rounded-full" />
            <p className="text-sm font-medium text-gold">
              Last Updated: 13 August 2026
            </p>
          </div>

          {/* Policy Content Card */}
          <div className="bg-card rounded-3xl border border-border p-6 md:p-12 shadow-elevated space-y-10 text-foreground/90 leading-relaxed">
            {/* Intro */}
            <div className="space-y-4 text-base md:text-lg">
              <p>
                At RR Wedding Filmer, we respect your privacy and are committed
                to protecting the personal information you share with us.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                This Privacy Policy explains how we collect, use, store, and
                protect your personal information when you visit our website,
                contact us, or submit an enquiry through our website, Facebook,
                Instagram, Meta Lead Forms, WhatsApp, or other communication
                channels.
              </p>
            </div>

            <hr className="border-border/60" />

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">1.</span> Information We Collect
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                When you contact us or submit an enquiry, we may collect
                information such as:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 pl-2 text-sm md:text-base text-foreground/90">
                {[
                  "Full Name",
                  "Phone Number",
                  "Email Address",
                  "Wedding Date",
                  "Wedding Location",
                  "Type of photography or cinematography service required",
                  "Approximate photography budget",
                  "Event details and other information you voluntarily provide",
                  "Any messages, enquiries, or communication you send to us",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic pt-2">
                We only request information that is reasonably necessary to
                respond to your enquiry and provide our services.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">2.</span> How We Use Your Information
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                We may use the information you provide to:
              </p>
              <ul className="space-y-2 pl-2 text-sm md:text-base text-foreground/90">
                {[
                  "Respond to your wedding photography enquiry",
                  "Contact you regarding availability and packages",
                  "Provide quotations and customized service information",
                  "Understand your photography and cinematography requirements",
                  "Schedule consultations or meetings",
                  "Communicate with you regarding your booking or event",
                  "Improve our services and customer experience",
                  "Maintain business and enquiry records",
                  "Comply with applicable legal or regulatory requirements",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                We will not use your personal information for unrelated
                purposes without an appropriate basis or consent where required.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">3.</span> How We Contact You
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                By submitting an enquiry form or contacting RR Wedding Filmer,
                you understand that our team may contact you using the details
                you provide, including by:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 pl-2 text-sm md:text-base font-medium text-foreground">
                {["Phone call", "SMS", "WhatsApp", "Email"].map((method, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                Our communication will generally relate to your wedding
                photography enquiry, availability, packages, consultation, or
                booking.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">4.</span> Meta / Facebook / Instagram Lead Forms
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                If you submit your information through a Facebook or Instagram
                Lead Form, the information you provide may be shared with RR
                Wedding Filmer so that we can respond to your enquiry.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Meta may separately process your information according to its
                own privacy policies and terms.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                RR Wedding Filmer is responsible for handling the information we
                receive from Meta for our business purposes in accordance with
                this Privacy Policy and applicable law.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">5.</span> Sharing of Personal Information
              </h2>
              <p className="text-muted-foreground text-sm md:text-base font-semibold">
                We do not sell or rent your personal information to third
                parties.
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                We may share information only when reasonably necessary for:
              </p>
              <ul className="space-y-2 pl-2 text-sm md:text-base text-foreground/90">
                {[
                  "Providing or managing our photography and cinematography services",
                  "Using service providers that help us operate our business",
                  "Responding to legal requirements or lawful requests",
                  "Protecting our rights, customers, or business",
                  "Preventing fraud, misuse, or security issues",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                Any sharing will be limited to what is reasonably necessary for
                the relevant purpose.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">6.</span> Data Security
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                We take reasonable measures to protect your personal information
                from unauthorized access, misuse, alteration, disclosure, or
                loss.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                However, no online system or method of electronic transmission can
                be guaranteed to be completely secure.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">7.</span> Data Retention
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                We retain personal information only for as long as reasonably
                necessary for the purposes described in this Privacy Policy,
                including handling enquiries, providing services, maintaining
                business records, resolving disputes, and complying with
                applicable legal requirements.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                When personal information is no longer reasonably required, we
                may delete or securely dispose of it, subject to applicable
                legal or business requirements.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">8.</span> Your Privacy Choices
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                You may contact us if you want to:
              </p>
              <ul className="space-y-2 pl-2 text-sm md:text-base text-foreground/90">
                {[
                  "Ask what personal information we hold about you",
                  "Request correction of inaccurate information",
                  "Withdraw consent where processing is based on consent",
                  "Request deletion of your personal information where applicable",
                  "Ask questions about how your information is being used",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                Requests will be handled subject to applicable law and any
                legitimate legal or contractual requirements.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">9.</span> Withdrawal of Consent
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Where we process your personal information based on your
                consent, you may withdraw that consent by contacting us.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Withdrawal of consent will not affect the lawfulness of
                processing carried out before the withdrawal.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Certain information may still need to be retained where required
                or permitted by applicable law or for legitimate business
                purposes.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">10.</span> Cookies and Website Technologies
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Our website or third-party services used on our website may use
                cookies or similar technologies to improve website functionality,
                understand website usage, or support advertising and analytics.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Where required, appropriate consent or controls may be provided.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">11.</span> Third-Party Services
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Our website and advertising activities may use third-party
                platforms or services such as:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 pl-2 text-sm md:text-base text-foreground/90">
                {[
                  "Meta / Facebook",
                  "Instagram",
                  "WhatsApp",
                  "Website hosting providers",
                  "Analytics or advertising platforms",
                  "Communication and enquiry-management services",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                These third parties may process information according to their
                own privacy policies and applicable terms.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">12.</span> Children's Privacy
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Our services are intended for adults and individuals capable of
                entering into contracts or making wedding-related enquiries.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                We do not knowingly collect personal information from children
                for marketing or service enquiries.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                If you believe that a child has provided personal information to
                us, please contact us so that we can take appropriate action.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 13 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">13.</span> Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                We may update this Privacy Policy from time to time to reflect
                changes in our services, technology, business practices, or
                applicable laws.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                The updated version will be published on this page with a revised
                Last Updated date.
              </p>
            </section>

            <hr className="border-border/60" />

            {/* Section 14 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-gold">14.</span> Contact
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or your personal information, please contact:
              </p>
              <div className="bg-secondary/40 rounded-2xl p-6 border border-border/80 space-y-3 text-sm md:text-base">
                <p className="font-serif font-bold text-lg text-foreground">
                  RR Wedding Filmer
                </p>
                <p>
                  <strong className="text-foreground">Website:</strong>{" "}
                  <a
                    href="https://rrweddingfilmerudaipur.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    https://rrweddingfilmerudaipur.vercel.app/
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href="mailto:rrweddingfilmer@gmail.com"
                    className="text-gold hover:underline"
                  >
                    rrweddingfilmer@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Phone / WhatsApp:</strong>{" "}
                  <a
                    href="tel:+917878339024"
                    className="text-gold hover:underline"
                  >
                    7878339024
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Location:</strong> Udaipur,
                  Rajasthan, India
                </p>
              </div>
            </section>

            <hr className="border-border/60" />

            {/* Consent Box */}
            <div className="bg-gradient-burgundy p-6 md:p-8 rounded-2xl text-primary-foreground space-y-3">
              <h3 className="font-serif text-xl font-bold text-gold">Consent</h3>
              <p className="text-sm md:text-base leading-relaxed text-primary-foreground/90">
                By submitting an enquiry through our website, Facebook, Instagram,
                Meta Lead Form, WhatsApp, or other enquiry channels, you acknowledge
                that you have read and understood this Privacy Policy and agree to
                the processing of your personal information for the purposes
                described above, to the extent required by applicable law.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
