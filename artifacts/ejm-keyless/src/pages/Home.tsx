import React from "react";
import { PhoneCall, ShieldCheck, MapPin, KeyRound, ArrowRight, Wrench, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderForm } from "@/components/OrderForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-display font-bold text-foreground tracking-tight leading-none">
              EJM Keyless Entry Solutions
            </h1>
            <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Mobile Locksmith Services
            </span>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-muted-foreground">Car Key Fob Duplication & Programming</span>
            <a 
              href="tel:203-805-9220" 
              className="text-lg font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-2 mt-0.5"
              data-testid="link-header-phone"
            >
              <PhoneCall className="w-4 h-4" />
              203-805-9220
            </a>
          </div>
          <a 
            href="tel:203-805-9220"
            className="md:hidden flex items-center justify-center bg-primary/10 text-primary p-2.5 rounded-full hover:bg-primary/20 transition-colors"
            aria-label="Call Now"
            data-testid="link-header-phone-mobile"
          >
            <PhoneCall className="w-5 h-5" />
          </a>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* HERO SECTION */}
        <section className="relative bg-secondary text-secondary-foreground py-20 md:py-32 overflow-hidden">
          {/* Subtle grid pattern background for industrial feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          <div className="container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-6 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
                <MapPin className="w-4 h-4" />
                Mobile Service in Connecticut
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Fast & Affordable <br/><span className="text-primary">Car Key Services</span>
              </h2>
              <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                Need a spare key, replacement smart key, or emergency key programming? Submit your vehicle information below and we'll contact you with pricing and availability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <Button 
                  size="lg" 
                  className="font-bold text-base h-14 px-8" 
                  onClick={scrollToForm}
                  data-testid="button-hero-quote"
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="font-bold text-base h-14 px-8 bg-transparent border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-white"
                  asChild
                  data-testid="button-hero-call"
                >
                  <a href="tel:203-805-9220">
                    <PhoneCall className="w-5 h-5 ml-2 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Visual element for hero (could be a generated image, using decorative elements for now) */}
            <div className="flex-1 w-full max-w-lg hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              <div className="relative aspect-square rounded-full border-4 border-primary/20 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full border border-primary/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
                <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_rgba(255,90,0,0.2)]">
                  <KeyRound className="w-32 h-32 text-primary opacity-80" strokeWidth={1} />
                </div>
                
                {/* Floating capability badges */}
                <div className="absolute top-10 right-10 bg-background text-foreground px-4 py-2 rounded-lg shadow-xl font-bold text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  All Keys Lost
                </div>
                <div className="absolute bottom-20 left-4 bg-background text-foreground px-4 py-2 rounded-lg shadow-xl font-bold text-sm flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-primary" />
                  On-Site Programming
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-20 bg-background relative z-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Professional Automotive Locksmith</h3>
              <p className="text-lg text-muted-foreground">We come to you. No need to tow your car to a dealership. We have the tools and expertise to handle modern vehicle security.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <KeyRound className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground font-display">Key Duplication</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Need a spare? We supply, cut, and program spare smart keys, flip keys, remote keys, and standard transponder keys for most makes and models.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ShieldCheck className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground font-display">Lost All Keys</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Stranded? Don't panic. We can generate and program brand new keys directly to your vehicle's immobilizer system, even if all original keys are completely lost.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground font-display">Mobile Service</h4>
                <p className="text-muted-foreground leading-relaxed">
                  We are fully mobile. On-site key programming and emergency locksmith assistance exactly where you are, getting you back on the road faster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FORM SECTION */}
        <section id="quote-form" className="py-20 bg-muted/50 border-t border-border scroll-mt-20">
          <div className="container mx-auto px-4">
            <OrderForm />
          </div>
        </section>

        {/* SERVICE AREA SECTION */}
        <section className="py-20 bg-secondary text-secondary-foreground border-t border-secondary-foreground/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-5 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Service Area
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-secondary-foreground mb-4">
                We Come to You Across Connecticut
              </h3>
              <p className="text-secondary-foreground/70 text-lg">
                Fully mobile service — no tow truck needed. If your town isn't listed, give us a call and we'll do our best to reach you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  county: "Fairfield County",
                  towns: ["Bridgeport", "Stamford", "Norwalk", "Danbury", "Greenwich", "Stratford", "Trumbull", "Shelton", "Milford", "Westport", "Darien", "Wilton", "Ridgefield", "Newtown", "Monroe", "Easton", "Weston", "New Canaan", "Fairfield", "Bethel"],
                },
                {
                  county: "New Haven County",
                  towns: ["New Haven", "Waterbury", "Meriden", "West Haven", "Hamden", "North Haven", "Wallingford", "Ansonia", "Derby", "Seymour", "Naugatuck", "Cheshire", "Orange", "Woodbridge", "Bethany", "Guilford", "Branford", "North Branford", "Madison"],
                },
                {
                  county: "Hartford County",
                  towns: ["Hartford", "New Britain", "Bristol", "Southington", "Enfield", "Glastonbury", "West Hartford", "Newington", "Wethersfield", "Rocky Hill", "East Hartford", "Manchester", "South Windsor", "Windsor", "Bloomfield", "Farmington", "Plainville", "Berlin"],
                },
                {
                  county: "Middlesex & Other",
                  towns: ["Middletown", "Cromwell", "Portland", "East Hampton", "Haddam", "Killingworth", "Clinton", "Westbrook", "Old Saybrook", "Essex", "East Haddam", "Torrington", "Naugatuck Valley", "Watertown", "Thomaston", "Wolcott", "Prospect"],
                },
              ].map((region) => (
                <div key={region.county} className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-2xl p-6">
                  <h4 className="font-display font-bold text-primary text-base uppercase tracking-wider mb-4 pb-3 border-b border-secondary-foreground/10">
                    {region.county}
                  </h4>
                  <ul className="space-y-2">
                    {region.towns.map((town) => (
                      <li key={town} className="flex items-center gap-2 text-sm text-secondary-foreground/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {town}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-secondary-foreground/60 text-sm">
                Not sure if we cover your area?{" "}
                <a href="tel:203-805-9220" className="text-primary font-semibold hover:underline" data-testid="link-area-phone">
                  Call 203-805-9220
                </a>{" "}
                and we'll let you know right away.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Common Questions
              </h3>
              <p className="text-muted-foreground text-lg">
                Everything you need to know before you reach out.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "How long does a key programming service take?",
                  a: "Most jobs take between 20 and 60 minutes on-site depending on the vehicle make, model, and year. Smart key and push-to-start systems can take a bit longer than standard transponder keys. We'll give you a time estimate when you call.",
                },
                {
                  q: "Can you make a key if I've lost all my original keys?",
                  a: "Yes — this is one of our specialties. Even if every key to your vehicle is gone, we carry the equipment to generate a new key from scratch and program it directly to your car's immobilizer system. No towing required.",
                },
                {
                  q: "Do you work on smart keys and push-to-start vehicles?",
                  a: "Absolutely. We work on the majority of modern smart key systems, including proximity fobs, flip keys, and push-to-start remotes for most makes and models. Submit your vehicle info through the form and we'll confirm compatibility.",
                },
                {
                  q: "How much does it cost?",
                  a: "Pricing depends on your vehicle's year, make, model, and the type of key needed. We provide upfront quotes with no hidden fees — submit the form or give us a call at 203-805-9220 and we'll get you a number right away.",
                },
                {
                  q: "Do I need to tow my car to you?",
                  a: "Never. We are fully mobile — we come to wherever your car is parked, whether that's your driveway, a parking lot, the side of the road, or anywhere else in Connecticut.",
                },
                {
                  q: "Are you available nights and weekends?",
                  a: "Yes. We offer flexible scheduling including evenings and weekends. For emergencies, call us directly at 203-805-9220 and we'll do our best to get to you as quickly as possible.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept cash, Zelle, Venmo, and most major credit and debit cards. Payment is due at the time of service.",
                },
                {
                  q: "Will a new key programmed by you void my warranty?",
                  a: "In most cases, no. Under the Magnuson-Moss Warranty Act, dealerships generally cannot void your warranty simply because a third party performed key programming. However, if you have concerns, feel free to ask us when you call.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/40 transition-colors"
                  data-testid={`faq-item-${i}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-base">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">Still have a question?</p>
              <Button asChild size="lg" className="font-bold" data-testid="button-faq-call">
                <a href="tel:203-805-9220">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Call 203-805-9220
                </a>
              </Button>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-secondary text-secondary-foreground py-12 border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="font-display font-bold text-xl mb-2">EJM Keyless Entry Solutions</h4>
            <p className="text-secondary-foreground/70 text-sm max-w-sm">
              Professional automotive locksmith and key programming services. Available for mobile appointments across Connecticut.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="mb-2">
              <span className="text-sm font-medium text-secondary-foreground/60 uppercase tracking-wider">Contact Us</span>
            </div>
            <a 
              href="tel:203-805-9220" 
              className="text-2xl font-display font-bold text-white hover:text-primary transition-colors"
              data-testid="link-footer-phone"
            >
              203-805-9220
            </a>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-6 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/50">
          &copy; {new Date().getFullYear()} EJM Keyless Entry Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
