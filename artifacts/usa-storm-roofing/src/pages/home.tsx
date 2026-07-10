import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  Check,
  CircleDollarSign,
  Clock3,
  Droplets,
  Hammer,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Users,
  Wind,
  X,
} from 'lucide-react';

const brand = {
  name: 'USA Storm Roofing and Construction Group',
  shortName: 'USA Storm Roofing',
  phone: '(571) 653-1241',
  phoneHref: 'tel:+15716531241',
  email: 'info@usastormroofing.com',
  address: '10306 Eaton Pl Suite 300, Fairfax, VA 22030',
  hours: 'Monday-Saturday 8:00AM-6:00PM',
  licenses: ['MD #162074', 'VA #2705187435', 'DC #410525000029'],
};

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'difference', label: 'Why Us' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

const quickStats = [
  { value: '1,800+', label: 'DMV homes restored' },
  { value: '$92M+', label: 'Claim value supported' },
  { value: '15+', label: 'Years of exterior expertise' },
];

const heroHighlights = [
  {
    id: 'roof',
    label: 'Roof Replacement',
    summary:
      'Premium shingle systems with clean tear-off, precise deck prep, and weather-tight installation that protects your home from day one.',
    badge: 'Most requested in Fairfax',
  },
  {
    id: 'storm',
    label: 'Storm Damage',
    summary:
      'Photo-documented inspections, urgent tarping when needed, and claim-ready scopes after hail or wind to keep your process moving fast.',
    badge: '24-48h response window',
  },
  {
    id: 'siding',
    label: 'Siding & Gutters',
    summary:
      'High-performance siding and seamless gutter upgrades that elevate curb appeal while improving drainage and long-term exterior durability.',
    badge: 'Financing options available',
  },
];

const featuredProjects = [
  {
    image: '/images/hero-roof.jpg',
    city: 'Fairfax, VA',
    title: 'Architectural Roof Renewal',
    details: ['5,700 sqft roof area', 'Insurance-backed scope', '2-day completion'],
    cta: 'View Project Scope',
    tag: 'Featured',
  },
  {
    image: '/images/storm-clouds.jpg',
    city: 'Rockville, MD',
    title: 'Post-Hail Exterior Recovery',
    details: ['Roof + siding package', 'Carrier-approved documentation', 'Code upgrade included'],
    cta: 'View Damage Report',
    tag: 'Storm',
  },
  {
    image: '/images/sunset-home.jpg',
    city: 'Arlington, VA',
    title: 'Premium Gutter + Window Retrofit',
    details: ['Seamless drainage design', 'Energy-efficient window set', 'Financing plan approved'],
    cta: 'View Upgrade Plan',
    tag: 'Modernization',
  },
];

const differenceItems = [
  {
    icon: CalendarClock,
    title: 'Rapid Site Visits',
    text: 'Same-day or next-day inspection scheduling with a documented walkthrough.',
  },
  {
    icon: ShieldCheck,
    title: 'Carrier-Ready Documentation',
    text: 'Photo reports, line items, and supplement-ready notes tailored for claims.',
  },
  {
    icon: Users,
    title: 'Single Point of Contact',
    text: 'One dedicated project lead from inspection through final cleanup.',
  },
  {
    icon: CircleDollarSign,
    title: 'Flexible Payment Paths',
    text: 'Insurance guidance plus financing options for non-claim work.',
  },
];

const serviceMix = [
  { icon: Home, title: 'Roof Replacements' },
  { icon: Wind, title: 'Storm Damage Repair' },
  { icon: Hammer, title: 'Siding Restoration' },
  { icon: Droplets, title: 'Gutter Systems' },
];

