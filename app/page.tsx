'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown, Shield, Zap, Award, Settings } from 'lucide-react';
import Lenis from 'lenis';

const IMG = {
  overheadBlack: "/images/closerra-premium-hero.png",
  vintageCloser: "/images/closerra-catalog-detail.png",
  chainCloser: "/images/closerra-catalog-detail.png",
  ryobiInstalled: "/images/closerra-installed-premium.png",
  gateCloser: "/images/closerra-premium-hero.png",
};

interface Product {
  id: number;
  name: string;
  category: string;
  model: string;
  description: string;
  image: string;
  heroImage: string;
  specs: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "RESIDENTIAL",
    category: "For Homes",
    model: "CR-100 Series",
    description: "Whisper-quiet hydraulic closer for luxury homes. The CR-100 mounts flush to the door head with a concealed arm mechanism — no visible piston, no unsightly linkage. Adjustable closing force, soft-close final sweep, and a brushed-gold finish that disappears into any premium door frame.",
    image: IMG.ryobiInstalled,
    heroImage: IMG.overheadBlack,
    specs: ["Adjustable closing force EN 1–2", "Soft-close hydraulics — silent final 15°", "Brushed gold / satin nickel / matte black", "Door weight up to 40 kg"]
  },
  {
    id: 2,
    name: "COMMERCIAL",
    category: "For Offices & Retail",
    model: "CC-300 Series",
    description: "The industry workhorse for busy office lobbies, retail entrances, and public buildings. ADA-compliant opening force with a backcheck valve that stops doors slamming open. Parallel-arm mounting means the closer sits above the frame — out of sight, in control.",
    image: IMG.overheadBlack,
    heroImage: IMG.ryobiInstalled,
    specs: ["500,000+ cycle guarantee", "ADA / EN 3–4 compliant", "Backcheck + delayed-action valves", "Hold-open arm available"]
  },
  {
    id: 3,
    name: "HEAVY DUTY",
    category: "Industrial & Warehouse",
    model: "CH-700 Series",
    description: "Forged marine-grade stainless body for loading docks, factories, and coastal environments. The CH-700 uses an oversized piston and anti-fatigue gear shaft rated to 1,000,000 cycles — the closest thing to permanent hardware you can bolt to a door.",
    image: IMG.chainCloser,
    heroImage: IMG.overheadBlack,
    specs: ["1,000,000+ cycle tested", "Marine-grade stainless steel body", "Wind-load rated 110 km/h", "EN 5–6 strength class, doors to 160 kg"]
  },
  {
    id: 4,
    name: "FIRE RATED",
    category: "Life Safety",
    model: "CF-FR90 Series",
    description: "When a fire door must close, no excuses are accepted. The CF-FR90 is UL 10C and CE certified to guarantee self-closing action within 2 seconds at temperatures from −20 °C to +70 °C. Fusible link optional for hold-open / smoke-release applications.",
    image: IMG.overheadBlack,
    heroImage: IMG.ryobiInstalled,
    specs: ["UL 10C & CE fire-door certified", "90 / 120 min fire rating", "Fusible link smoke-release option", "Self-close guarantee at any temperature"]
  },
  {
    id: 5,
    name: "GLASS DOOR",
    category: "Architectural Glazing",
    model: "CG-200 Series",
    description: "Zero visible hardware. The CG-200 is a concealed floor-spring closer that disappears beneath the finished floor under the door's pivot point. The only thing you see is the glass — and the flawless arc of its closing sweep.",
    image: IMG.vintageCloser,
    heroImage: IMG.chainCloser,
    specs: ["Concealed floor-spring — fully invisible", "10–12 mm toughened glass", "360° pivot rotation", "EN 2–3 rated, single and double action"]
  }
];

