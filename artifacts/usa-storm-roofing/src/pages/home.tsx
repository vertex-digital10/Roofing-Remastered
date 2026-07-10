import { 
  ShieldCheck, 
  Wind, 
  Droplets, 
  Home, 
  Hammer, 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-accent" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-none text-foreground">USA STORM</span>
              <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase leading-none">Roofing & Construction</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('services')} className="text-sm font-medium hover:text-accent transition-colors">Services</button>
            <button onClick={() => scrollTo('why-us')} className="text-sm font-medium hover:text-accent transition-colors">Why Us</button>
            <button onClick={() => scrollTo('process')} className="text-sm font-medium hover:text-accent transition-colors">Process</button>
            <button onClick={() => scrollTo('faq')} className="text-sm font-medium hover:text-accent transition-colors">FAQ</button>
            <div className="flex items-center gap-4 ml-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Call Us 24/7</span>
                <a href="tel:571-653-1241" className="font-display font-bold text-lg text-foreground hover:text-accent transition-colors">(571) 653-1241</a>
              </div>
              <Button onClick={() => scrollTo('contact')} size="lg" className="font-bold">Get a Quote</Button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b p-4 flex flex-col gap-4 shadow-lg">
            <button onClick={() => scrollTo('services')} className="text-left font-medium py-2 border-b">Services</button>
            <button onClick={() => scrollTo('why-us')} className="text-left font-medium py-2 border-b">Why Us</button>
            <button onClick={() => scrollTo('process')} className="text-left font-medium py-2 border-b">Process</button>
            <button onClick={() => scrollTo('faq')} className="text-left font-medium py-2 border-b">FAQ</button>
            <a href="tel:571-653-1241" className="flex items-center gap-2 font-display font-bold text-lg py-2">
              <Phone className="h-5 w-5 text-accent" /> (571) 653-1241
            </a>
            <Button onClick={() => scrollTo('contact')} className="w-full">Get a Quote</Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/95 z-0">
          <img 
            src="/images/storm-clouds.jpg" 
            alt="Storm Clouds" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 mb-6 font-medium text-sm">
              <ShieldCheck className="w-4 h-4" /> Class A Licensed & Insured in VA, MD, DC
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
              When the storm hits, <span className="text-accent">we've got your roof.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              We handle the damage, the replacement, and the insurance paperwork. Trusted roofing and storm restoration for the DMV area with 30+ years of combined experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => scrollTo('contact')} className="text-lg h-14 px-8 font-bold gap-2">
                Request Free Inspection <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8 font-bold bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white" asChild>
                <a href="tel:571-653-1241">
                  <Phone className="w-5 h-5 mr-2" /> (571) 653-1241
                </a>
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" /> GAF Certified</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" /> BBB Accredited</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" /> 0% Financing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Complete Exterior Protection</h2>
            <p className="text-muted-foreground text-lg">We don't just patch roofs—we fortify your entire home against the elements using premium materials and expert craftsmanship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Wind className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold font-display mb-3">Storm Damage & Claims</h3>
                <p className="text-muted-foreground">We inspect for hail and wind damage, document everything, and work directly with your insurance to ensure a fair payout.</p>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none shadow-xl transform md:-translate-y-4">
              <CardContent className="p-8">
                <Home className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold font-display mb-3 text-white">Roofing</h3>
                <p className="text-slate-300">Full replacements and emergency repairs. We install premium GAF, CertainTeed, and Owens Corning architectural shingles.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Hammer className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold font-display mb-3">Siding Replacement</h3>
                <p className="text-muted-foreground">Upgrade your home's curb appeal and energy efficiency with premium, impact-resistant vinyl or fiber cement siding.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow lg:col-start-2">
              <CardContent className="p-8">
                <Droplets className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold font-display mb-3">Gutters</h3>
                <p className="text-muted-foreground">Seamless gutter systems designed to channel heavy rainfall away from your foundation and prevent water damage.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent/10 text-accent mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line><line x1="12" y1="3" x2="12" y2="21"></line></svg>
                </div>
                <h3 className="text-2xl font-bold font-display mb-3">Window Replacement</h3>
                <p className="text-muted-foreground">Energy-efficient, durable windows that keep drafts out and lower your utility bills year-round.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Banner Section */}
      <section className="h-[400px] relative">
        <div className="absolute inset-0 bg-slate-900">
          <img src="/images/hero-roof.jpg" alt="Roof Installation" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Built to Outlast the Weather.</h2>
            <Button size="lg" onClick={() => scrollTo('contact')} className="font-bold text-lg h-14 px-8 shadow-xl">
              Protect Your Home Today
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Process */}
      <section id="why-us" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-foreground font-semibold text-sm mb-6">
                The USA Storm Difference
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Local, Licensed, and Relentless.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We aren't out-of-town storm chasers. We live in the DMV, we work in the DMV, and we stand by our roofs long after the storm passes.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Insurance Experts", desc: "We speak their language. We'll meet with your adjuster and fight for every dollar your policy covers." },
                  { title: "Ironclad Warranties", desc: "Lifetime product and labor warranties available. When we build it, we guarantee it." },
                  { title: "Certified Crews", desc: "Haag Certified Inspectors and factory-certified installers means the job is done perfectly." },
                  { title: "0% APR Financing", desc: "Need a roof but insurance won't cover it? We offer flexible financing to fit your budget." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted p-8 md:p-12 rounded-2xl" id="process">
              <h3 className="text-2xl font-bold font-display mb-8">The Installation Process</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-accent before:via-accent/50 before:to-transparent">
                {[
                  { step: "1", title: "Demolition & Inspection", desc: "Tear off down to the decking. Inspect wood for rot." },
                  { step: "2", title: "Sheathing & Underlayment", desc: "Replace bad wood, install synthetic underlayment & ice/water shield." },
                  { step: "3", title: "Starter & Flashing", desc: "Install starter strips and new metal flashing at critical joints." },
                  { step: "4", title: "New Shingles", desc: "Nail down premium architectural shingles to exact manufacturer specs." },
                  { step: "5", title: "Cleanup & Review", desc: "Magnetic sweep for nails, rigorous final inspection." }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-muted bg-accent text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow z-10">
                      {item.step}
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl bg-card shadow-sm border border-border">
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-300 text-lg">Straight answers to common roofing questions.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-primary-foreground/10 border-none rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-bold hover:text-accent hover:no-underline">Do I need a replacement or just a repair?</AccordionTrigger>
              <AccordionContent className="text-slate-300 text-base pb-6">
                It depends on the age of your roof and the extent of the damage. A few blown-off shingles can often be repaired. If the roof is over 15 years old, has widespread hail hits, or significant granule loss, a full replacement is usually more cost-effective. Our free inspection will give you the exact answer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-primary-foreground/10 border-none rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-bold hover:text-accent hover:no-underline">How does the insurance process work?</AccordionTrigger>
              <AccordionContent className="text-slate-300 text-base pb-6">
                We handle the heavy lifting. First, we document the damage. Then, you file a claim and provide our report. We meet the insurance adjuster on-site to ensure they see all the damage. Once approved, we replace the roof, and your only out-of-pocket cost is your deductible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-primary-foreground/10 border-none rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-bold hover:text-accent hover:no-underline">How long does a roof replacement take?</AccordionTrigger>
              <AccordionContent className="text-slate-300 text-base pb-6">
                Most residential roof replacements are completed in a single day. Larger or highly complex roofs may take two days. We prioritize speed and cleanliness so your life isn't disrupted.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-primary-foreground/10 border-none rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-bold hover:text-accent hover:no-underline">Do you offer financing?</AccordionTrigger>
              <AccordionContent className="text-slate-300 text-base pb-6">
                Yes! We offer flexible financing options, including 0% APR plans, so you can get the protection your home needs immediately without straining your budget.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="bg-primary-foreground/10 border-none rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-bold hover:text-accent hover:no-underline">What areas do you serve?</AccordionTrigger>
              <AccordionContent className="text-slate-300 text-base pb-6">
                We are proud to serve the entire DMV area, including Fairfax, Arlington, McLean, Great Falls, Herndon, Sterling, and surrounding communities in Virginia, Maryland, and Washington DC.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-border">
            
            {/* Contact Info */}
            <div className="bg-primary text-primary-foreground p-10 md:w-2/5 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Get a Free Quote</h3>
                <p className="text-slate-300 mb-10">Fill out the form or call us directly. We respond fast.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">Phone</h4>
                      <a href="tel:571-653-1241" className="text-slate-300 hover:text-accent transition-colors">(571) 653-1241</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">Email</h4>
                      <a href="mailto:info@usastormroofing.com" className="text-slate-300 hover:text-accent transition-colors">info@usastormroofing.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">Office</h4>
                      <p className="text-slate-300">10306 Eaton Pl Suite 300<br/>Fairfax, VA 22030</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">Hours</h4>
                      <p className="text-slate-300">Mon-Sat: 8:00 AM - 6:00 PM<br/>Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-slate-400">Class A Licensed & Insured</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs font-mono text-slate-500">
                  <span>MD #162074</span>
                  <span>VA #2705187435</span>
                  <span>DC #410525000029</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-10 md:w-3/5 bg-card">
              <h3 className="text-2xl font-display font-bold mb-6">Request an Inspection</h3>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-white/10 py-12 text-center text-slate-400">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <span className="font-display font-bold text-xl text-white">USA STORM</span>
          </div>
          <p className="mb-6 max-w-md mx-auto text-sm">
            Premium exterior restoration and roofing services across Northern Virginia, Maryland, and Washington DC.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium mb-8">
            <button onClick={() => scrollTo('services')} className="hover:text-accent">Services</button>
            <button onClick={() => scrollTo('why-us')} className="hover:text-accent">Why Choose Us</button>
            <button onClick={() => scrollTo('process')} className="hover:text-accent">Process</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-accent">FAQ</button>
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} USA Storm Roofing and Construction Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
