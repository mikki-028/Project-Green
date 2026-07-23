import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-greenhouse.jpg";
import aboutImg from "@/assets/about-owner.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import t1before from "@/assets/transform-1-before.jpg";
import t1after from "@/assets/transform-1-after.jpg";
import t2before from "@/assets/transform-2-before.jpg";
import t2after from "@/assets/transform-2-after.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import pMonstera from "@/assets/plant-monstera.jpg";
import pAreca from "@/assets/plant-areca.jpg";
import pPeace from "@/assets/plant-peace-lily.jpg";
import pSnake from "@/assets/plant-snake.jpg";
import pPothos from "@/assets/plant-pothos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Egrow — Plants, Pottery & Green Space Design" },
      { name: "description", content: "A modern nursery for healthy plants, handcrafted pottery, and expert guidance. Transform your balcony, terrace, and home into a green retreat." },
      { property: "og:title", content: "Egrow — Bring Nature Home" },
      { property: "og:description", content: "Healthy plants. Beautiful pottery. Expert guidance. Visit our nursery or let us design your green space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="home" className="relative min-h-screen overflow-x-hidden bg-ivory text-charcoal">
      <Nav />
      <Hero />
      <div className="relative">
        <VineSpine />
        <About />
        <WhyEgrow />
        <GrowingStories />
        <PlantCalendar />
        <Transform />
        <Gallery />
        <PlanVisit />
      </div>
      <Footer />
    </div>
  );
}

/* ---------------- Small primitives ---------------- */

function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16Z" />
      <path d="M4 20 14 10" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 eyebrow">
      <Leaf className="h-3.5 w-3.5 text-olive" />
      <span>{children}</span>
    </div>
  );
}

/* ---------------- Vine Spine ---------------- */