const team = [
  {
    image: '/images/team-inspection.jpg',
    name: 'Daniel Rivera',
    role: 'Senior Project Consultant',
    metric: '420+ roof scopes delivered',
  },
  {
    image: '/images/house-exterior.jpg',
    name: 'Maya Thompson',
    role: 'Insurance Support Specialist',
    metric: '$26M claim support in 2025',
  },
  {
    image: '/images/roofing-process.jpg',
    name: 'Chris Warren',
    role: 'Production Manager',
    metric: '98% on-schedule completions',
  },
  {
    image: '/images/storm-clouds.jpg',
    name: 'Lena Foster',
    role: 'Customer Success Lead',
    metric: '4.9 average homeowner rating',
  },
];

function scrollToId(id: string) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setSeo() {
  document.title = `${brand.shortName} | Storm Restoration & Exterior Specialists`;

  const setMeta = (name: string, content: string, property = false) => {
    const selector = property ? `meta[property=\"${name}\"]` : `meta[name=\"${name}\"]`;
    let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(property ? 'property' : 'name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  setMeta('description', 'USA Storm Roofing delivers premium roofing, siding, gutter, and storm restoration services across Virginia, Maryland, and Washington, DC.');
  setMeta('theme-color', '#0f1f2e');
  setMeta('og:title', `${brand.shortName} | Storm Restoration & Exterior Specialists`, true);
  setMeta('og:description', 'Book a documented exterior consultation with licensed experts serving the DMV.', true);
  setMeta('og:type', 'website', true);
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-2 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-full border border-[#2b4a62] bg-[linear-gradient(120deg,#123f4a,#16283c_52%,#111b2e)] shadow-[0_10px_36px_rgba(8,23,38,0.42)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <button type="button" onClick={() => scrollToId('top')} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a4d68] bg-[#11263b] text-[#f5f0e8]">
              <BadgeCheck className="h-4 w-4 text-[#8dc8f6]" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-[0.38em] text-[#aec2de]">USA Storm Roofing</div>
              <div className="text-[13px] font-medium text-[#f2f6ff]">Licensed Roofing Group</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#e4ecff] transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="hidden rounded-full bg-[#39b8ad] px-6 py-2.5 text-sm font-semibold text-[#06131b] transition hover:bg-[#46c6ba] md:inline-flex"
          >
            Book Now
          </button>

          <details className="relative md:hidden">
            <summary className="flex h-10 w-10 list-none items-center justify-center rounded-full border border-[#2b4a62] bg-[#11263b]/90 text-[#e8f3ff]">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-[#2b4a62] bg-[linear-gradient(130deg,#123f4a,#16283c_52%,#111b2e)] p-3 shadow-2xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    scrollToId(item.id);
                    const parent = document.activeElement?.closest('details') as HTMLDetailsElement | null;
                    if (parent) {
                      parent.open = false;
                    }
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-[#d4e4ff] transition hover:bg-white/10"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#39b8ad] px-3 py-2 text-sm font-semibold text-[#06131b]"
              >
                Book Now
              </button>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [activeHighlightId, setActiveHighlightId] = useState(heroHighlights[0].id);
  const chipsTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHighlightId((currentId) => {
        const currentIndex = heroHighlights.findIndex((item) => item.id === currentId);
        const nextIndex = (currentIndex + 1) % heroHighlights.length;
        return heroHighlights[nextIndex].id;
      });
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const track = chipsTrackRef.current;
    if (!track) {
      return;
    }

    let frameId = 0;
    let direction = 1;

    const animate = () => {
      if (!track.matches(':hover')) {
        track.scrollLeft += 0.45 * direction;

        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScrollLeft - 1) {
          direction = -1;
        } else if (track.scrollLeft <= 1) {
          direction = 1;
        }
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const activeHighlight = heroHighlights.find((item) => item.id === activeHighlightId) ?? heroHighlights[0];

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <img src="/images/sunset-home.jpg" alt="Luxury home exterior" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,31,46,0.93),rgba(15,31,46,0.55),rgba(12,23,34,0.9))]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#b9d6ec]">
            Storm-Ready Exterior Experts
          </div>
          <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-[#f4faff] sm:text-6xl xl:text-7xl">
            Protect Your
            <span className="block text-[#84cbff]">Dream Home</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#d6e8f6] sm:text-lg">
            Inspired by premium property experiences, rebuilt for roofing and restoration. Start with a documented consultation, clear scope, and a plan that fits your timeline.
          </p>

          <div className="mt-7 max-w-3xl rounded-2xl border border-white/15 bg-[#122b40]/70 p-4 backdrop-blur">
            <div
              ref={chipsTrackRef}
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {heroHighlights.map((item) => {
                const isActive = item.id === activeHighlight.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveHighlightId(item.id)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                      isActive
                        ? 'bg-[#2a9d8f] text-[#0f1f2e] shadow-[0_8px_30px_rgba(42,157,143,0.35)]'
                        : 'bg-white/10 text-[#cce3f4] hover:bg-white/20 hover:text-white'
                    }`}
                    style={{ flex: '0 0 auto' }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm leading-7 text-[#d6e8f6] transition-all duration-500">{activeHighlight.summary}</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#7ad2c8]/45 bg-[#2a9d8f]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#b3f0e7] transition-all duration-500">
              {activeHighlight.badge}
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/15 bg-[#122a3d]/75 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#7ad2c8]/70 hover:bg-[#163753]/85">
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-[#bdd6e8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-3xl border border-[#d6e6f2] bg-white p-6 shadow-[0_18px_40px_rgba(8,36,58,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#86a9c5]">About Us</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#11283d]">Fast. Clean. Reliable.</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#3f5d75]">
            Fairfax-based exterior specialists helping DMV homeowners move from damage to done with clear plans and premium workmanship.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#cfe0ee] bg-[#f2f8fd] p-4 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-2xl font-semibold text-[#10314d]">15+</div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[#56728b]">Years</div>
            </div>
            <div className="rounded-2xl border border-[#cfe0ee] bg-[#f2f8fd] p-4 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-2xl font-semibold text-[#10314d]">1,800+</div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[#56728b]">Homes Restored</div>
            </div>
            <div className="rounded-2xl border border-[#cfe0ee] bg-[#f2f8fd] p-4 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-2xl font-semibold text-[#10314d]">3</div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[#56728b]">Licensed States</div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2a9d8f] px-4 py-3 text-sm font-semibold text-[#0f1f2e] transition hover:-translate-y-0.5 hover:bg-[#37b8a7]"
            >
              Book Free Inspection <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={brand.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cfe0ee] bg-white px-4 py-3 text-sm font-semibold text-[#174d73] transition hover:-translate-y-0.5 hover:border-[#9bc3de]"
            >
              <Phone className="h-4 w-4" /> Talk To Team
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d6e6f2] bg-[#f2f8fd] p-5">
          <h3 className="text-xl font-semibold text-[#10253a]">Why Homeowners Choose Us</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-xl border border-[#d6e6f2] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#10314d]"><BadgeCheck className="h-4 w-4 text-[#2a9d8f]" /> Claim-Ready Documentation</div>
              <p className="mt-2 text-sm text-[#45627a]">Photos, notes, and scopes insurance teams can review quickly.</p>
            </div>
            <div className="rounded-xl border border-[#d6e6f2] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#10314d]"><Clock3 className="h-4 w-4 text-[#2a9d8f]" /> Fast Response Windows</div>
              <p className="mt-2 text-sm text-[#45627a]">Inspection scheduling typically within 24-48 hours.</p>
            </div>
            <div className="rounded-xl border border-[#d6e6f2] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#10314d]"><ShieldCheck className="h-4 w-4 text-[#2a9d8f]" /> Multi-State Licensed</div>
              <p className="mt-2 text-sm text-[#45627a]">Licensed and active across MD, VA, and DC markets.</p>
            </div>
            <div className="rounded-xl border border-[#d6e6f2] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#10314d]"><Users className="h-4 w-4 text-[#2a9d8f]" /> One Dedicated Lead</div>
              <p className="mt-2 text-sm text-[#45627a]">One contact from inspection through final cleanup.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#86a9c5]">Featured Work</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#11283d]">Exceptional Exterior Transformations</h2>
        </div>
        <button type="button" onClick={() => scrollToId('contact')} className="inline-flex items-center gap-2 text-sm font-semibold text-[#174d73] transition hover:text-[#2a9d8f]">
          Start Your Project <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <article key={project.title} className="overflow-hidden rounded-3xl border border-[#d6e6f2] bg-white shadow-[0_18px_40px_rgba(8,36,58,0.08)]">
            <div className="relative h-60">
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-[#11283d] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c3e4ff]">
                {project.tag}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-[#5f7b91]">
                <MapPin className="h-4 w-4" />
                {project.city}
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-[#10253a]">{project.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#3f5d75]">
                {project.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#2a9d8f]" />
                    {detail}
                  </li>
                ))}
              </ul>
              <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#174d73] transition hover:text-[#2a9d8f]">
                {project.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DifferenceSection() {
  return (
    <section id="difference" className="relative overflow-hidden border-y border-[#d3e2ee] bg-[#f2f8fd]">
      <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#8fd3ff]/25 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#84d8c5]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7497b4]">Why Choose Us</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#10253a]">The USA Storm Roofing Difference</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#3f5d75]">
            We combine field expertise, claim fluency, and premium execution so homeowners can move from uncertainty to a clear plan.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {serviceMix.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-[#d3e2ee] bg-white px-4 py-3 text-sm font-medium text-[#17354d]">
                <item.icon className="h-4 w-4 text-[#2a9d8f]" />
                {item.title}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {differenceItems.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#d3e2ee] bg-white p-5 shadow-[0_14px_30px_rgba(11,40,61,0.06)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e6f4ff] text-[#1f648f]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#10253a]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#47657d]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#86a9c5]">Our Team</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#11283d]">Meet Our Exterior Specialists</h2>
        <p className="mt-4 text-base leading-8 text-[#3f5d75]">
          Your project is led by specialists in inspection, claim support, production, and customer care.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((person) => (
          <article key={person.name} className="overflow-hidden rounded-3xl border border-[#d6e6f2] bg-white shadow-[0_14px_30px_rgba(11,40,61,0.06)]">
            <div className="h-48 overflow-hidden">
              <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#10253a]">{person.name}</h3>
              <p className="mt-1 text-sm text-[#4f6e86]">{person.role}</p>
              <p className="mt-3 text-sm font-medium text-[#1f648f]">{person.metric}</p>
              <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#174d73] hover:text-[#2a9d8f]">
                Contact Specialist <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="border-t border-[#d3e2ee] bg-[linear-gradient(to_bottom,#f8fcff,#eef5fb)] text-[#10253a]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#86a9c5]">Get In Touch</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#11283d]">Ready To Secure Your Property?</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#3f5d75]">
            Request a consultation and we will map your next best step, whether it is urgent storm response or a planned exterior upgrade.
          </p>

          <div className="mt-8 space-y-3">
            <a href={brand.phoneHref} className="flex items-center gap-3 rounded-2xl border border-[#d6e6f2] bg-white px-4 py-3 text-[#2f5068] transition hover:bg-[#f2f8fd]">
              <Phone className="h-4 w-4 text-[#7acdc2]" />
              <span>{brand.phone}</span>
            </a>
            <a href={`mailto:${brand.email}`} className="flex items-center gap-3 rounded-2xl border border-[#d6e6f2] bg-white px-4 py-3 text-[#2f5068] transition hover:bg-[#f2f8fd]">
              <Mail className="h-4 w-4 text-[#7acdc2]" />
              <span>{brand.email}</span>
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-[#d6e6f2] bg-white px-4 py-3 text-[#2f5068]">
              <MapPin className="h-4 w-4 text-[#7acdc2]" />
              <span>{brand.address}</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#d6e6f2] bg-white px-4 py-3 text-[#2f5068]">
              <Clock3 className="h-4 w-4 text-[#7acdc2]" />
              <span>{brand.hours}</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl border border-[#31475d] bg-[radial-gradient(circle_at_top,rgba(43,157,143,0.18),transparent_42%),linear-gradient(145deg,#121a23,#171f29_45%,#11161f)] p-6 shadow-[0_20px_50px_rgba(7,20,32,0.34)] sm:p-7">
          <h3 className="text-2xl font-semibold text-[#f2f8ff]">Schedule A Consultation</h3>
          <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <label className="text-sm text-[#d7e6f3]">
              Full Name
              <input className="mt-2 w-full rounded-xl border border-[#273746] bg-[#060a10] px-3.5 py-3 text-sm text-[#f4f9ff] placeholder:text-[#9ab0c2] focus:border-[#3ea99b] focus:outline-none" placeholder="Your full name" />
            </label>
            <label className="text-sm text-[#d7e6f3]">
              Phone Number
              <input className="mt-2 w-full rounded-xl border border-[#273746] bg-[#060a10] px-3.5 py-3 text-sm text-[#f4f9ff] placeholder:text-[#9ab0c2] focus:border-[#3ea99b] focus:outline-none" placeholder="(571) 000-0000" />
            </label>
            <label className="sm:col-span-2 text-sm text-[#d7e6f3]">
              Email
              <input className="mt-2 w-full rounded-xl border border-[#273746] bg-[#060a10] px-3.5 py-3 text-sm text-[#f4f9ff] placeholder:text-[#9ab0c2] focus:border-[#3ea99b] focus:outline-none" placeholder="you@example.com" />
            </label>
            <label className="sm:col-span-2 text-sm text-[#d7e6f3]">
              Property Address
              <input className="mt-2 w-full rounded-xl border border-[#273746] bg-[#060a10] px-3.5 py-3 text-sm text-[#f4f9ff] placeholder:text-[#9ab0c2] focus:border-[#3ea99b] focus:outline-none" placeholder="Street, city, state" />
            </label>
            <label className="sm:col-span-2 text-sm text-[#d7e6f3]">
              Tell Us About The Project
              <textarea className="mt-2 h-28 w-full resize-none rounded-xl border border-[#273746] bg-[#060a10] px-3.5 py-3 text-sm text-[#f4f9ff] placeholder:text-[#9ab0c2] focus:border-[#3ea99b] focus:outline-none" placeholder="Roof age, visible damage, timeline, and preferred contact method." />
            </label>
            <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#2a9d8f,#3cb4a5)] px-5 py-3 text-sm font-semibold text-[#06131b] transition hover:brightness-110">
              Request Consultation <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#2b4a62] bg-[radial-gradient(circle_at_top_left,rgba(43,157,143,0.2),transparent_38%),linear-gradient(125deg,#123f4a,#16283c_50%,#111b2e)] text-[#c7dded]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8fb4d3]">USA Storm Roofing</div>
          <p className="mt-3 max-w-md text-sm leading-7">
            Premium roofing, siding, gutters, and storm restoration across Northern Virginia, Maryland, and Washington, DC.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {brand.licenses.map((license) => (
              <span key={license} className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#d4e6f4]">
                {license}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8fb4d3]">Quick Links</h4>
          <div className="mt-3 space-y-2 text-sm">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollToId(item.id)} className="block text-left hover:text-white">
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8fb4d3]">Headquarters</h4>
          <div className="mt-3 space-y-2 text-sm">
            <p className="flex items-start gap-2"><Building2 className="mt-0.5 h-4 w-4 text-[#7acdc2]" /> {brand.address}</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#7acdc2]" /> {brand.phone}</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#7acdc2]" /> {brand.email}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2b4a62] px-4 py-4 text-center text-xs text-[#9fc2da] sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}

export default function HomePage() {
  useEffect(() => {
    setSeo();
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcff,#eef5fb)] text-[#10253a]">
      <Header />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <DifferenceSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