const features = [
  { icon: <Zap className="w-7 h-7" />, title: "Silent Final 15°", desc: "Our dual-piston oil-damping absorbs kinetic energy in the last 15° of travel — the zone where standard closers bang. The Closerra latch zone is inaudible.", stat: "< 28 dB", statLabel: "Operating noise" },
  { icon: <Award className="w-7 h-7" />, title: "1,000,000 Cycles", desc: "Every unit completes a 1-million-cycle durability test before leaving the factory. That is 137 years of daily office use without a single hydraulic service.", stat: "1M+", statLabel: "Cycles tested" },
  { icon: <Shield className="w-7 h-7" />, title: "Fire-Door Certified", desc: "Fire-rated series carry UL 10C, BS EN 1154, and CE certification. Guaranteed self-closing action from any temperature between −20 °C and +70 °C.", stat: "120 min", statLabel: "Max fire rating" },
  { icon: <Settings className="w-7 h-7" />, title: "6-Valve Precision", desc: "Six externally accessible hex valves control closing speed, latch speed, backcheck, delayed action, and hold-open — without removing the closer from the door.", stat: "6-valve", statLabel: "Precision control" },
];

const installSteps = [
  { step: "01", title: "Measure & Select", desc: "Measure door weight and width. Match to EN strength class (1–6) using our sizing chart. Wrong class = wrong close." },
  { step: "02", title: "Position Template", desc: "Tape the included paper drill template to the door face or frame. Mark and centre-punch the four mounting holes." },
  { step: "03", title: "Mount the Body", desc: "Fix the closer body with the supplied M6 bolts. The unit arrives pre-filled — no hydraulic oil required." },
  { step: "04", title: "Attach the Arm", desc: "Connect the parallel or regular arm to the frame bracket and tighten the pivot nut. Set arm geometry for your reveal depth." },
  { step: "05", title: "Calibrate Valves", desc: "Use the 3 mm hex key (included) to dial in closing speed, latch speed, and backcheck. Printed guide is on the body label." },
  { step: "06", title: "Test & Sign Off", desc: "Open the door to 90° and release 10 times. Confirm self-close. Sign and date the installation certificate — included in the box." },
];

const applications = [
  { label: "Luxury Residences", sub: "CR-100 Series", image: IMG.ryobiInstalled },
  { label: "5-Star Hotels", sub: "CC-300 Series", image: IMG.overheadBlack },
  { label: "Corporate Offices", sub: "CC-300 Series", image: IMG.vintageCloser },
  { label: "Hospitals", sub: "CF-FR90 Fire Rated", image: IMG.chainCloser },
  { label: "Schools", sub: "CF-FR90 Fire Rated", image: IMG.overheadBlack },
  { label: "Industrial", sub: "CH-700 Heavy Duty", image: IMG.ryobiInstalled },
];