function VineSpine() {
  // A quiet climbing vine that lives behind content on the left column.
  // Not decorative border, not repeating: sparse at the top, a few offshoots
  // through the middle, a small bud near the bottom.
  const VB_W = 120;
  const VB_H = 3000;

  // Hand-tuned leaf placements along the stem. `t` is a rough vertical
  // position (0..1); `side` picks which side of the stem the leaf sits on;
  // `size` and `rot` add natural variance; `hue` picks a muted sage tone.
  type LeafSpec = { t: number; side: -1 | 1; size: number; rot: number; hue: string; opacity: number };
  const leaves: LeafSpec[] = [
    // sparse top
    { t: 0.04, side:  1, size: 8,  rot:  20, hue: "#9DB48E", opacity: 0.55 },
    { t: 0.09, side: -1, size: 7,  rot: -35, hue: "#A8C69F", opacity: 0.5 },
    { t: 0.16, side:  1, size: 9,  rot:  15, hue: "#8FA982", opacity: 0.6 },
    // developing middle
    { t: 0.24, side: -1, size: 10, rot: -25, hue: "#9DB48E", opacity: 0.65 },
    { t: 0.30, side:  1, size: 11, rot:  30, hue: "#8FA982", opacity: 0.6 },
    { t: 0.36, side: -1, size: 9,  rot: -15, hue: "#A8C69F", opacity: 0.55 },
    { t: 0.43, side:  1, size: 12, rot:  22, hue: "#8FA982", opacity: 0.7 },
    { t: 0.49, side: -1, size: 10, rot: -32, hue: "#9DB48E", opacity: 0.6 },
    { t: 0.55, side:  1, size: 9,  rot:  18, hue: "#A8C69F", opacity: 0.55 },
    { t: 0.62, side: -1, size: 11, rot: -20, hue: "#8FA982", opacity: 0.65 },
    { t: 0.69, side:  1, size: 10, rot:  28, hue: "#9DB48E", opacity: 0.6 },
    // easing toward the end
    { t: 0.77, side: -1, size: 9,  rot: -18, hue: "#A8C69F", opacity: 0.55 },
    { t: 0.84, side:  1, size: 8,  rot:  22, hue: "#9DB48E", opacity: 0.5 },
    { t: 0.92, side: -1, size: 7,  rot: -28, hue: "#8FA982", opacity: 0.55 },
  ];

  // Approximate stem x(y) so leaves attach to the stem itself, not to a
  // fixed column. Matches the cubic curve d="..." below closely enough.
  const stemX = (y: number) => {
    const cx = VB_W / 2;
    return cx + Math.sin(y / 260) * 10 + Math.sin(y / 90) * 2.4;
  };

  // Single wandering stem — gentle organic curves, no repeating pattern.
  const stemD = (() => {
    const pts: string[] = [];
    const step = 40;
    for (let y = 0; y <= VB_H; y += step) {
      const x = stemX(y);
      pts.push(`${y === 0 ? "M" : "L"}${x.toFixed(2)} ${y}`);
    }
    return pts.join(" ");
  })();

  // Two small offshoots through the middle.
  const offshoots = [
    { y: 900, dir: -1, len: 46 },
    { y: 1780, dir: 1, len: 52 },
  ];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute top-0 z-0 hidden h-full w-[110px] md:block"
      style={{ left: "24px" }}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Main climbing stem */}
      <path
        d={stemD}
        stroke="#7A9A6B"
        strokeOpacity="0.42"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />

      {/* Subtle inner highlight on stem for hand-drawn feel */}
      <path
        d={stemD}
        stroke="#B7CDAA"
        strokeOpacity="0.18"
        strokeWidth="0.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Middle offshoots */}
      {offshoots.map((o, i) => {
        const x0 = stemX(o.y);
        const x1 = x0 + o.dir * o.len;
        const midX = x0 + o.dir * (o.len * 0.55);
        const midY = o.y + 22;
        return (
          <g key={`off-${i}`}>
            <path
              d={`M${x0} ${o.y} Q ${midX} ${midY} ${x1} ${o.y + 40}`}
              stroke="#8FA982"
              strokeOpacity="0.35"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
            />
            {/* tiny leaf at tip of offshoot */}
            <g transform={`translate(${x1} ${o.y + 40}) rotate(${o.dir * 25})`}>
              <path
                d="M0 0 C 5 -3, 11 -2, 13 3 C 11 6, 5 6, 0 3 Z"
                fill="#9DB48E"
                opacity="0.55"
              />
            </g>
          </g>
        );
      })}

      {/* Alternating leaves along the stem */}
      {leaves.map((l, i) => {
        const y = l.t * VB_H;
        const x = stemX(y);
        const rot = l.rot + (l.side === -1 ? 180 : 0);
        return (
          <g key={`leaf-${i}`} transform={`translate(${x} ${y}) rotate(${rot})`}>
            {/* petiole */}
            <path
              d={`M0 0 L ${l.size * 0.35} 0`}
              stroke="#7A9A6B"
              strokeOpacity="0.4"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
            {/* leaf blade */}
            <path
              d={`M${l.size * 0.35} 0
                  C ${l.size * 0.9} ${-l.size * 0.55},
                    ${l.size * 1.7} ${-l.size * 0.35},
                    ${l.size * 2.1} ${l.size * 0.15}
                  C ${l.size * 1.7} ${l.size * 0.55},
                    ${l.size * 0.9} ${l.size * 0.55},
                    ${l.size * 0.35} 0 Z`}
              fill={l.hue}
              opacity={l.opacity}
            />
            {/* midrib */}
            <path
              d={`M${l.size * 0.35} 0 L ${l.size * 2.0} ${l.size * 0.1}`}
              stroke="#4F6B44"
              strokeOpacity="0.28"
              strokeWidth="0.35"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Fresh sprout / bud near the very bottom */}
      {(() => {
        const y = VB_H - 90;
        const x = stemX(y);
        return (
          <g transform={`translate(${x} ${y})`}>
            <path
              d="M0 0 C 2 -14, 8 -22, 14 -22"
              stroke="#8FA982"
              strokeOpacity="0.5"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
            />
            {/* bud */}
            <path
              d="M14 -22 c 2 -4, 8 -4, 9 0 c -2 4, -7 4, -9 0 Z"
              fill="#B7CDAA"
              opacity="0.75"
            />
            <circle cx="18" cy="-22" r="1.2" fill="#6B8E5A" opacity="0.55" />
          </g>
        );
      })()}
    </svg>
  );
}

/* ---------------- Nav ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md bg-ivory/80 border-b border-forest/10" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2">
          <Leaf className={`h-6 w-6 ${scrolled ? "text-forest" : "text-ivory"}`} />
          <span className={`font-serif text-2xl leading-none ${scrolled ? "text-forest" : "text-ivory"}`}>Egrow</span>
        </a>
        <nav className={`hidden items-center gap-8 text-sm md:flex ${scrolled ? "text-forest" : "text-ivory"}`}>
          <a href="#home" className="hover:text-olive transition">Home</a>
          <a href="#about" className="hover:text-olive transition">About</a>
          <a href="#stories" className="hover:text-olive transition">Stories</a>
          <a href="#calendar" className="hover:text-olive transition">Calendar</a>
          <a href="#gallery" className="hover:text-olive transition">Gallery</a>
          <a href="#contact" className="hover:text-olive transition">Contact</a>
        </nav>
        <a href="#contact" className="btn-ghost hidden md:inline-flex">Plan Your Green Space</a>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Sunlit greenhouse filled with lush plants" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center text-ivory fade-up">
        <p className="mb-6 flex items-center justify-center gap-2 text-[0.7rem] uppercase tracking-[0.35em] text-ivory/85">
          <Leaf className="h-3.5 w-3.5" /> Welcome to Egrow
        </p>
        <h1 className="font-serif text-6xl leading-[1.02] tracking-tight text-ivory md:text-8xl">
          Bring Nature <em className="not-italic block font-light">Home.</em>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-base text-ivory/85 md:text-lg">
          Healthy Plants. Beautiful Pottery. Expert Guidance.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#visit" className="btn-primary">Visit Nursery</a>
          <a href="#stories" className="btn-ghost">Buy Plants</a>
          <a href="#transform" className="text-ivory border-b border-ivory pb-1 text-sm hover:text-moss hover:border-moss transition">
            Transform Your Space →
          </a>
        </div>
      </div>
      {/* soft ivory wave */}
      <svg viewBox="0 0 1440 120" className="absolute -bottom-1 left-0 right-0 w-full text-ivory" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,64 C240,120 480,20 720,48 C960,76 1200,120 1440,72 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
}

