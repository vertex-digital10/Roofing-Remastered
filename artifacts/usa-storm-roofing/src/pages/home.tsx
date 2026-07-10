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
  Star,
  Activity,
  ChevronRight
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const navLinks = [
  { id: "services", label: "Services" },
  { id: "why-us", label: "Why Us" },
  { id: "reviews", label: "Reviews" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" }
];

const Counter = ({ end, suffix = "", text }: { end: number, suffix?: string, text: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTime: number;
        const duration = 2500;
        
        const animate = (time: number) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / duration, 1);
          // Exp ease out
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(Math.floor(easeProgress * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-5xl md:text-7xl font-display font-black text-white mb-2 text-glow tabular-nums tracking-tighter">
        {count}{suffix}
      </div>
      <div className="text-sm font-bold text-slate-400 tracking-[0.2em] uppercase">{text}</div>
    </div>
  );
};

// Premium Magnetic Button
const MagneticButton = ({ children, className, onClick, asChild }: any) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  const { scrollY, scrollYProgress } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-20% 0px -40% 0px", threshold: [0.3] });

    const sections = document.querySelectorAll("section[id]");
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden text-foreground">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent z-[100] origin-left" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-0 bg-noise mix-blend-overlay opacity-30 pointer-events-none" />

      {/* Navigation */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ease-out ${scrolled ? 'bg-primary/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <ShieldCheck className={`h-10 w-10 transition-colors duration-300 ${scrolled ? 'text-accent' : 'text-accent text-glow'}`} />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-accent/30 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-display font-black text-2xl leading-none text-white tracking-tight group-hover:tracking-normal transition-all duration-300">USA STORM</span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase leading-none mt-1 group-hover:text-accent transition-colors">Roofing & Construction</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center bg-black/40 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollTo(link.id)} 
                className="relative px-6 py-2.5 text-sm font-bold text-slate-300 hover:text-white transition-colors rounded-full overflow-hidden group"
              >
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeNav" 
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full" 
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end group cursor-pointer" onClick={() => window.location.href='tel:571-653-1241'}>
              <span className="text-[10px] text-accent uppercase tracking-widest font-bold mb-0.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> 24/7 Emergency
              </span>
              <span className="font-display font-bold text-xl text-white group-hover:text-accent transition-colors">(571) 653-1241</span>
            </div>
            <MagneticButton 
              onClick={() => scrollTo('contact')} 
              className="relative overflow-hidden group bg-accent text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-orange-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-white relative z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
              {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </motion.div>
          </button>
        </div>

        {/* Premium Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%", transition: { delay: 0.2, duration: 0.3 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-primary/95 backdrop-blur-3xl z-40 flex flex-col pt-32 px-8 pb-12"
            >
              <div className="flex flex-col gap-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.button 
                    key={link.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                    onClick={() => scrollTo(link.id)} 
                    className="text-left font-display font-black text-4xl text-slate-300 hover:text-accent hover:translate-x-2 transition-all"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto space-y-6"
              >
                <div className="w-full h-px bg-white/10" />
                <a href="tel:571-653-1241" className="flex items-center justify-between group">
                  <span className="font-bold tracking-widest text-slate-400 uppercase text-sm">Call Us</span>
                  <span className="font-display font-bold text-2xl text-accent group-hover:text-white transition-colors">(571) 653-1241</span>
                </a>
                <MagneticButton 
                  onClick={() => scrollTo('contact')} 
                  className="w-full bg-accent text-white py-5 rounded-2xl font-black text-lg tracking-widest uppercase flex items-center justify-center gap-3"
                >
                  Request Inspection <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex items-center pt-24 pb-32 overflow-hidden bg-primary perspective-[1000px]">
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0 origin-top">
          <img 
            src="/images/storm-clouds.jpg" 
            alt="Storm Clouds over Home" 
            className="w-full h-full object-cover mix-blend-luminosity opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.25)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(30,58,138,0.4)_0%,transparent_50%)]" />
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-4 lg:px-8 mt-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white font-bold text-xs tracking-widest uppercase mb-10 shadow-2xl relative overflow-hidden group">
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <Activity className="w-4 h-4 text-accent" /> 
                Dispatching crews in the DMV
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl lg:text-[6rem] font-display font-black text-white leading-[0.95] tracking-tighter mb-8 drop-shadow-2xl">
                When the storm hits, <br/>
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-yellow-300">
                    we've got your roof.
                  </span>
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "anticipate" }}
                    className="absolute bottom-2 left-0 right-0 h-4 bg-accent/30 -z-10 origin-left skew-x-[-15deg]"
                  />
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-medium">
                We handle the damage, the replacement, and the insurance paperwork. Premium protection built to outlast the weather.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6">
                <MagneticButton 
                  onClick={() => scrollTo('contact')} 
                  className="text-lg sm:text-xl h-16 sm:h-20 px-8 sm:px-12 rounded-2xl font-black gap-4 flex items-center justify-center bg-white text-primary hover:bg-slate-100 border-none shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
                >
                  Protect Your Home <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 bg-primary text-white rounded-full p-1" />
                </MagneticButton>
                <MagneticButton 
                  onClick={() => window.location.href='tel:571-653-1241'}
                  className="text-lg sm:text-xl h-16 sm:h-20 px-8 sm:px-12 rounded-2xl font-bold flex items-center justify-center bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-xl"
                >
                  <Phone className="w-6 h-6 mr-3 text-accent" /> (571) 653-1241
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Floating Visual Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-4 hidden lg:block relative perspective-[1000px]"
            >
              <motion.div 
                animate={{ y: [-15, 15, -15], rotateZ: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
              >
                <img src="/images/hero-roof.jpg" alt="Premium Roof" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30" />
                
                {/* Floating Badges inside */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                  className="absolute top-8 right-8 glass px-4 py-3 rounded-2xl flex items-center gap-3 border-white/20 shadow-2xl"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-white font-bold leading-tight">GAF Certified</div>
                    <div className="text-xs text-slate-300">Premium Install</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 2, ease: "easeInOut" }}
                  className="absolute bottom-10 left-8 glass px-5 py-4 rounded-2xl border-white/20 shadow-2xl"
                >
                  <div className="text-3xl font-display font-black text-white mb-1">0%</div>
                  <div className="text-sm text-slate-300 tracking-wider uppercase font-bold">Financing</div>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 hidden md:flex"
          onClick={() => scrollTo('services')}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-slate-400">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </section>

      {/* Services Grid (Visually Rich) */}
      <section id="services" className="py-32 relative z-10 bg-primary">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex items-center gap-2 font-bold tracking-widest text-sm mb-4 uppercase text-accent"
              >
                <div className="w-8 h-px bg-accent" /> Our Expertise
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl md:text-6xl font-display font-black text-white leading-tight"
              >
                Complete Exterior <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">Protection</span>
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-slate-400 text-lg md:text-xl max-w-md"
            >
              We don't just patch roofs—we fortify your entire home against the elements using premium materials and expert craftsmanship.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {[
              { title: "Roofing Installation", icon: Home, img: "/images/hero-roof.jpg", desc: "Premium architectural shingles. GAF, CertainTeed, and Owens Corning installations.", span: "md:col-span-8 lg:col-span-8", height: "h-[450px]" },
              { title: "Storm Damage", icon: Wind, img: "/images/hail-damage.jpg", desc: "Expert hail & wind inspections. We fight for your claims.", span: "md:col-span-4 lg:col-span-4", height: "h-[450px]" },
              { title: "Siding", icon: Hammer, img: "/images/siding.jpg", desc: "Impact-resistant vinyl & fiber cement upgrades.", span: "md:col-span-4", height: "h-[350px]" },
              { title: "Gutters", icon: Droplets, img: "/images/gutters.jpg", desc: "Seamless systems to protect your foundation.", span: "md:col-span-4", height: "h-[350px]" },
              { title: "Windows", icon: ShieldCheck, img: "/images/windows.jpg", desc: "Energy-efficient, draft-free window replacements.", span: "md:col-span-4", height: "h-[350px]" }
            ].map((srv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className={`group relative rounded-[2rem] overflow-hidden cursor-pointer ${srv.span} ${srv.height} border border-white/5 shadow-2xl`}
              >
                <div className="absolute inset-0 bg-primary/20 z-10" />
                <motion.img 
                  src={srv.img} 
                  alt={srv.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center mb-6 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out shadow-2xl group-hover:bg-accent group-hover:border-accent">
                    <srv.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold font-display text-white mb-3 group-hover:text-accent transition-colors duration-300">{srv.title}</h3>
                  <div className="overflow-hidden">
                    <p className="text-slate-300 text-lg transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                      {srv.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold Transition Stats */}
      <section className="py-20 relative bg-accent overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-around items-center gap-16 md:gap-4">
            <Counter end={30} suffix="+" text="Years Experience" />
            <div className="w-px h-24 bg-white/20 hidden md:block rotate-12" />
            <Counter end={3} text="Licensed States" />
            <div className="w-px h-24 bg-white/20 hidden md:block -rotate-12" />
            <Counter end={100} suffix="%" text="Financing Available" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-32 relative overflow-hidden bg-primary">
        <div className="absolute left-0 top-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-secondary blur-[200px] rounded-full mix-blend-screen" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="order-2 lg:order-1"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 font-bold tracking-widest text-sm mb-4 uppercase text-accent">
                <div className="w-8 h-px bg-accent" /> The Difference
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-display font-black mb-8 text-white leading-tight">
                Local, Licensed, and <span className="italic font-light">Relentless.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-slate-400 mb-12 leading-relaxed">
                We aren't out-of-town storm chasers. We live in the DMV, we work in the DMV, and we stand by our roofs long after the storm passes.
              </motion.p>
              
              <div className="space-y-10">
                {[
                  { title: "Insurance Experts", desc: "We fight for every dollar your policy covers with adjusters directly." },
                  { title: "Ironclad Warranties", desc: "Lifetime product and labor warranties available on all full replacements." },
                  { title: "Certified Crews", desc: "Haag Certified & factory-trained installers for flawless execution." }
                ].map((item, i) => (
                  <motion.div variants={fadeInUp} key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 mt-1 relative">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                        <CheckCircle2 className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold font-display text-white mb-2 group-hover:text-accent transition-colors">{item.title}</h4>
                      <p className="text-lg text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative order-1 lg:order-2 perspective-[1000px]"
            >
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(30,58,138,0.3)] group">
                <img src="/images/team-inspection.jpg" alt="Roofing Team" className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90" />
                
                {/* Floating card */}
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute bottom-8 left-8 right-8 glass p-8 rounded-3xl border-l-4 border-l-accent"
                >
                  <h4 className="text-3xl font-display font-bold text-white mb-3">We Speak Insurance.</h4>
                  <p className="text-lg text-slate-300">We meet your adjuster on the roof to ensure every missing shingle is documented and covered.</p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Reviews Parallax */}
      <section id="reviews" className="py-40 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 3000], [0, -300]) }} 
          className="absolute inset-0 z-0 h-[120%]"
        >
          <img src="/images/sunset-home.jpg" alt="Sunset Home" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary z-0" />
        
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 font-bold tracking-widest text-sm mb-4 uppercase text-accent"
            >
              <Star className="w-4 h-4 fill-accent" /> 5-Star Rated
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-black text-white mb-6 drop-shadow-lg leading-tight"
            >
              Trusted by 500+ <br/>Neighbors
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Michael R.", loc: "Fairfax, VA", text: "USA Storm handled my entire insurance claim after the hail storm. I barely had to lift a finger and got a beautiful new architectural roof." },
              { name: "Sarah T.", loc: "Bethesda, MD", text: "Professional, fast, and left my yard cleaner than they found it. Their crew replaced our roof and gutters in a single day." },
              { name: "David L.", loc: "Arlington, VA", text: "The 0% financing saved us. We needed a new roof badly and they made the entire process painless from the first inspection." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass p-10 rounded-[2.5rem] relative group hover:-translate-y-4 transition-transform duration-500 border-white/10 hover:border-accent/30"
              >
                <div className="absolute top-0 right-10 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:-translate-y-1/2 transition-all duration-300">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="flex gap-1 mb-8">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-accent text-accent" />)}
                </div>
                <p className="text-xl text-slate-200 mb-10 leading-relaxed font-medium">"{review.text}"</p>
                <div className="flex items-center gap-5 mt-auto">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white font-black text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-lg">{review.name}</h5>
                    <p className="text-sm text-accent font-bold uppercase tracking-wider">{review.loc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Sticky Scrolling */}
      <section id="process" className="py-32 bg-primary relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black text-white mb-6"
            >
              The Installation Process
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-slate-400"
            >
              Precision engineering at every layer. We don't cut corners.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-accent before:via-accent/20 before:to-transparent">
              {[
                { step: "01", title: "Demolition & Inspection", desc: "Tear off down to the decking. Inspect wood for rot." },
                { step: "02", title: "Sheathing & Underlayment", desc: "Replace bad wood, install synthetic underlayment & ice/water shield." },
                { step: "03", title: "Starter & Flashing", desc: "Install starter strips and new metal flashing at critical joints." },
                { step: "04", title: "New Shingles", desc: "Nail down premium architectural shingles to exact specs." },
                { step: "05", title: "Cleanup & Review", desc: "Magnetic sweep for nails, rigorous final inspection." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex items-center gap-10 group"
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-3xl bg-primary border-2 border-white/10 text-white font-black text-xl shrink-0 z-10 group-hover:border-accent group-hover:text-accent transition-all duration-300 bg-noise">
                    {item.step}
                  </div>
                  <div className="py-8 border-b border-white/5 w-full group-hover:border-accent/30 transition-colors">
                    <h4 className="font-display font-bold text-3xl text-white mb-3 group-hover:text-accent transition-colors">{item.title}</h4>
                    <p className="text-xl text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:block sticky top-32 h-[700px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <img src="/images/roofing-process.jpg" alt="Roofing Craftsmanship" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ & Contact (Combined distinctive moment) */}
      <section id="faq" className="py-32 relative bg-primary z-10 overflow-hidden">
        {/* Massive background typography */}
        <div className="absolute top-0 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[20vw] font-display font-black text-white whitespace-nowrap leading-none tracking-tighter">
            USA STORM
          </span>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* FAQ Left Column */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-32"
              >
                <div className="inline-flex items-center gap-2 font-bold tracking-widest text-sm mb-4 uppercase text-accent">
                  <div className="w-8 h-px bg-accent" /> Knowledge Base
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight">
                  Frequently Asked Questions.
                </h2>
                <p className="text-xl text-slate-400 mb-12">Straight answers to common exterior questions from our local experts.</p>
                
                <MagneticButton 
                  onClick={() => scrollTo('contact')} 
                  className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider flex items-center gap-3 hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  Still have questions? <ArrowRight className="w-5 h-5 text-accent" />
                </MagneticButton>
              </motion.div>
            </div>

            {/* FAQ Right Column */}
            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  { q: "Do I need a replacement or just a repair?", a: "It depends on the age of your roof and the extent of the damage. A few blown-off shingles can often be repaired. If the roof is over 15 years old or has widespread hail hits, a full replacement is usually more cost-effective." },
                  { q: "How does the insurance process work?", a: "We handle the heavy lifting. First, we document the damage. Then, you file a claim and provide our report. We meet the insurance adjuster on-site to ensure they see all the damage. Once approved, we replace the roof." },
                  { q: "How long does a roof replacement take?", a: "Most residential roof replacements are completed in a single day. Larger or highly complex roofs may take two days. We prioritize speed and cleanliness." },
                  { q: "Do you offer financing?", a: "Yes! We offer flexible financing options, including 0% APR plans, so you can get the protection your home needs immediately without straining your budget." },
                  { q: "What areas do you serve?", a: "We proudly serve the entire DMV area, including Fairfax, Arlington, McLean, Great Falls, Herndon, Sterling, and surrounding communities in Virginia, Maryland, and Washington DC." }
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <AccordionItem value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-3xl px-8 overflow-hidden data-[state=open]:bg-white/10 data-[state=open]:border-accent/30 transition-all duration-300">
                      <AccordionTrigger className="text-left text-xl lg:text-2xl font-display font-bold text-white hover:text-accent py-8">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-slate-300 text-lg pb-8 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Contact Section - The Visual Centerpiece */}
      <section id="contact" className="py-0 relative overflow-hidden bg-primary">
        <div className="relative z-10 mt-20 mb-20 mx-4 lg:mx-8">
          <div className="max-w-[1400px] mx-auto bg-card rounded-[3rem] overflow-hidden flex flex-col xl:flex-row border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            
            {/* Contact Info (Left) */}
            <div className="bg-gradient-to-br from-secondary via-secondary to-primary p-12 lg:p-20 xl:w-5/12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-noise mix-blend-overlay opacity-50" />
              <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center shadow-2xl mb-12 transform -rotate-6">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-5xl md:text-6xl font-display font-black text-white mb-6 leading-[1.1]">
                  Let's protect your home.
                </h3>
                <p className="text-xl text-slate-300 mb-16">
                  Fast inspections. Honest pricing. No high-pressure sales tactics.
                </p>
                
                <div className="space-y-10">
                  <a href="tel:571-653-1241" className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-xs tracking-[0.2em] uppercase mb-2">24/7 Emergency Service</h4>
                      <p className="text-3xl font-display font-black text-white group-hover:text-accent transition-colors">(571) 653-1241</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-xs tracking-[0.2em] uppercase mb-2">Email</h4>
                      <p className="text-xl font-bold text-white">info@usastormroofing.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-400 text-xs tracking-[0.2em] uppercase mb-2">Headquarters</h4>
                      <p className="text-xl font-bold text-white">10306 Eaton Pl Suite 300<br/>Fairfax, VA 22030</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form (Right) */}
            <div className="p-12 lg:p-20 xl:w-7/12 bg-primary relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h3 className="text-4xl font-display font-black text-white mb-2">Request an Inspection</h3>
                <p className="text-slate-400 mb-10 text-lg">We typically respond within 15 minutes during business hours.</p>
                <div className="dark">
                  <ContactForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1a] pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-20">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-12 w-12 text-accent" />
              <div className="flex flex-col">
                <span className="font-display font-black text-3xl leading-none text-white tracking-tight">USA STORM</span>
                <span className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase leading-none mt-2">Roofing & Construction</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-bold uppercase tracking-widest text-slate-400">
              <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollTo('why-us')} className="hover:text-white transition-colors">Why Us</button>
              <button onClick={() => scrollTo('process')} className="hover:text-white transition-colors">Process</button>
              <button onClick={() => scrollTo('reviews')} className="hover:text-white transition-colors">Reviews</button>
              <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12 text-slate-500 text-sm font-medium">
            <p>
              © {new Date().getFullYear()} USA Storm Roofing and Construction Group. All rights reserved.
            </p>
            <div className="flex gap-4">
              <span>MD #162074</span>
              <span>•</span>
              <span>VA #2705187435</span>
              <span>•</span>
              <span>DC #410525000029</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