export default function CloserrraWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', project: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const primaryContactFields: {
    label: string;
    type: React.HTMLInputTypeAttribute;
    key: 'name' | 'email';
    placeholder: string;
  }[] = [
    { label: "Name *", type: "text", key: "name", placeholder: "Your name" },
    { label: "Email *", type: "email", key: "email", placeholder: "your@email.com" },
  ];

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e: MouseEvent) => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisRef.current = lenis;
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.5 });
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#050505] text-white overflow-hidden">
      <div ref={cursorRef} className="custom-cursor" />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3">
          <img src="/logo.png" alt="Closerra" className="w-9 h-9 object-contain" />
          <span className="text-xl tracking-[5px] serif-heading">CLOSERRA</span>
        </button>
        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-widest">
          {['products','features','applications','installation','contact'].map(s => (
            <button key={s} onClick={() => scrollTo(s)} className="hover:text-[#C9A45A] transition-colors capitalize">{s}</button>
          ))}
        </div>
        <button onClick={() => scrollTo('contact')} className="hidden md:block px-8 py-3 border border-[#C9A45A] text-[#C9A45A] hover:bg-[#C9A45A] hover:text-black transition-all text-[11px] tracking-widest">GET A QUOTE</button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">{menuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-[#050505]/98 z-50 flex flex-col items-center justify-center gap-10">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-8"><X size={24}/></button>
          {['products','features','applications','installation','contact'].map(s => (
            <button key={s} onClick={() => scrollTo(s)} className="text-3xl serif-heading hover:text-[#C9A45A] transition-colors capitalize">{s}</button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100svh' }}>
        {/* BG: premium Closerra product visualization */}
        <div className="absolute inset-0">
          <img src={IMG.ryobiInstalled} alt="Premium hydraulic door closer installed on a commercial door" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/75 via-[#050505]/45 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(#C9A45A_0.5px,transparent_1px)] bg-[length:4px_4px] opacity-[0.05]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-28 pb-0">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="flex justify-center mb-6">
            <img src="/logo.png" alt="Closerra" className="w-24 h-24 object-contain" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C9A45A]/40 rounded-full text-[10px] tracking-[4px] text-[#C9A45A] mb-6">
              <span className="w-1.5 h-1.5 bg-[#C9A45A] rounded-full animate-pulse inline-block" />
              PREMIUM HYDRAULIC DOOR CLOSERS
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="serif-heading leading-[0.88] tracking-[-3px] mb-5" style={{ fontSize: 'clamp(52px, 11vw, 150px)' }}>
            CLOSERRA
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-[#B8B8B8] mb-3 max-w-xl mx-auto">Every door deserves a perfect close.</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="text-sm text-white/35 tracking-widest max-w-md mx-auto mb-10">
            Hydraulic overhead, concealed & floor-spring door closers — EN 1–6, UL & CE certified.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.button onClick={() => scrollTo('products')} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 180, damping: 14 }} className="group px-12 py-5 bg-white text-black flex items-center justify-center gap-3 text-xs font-medium tracking-widest hover:bg-[#C9A45A] transition-all">
              VIEW PRODUCTS <ArrowRight className="group-hover:translate-x-1 transition w-4 h-4" />
            </motion.button>
            <motion.button onClick={() => scrollTo('contact')} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 180, damping: 14 }} className="px-12 py-5 border border-white/30 text-xs tracking-widest hover:bg-white/5 transition-all">REQUEST QUOTE</motion.button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/10 bg-white/10">
            {[["1M+","Cycles Tested"],["15yr","Warranty"],["EN 1–6","All Classes"],["UL & CE","Certified"]].map(([n,l],i) => (
              <div key={i} className="bg-[#050505] py-6 px-4 text-center">
                <div className="text-2xl font-light text-[#C9A45A] serif-heading mb-1">{n}</div>
                <div className="text-[9px] tracking-[2px] text-white/40 uppercase">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <p className="text-[9px] tracking-widest text-white/30">SCROLL</p>
          <ChevronDown className="animate-bounce w-4 h-4 text-white/30" />
        </div>
      </section>

      {/* ── WHAT IS A DOOR CLOSER — with annotated premium product image ── */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-4">The Mechanism</div>
            <h2 className="serif-heading text-5xl leading-tight mb-6">Hydraulic<br />Precision,<br />Explained</h2>
            <p className="text-base text-[#B8B8B8] mb-5 leading-relaxed">
              A door closer is a spring-and-hydraulic device mounted at the top of a door that controls how it closes. When you push the door open, an internal rack-and-pinion gear winds a steel spring and pressurises the oil circuit. When you release the door, the spring drives it shut — but hydraulic fluid flowing through precision-metered valves slows that motion to a controlled, silent close.
            </p>
            <p className="text-base text-[#B8B8B8] leading-relaxed">
              The body (silver unit) bolts to the door face or frame. The arm links body to door frame and transmits closing force. Six external valves let you dial in exactly how the door behaves without touching the hydraulics.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[["6","Adjustment valves"],["±3°","Closing tolerance"],["15yr","Warranty"]].map(([n,l],i) => (
                <div key={i}>
                  <div className="text-3xl font-light text-[#C9A45A] serif-heading">{n}</div>
                  <div className="text-[10px] tracking-widest text-white/50 mt-1 uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Annotated premium door closer photo */}
          <div className="relative rounded-2xl overflow-hidden bg-zinc-900">
            <motion.img
              src={IMG.overheadBlack}
              alt="Black hydraulic door closer installed on a commercial door frame"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="w-full object-cover"
              style={{ aspectRatio: '4/3' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
            {/* Real annotation positions aligned to actual door closer in photo */}
            <div className="absolute top-[18%] left-[8%] flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C9A45A] rounded-full ring-4 ring-[#C9A45A]/20 animate-pulse" />
              <div className="text-[10px] tracking-[2px] text-[#C9A45A] bg-black/85 px-3 py-1.5 rounded border border-[#C9A45A]/30">HYDRAULIC BODY</div>
            </div>
            <div className="absolute top-[38%] right-[6%] flex items-center gap-2 flex-row-reverse">
              <div className="w-3 h-3 bg-[#C9A45A] rounded-full ring-4 ring-[#C9A45A]/20 animate-pulse" />
              <div className="text-[10px] tracking-[2px] text-[#C9A45A] bg-black/85 px-3 py-1.5 rounded border border-[#C9A45A]/30">PARALLEL ARM</div>
            </div>
            <div className="absolute top-[55%] left-[8%] flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C9A45A] rounded-full ring-4 ring-[#C9A45A]/20 animate-pulse" />
              <div className="text-[10px] tracking-[2px] text-[#C9A45A] bg-black/85 px-3 py-1.5 rounded border border-[#C9A45A]/30">VALVE PACK</div>
            </div>
            <div className="absolute bottom-5 right-5">
              <div className="text-[10px] tracking-widest text-white/40">Closerra precision hydraulic closer</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT TYPES: visual strip with premium Closerra imagery ── */}
      <section className="py-12 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-8 text-center">Door Closer Types</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Overhead Surface-Mount", desc: "Most common. Body bolts to door top, arm to frame.", img: IMG.overheadBlack },
              { label: "Commercial Arm Closer", desc: "Compact hydraulic control for high-frequency doors.", img: IMG.ryobiInstalled },
              { label: "Heritage Hydraulic", desc: "Traditional exposed closer for timber doors and retrofits.", img: IMG.vintageCloser },
              { label: "Linear Window/Door Closer", desc: "Slim controlled action for light duty openings.", img: IMG.chainCloser },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 210, damping: 20 }}
                className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 hover:border-[#C9A45A]/40 transition-all">
                <div className="aspect-square relative">
                  <img src={t.img} alt={t.label} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 bg-zinc-950" />
                </div>
                <div className="p-4 border-t border-white/10">
                  <div className="text-sm serif-heading mb-1">{t.label}</div>
                  <div className="text-[11px] text-white/50 leading-snug">{t.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-3">THE COLLECTION</div>
            <h2 className="serif-heading text-6xl leading-none">Five Series.<br />One Standard.</h2>
          </div>

          {/* Tab nav */}
          <div className="flex gap-0 mb-10 overflow-x-auto border border-white/10">
            {products.map((p, i) => (
              <motion.button key={p.id} onClick={() => setActiveProduct(i)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 190, damping: 20 }}
                className={`px-6 py-4 text-[10px] tracking-[2px] uppercase whitespace-nowrap transition-all border-r border-white/10 last:border-r-0 ${activeProduct === i ? 'bg-[#C9A45A] text-black font-medium' : 'hover:bg-white/5 text-white/60'}`}>
                {p.name}
              </motion.button>
            ))}
          </div>

          {/* Active product */}
          {products.map((product, idx) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: activeProduct === idx ? 1 : 0, y: activeProduct === idx ? 0 : 20 }}
              style={{ display: activeProduct === idx ? 'grid' : 'none' }}
              className="grid md:grid-cols-2 gap-12 items-start mb-16"
            >
              {/* LEFT: premium door closer product image */}
              <div>
                <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 mb-4">
                  <img
                    src={product.image}
                    alt={`${product.name} door closer — ${product.model}`}
                    className="w-full object-contain p-6"
                    style={{ aspectRatio: '4/3' }}
                  />
                  <div className="absolute top-4 left-4 text-[10px] tracking-[3px] text-[#C9A45A] border border-[#C9A45A]/40 px-3 py-1 bg-black/70">{product.model}</div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/70 px-2 py-1.5 rounded">
                    <img src="/logo.png" alt="Closerra" className="w-4 h-4 object-contain" />
                    <span className="text-[8px] tracking-widest text-white/50">CLOSERRA</span>
                  </div>
                </div>
                {/* Context image: where it's installed */}
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <img src={product.heroImage} alt="Installed door closer context" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-end p-4">
                    <div className="text-[10px] tracking-widest text-white/50">Typical installation context</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[#C9A45A] text-[10px] tracking-[3px] mb-2 uppercase">{product.category}</div>
                <h3 className="serif-heading text-5xl mb-2">{product.name}</h3>
                <p className="text-xs text-white/40 tracking-widest mb-5">{product.model}</p>
                <p className="text-base text-[#B8B8B8] mb-7 leading-relaxed">{product.description}</p>
                <ul className="space-y-3 mb-8">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-1 h-1 bg-[#C9A45A] rounded-full flex-shrink-0" />
                      <span className="text-white/80">{spec}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <button onClick={() => scrollTo('contact')} className="px-10 py-4 bg-[#C9A45A] text-black text-[11px] tracking-widest hover:bg-white transition-all font-medium">REQUEST QUOTE</button>
                  <button className="px-10 py-4 border border-white/20 text-[11px] tracking-widest hover:bg-white/5 transition-all">DATA SHEET</button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Thumbnail strip — all premium product photos */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveProduct(i)}
                className={`cursor-pointer relative rounded-xl overflow-hidden border-2 transition-all bg-zinc-950 ${activeProduct === i ? 'border-[#C9A45A]' : 'border-transparent hover:border-white/20'}`}
                style={{ aspectRatio: '1' }}
              >
                <img src={p.image} alt={p.name} className="w-full h-full object-contain p-3" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <div className="text-[7px] tracking-[2px] text-[#C9A45A] uppercase">{p.category}</div>
                  <div className="text-xs serif-heading">{p.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIDE THE CLOSER: annotated exploded-view style layout ── */}
      <section className="py-20 border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-3">Inside Every Closerra</div>
            <h2 className="serif-heading text-5xl">The Three Parts<br />That Matter</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: IMG.ryobiInstalled,
                label: "01",
                title: "The Hydraulic Body",
                desc: "Die-cast aluminium body houses a precision-ground rack-and-pinion gear, dual-stage spring, and sealed oil circuit rated to 1,000,000 cycles. Pre-filled at the factory — no oil service ever required."
              },
              {
                img: IMG.overheadBlack,
                label: "02",
                title: "The Arm Assembly",
                desc: "Forged steel arm transfers closing force from the body pivot to the door frame. Available in regular, parallel (top-jamb), and slide-track configurations to suit any door swing or frame profile."
              },
              {
                img: IMG.chainCloser,
                label: "03",
                title: "The 6-Valve Control Pack",
                desc: "Six independent hex-socket valves — all accessible without removing the closer — control closing speed, latch action, backcheck resistance, delayed action, and hold-open timing."
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="group">
                <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-white/10 group-hover:border-[#C9A45A]/30 transition-all mb-5">
                  <img src={item.img} alt={item.title} className="w-full object-contain p-6 group-hover:scale-105 transition-transform duration-700" style={{ aspectRatio: '4/3' }} />
                  <div className="absolute top-4 left-4 text-[#C9A45A] serif-heading text-2xl font-light">{item.label}</div>
                </div>
                <h3 className="serif-heading text-2xl mb-2">{item.title}</h3>
                <p className="text-sm text-[#B8B8B8] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Weight-to-EN class visual */}
          <div className="mt-14 grid md:grid-cols-2 gap-10 items-center border border-white/10 p-8">
            <div>
              <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-4">Selecting Your Strength Class</div>
              <h3 className="serif-heading text-3xl mb-5">Match Door Weight to EN Class</h3>
              <div className="space-y-4">
                {[
                  { l: "Light internal — up to 40 kg", c: "EN 1–2", w: "28%" },
                  { l: "Standard commercial — 40–80 kg", c: "EN 3–4", w: "52%" },
                  { l: "Heavy entrance — 80–120 kg", c: "EN 5", w: "75%" },
                  { l: "Extra-heavy industrial — to 160 kg", c: "EN 6", w: "100%" },
                ].map((r, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{r.l}</span>
                      <span className="text-[#C9A45A]">{r.c}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: r.w }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.15 }} className="h-full bg-gradient-to-r from-[#A67C2E] to-[#C9A45A] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Real door closer photo in a dark frame */}
            <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
              <img src={IMG.overheadBlack} alt="Hydraulic door closer product shot" className="w-full object-contain p-8" style={{ aspectRatio: '4/3' }} />
              <div className="absolute bottom-4 left-4">
                <div className="text-[9px] tracking-widest text-[#C9A45A] uppercase">Closerra CR-100 / CC-300</div>
                <div className="text-xs text-white/40">Available in all EN classes 1–6</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES / TECHNOLOGY ── */}
      <section id="features" className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-3">Why Closerra</div>
            <h2 className="serif-heading text-5xl">Core Technology</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border border-white/10 p-8 hover:border-[#C9A45A]/40 transition-all">
                <div className="text-[#C9A45A] mb-5">{f.icon}</div>
                <h3 className="serif-heading text-3xl mb-3">{f.title}</h3>
                <p className="text-sm text-[#B8B8B8] leading-relaxed mb-7">{f.desc}</p>
                <div className="flex items-baseline gap-3 pt-5 border-t border-white/10">
                  <div className="text-3xl font-light text-[#C9A45A] serif-heading">{f.stat}</div>
                  <div className="text-[10px] tracking-widest text-white/40 uppercase">{f.statLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section id="applications" className="py-20 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-3">Where Closerra Lives</div>
            <h2 className="serif-heading text-6xl">Built for<br />Every Space</h2>
            <p className="text-sm text-white/40 mt-3 max-w-lg">The right Closerra series for each environment — each pairing a door closer to its building context.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {applications.map((app, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55, type: 'spring', stiffness: 180, damping: 18 }}
                className="group relative overflow-hidden rounded-xl aspect-[4/3]">
                <img src={app.image} alt={app.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-5">
                  <div>
                    <div className="text-lg serif-heading">{app.label}</div>
                    <div className="text-[10px] tracking-widest text-[#C9A45A] mt-1">{app.sub}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selector table */}
          <div className="border border-white/10 p-8">
            <h3 className="serif-heading text-2xl mb-6 text-center">Application Selector</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-6 text-[10px] tracking-widest text-[#C9A45A] uppercase">Application</th>
                    <th className="text-left py-3 pr-6 text-[10px] tracking-widest text-white/40 uppercase">Closer Series</th>
                    <th className="text-left py-3 pr-6 text-[10px] tracking-widest text-white/40 uppercase">EN Class</th>
                    <th className="text-left py-3 text-[10px] tracking-widest text-white/40 uppercase">Fire Rated?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["Internal house door","CR-100 Residential","EN 1–2","Optional"],
                    ["Office entrance — medium traffic","CC-300 Commercial","EN 3–4","Optional"],
                    ["Retail / hotel lobby","CC-300 Commercial","EN 4–5","Yes"],
                    ["Hospital / school corridor","CF-FR90 Fire Rated","EN 4","Yes — required"],
                    ["Warehouse / factory door","CH-700 Heavy Duty","EN 5–6","Optional"],
                    ["Frameless glass partition","CG-200 Glass Door","EN 2–3","No"],
                  ].map(([app,rec,en,fire],i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 pr-6 text-white/80">{app}</td>
                      <td className="py-3.5 pr-6 text-[#C9A45A]">{rec}</td>
                      <td className="py-3.5 pr-6 text-white/50">{en}</td>
                      <td className="py-3.5 text-white/50">{fire}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTALLATION ── */}
      <motion.section id="installation" className="py-20 border-t border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9 }}>
              <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-3">Simple. Precise. Done.</div>
              <h2 className="serif-heading text-5xl leading-tight mb-5">Six Steps<br />to Perfect<br />Closure</h2>
              <p className="text-[#B8B8B8] text-base leading-relaxed mb-8">
                Every Closerra ships with a complete kit: drill template, M6 bolts, 3 mm hex key, arm bracket, installation certificate. Standard fit time under 30 minutes.
              </p>
              {/* Real product image: slide-rail closer */}
              <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
                <img src={IMG.ryobiInstalled} alt="Installed hydraulic door closer product photo" className="w-full object-contain p-6" style={{ aspectRatio: '4/3' }} />
                <div className="absolute bottom-4 left-4">
                  <div className="text-[9px] tracking-widest text-[#C9A45A] uppercase">Closerra CH-700 Heavy Duty</div>
                  <div className="text-xs text-white/40">Slide-rail mount — installation ready</div>
                </div>
              </motion.div>
            </motion.div>
            <div>
              {installSteps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex gap-7 py-7 border-b border-white/10 last:border-b-0 -mx-4 px-4 hover:bg-white/[0.02] rounded transition-colors">
                  <div className="text-[#C9A45A] serif-heading text-2xl font-light w-8 flex-shrink-0">{step.step}</div>
                  <div>
                    <div className="text-base font-medium mb-1.5">{step.title}</div>
                    <div className="text-sm text-[#B8B8B8] leading-relaxed">{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── STATS ── */}
      <motion.section className="py-20 border-t border-white/10 bg-black/30"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9 }}>
            <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-3">By the Numbers</div>
            <h2 className="serif-heading text-5xl leading-tight mb-5">Built to Outlast<br />the Building</h2>
            <p className="text-[#B8B8B8] text-base leading-relaxed mb-8">Over 2.4 million units shipped to 47 countries since 2009. Every unit pressure-tested individually before despatch from our ISO 9001:2015-certified factory.</p>
            <div className="grid grid-cols-2 gap-4">
              {[["2.4M+","Units shipped"],["47","Countries"],["ISO 9001","Certified"],["2009","Founded"]].map(([n,l],i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className="border border-white/10 p-5">
                  <div className="text-2xl font-light text-[#C9A45A] serif-heading mb-1">{n}</div>
                  <div className="text-[10px] tracking-widest text-white/40 uppercase">{l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.9, delay: 0.1 }} className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10">
            <img src={IMG.overheadBlack} alt="Closerra hydraulic door closer installed" className="w-full h-full object-cover opacity-70" style={{ aspectRatio: '3/4' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-6 right-6 border border-[#C9A45A]/30 p-5 bg-black/70 backdrop-blur">
              <div className="flex items-center gap-3 mb-2">
                <img src="/logo.png" alt="Closerra" className="w-6 h-6 object-contain" />
                <div className="text-[10px] tracking-widest text-[#C9A45A] uppercase">Quality Promise</div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">Every unit is hydraulic pressure-tested and 10,000-cycle verified before leaving our factory.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── FAQ ── */}
      <motion.section className="py-20 border-t border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-3">Common Questions</div>
            <h2 className="serif-heading text-5xl">FAQ</h2>
          </div>
          <div>
            {[
              { q: "What EN strength class do I need?", a: "EN class is determined by door weight and width. EN 1–2 for light internal doors up to 40 kg. EN 3–4 for standard commercial up to 80 kg. EN 5–6 for heavy-duty doors up to 160 kg. Use our selector table, or call our technical team." },
              { q: "What is the difference between a regular arm and a parallel arm?", a: "A regular arm mounts the closer on the push side of the door, with the arm visible on the pull side. A parallel arm mounts on the door head and is nearly invisible from the corridor — ideal for lobbies and high-end commercial interiors." },
              { q: "Do your closers comply with ADA accessibility standards?", a: "Yes. Our CC-300 Commercial and CF-FR90 Fire Rated series are factory-set to a maximum 5 lbf (22 N) opening force at 90° — compliant with ADA, BS 8300, and EN 1154." },
              { q: "How do I adjust the closing speed after installation?", a: "Use the supplied 3 mm hex key on the six external valve screws on the body. One clockwise turn slows, one counter-clockwise speeds. No disassembly needed. The valve guide is printed on the body label." },
              { q: "Can I use a Closerra on a fire door?", a: "The CF-FR90 series is specifically designed and UL 10C / CE certified for fire-door applications. It must be installed per the fire-door listing. Other series must not be used on fire-rated assemblies." },
              { q: "What is included in the 15-year warranty?", a: "Hydraulic failure, spring fatigue, and valve malfunction under normal use. Excludes physical damage from misuse or incorrect installation. Register at closerra.com/warranty within 30 days of installation." },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CONTACT ── */}
      <motion.section id="contact" className="py-20 border-t border-white/10 bg-black/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="text-[#C9A45A] text-[10px] tracking-[4px] uppercase mb-3">Get in Touch</div>
              <h2 className="serif-heading text-5xl leading-tight mb-5">Request<br />a Quote</h2>
              <p className="text-[#B8B8B8] text-base leading-relaxed mb-10">Tell us about your project and we will recommend the right series, provide a technical data sheet, and send a quote within one business day.</p>
              <div className="space-y-5 text-sm text-white/60 mb-10">
                <div>
                  <div className="text-[10px] tracking-widest text-[#C9A45A] mb-1 uppercase">Sales & Technical</div>
                  <div>sales@closerra.com</div>
                  <div>+49 7221 938 000</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-widest text-[#C9A45A] mb-1 uppercase">Factory & HQ</div>
                  <div>Schlossberg 14, 76530 Baden-Baden, Germany</div>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                {["UL Listed","CE Mark","EN 1154","ISO 9001","ADA"].map(c => (
                  <div key={c} className="px-3 py-1.5 border border-[#C9A45A]/30 text-[10px] tracking-widest text-[#C9A45A]">{c}</div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <img src="/logo.png" alt="" className="w-16 h-16 object-contain mb-5" />
                  <div className="serif-heading text-3xl mb-3">Inquiry Received</div>
                  <p className="text-[#B8B8B8] text-sm">We will be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {primaryContactFields.map(({ label, type, key, placeholder }) => (
                      <div key={key}>
                        <label className="text-[10px] tracking-widest text-white/40 uppercase mb-2 block">{label}</label>
                        <input required={label.includes('*')} type={type} value={formData[key]} onChange={e => setFormData({...formData,[key]:e.target.value})}
                          className="w-full bg-transparent border border-white/20 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A45A] transition-colors" placeholder={placeholder} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] tracking-widest text-white/40 uppercase mb-2 block">Phone</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData,phone:e.target.value})}
                        className="w-full bg-transparent border border-white/20 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A45A] transition-colors" placeholder="+1 555 000 0000" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest text-white/40 uppercase mb-2 block">Project Type</label>
                      <select value={formData.project} onChange={e => setFormData({...formData,project:e.target.value})}
                        className="w-full bg-[#050505] border border-white/20 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A45A] transition-colors text-white/60">
                        <option value="">Select…</option>
                        {["Residential","Commercial Office","Hotel / Hospitality","Healthcare","Industrial","Architectural / Glass","Other"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest text-white/40 uppercase mb-2 block">Project Details *</label>
                    <textarea required value={formData.message} onChange={e => setFormData({...formData,message:e.target.value})}
                      rows={5} className="w-full bg-transparent border border-white/20 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A45A] transition-colors resize-none"
                      placeholder="Number of doors, door weight/width, fire rating required, timeline…" />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#C9A45A] text-black text-[11px] tracking-[3px] uppercase hover:bg-white transition-all font-medium">SEND INQUIRY</button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <motion.footer className="border-t border-white/10 py-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Closerra" className="w-9 h-9 object-contain" />
              <span className="text-xl tracking-[5px] serif-heading">CLOSERRA</span>
            </div>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed mb-4">Premium hydraulic door closers trusted by architects, contractors, and facility managers in 47 countries.</p>
            <div className="text-[10px] tracking-widest text-white/25 uppercase">ISO 9001 · UL · CE · EN 1154</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.05 }}>
            <div className="text-[10px] tracking-[3px] text-[#C9A45A] uppercase mb-4">Products</div>
            <div className="flex flex-col gap-2.5 text-sm text-white/50">
              {products.map(p => <a key={p.id} href="#" className="hover:text-[#C9A45A] transition-colors">{p.name} — {p.model}</a>)}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="text-[10px] tracking-[3px] text-[#C9A45A] uppercase mb-4">Company</div>
            <div className="flex flex-col gap-2.5 text-sm text-white/50">
              {["About Closerra","Technical Support","Warranty Registration","Distributor Network","Download Datasheets"].map(l => (
                <a key={l} href="#" className="hover:text-[#C9A45A] transition-colors">{l}</a>
              ))}
            </div>
            <div className="mt-7">
              <div className="text-[10px] tracking-[3px] text-[#C9A45A] uppercase mb-3">Newsletter</div>
              <div className="flex">
                <input type="email" placeholder="Email" className="bg-transparent border border-white/20 px-4 py-2.5 flex-1 text-sm focus:outline-none focus:border-[#C9A45A] min-w-0" />
                <button className="px-4 border border-white/20 hover:bg-white/5 text-[#C9A45A]">→</button>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }} className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-white/30">© {new Date().getFullYear()} Closerra GmbH. All Rights Reserved.</div>
          <div className="flex gap-6 text-xs text-white/30">
            {["Privacy Policy","Terms of Sale","Imprint"].map(l => <a key={l} href="#" className="hover:text-white/60">{l}</a>)}
          </div>
        </motion.div>
      </motion.footer>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full text-left py-5 flex items-start justify-between gap-6 hover:text-[#C9A45A] transition-colors">
        <span className="text-sm font-medium">{question}</span>
        <span className={`text-[#C9A45A] flex-shrink-0 transition-transform text-lg ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <div className="pb-5 text-sm text-[#B8B8B8] leading-relaxed">{answer}</div>}
    </motion.div>
  );
}
