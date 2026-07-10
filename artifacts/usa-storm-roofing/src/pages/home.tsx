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
  X,
  Star
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Counter = ({ end, suffix = "", text }: { end: number, suffix?: string, text: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const duration = 2000;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [end]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2 text-glow">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-300 tracking-wider uppercase">{text}</div>
    </div>
  );
};

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden text-foreground">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-0 bg-noise mix-blend-overlay opacity-20 pointer-events-none" />

      {/* Navigation */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-md border-b border-white/10 shadow-xl py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className={`h-10 w-10 ${scrolled ? 'text-accent' : 'text-accent text-glow'}`} />
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl leading-none text-white tracking-tight">USA STORM</span>
              <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase leading-none mt-1">Roofing & Construction</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
            <button onClick={() => scrollTo('services')} className="text-sm font-bold text-slate-200 hover:text-white transition-colors">Services</button>
            <button onClick={() => scrollTo('why-us')} className="text-sm font-bold text-slate-200 hover:text-white transition-colors">Why Us</button>
            <button onClick={() => scrollTo('process')} className="text-sm font-bold text-slate-200 hover:text-white transition-colors">Process</button>
            <button onClick={() => scrollTo('reviews')} className="text-sm font-bold text-slate-200 hover:text-white transition-colors">Reviews</button>
            <button onClick={() => scrollTo('faq')} className="text-sm font-bold text-slate-200 hover:text-white transition-colors">FAQ</button>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-accent uppercase tracking-wider font-bold">24/7 Emergency</span>
              <a href="tel:571-653-1241" className="font-display font-bold text-xl text-white hover:text-accent transition-colors">(571) 653-1241</a>
            </div>
            <Button onClick={() => scrollTo('contact')} size="lg" className="font-bold bg-accent hover:bg-accent/90 text-white border-none shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-primary/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl"
          >
            <button onClick={() => scrollTo('services')} className="text-left font-bold text-lg text-white border-b border-white/10 pb-2">Services</button>
            <button onClick={() => scrollTo('why-us')} className="text-left font-bold text-lg text-white border-b border-white/10 pb-2">Why Us</button>
            <button onClick={() => scrollTo('process')} className="text-left font-bold text-lg text-white border-b border-white/10 pb-2">Process</button>
            <button onClick={() => scrollTo('reviews')} className="text-left font-bold text-lg text-white border-b border-white/10 pb-2">Reviews</button>
            <a href="tel:571-653-1241" className="flex items-center gap-3 font-display font-bold text-2xl text-accent py-2">
              <Phone className="h-6 w-6" /> (571) 653-1241
            </a>
            <Button onClick={() => scrollTo('contact')} size="lg" className="w-full bg-accent text-white">Get a Quote</Button>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden bg-primary">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="/images/storm-clouds.jpg" 
            alt="Storm Clouds over Home" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,transparent_60%)]" />
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-4 mt-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold text-sm mb-8 shadow-xl">
              <ShieldCheck className="w-5 h-5 text-accent" /> 
              Class A Licensed & Insured in VA, MD, DC
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-display font-black text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
              When the storm hits, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 drop-shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                we've got your roof.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-2xl text-slate-200 mb-12 max-w-2xl leading-relaxed font-medium drop-shadow-md">
              We handle the damage, the replacement, and the insurance paperwork. Trusted roofing and storm restoration for the DMV area.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" onClick={() => scrollTo('contact')} className="text-xl h-16 px-10 font-black gap-3 bg-white text-primary hover:bg-slate-100 border-none shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
                Protect Your Home <ArrowRight className="w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline" className="text-xl h-16 px-10 font-bold bg-black/30 backdrop-blur-md text-white border-white/20 hover:bg-white/10 hover:text-white transition-all" asChild>
                <a href="tel:571-653-1241">
                  <Phone className="w-6 h-6 mr-3 text-accent" /> (571) 653-1241
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-24 mb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-around items-center gap-10 md:gap-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10" />
            <Counter end={30} suffix="+" text="Years Experience" />
            <div className="w-px h-16 bg-white/10 hidden md:block" />
            <Counter end={3} text="Licensed States" />
            <div className="w-px h-16 bg-white/10 hidden md:block" />
            <Counter end={100} suffix="%" text="Financing Available" />
            <div className="w-px h-16 bg-white/10 hidden md:block" />
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-3 text-glow">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 fill-accent text-accent" />)}
              </div>
              <div className="text-sm font-medium text-slate-300 tracking-wider uppercase">5-Star Rated</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid (Visually Rich) */}
      <section id="services" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-bold tracking-widest text-sm mb-6 uppercase border border-accent/20"
            >
              Our Expertise
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black mb-6 text-white"
            >
              Complete Exterior Protection
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 text-xl"
            >
              We don't just patch roofs—we fortify your entire home against the elements using premium materials and expert craftsmanship.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Roofing Installation", icon: Home, img: "/images/hero-roof.jpg", desc: "Premium architectural shingles. GAF, CertainTeed, and Owens Corning installations.", span: "md:col-span-2 lg:col-span-2" },
              { title: "Storm Damage", icon: Wind, img: "/images/hail-damage.jpg", desc: "Expert hail & wind inspections. We fight for your insurance claims.", span: "md:col-span-1 lg:col-span-1" },
              { title: "Siding", icon: Hammer, img: "/images/siding.jpg", desc: "Impact-resistant vinyl & fiber cement upgrades.", span: "md:col-span-1" },
              { title: "Gutters", icon: Droplets, img: "/images/gutters.jpg", desc: "Seamless systems to protect your foundation.", span: "md:col-span-1" },
              { title: "Windows", icon: ShieldCheck, img: "/images/windows.jpg", desc: "Energy-efficient, draft-free window replacements.", span: "md:col-span-1 md:col-span-2 lg:col-span-1" }
            ].map((srv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative rounded-3xl overflow-hidden h-[350px] md:h-[400px] cursor-pointer ${srv.span} border border-white/10`}
              >
                <div className="absolute inset-0">
                  <img src={srv.img} alt={srv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-14 h-14 rounded-2xl bg-accent/90 backdrop-blur text-white flex items-center justify-center mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <srv.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold font-display text-white mb-3">{srv.title}</h3>
                  <p className="text-slate-200 text-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {srv.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-32 relative overflow-hidden bg-primary border-y border-white/5">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
          <div className="absolute inset-0 bg-accent blur-[150px] rounded-full mix-blend-screen" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-accent to-orange-500 opacity-20 blur-2xl rounded-[3rem]" />
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/team-inspection.jpg" alt="Roofing Team Inspection" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl">
                  <h4 className="text-2xl font-display font-bold text-white mb-2">We Speak Insurance.</h4>
                  <p className="text-slate-300">We'll meet your adjuster on the roof to ensure every dent and missing shingle is documented and covered.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-300 font-bold tracking-widest text-sm mb-6 uppercase border border-white/10">
                The USA Storm Difference
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-display font-black mb-8 text-white">
                Local, Licensed, and Relentless.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-slate-400 mb-10 leading-relaxed">
                We aren't out-of-town storm chasers. We live in the DMV, we work in the DMV, and we stand by our roofs long after the storm passes.
              </motion.p>
              
              <div className="space-y-8">
                {[
                  { title: "Insurance Experts", desc: "We fight for every dollar your policy covers." },
                  { title: "Ironclad Warranties", desc: "Lifetime product and labor warranties available." },
                  { title: "Certified Crews", desc: "Haag Certified & factory-trained installers." },
                  { title: "0% APR Financing", desc: "Flexible plans to fit your budget immediately." }
                ].map((item, i) => (
                  <motion.div variants={fadeInUp} key={i} className="flex gap-5 group">
                    <div className="flex-shrink-0 mt-1 relative">
                      <div className="absolute inset-0 bg-accent blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                      <CheckCircle2 className="w-8 h-8 text-accent relative z-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-accent transition-colors">{item.title}</h4>
                      <p className="text-lg text-slate-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Banner / Social Proof Parallax */}
      <section id="reviews" className="py-32 relative overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <img src="/images/sunset-home.jpg" alt="Beautiful newly roofed home at sunset" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 drop-shadow-lg">
              Trusted by 500+ Neighbors
            </h2>
            <p className="text-2xl text-slate-200 drop-shadow-md">When we say we handle it all, we mean it. Here's what your neighbors have to say.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Michael R.", loc: "Fairfax, VA", text: "USA Storm handled my entire insurance claim after the hail storm. I barely had to lift a finger and got a beautiful new architectural roof." },
              { name: "Sarah T.", loc: "Bethesda, MD", text: "Professional, fast, and left my yard cleaner than they found it. Their crew replaced our roof and gutters in a single day." },
              { name: "David L.", loc: "Arlington, VA", text: "The 0% financing saved us. We needed a new roof badly and they made the entire process painless from the first inspection." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass p-8 rounded-3xl relative hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-accent text-accent" />)}
                </div>
                <p className="text-lg text-slate-200 mb-8 italic">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 text-accent font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{review.name}</h5>
                    <p className="text-sm text-slate-400">{review.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">The Installation Process</h2>
            <p className="text-xl text-slate-400">Precision engineering at every layer. We don't cut corners.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-accent before:via-accent/50 before:to-transparent">
              {[
                { step: "1", title: "Demolition & Inspection", desc: "Tear off down to the decking. Inspect wood for rot." },
                { step: "2", title: "Sheathing & Underlayment", desc: "Replace bad wood, install synthetic underlayment & ice/water shield." },
                { step: "3", title: "Starter & Flashing", desc: "Install starter strips and new metal flashing at critical joints." },
                { step: "4", title: "New Shingles", desc: "Nail down premium architectural shingles to exact specs." },
                { step: "5", title: "Cleanup & Review", desc: "Magnetic sweep for nails, rigorous final inspection." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex items-start gap-8 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary border border-accent/50 text-accent font-black text-xl shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.3)] z-10 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {item.step}
                  </div>
                  <div className="p-6 rounded-3xl bg-primary/50 border border-white/5 shadow-xl backdrop-blur-sm group-hover:border-accent/30 transition-colors w-full">
                    <h4 className="font-display font-bold text-2xl text-white mb-2">{item.title}</h4>
                    <p className="text-lg text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative hidden lg:block h-[800px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <img src="/images/roofing-process.jpg" alt="Roofing Craftsmanship" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="glass p-6 rounded-2xl inline-block">
                  <div className="text-accent font-bold tracking-widest text-sm mb-2 uppercase">Craftsmanship</div>
                  <h3 className="text-2xl font-display font-bold text-white">Built to Outlast.</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-primary">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-400">Straight answers to common exterior questions.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-6">
            {[
              { q: "Do I need a replacement or just a repair?", a: "It depends on the age of your roof and the extent of the damage. A few blown-off shingles can often be repaired. If the roof is over 15 years old or has widespread hail hits, a full replacement is usually more cost-effective. Our free inspection will give you the exact answer." },
              { q: "How does the insurance process work?", a: "We handle the heavy lifting. First, we document the damage. Then, you file a claim and provide our report. We meet the insurance adjuster on-site to ensure they see all the damage. Once approved, we replace the roof, and your only out-of-pocket cost is your deductible." },
              { q: "How long does a roof replacement take?", a: "Most residential roof replacements are completed in a single day. Larger or highly complex roofs may take two days. We prioritize speed and cleanliness so your life isn't disrupted." },
              { q: "Do you offer financing?", a: "Yes! We offer flexible financing options, including 0% APR plans, so you can get the protection your home needs immediately without straining your budget." },
              { q: "What areas do you serve?", a: "We proudly serve the entire DMV area, including Fairfax, Arlington, McLean, Great Falls, Herndon, Sterling, and surrounding communities in Virginia, Maryland, and Washington DC." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-2xl px-8 overflow-hidden data-[state=open]:border-accent/30 transition-colors">
                <AccordionTrigger className="text-left text-xl font-display font-bold text-white hover:text-accent py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-slate-300 text-lg pb-8 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-primary">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto glass rounded-[3rem] overflow-hidden flex flex-col lg:flex-row border border-white/10 shadow-2xl">
            
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-secondary to-primary p-12 lg:w-5/12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <ShieldCheck className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-bold tracking-widest text-sm mb-8 uppercase border border-accent/20">
                  Fast Response
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Get a Free Quote</h3>
                <p className="text-xl text-slate-300 mb-12">Fill out the form or call us directly. We'll have a local expert at your door fast.</p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-5 group cursor-pointer" onClick={() => window.location.href='tel:571-653-1241'}>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors border border-white/10 group-hover:border-accent/30">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-sm tracking-wider uppercase mb-1">Call Us 24/7</h4>
                      <p className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">(571) 653-1241</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-sm tracking-wider uppercase mb-1">Email</h4>
                      <p className="text-lg text-white">info@usastormroofing.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-sm tracking-wider uppercase mb-1">Headquarters</h4>
                      <p className="text-lg text-white">10306 Eaton Pl Suite 300<br/>Fairfax, VA 22030</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 pt-8 border-t border-white/10 relative z-10">
                <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Licenses</p>
                <div className="flex flex-wrap gap-3 font-mono text-sm text-slate-400">
                  <span className="bg-white/5 px-3 py-1 rounded-md border border-white/5">MD #162074</span>
                  <span className="bg-white/5 px-3 py-1 rounded-md border border-white/5">VA #2705187435</span>
                  <span className="bg-white/5 px-3 py-1 rounded-md border border-white/5">DC #410525000029</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-12 lg:w-7/12 bg-primary">
              <h3 className="text-3xl font-display font-bold text-white mb-8">Request an Inspection</h3>
              <div className="dark">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-10 w-10 text-accent text-glow" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl leading-none text-white tracking-tight">USA STORM</span>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase leading-none mt-1">Roofing & Construction</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-300">
              <button onClick={() => scrollTo('services')} className="hover:text-accent transition-colors">Services</button>
              <button onClick={() => scrollTo('why-us')} className="hover:text-accent transition-colors">Why Us</button>
              <button onClick={() => scrollTo('process')} className="hover:text-accent transition-colors">Process</button>
              <button onClick={() => scrollTo('reviews')} className="hover:text-accent transition-colors">Reviews</button>
              <button onClick={() => scrollTo('faq')} className="hover:text-accent transition-colors">FAQ</button>
            </div>
          </div>
          
          <div className="text-center border-t border-white/10 pt-10">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} USA Storm Roofing and Construction Group. All rights reserved. <br className="md:hidden" />Serving Northern Virginia, Maryland, and Washington DC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