/* ---------------- About ---------------- */

function About() {
  const timeline = [
    { year: "2020", title: "The Beginning", note: "A small dream takes root." },
    { year: "2021", title: "First Nursery", note: "Our first green space." },
    { year: "2024", title: "Growing Together", note: "More plants, more hearts." },
    { year: "2026", title: "And Beyond", note: "Continuing to grow, together." },
  ];
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-8 md:grid-cols-12 md:gap-8 lg:px-12">
        <div className="md:col-span-4">
          <div className="relative mx-auto max-w-[360px]">
            <div className="overflow-hidden rounded-t-[220px] rounded-b-[220px] shadow-xl">
              <img src={aboutImg} alt="Egrow founder tending plants" className="h-[520px] w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="md:col-span-5">
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="mt-3 font-serif text-5xl leading-[1.1] md:text-6xl">
            From a Passion,<br />To a Green Legacy.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal/80">
            What began as a small dream to bring more plants into people's lives has grown into a space filled with greenery, learning and love. Every plant we tend is chosen for how it makes a home feel.
          </p>
          <a href="#stories" className="btn-link mt-5">Know Our Journey →</a>
        </div>
        <div className="md:col-span-3">
          <ol className="relative border-l border-olive/30 pl-6">
            {timeline.map((t, i) => (
              <li key={i} className="relative mb-4 last:mb-0">
                <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full border border-olive bg-ivory">
                  <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                </span>
                <div className="text-sm text-olive">{t.year}</div>
                <div className="mt-1 font-serif text-lg text-forest">{t.title}</div>
                <div className="text-sm text-charcoal/70">{t.note}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Egrow ---------------- */

function WhyEgrow() {
  const items = [
    { title: "Handpicked Plants", note: "Every plant chosen with care and intention.", icon: IconLeaflet },
    { title: "Wide Variety", note: "From rare foliage to everyday favourites.", icon: IconBranch },
    { title: "Premium Quality", note: "Nurtured with expertise for a strong start.", icon: IconPot },
    { title: "Expert Guidance", note: "We help you grow with confidence.", icon: IconHands },
    { title: "Local & Trusted", note: "A neighbourhood nursery, proudly rooted.", icon: IconHeart },
  ];
  return (
    <section className="relative bg-sage py-20">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Why Egrow</Eyebrow>
          <h2 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">More Than Just Plants.</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={i} className="group text-center transition-transform duration-500 hover:-translate-y-1">
                <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full border border-olive/30 text-olive transition-all group-hover:bg-ivory group-hover:shadow-lg">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="font-serif text-lg text-forest">{it.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-charcoal/75">{it.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IconLeaflet({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 34C10 34 6 26 6 18c8 0 14 4 14 16Z"/><path d="M20 34c10 0 14-8 14-16-8 0-14 4-14 16Z"/><path d="M20 34V14"/></svg>;
}
function IconBranch({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 34V6"/><path d="M20 14c-4-2-8-2-12 0"/><path d="M20 22c4-2 8-2 12 0"/><path d="M20 28c-3-1-6-1-8 0"/></svg>;
}
function IconPot({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 20h16l-2 14H14z"/><path d="M20 20c0-6 4-10 8-10-2 6-4 10-8 10Z"/><path d="M20 20c0-4-3-8-7-9 1 5 3 9 7 9Z"/></svg>;
}
function IconHands({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 22c2-2 6-2 8 0 3-3 8-3 10 0 3-2 6-2 8 0"/><path d="M20 22V8"/><path d="M17 12l3-4 3 4"/></svg>;
}
function IconHeart({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 32s-12-7-12-16a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 9-12 16-12 16Z"/></svg>;
}

/* ---------------- Growing Stories ---------------- */

function GrowingStories() {
  const stories = [
    { tag: "Editor's Pick", title: "Our Bestselling Plant", img: story1, heights: [520, 380], body: "A vibrant Calathea Triostar that brings colour and calm to any corner. Beloved for its striking foliage and easy temperament." },
    { tag: "Style Guide", title: "Pottery That Completes Your Space", img: story2, heights: [420, 480], body: "Handcrafted stoneware and terracotta shaped by local artisans. Chosen to complement plants, not compete with them." },
    { tag: "Plant Guide", title: "Beginner's Favourite", img: story3, heights: [560, 340], body: "A humble Pothos on a sunlit windowsill — the perfect first plant. Forgiving, generous, and endlessly rewarding." },
  ];
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="stories" className="relative py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mb-12 text-center">
          <Eyebrow>Growing Stories</Eyebrow>
          <h2 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">Stories That Inspire Growth.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {stories.map((s, i) => {
            const isActive = active === i;
            const isDimmed = active !== null && active !== i;
            const colSpan = active === null ? "md:col-span-4" : isActive ? "md:col-span-8" : "md:col-span-2";
            const h = active === null ? s.heights[i % 2] : isActive ? 620 : 360;
            return (
              <button
                key={i}
                onClick={() => setActive(isActive ? null : i)}
                className={`group relative overflow-hidden rounded-3xl text-left transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${colSpan} ${isDimmed ? "opacity-70" : ""}`}
                style={{ height: `${h}px` }}
              >
                <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-ivory">
                  <div className="text-[0.7rem] uppercase tracking-[0.25em] text-ivory/80">{s.tag}</div>
                  <div className="mt-2 font-serif text-2xl md:text-3xl">{s.title}</div>
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="max-w-lg text-sm leading-relaxed text-ivory/90">{s.body}</p>
                    <span className="mt-4 inline-block border-b border-ivory pb-0.5 text-xs">Read the full story →</span>
                  </div>
                  {!isActive && <span className="mt-4 text-xs text-ivory/80">Read More →</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Plant Calendar ---------------- */

function PlantCalendar() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthCopy: Record<string, string> = {
    Jan: "Crisp days, quiet growth.", Feb: "Late winter light.", Mar: "Fresh starts begin.",
    Apr: "Blooms awakening.", May: "Vibrant new leaves.", Jun: "Warm days call for vibrant greens.",
    Jul: "Lush summer canopy.", Aug: "Full and generous growth.", Sep: "Golden softening light.",
    Oct: "Amber and rest.", Nov: "Turning inward.", Dec: "Evergreen and calm.",
  };
  const plants = [
    { name: "Monstera", note: "Thrives in warmth", img: pMonstera, care: "Bright indirect light. Water when top soil is dry." },
    { name: "Areca Palm", note: "Air purifying", img: pAreca, care: "Filtered sun. Keep soil lightly moist." },
    { name: "Peace Lily", note: "Elegant & hardy", img: pPeace, care: "Low to medium light. Weekly watering." },
    { name: "Snake Plant", note: "Low maintenance", img: pSnake, care: "Any light. Water sparingly." },
    { name: "Pothos", note: "Easy to grow", img: pPothos, care: "Adapts anywhere. Let it trail." },
  ];
  const [month, setMonth] = useState(5); // Jun
  const [flip, setFlip] = useState(false);
  const change = (i: number) => {
    if (i === month) return;
    setFlip(true);
    setTimeout(() => { setMonth(i); setFlip(false); }, 350);
  };
  return (
    <section id="calendar" className="relative bg-sage py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Plant Calendar</Eyebrow>
            <h2 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">The Right Plant, Right Month.</h2>
            <p className="mt-3 max-w-sm text-charcoal/80">
              Every plant has its season to shine. Turn the pages of our botanical journal to find the perfect green companion for every month of the year.
            </p>
            <a href="#gallery" className="btn-primary mt-4">Explore All Months →</a>
          </div>
          <div className="md:col-span-8">
            {/* book */}
            <div className="relative mx-auto max-w-3xl [perspective:2000px]">
              <div className={`grid grid-cols-2 rounded-[8px] bg-[#faf7ee] shadow-[0_30px_60px_-20px_rgba(47,79,58,0.35)] transition-transform duration-700 [transform-style:preserve-3d] ${flip ? "[transform:rotateY(-25deg)]" : ""}`}
                   style={{ minHeight: 460 }}>
                {/* spine */}
                <div className="pointer-events-none absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-forest/20" />
                {/* left page */}
                <div className="p-10">
                  <div className="text-center">
                    <Leaf className="mx-auto h-4 w-4 text-olive" />
                    <div className="mt-4 font-serif text-5xl text-forest">{months[month]}</div>
                    <div className="mt-3 text-sm italic text-charcoal/70">{monthCopy[months[month]]}</div>
                    <div className="mx-auto my-6 h-px w-20 bg-olive/40" />
                    <p className="mx-auto max-w-xs text-xs leading-relaxed text-charcoal/70">
                      A curated selection of plants that flourish this month, with simple care notes to help them thrive.
                    </p>
                  </div>
                </div>
                {/* right page */}
                <div className="p-8">
                  <div className="grid grid-cols-3 gap-4">
                    {plants.slice(0, 3).map(p => (
                      <PlantCard key={p.name} p={p} />
                    ))}
                    {plants.slice(3, 5).map(p => (
                      <PlantCard key={p.name} p={p} />
                    ))}
                  </div>
                </div>
              </div>
              {/* month strip */}
              <div className="mt-8 flex items-center gap-2 overflow-x-auto rounded-full bg-ivory/70 px-4 py-3 shadow-sm">
                <button onClick={() => change((month + 11) % 12)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-ivory transition">‹</button>
                <div className="flex flex-1 items-center justify-between px-2">
                  {months.map((m, i) => (
                    <button
                      key={m}
                      onClick={() => change(i)}
                      className={`rounded-full px-3 py-1.5 text-sm transition ${i === month ? "bg-olive text-ivory" : "text-charcoal/70 hover:text-forest"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <button onClick={() => change((month + 1) % 12)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-ivory transition">›</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlantCard({ p }: { p: { name: string; note: string; img: string; care: string } }) {
  return (
    <div className="rounded-2xl bg-ivory/70 p-3 text-center shadow-sm">
      <div className="overflow-hidden rounded-xl">
        <img src={p.img} alt={p.name} loading="lazy" className="aspect-[4/5] w-full object-cover" />
      </div>
      <div className="mt-2 font-serif text-sm text-forest">{p.name}</div>
      <div className="text-[0.7rem] text-charcoal/70">{p.note}</div>
    </div>
  );
}

/* ---------------- Transform ---------------- */

function Transform() {
  const projects = [
    { title: "Skyline Rooftop", area: "480 sq ft • Bandra", note: "A concrete rooftop reborn as a golden-hour sanctuary.", before: t1before, after: t1after },
    { title: "Sunlit Balcony", area: "120 sq ft • Andheri", note: "A bare apartment balcony turned into a lush retreat.", before: t2before, after: t2after },
  ];
  return (
    <section id="transform" className="relative py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>Transform Your Space</Eyebrow>
          <h2 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">From Ordinary to Extraordinary.</h2>
          <p className="mt-3 text-charcoal/80">
            We transform balconies, terraces and outdoor spaces into beautiful green retreats you'll love spending time in.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {projects.map((p) => (
            <div key={p.title}>
              <BeforeAfter before={p.before} after={p.after} />
              <div className="mt-3">
                <div className="font-serif text-2xl text-forest">{p.title}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-olive">{p.area}</div>
                <p className="mt-3 text-sm text-charcoal/75">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#visit" className="btn-primary">See All Transformations →</a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4 text-center">
            {[
              ["50+", "Spaces Transformed"],
              ["20+", "Plant Varieties"],
              ["100%", "Custom Designs"],
              ["Happy", "Green Families"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-3xl text-forest">{n}</div>
                <div className="text-[0.7rem] uppercase tracking-widest text-charcoal/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  };
  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl select-none"
      onMouseMove={(e) => e.buttons === 1 && drag(e.clientX)}
      onTouchMove={(e) => drag(e.touches[0].clientX)}
    >
      <img src={after} alt="After" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Before" loading="lazy" className="h-full w-full object-cover" style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }} />
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-forest/80 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-ivory">Before</span>
      <span className="absolute right-4 top-4 rounded-full bg-olive px-3 py-1 text-[0.65rem] uppercase tracking-widest text-ivory">After</span>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="h-full w-px -translate-x-1/2 bg-ivory shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
      </div>
      <button
        aria-label="Drag to compare"
        onMouseDown={(e) => drag(e.clientX)}
        className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-forest shadow-lg cursor-ew-resize"
        style={{ left: `${pos}%` }}
      >
        ‹ ›
      </button>
    </div>
  );
}

/* ---------------- Gallery ---------------- */

function Gallery() {
  const imgs = [
    { src: g2, span: "row-span-2" },
    { src: g3, span: "" },
    { src: g1, span: "" },
    { src: g5, span: "row-span-2" },
    { src: g4, span: "" },
    { src: g6, span: "row-span-2" },
  ];
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative bg-sage py-48">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mb-20 grid grid-cols-1 items-end gap-6 md:grid-cols-2">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="mt-4 font-serif text-5xl leading-[1.05] md:text-6xl">Moments That Bloom.</h2>
          </div>
          <p className="max-w-md text-charcoal/80 md:justify-self-end">
            A glimpse of greenery, growth and beautiful spaces. Follow along as we tend, plant, and share the everyday poetry of the nursery.
          </p>
        </div>
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {imgs.map((im, i) => (
            <button
              key={i}
              onClick={() => setOpen(im.src)}
              className={`group relative overflow-hidden rounded-3xl bg-ivory shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${im.span}`}
            >
              <img src={im.src} alt="Gallery" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </button>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="#" className="btn-ghost">Follow Our Journey →</a>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-forest/90 p-6 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <img src={open} alt="Enlarged" className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" />
        </div>
      )}
    </section>
  );
}

/* ---------------- Plan Visit ---------------- */

function PlanVisit() {
  return (
    <section id="visit" className="relative py-48 scroll-mt-16" style={{}}>
      <a id="contact" className="absolute -top-8" />
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mb-24 max-w-2xl">
          <Eyebrow>Let's Plan Your Green Space</Eyebrow>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] md:text-6xl">Let's Plan<br/>Your Green Space.</h2>
          <p className="mt-6 text-charcoal/80">
            We'd love to welcome you. Visit our nursery or reach out to plan your perfect green space — we'll bring the plants, pottery and expertise.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* visit card */}
          <div className="md:col-span-4 rounded-3xl bg-ivory p-8 shadow-sm">
            <div className="font-serif text-2xl text-forest">Visit Us</div>
            <p className="mt-3 text-sm text-charcoal/75">Come explore our nursery and experience the joy of greenery.</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-olive" /> 123 Greenway, Nature Street, Green City, 1100</li>
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-olive" /> +91 98765 43210</li>
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-olive" /> hello@egrow.com</li>
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-olive" /> 9:00 AM – 7:00 PM (Everyday)</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="#" className="btn-primary">Get Directions</a>
              <a href="https://wa.me/919876543210" className="btn-ghost">WhatsApp</a>
            </div>
          </div>
          {/* map */}
          <div className="md:col-span-4 relative overflow-hidden rounded-3xl min-h-[420px] shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#c7d9bd,transparent_60%),radial-gradient(circle_at_70%_70%,#a8c69f,transparent_60%),linear-gradient(135deg,#eef1e8,#dfe7d5)]" />
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 400" fill="none">
              <path d="M0 250 Q100 200 200 260 T400 220" stroke="#6B8E5A" strokeWidth="1.5" />
              <path d="M0 120 Q120 180 220 130 T400 160" stroke="#6B8E5A" strokeWidth="1.2" />
              <path d="M100 0 L120 400" stroke="#6B8E5A" strokeWidth="0.6" />
              <path d="M260 0 L280 400" stroke="#6B8E5A" strokeWidth="0.6" />
            </svg>
            <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-forest text-ivory shadow-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <div className="mt-3 rounded-full bg-ivory px-4 py-1.5 text-xs text-forest shadow">Egrow Nursery</div>
            </div>
          </div>
          {/* form */}
          <div className="md:col-span-4 rounded-3xl bg-ivory p-8 shadow-sm">
            <div className="font-serif text-2xl text-forest">Book a Visit</div>
            <p className="mt-3 text-sm text-charcoal/75">Choose your preferred date and let's meet.</p>
            <form className="mt-6 space-y-4 text-sm" onSubmit={(e) => e.preventDefault()}>
              <Field label="Your Name" placeholder="Enter your name" />
              <Field label="Phone Number" placeholder="Enter phone number" />
              <Field label="Preferred Date" placeholder="Select date" type="date" />
              <button className="btn-primary w-full justify-center">Book My Visit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-charcoal/60">{label}</span>
      <input type={type} placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-forest/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-olive transition" />
    </label>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="relative bg-forest text-ivory">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <span className="font-serif text-2xl">Egrow</span>
          </div>
          <p className="mt-5 max-w-xs text-sm text-ivory/70">
            Bringing nature home with healthy plants, beautiful spaces and expert care.
          </p>
          <div className="mt-6 flex gap-3">
            {["IG","FB","PI","YT"].map(s => (
              <a key={s} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 text-xs hover:bg-ivory hover:text-forest transition">{s}</a>
            ))}
          </div>
        </div>
        <FooterCol title="Explore" items={["About Us","Our Plants","Pottery","Plant Care","Gallery","Visit Us"]} />
        <FooterCol title="Services" items={["Plant Guidance","Space Transformations","Custom Planting","Workshops"]} />
        <FooterCol title="Contact" items={["hello@egrow.com","+91 98765 43210","123 Greenway","Green City, 1100"]} />
      </div>
      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-ivory/60">
          <div>© 2026 Egrow. All rights reserved.</div>
          <div className="flex gap-6"><a href="#" className="hover:text-ivory">Privacy Policy</a><a href="#" className="hover:text-ivory">Terms & Conditions</a></div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-serif text-lg text-ivory">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-ivory/70">
        {items.map(i => <li key={i}><a href="#" className="hover:text-ivory transition">{i}</a></li>)}
      </ul>
    </div>
  );
}
