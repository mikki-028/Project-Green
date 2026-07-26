import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/nature_1.mp4.asset.json";
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
import botanicalBg from "@/assets/botanical-stories-bg.png.asset.json";
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
  // Delicate climbing vine inspired by ivy / pothos — a thin trailing stem
  // with small heart-shaped leaves clustered in pairs at each node.
  const VB_W = 140;
  const VB_H = 3000;

  // Sinuous stem: a gentle horizontal sway down the whole page.
  const stemX = (y: number) => {
    const cx = VB_W / 2;
    return cx + Math.sin(y / 380) * 22 + Math.sin(y / 140) * 4;
  };

  const stemD = (() => {
    const pts: string[] = [];
    for (let y = 0; y <= VB_H; y += 24) {
      const x = stemX(y);
      pts.push(`${y === 0 ? "M" : "L"}${x.toFixed(2)} ${y}`);
    }
    return pts.join(" ");
  })();

  // Leaf clusters spaced along the stem. Each node sprouts 2–3 tiny
  // heart-shaped leaves on short petioles, alternating sides.
  const NODE_STEP = 62;
  const nodes: { y: number; side: -1 | 1; count: number; seed: number }[] = [];
  for (let y = 40, i = 0; y < VB_H - 40; y += NODE_STEP, i++) {
    nodes.push({
      y,
      side: (i % 2 === 0 ? 1 : -1) as -1 | 1,
      count: 2 + ((i * 7) % 3 === 0 ? 1 : 0), // mostly 2, sometimes 3
      seed: i,
    });
  }

  // A single heart-leaf drawn at origin, tip pointing +x.
  const HeartLeaf = ({ s, fill, opacity }: { s: number; fill: string; opacity: number }) => (
    <>
      <path
        d={`M0 0
            C ${s * 0.35} ${-s * 0.75}, ${s * 1.25} ${-s * 0.55}, ${s * 1.55} 0
            C ${s * 1.25} ${s * 0.55}, ${s * 0.35} ${s * 0.75}, 0 0 Z`}
        fill={fill}
        opacity={opacity}
      />
      <path
        d={`M${s * 0.05} 0 L ${s * 1.45} 0`}
        stroke="#3E5A34"
        strokeOpacity="0.28"
        strokeWidth="0.35"
        strokeLinecap="round"
      />
    </>
  );

  const hues = ["#7E9C6E", "#8FA982", "#6E8A5E", "#A2BD93"];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute top-0 z-50 hidden h-full w-[130px] md:block"
      style={{ left: "10px" }}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="none"
      fill="none"
    >
      {/* Main climbing stem */}
      <path d={stemD} stroke="#6E8A5E" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d={stemD} stroke="#C4D6B7" strokeOpacity="0.28" strokeWidth="0.45" strokeLinecap="round" fill="none" />

      {/* Leaf clusters */}
      {nodes.map((n) => {
        const x = stemX(n.y);
        // Draw `count` leaves fanning out from this node on the chosen side.
        return (
          <g key={`n-${n.seed}`}>
            {Array.from({ length: n.count }).map((_, k) => {
              // spread the leaves in a small fan
              const fan = (k - (n.count - 1) / 2) * 22; // degrees between siblings
              const baseRot = n.side === 1 ? -10 + fan : 190 + fan; // point outward
              const size = 7 + ((n.seed + k) % 3);
              const petioleLen = 3 + ((n.seed + k) % 2);
              const hue = hues[(n.seed + k) % hues.length];
              const opacity = 0.55 + ((n.seed + k) % 3) * 0.08;
              const petioleAngle = (baseRot * Math.PI) / 180;
              const px = Math.cos(petioleAngle) * petioleLen;
              const py = Math.sin(petioleAngle) * petioleLen;
              return (
                <g key={k} transform={`translate(${x} ${n.y})`}>
                  <path
                    d={`M0 0 L ${px.toFixed(2)} ${py.toFixed(2)}`}
                    stroke="#6E8A5E"
                    strokeOpacity="0.5"
                    strokeWidth="0.55"
                    strokeLinecap="round"
                  />
                  <g transform={`translate(${px.toFixed(2)} ${py.toFixed(2)}) rotate(${baseRot})`}>
                    <HeartLeaf s={size} fill={hue} opacity={opacity} />
                  </g>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Fresh trailing tip near the bottom */}
      {(() => {
        const y = VB_H - 40;
        const x = stemX(y);
        return (
          <g transform={`translate(${x} ${y})`}>
            <path
              d="M0 0 C 4 10, 10 16, 18 18"
              stroke="#8FA982"
              strokeOpacity="0.55"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
            />
            <g transform="translate(18 18) rotate(30)">
              <HeartLeaf s={6} fill="#A2BD93" opacity={0.7} />
            </g>
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
    <header className="fixed inset-x-0 top-5 z-[70] flex justify-center px-4">
      <div
        className={`mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border px-5 py-3 shadow-lg backdrop-blur-xl transition-all duration-500 md:px-8 md:py-3.5 ${
          scrolled
            ? "bg-ivory/85 border-white/40 shadow-black/10 text-forest"
            : "bg-white/10 border-white/20 shadow-black/5 text-ivory"
        }`}
      >
        <a href="#" className="flex items-center gap-2">
          <Leaf className={`h-6 w-6 ${scrolled ? "text-forest" : "text-ivory"}`} />
          <span className="font-serif text-2xl leading-none">Egrow</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#home" className="hover:text-olive transition">Home</a>
          <a href="#about" className="hover:text-olive transition">About</a>
          <a href="#stories" className="hover:text-olive transition">Stories</a>
          <a href="#calendar" className="hover:text-olive transition">Calendar</a>
          <a href="#gallery" className="hover:text-olive transition">Gallery</a>
          <a href="#contact" className="hover:text-olive transition">Contact</a>
        </nav>
        <a href="#contact" className={`hidden md:inline-flex ${scrolled ? "btn-ghost" : "btn-ghost bg-white/10 text-ivory border-white/20 hover:bg-white/20 hover:text-ivory"}`}>
          Plan Your Green Space
        </a>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });
    return () => {
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={heroVideo.url}
        autoPlay
        loop
        playsInline
        muted
        // @ts-ignore - iOS webkit attribute
        webkit-playsinline="true"
        // @ts-ignore
        x5-playsinline="true"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-label="Ambient botanical nursery footage with natural bird chirping"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-6 right-6 z-20 rounded-full bg-black/40 px-3 py-2 text-xs uppercase tracking-widest text-ivory backdrop-blur-md border border-white/20 hover:bg-black/60 transition"
      >
        {muted ? "Sound on" : "Sound off"}
      </button>
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
    <section id="about" className="relative z-[60] overflow-hidden py-24">
      {/* Botanical artwork background — covers the entire section and hides the global vine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${botanicalBg.url})` }}
      />
      {/* Center-clear overlay to keep the heading and content in focus */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(248,246,241,0.86) 0%, rgba(248,246,241,0.62) 32%, rgba(248,246,241,0.24) 62%, transparent 100%)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-8 md:grid-cols-12 md:gap-8 lg:px-12">
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
  type Story = {
    tag: string;
    kicker: string;
    title: string;
    dek: string;
    img: string;
    palette: {
      bg: string;
      ink: string;
      soft: string;
      rule: string;
      accent: string;
    };
    article: {
      lede: string;
      sections: { heading: string; body: string; list?: string[] }[];
      tip: { label: string; body: string };
    };
  };

  const stories: Story[] = [
    {
      tag: "Featured Story",
      kicker: "Chapter One",
      title: "Our Bestselling Plant",
      dek: "A quiet study of the Calathea Triostar — the plant our regulars keep coming back for.",
      img: story1,
      palette: {
        bg: "#2f4a3a",
        ink: "#f4efe2",
        soft: "rgba(244,239,226,0.72)",
        rule: "rgba(244,239,226,0.22)",
        accent: "#c7d6b4",
      },
      article: {
        lede: "Some plants arrive quietly and rearrange the room. The Calathea Triostar is one of those — striped in cream, blush and deep green, it turns an ordinary corner into something worth pausing beside.",
        sections: [
          {
            heading: "Why it wins hearts",
            body: "It moves. Leaves lift at dusk and settle again with the morning light, giving the plant a rhythm you begin to notice without meaning to. It is the closest thing we sell to a living painting.",
          },
          {
            heading: "What it gives back",
            body: "Calming presence, filtered air, and a slow companionship. It thrives in the diffused light of Indian homes and forgives the occasional missed watering with grace.",
            list: [
              "Soft, indirect light — a metre from the window",
              "Water when the top inch of soil feels dry",
              "Mist once a week; it loves gentle humidity",
              "Wipe leaves every fortnight to keep the pattern luminous",
            ],
          },
          {
            heading: "Egrow's recommendation",
            body: "Pair the Triostar with a matte stoneware pot in warm sand or unglazed terracotta. The muted clay lets the foliage do the talking, and the weight keeps it steady as it grows.",
          },
        ],
        tip: {
          label: "A small gardener's note",
          body: "If the leaves curl inward by afternoon, the air is thirstier than the soil. A shallow tray of pebbles and water beneath the pot solves it beautifully.",
        },
      },
    },
    {
      tag: "Style Guide",
      kicker: "Chapter Two",
      title: "Pottery That Completes Your Space",
      dek: "On the quiet craft of choosing a vessel — where clay, colour and proportion decide the whole composition.",
      img: story2,
      palette: {
        bg: "#e9d9c3",
        ink: "#4a3524",
        soft: "rgba(74,53,36,0.72)",
        rule: "rgba(74,53,36,0.18)",
        accent: "#b47a4c",
      },
      article: {
        lede: "A plant is only half the object. The pot is the sentence around it — the punctuation that decides whether the whole thing feels considered or accidental.",
        sections: [
          {
            heading: "The vessels we keep",
            body: "We work with a small circle of studio potters across Maharashtra and Rajasthan. Every piece is thrown by hand, which means no two are identical and every glaze carries the mark of its maker.",
          },
          {
            heading: "How to pair a pot",
            body: "Let the foliage lead. Soft, painterly leaves want a quiet, unglazed clay. Bold sculptural plants can carry a heavier glaze or a deeper colour. When in doubt, choose warm neutrals — sand, bone, oxblood, moss.",
            list: [
              "Match the pot's height to roughly one-third of the plant",
              "Let one hero pot anchor a shelf; keep the rest quieter",
              "Repeat a single material across a room for calm",
            ],
          },
          {
            heading: "Collections in the studio",
            body: "Our Sandstone series, the deep Oxblood range, and a growing collection of hand-thrown terracotta from a family kiln outside Jaipur. Each arrives in small batches and rarely stays long.",
          },
        ],
        tip: {
          label: "A small gardener's note",
          body: "Unglazed terracotta breathes — perfect for succulents and rooted cuttings. Save your glazed pieces for plants that prefer moisture kept close.",
        },
      },
    },
    {
      tag: "Plant Guide",
      kicker: "Chapter Three",
      title: "Beginner's Favourite",
      dek: "The gentlest introduction to green living — a pothos on a sunlit sill, and everything it teaches you.",
      img: story3,
      palette: {
        bg: "#f6f1e4",
        ink: "#324a2c",
        soft: "rgba(50,74,44,0.72)",
        rule: "rgba(50,74,44,0.16)",
        accent: "#7fa06a",
      },
      article: {
        lede: "Everyone remembers their first plant. For most of our customers, it is a pothos — trailing, generous, almost impossible to disappoint. It is the plant that turns visitors into gardeners.",
        sections: [
          {
            heading: "Why we recommend it first",
            body: "It reads the room. Bright window or dim study, weekly watering or the occasional forgotten fortnight — the pothos keeps going. It grows visibly, which is its quiet gift to a new plant parent.",
          },
          {
            heading: "A gentle care rhythm",
            body: "There is no ceremony to it. A little water, a little light, an occasional trim. The plant will show you what it needs long before it complains.",
            list: [
              "Any indirect light — even a north-facing window is enough",
              "Water when the top two inches of soil feel dry",
              "Trim leggy vines to encourage a fuller shape",
              "Repot every second year, one size up",
            ],
          },
          {
            heading: "Varieties to begin with",
            body: "Golden Pothos for warmth, Marble Queen for a softer, painterly leaf, and Neon for a small burst of chartreuse on a bookshelf. All three are stocked most weeks of the year.",
          },
        ],
        tip: {
          label: "A small gardener's note",
          body: "Any cutting with two nodes will root in a glass of water within a fortnight. Your first pothos will quickly become several — and that is how most collections begin.",
        },
      },
    },
  ];

  const [active, setActive] = useState<number | null>(null);
  const story = active !== null ? stories[active] : null;

  return (
    <section
      id="stories"
      className="relative z-[60] overflow-hidden py-24"
    >
      {/* Botanical artwork background — covers the entire section and hides the global vine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${botanicalBg.url})` }}
      />
      {/* Center-clear overlay to keep heading and cards in focus */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(248,246,241,0.86) 0%, rgba(248,246,241,0.62) 32%, rgba(248,246,241,0.24) 62%, transparent 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mb-14 max-w-2xl">
          <Eyebrow>Growing Stories</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-forest md:text-5xl">
            Field notes from the nursery.
          </h2>
          <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-charcoal/70">
            Short editorial pieces on the plants, pottery and small rituals that shape the way we garden. Open any chapter to read the full story.
          </p>
        </div>

        {story === null ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stories.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[28px] border border-white/50 bg-white/20 p-8 text-left shadow-[0_20px_60px_-24px_rgba(47,79,58,0.4)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-white/70 hover:bg-white/30 hover:shadow-[0_32px_80px_-24px_rgba(47,79,58,0.5)]"
              >
                {/* Background image on right half with fade to glass */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                  <img
                    src={s.img}
                    alt=""
                    loading="lazy"
                    className="absolute right-0 top-0 h-full w-[72%] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.55) 32%, rgba(255,255,255,0.15) 55%, rgba(255,255,255,0) 78%)",
                      backdropFilter: "blur(2px)",
                    }}
                  />
                </div>
                {/* Top highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
                />

                {/* Top: small icon chip */}
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/60 bg-white/50 backdrop-blur-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f4f3a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2c3 4 5 7 5 11a5 5 0 01-10 0c0-4 2-7 5-11z" />
                      <path d="M12 13v8" />
                    </svg>
                  </div>
                </div>

                {/* Text block */}
                <div className="relative max-w-[65%]">
                  <div className="text-[0.62rem] uppercase tracking-[0.32em] text-forest/70">
                    {s.tag}
                  </div>
                  <h3 className="mt-4 font-serif text-[1.75rem] leading-[1.12] text-forest">
                    {s.title}
                  </h3>
                  <div className="mt-5 h-px w-full bg-forest/15" />
                  <p className="mt-5 text-[0.88rem] leading-relaxed text-charcoal/80">
                    {s.dek}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.26em] text-forest transition-colors group-hover:text-olive">
                    Read Story <span aria-hidden>→</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <StoryArticle story={story} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  );
}

function StoryArticle({
  story,
  onClose,
}: {
  story: {
    tag: string;
    kicker: string;
    title: string;
    dek: string;
    img: string;
    palette: { bg: string; ink: string; soft: string; rule: string; accent: string };
    article: {
      lede: string;
      sections: { heading: string; body: string; list?: string[] }[];
      tip: { label: string; body: string };
    };
  };
  onClose: () => void;
}) {
  const { palette, article } = story;
  return (
    <article
      key={story.title}
      className="fade-up relative overflow-hidden rounded-sm"
      style={{ background: palette.bg, color: palette.ink }}
    >
      <div className="px-8 py-14 md:px-20 md:py-24">
        <div className="mb-14 flex items-center justify-between">
          <div
            className="text-[0.66rem] uppercase tracking-[0.32em]"
            style={{ color: palette.soft }}
          >
            {story.kicker} — {story.tag}
          </div>
          <button
            onClick={onClose}
            className="text-[0.7rem] uppercase tracking-[0.28em] transition-opacity hover:opacity-70"
            style={{ color: palette.ink, borderBottom: `1px solid ${palette.rule}`, paddingBottom: 2 }}
          >
            Close chapter
          </button>
        </div>

        <header className="max-w-3xl">
          <h3
            className="font-serif text-[2.6rem] leading-[1.05] md:text-[3.6rem]"
            style={{ color: palette.ink }}
          >
            {story.title}
          </h3>
          <p
            className="mt-6 font-serif text-[1.25rem] leading-[1.55] md:text-[1.35rem]"
            style={{ color: palette.soft }}
          >
            {story.dek}
          </p>
        </header>

        <div
          className="my-12 h-px w-24"
          style={{ background: palette.rule }}
        />

        <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-1">
            <p
              className="font-serif text-[1.15rem] leading-[1.7]"
              style={{ color: palette.ink }}
            >
              {article.lede}
            </p>

            {article.sections.map((sec, i) => (
              <section key={i} className="mt-12">
                <h4
                  className="text-[0.7rem] uppercase tracking-[0.28em]"
                  style={{ color: palette.accent }}
                >
                  {sec.heading}
                </h4>
                <p
                  className="mt-4 text-[0.98rem] leading-[1.8]"
                  style={{ color: palette.soft }}
                >
                  {sec.body}
                </p>
                {sec.list && (
                  <ul className="mt-5 space-y-2">
                    {sec.list.map((li, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[0.95rem] leading-[1.7]"
                        style={{ color: palette.soft }}
                      >
                        <span style={{ color: palette.accent }}>—</span>
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <aside
              className="mt-14 border-l pl-6"
              style={{ borderColor: palette.rule }}
            >
              <div
                className="text-[0.66rem] uppercase tracking-[0.28em]"
                style={{ color: palette.accent }}
              >
                {article.tip.label}
              </div>
              <p
                className="mt-3 font-serif text-[1.1rem] italic leading-[1.65]"
                style={{ color: palette.ink }}
              >
                {article.tip.body}
              </p>
            </aside>
          </div>

          <figure className="md:col-span-5 md:col-start-8 md:pt-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={story.img}
                alt={story.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption
              className="mt-4 text-[0.72rem] uppercase tracking-[0.24em]"
              style={{ color: palette.soft }}
            >
              Photographed at the Egrow studio
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Plant Calendar ---------------- */

function PlantCalendar() {
  return <BotanicalJournal />;
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
    <section id="gallery" className="relative bg-sage py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mb-10 grid grid-cols-1 items-end gap-3 md:grid-cols-2">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">Moments That Bloom.</h2>
          </div>
          <p className="max-w-md text-charcoal/80 md:justify-self-end">
            A glimpse of greenery, growth and beautiful spaces. Follow along as we tend, plant, and share the everyday poetry of the nursery.
          </p>
        </div>
        <div className="grid auto-rows-[200px] grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
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
        <div className="mt-6 text-center">
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
    <section id="visit" className="relative py-24 scroll-mt-16" style={{}}>
      <a id="contact" className="absolute -top-8" />
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Let's Plan Your Green Space</Eyebrow>
          <h2 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">Let's Plan<br/>Your Green Space.</h2>
          <p className="mt-3 text-charcoal/80">
            We'd love to welcome you. Visit our nursery or reach out to plan your perfect green space — we'll bring the plants, pottery and expertise.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {/* visit card */}
          <div className="md:col-span-4 rounded-3xl bg-ivory p-6 shadow-sm">
            <div className="font-serif text-2xl text-forest">Visit Us</div>
            <p className="mt-2 text-sm text-charcoal/75">Come explore our nursery and experience the joy of greenery.</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-olive" /> 123 Greenway, Nature Street, Green City, 1100</li>
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-olive" /> +91 98765 43210</li>
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-olive" /> hello@egrow.com</li>
              <li className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-olive" /> 9:00 AM – 7:00 PM (Everyday)</li>
            </ul>
            <div className="mt-4 flex gap-3">
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
          <div className="md:col-span-4 rounded-3xl bg-ivory p-6 shadow-sm">
            <div className="font-serif text-2xl text-forest">Book a Visit</div>
            <p className="mt-2 text-sm text-charcoal/75">Choose your preferred date and let's meet.</p>
            <form className="mt-3 space-y-3 text-sm" onSubmit={(e) => e.preventDefault()}>
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <span className="font-serif text-2xl">Egrow</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ivory/70">
            Bringing nature home with healthy plants, beautiful spaces and expert care.
          </p>
          <div className="mt-3 flex gap-3">
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
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-ivory/60">
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

/* ---------------- Botanical Journal ---------------- */

type JournalPlant = {
  name: string;
  latin: string;
  intro: string;
  why: string;
  benefits: string;
  care: { light: string; water: string; upkeep: string };
  tip: string;
  img?: string;
};

type JournalMonth = {
  name: string;
  season: string;
  epigraph: string;
  plants: JournalPlant[];
};

const JOURNAL_IMAGES = [pMonstera, pAreca, pPeace, pSnake, pPothos];

const JOURNAL_MONTHS: JournalMonth[] = [
  {
    name: "January", season: "Cool, dry mornings across most of India.",
    epigraph: "The garden rests, and rewards those who plant with patience.",
    plants: [
      { name: "Marigold", latin: "Tagetes erecta", intro: "The unmistakable orange of an Indian winter — abundant, cheerful, endlessly generous.", why: "Loves cool sun; blooms peak through January's crisp mornings.", benefits: "Repels garden pests, cut-flower staple, and pollinator magnet.", care: { light: "Full sun, 5–6 hours", water: "Every 2–3 days, deep soak", upkeep: "Deadhead spent blooms weekly" }, tip: "Snip the first flowers early — the plant answers with twice as many by month-end." },
      { name: "Sweet Alyssum", latin: "Lobularia maritima", intro: "A soft carpet of honey-scented white, best appreciated up close on the balcony rail.", why: "Thrives in cool, bright light and dislikes the heat that comes later.", benefits: "Draws hoverflies and bees; fills gaps beautifully in mixed pots.", care: { light: "Bright sun to light shade", water: "When top inch feels dry", upkeep: "Trim lightly mid-month" }, tip: "Grow it in a shallow terracotta bowl — the scent gathers in the curve." },
      { name: "Pansy", latin: "Viola × wittrockiana", intro: "Winter's little painted face. Layered, velvety, unmistakable.", why: "Cool nights bring out the deepest colour; heat washes them out.", benefits: "Edible petals for salads and a long, forgiving bloom window.", care: { light: "Morning sun, afternoon shade", water: "Keep evenly moist", upkeep: "Pinch fading flowers" }, tip: "Group three pots of one colour rather than a mix — the effect is quietly striking." },
      { name: "Coriander", latin: "Coriandrum sativum", intro: "The kitchen's favourite herb, at its most fragrant right now.", why: "Cool weather keeps it leafy; warmth makes it bolt.", benefits: "Cut-and-come-again leaves for months of curries and chutneys.", care: { light: "4–5 hours of gentle sun", water: "Light, frequent watering", upkeep: "Harvest from the outside in" }, tip: "Sow a fresh pinch of seeds every ten days — you'll never run out." },
    ],
  },
  {
    name: "February", season: "Late winter — bright days, cool evenings.",
    epigraph: "The last quiet month before everything wakes up at once.",
    plants: [
      { name: "Sweet Pea", latin: "Lathyrus odoratus", intro: "Ruffled, fragrant, a florist's secret grown on a modest trellis.", why: "The final cool weeks let vines set flowers before summer arrives.", benefits: "One of the most fragrant cut flowers you can grow at home.", care: { light: "Full morning sun", water: "Deep water twice a week", upkeep: "Tie gently to a bamboo cane" }, tip: "Cut long stems generously — the more you pick, the more it flowers." },
      { name: "Nasturtium", latin: "Tropaeolum majus", intro: "Round leaves like little lily pads with peppery, edible flowers.", why: "Loves the mild sun of February before things get harsh.", benefits: "Ornamental and edible; a natural companion for vegetables.", care: { light: "Bright sun", water: "Sparingly — hates soggy roots", upkeep: "No feeding needed" }, tip: "Poor soil gives more flowers than rich soil. Resist the urge to fertilise." },
      { name: "Dianthus", latin: "Dianthus chinensis", intro: "Fringed petals in pinks and crimsons, with a light clove perfume.", why: "Cool nights hold the fragrance; the flowers last for weeks.", benefits: "Compact, tidy, and reliably floriferous on balconies.", care: { light: "5 hours direct sun", water: "Moderate, let surface dry", upkeep: "Snip stems after bloom" }, tip: "Grow in terracotta — it dries evenly and the roots love it." },
      { name: "Mint", latin: "Mentha spicata", intro: "The runaway herb of Indian kitchens. Give it a pot of its own.", why: "Cool weather brings the sweetest, softest leaves of the year.", benefits: "Endless supply for chutney, chaas, and cold summer drinks ahead.", care: { light: "Bright indirect or morning sun", water: "Keep soil consistently moist", upkeep: "Pinch tips to bush out" }, tip: "Never plant mint with anything else. It always wins the pot." },
    ],
  },
  {
    name: "March", season: "Spring warmth begins to build.",
    epigraph: "Fresh starts — the soil is ready, and so are you.",
    plants: [
      { name: "Bougainvillea", latin: "Bougainvillea glabra", intro: "The signature papery bracts that define an Indian summer skyline.", why: "March warmth triggers the first great flush of the year.", benefits: "Drought-tolerant once established, and effortlessly showy.", care: { light: "Full sun, all day", water: "Deep but infrequent", upkeep: "Prune lightly after each flush" }, tip: "Neglect makes it bloom. Water it too kindly and you'll get only leaves." },
      { name: "Hibiscus", latin: "Hibiscus rosa-sinensis", intro: "Wide, open faces that seem to greet the morning.", why: "Warm sun and long days push out blooms almost daily.", benefits: "Traditional in Indian gardens; petals used in hair oils and teas.", care: { light: "Full to filtered sun", water: "Regular, don't let it dry out", upkeep: "Feed monthly with compost" }, tip: "Turn the pot a quarter each week so it flowers evenly on all sides." },
      { name: "Basil (Tulsi)", latin: "Ocimum tenuiflorum", intro: "Sacred, aromatic, and quietly generous with its leaves.", why: "Warmer days wake it from its winter sulk.", benefits: "Immunity tea, natural mosquito deterrent, and a fragrant companion at the door.", care: { light: "5+ hours of sun", water: "Moderate; let surface dry", upkeep: "Pinch flower spikes as they appear" }, tip: "Snap flower buds early — the leaves stay tender for months longer." },
      { name: "Portulaca", latin: "Portulaca grandiflora", intro: "Neon little roses that open with the sun and close by evening.", why: "Rising temperatures suit it perfectly.", benefits: "Practically thrives on neglect; ideal for hot balconies.", care: { light: "Direct sun essential", water: "Sparingly, drought-tolerant", upkeep: "None — it takes care of itself" }, tip: "Grow it in the shallowest pot you own. It prefers to feel warm underfoot." },
    ],
  },
  {
    name: "April", season: "Warm, bright, and lengthening days.",
    epigraph: "The garden picks up speed. Water early, admire slowly.",
    plants: [
      { name: "Jasmine (Mogra)", latin: "Jasminum sambac", intro: "The evening fragrance woven into every Indian summer memory.", why: "Warm April nights bring the first great cascade of flowers.", benefits: "Perfume, garlands, tea — and a garden that greets you after work.", care: { light: "Bright sun, 4–6 hours", water: "Regular; likes even moisture", upkeep: "Prune after each flush" }, tip: "Place it near a doorway or window that opens at dusk." },
      { name: "Zinnia", latin: "Zinnia elegans", intro: "Bold, geometric, and unfussy — a cutting garden in one plant.", why: "Warmth and long days give the most saturated colour.", benefits: "Excellent cut flower and irresistible to butterflies.", care: { light: "Full sun", water: "At the base, not the leaves", upkeep: "Deadhead often" }, tip: "Cut the very first bloom to trigger side branches — you'll double the display." },
      { name: "Curry Leaf", latin: "Murraya koenigii", intro: "The scent that defines Indian cooking, grown from a modest pot.", why: "Warm months push out fresh, tender flushes of leaves.", benefits: "A lifetime kitchen staple, always fresher than store-bought.", care: { light: "Full sun to bright shade", water: "Moderate, let soil dry slightly", upkeep: "Snip regularly to bush out" }, tip: "Fertilise once with buttermilk-diluted water — an old grandmother's trick that works." },
      { name: "Aloe Vera", latin: "Aloe barbadensis", intro: "The medicine plant on every Indian windowsill, more useful in summer than ever.", why: "Loves the growing heat; puts out new pups quickly.", benefits: "Skin soother, sunburn relief, and effortlessly ornamental.", care: { light: "Bright indirect to direct", water: "Only when soil is fully dry", upkeep: "Repot pups every year" }, tip: "If a leaf looks limp, it's overwatered — not thirsty. Wait a week." },
    ],
  },
  {
    name: "May", season: "Peak summer. Heat management matters.",
    epigraph: "Move pots to morning-sun corners and water at dawn.",
    plants: [
      { name: "Vinca (Sadabahar)", latin: "Catharanthus roseus", intro: "The unshakeable Indian summer flower, bright in the fiercest sun.", why: "Loves 40°C afternoons and rewards you with daily blooms.", benefits: "Extremely low-maintenance and covers pots edge to edge.", care: { light: "Full harsh sun is fine", water: "Only when soil dries", upkeep: "Pinch tips monthly" }, tip: "Don't fuss over it. The more you ignore it, the better it looks." },
      { name: "Ixora", latin: "Ixora coccinea", intro: "Firework clusters of tiny flowers on glossy evergreen leaves.", why: "Heat brings the biggest, most saturated flower heads of the year.", benefits: "Butterfly favourite and a solid hedge or feature pot.", care: { light: "Bright sun, some afternoon shade", water: "Deep, weekly", upkeep: "Light prune after flowering" }, tip: "Use rainwater when you can — it flowers better than with hard tap water." },
      { name: "Adenium", latin: "Adenium obesum", intro: "The desert rose with a sculptural swollen stem and trumpet flowers.", why: "It waits all year for these hot, dry weeks.", benefits: "Living sculpture; asks for almost nothing in return.", care: { light: "Direct scorching sun", water: "Sparingly, once weekly at most", upkeep: "Repot every 2 years" }, tip: "The wider and shallower the pot, the fatter the stem grows over time." },
      { name: "Lemongrass", latin: "Cymbopogon citratus", intro: "A fountain of aromatic blades that ask for almost nothing.", why: "Summer heat is exactly when it grows fastest.", benefits: "Perfect for chai, cold infusions, and a natural mosquito deterrent.", care: { light: "Full sun", water: "Moderate; drought-tolerant", upkeep: "Cut back a third every 6 weeks" }, tip: "Rub a leaf between your palms before watering — it always makes the chore nicer." },
    ],
  },
  {
    name: "June", season: "Pre-monsoon skies and the first showers.",
    epigraph: "Every plant tilts a little towards the promise of rain.",
    plants: [
      { name: "Monstera", latin: "Monstera deliciosa", intro: "The architectural indoor icon whose new leaves unfurl with theatre.", why: "Warm, humid pre-monsoon air is exactly what it wants.", benefits: "Sculptural presence and easy propagation from cuttings.", care: { light: "Bright indirect light", water: "When top 2 inches dry", upkeep: "Wipe leaves monthly" }, tip: "Give it a mossed pole this month — new leaves will grow noticeably larger." },
      { name: "Peace Lily", latin: "Spathiphyllum wallisii", intro: "Sculpted white spathes above deep green — quietly graceful indoors.", why: "Loves the rising humidity that arrives with the monsoon.", benefits: "One of the best natural air-purifying houseplants.", care: { light: "Low to medium indirect", water: "Weekly; droops when thirsty", upkeep: "Wipe leaves fortnightly" }, tip: "It literally tells you when it needs water — let it droop once, then rescue it. It won't hold a grudge." },
      { name: "Areca Palm", latin: "Dypsis lutescens", intro: "Soft feathered fronds that turn a corner into a small oasis.", why: "Pre-monsoon humidity keeps fronds lush and tip-burn-free.", benefits: "Adds humidity indoors and softens hard architecture beautifully.", care: { light: "Bright, indirect", water: "Weekly, avoid waterlogging", upkeep: "Mist during dry spells" }, tip: "Use a saucer of pebbles and water under the pot — it mimics the humidity it craves." },
      { name: "Coleus", latin: "Coleus scutellarioides", intro: "Grown for its leaves — no two combinations ever repeat.", why: "Warm, humid weeks push out the most vivid leaf colours of the year.", benefits: "Colour without waiting for flowers; brilliant fillers in mixed pots.", care: { light: "Bright indirect to morning sun", water: "Keep evenly moist", upkeep: "Pinch tips weekly" }, tip: "Pinch flower spikes off the moment they appear — the leaves stay bolder for months." },
    ],
  },
  {
    name: "July", season: "Deep monsoon. Grey skies, green everything.",
    epigraph: "The garden writes itself. You just have to watch drainage.",
    plants: [
      { name: "Fern (Boston)", latin: "Nephrolepis exaltata", intro: "Cascades of feathery fronds that love a rainy verandah corner.", why: "Monsoon humidity is what they wait for all year.", benefits: "Instantly softens a balcony and thrives in filtered light.", care: { light: "Bright indirect only", water: "Keep constantly moist", upkeep: "Trim brown tips" }, tip: "Hang it near a window that catches the rain spray — you'll barely need to water it." },
      { name: "Colocasia", latin: "Colocasia esculenta", intro: "Enormous heart-shaped leaves that catch and drum with rainfall.", why: "The monsoon is its personal festival.", benefits: "Dramatic tropical presence with almost no effort.", care: { light: "Bright shade to morning sun", water: "Cannot be overwatered now", upkeep: "Remove yellow leaves at base" }, tip: "Sit near it after it rains — the sound of water on those leaves is worth the whole pot." },
      { name: "Anthurium", latin: "Anthurium andraeanum", intro: "Glossy red or white spathes above lacquered leaves.", why: "Humid weather triggers new blooms indoors.", benefits: "Elegant, long-lasting flowers with minimal fuss.", care: { light: "Bright indirect", water: "When top inch dries", upkeep: "Repot every 2 years" }, tip: "Chunky bark mix, not regular soil — the roots want air more than water." },
      { name: "Turmeric", latin: "Curcuma longa", intro: "Broad tropical leaves rise from underground rhizomes with monsoon energy.", why: "Plant now, harvest fresh turmeric before winter.", benefits: "Homegrown haldi — freshest you'll ever cook with.", care: { light: "Bright shade to filtered sun", water: "Constantly moist", upkeep: "Feed with compost mid-season" }, tip: "One rhizome from your kitchen shelf will start the whole pot. Bury it two inches deep." },
    ],
  },
  {
    name: "August", season: "Late monsoon. Warm rain, saturated colour.",
    epigraph: "Full and generous — the garden gives more than it asks.",
    plants: [
      { name: "Rain Lily", latin: "Zephyranthes", intro: "Small white or pink trumpets that appear overnight after rain.", why: "August showers trigger flushes of these surprise blooms.", benefits: "Almost invisible when dormant; unforgettable when they arrive.", care: { light: "Bright sun or filtered light", water: "Water heavily; let dry between", upkeep: "Divide bulbs every 2–3 years" }, tip: "Plant thickly in a shallow pot — a dozen flowers opening at once is the whole point." },
      { name: "Hydrangea", latin: "Hydrangea macrophylla", intro: "Great mophead flowers in soft blue, pink, or antique green.", why: "Cooler, wetter August weather keeps the blooms lasting for weeks.", benefits: "One of the longest-lasting flower displays possible on a balcony.", care: { light: "Morning sun, afternoon shade", water: "Deeply, twice weekly", upkeep: "Prune after blooming" }, tip: "Bury a few rusty nails at the base for deeper blue flowers next season — an old trick that really does work." },
      { name: "Torenia", latin: "Torenia fournieri", intro: "The little wishbone flower, cheerful in rain-drenched blues and violets.", why: "Perfect for shady monsoon balconies that lack strong sun.", benefits: "Blooms non-stop from now through October.", care: { light: "Bright shade or morning sun", water: "Keep evenly moist", upkeep: "Trim leggy stems monthly" }, tip: "Grow it under a taller plant — it loves the dappled shade." },
      { name: "Ginger", latin: "Zingiber officinale", intro: "Slender leafy stalks above the most useful root in your kitchen.", why: "The monsoon is when it grows the fastest.", benefits: "Fresh homegrown adrak for tea, curry, and winter immunity.", care: { light: "Bright shade to filtered sun", water: "Constantly moist", upkeep: "Harvest after 8–10 months" }, tip: "Choose a wide, shallow pot — ginger spreads sideways, not down." },
    ],
  },
  {
    name: "September", season: "Post-monsoon softness and clearer skies.",
    epigraph: "The garden takes a long breath. This is the golden month.",
    plants: [
      { name: "Chrysanthemum", latin: "Chrysanthemum indicum", intro: "Dense, layered blooms in autumn shades of gold, rust, and cream.", why: "The classic post-monsoon flower — buds set now for October colour.", benefits: "Long-lasting flowers, excellent for cutting, and pollinator-friendly.", care: { light: "Full morning sun", water: "Moderate, avoid wet leaves", upkeep: "Pinch tips until buds appear" }, tip: "Stop pinching by mid-September — every unpinched tip becomes a flower." },
      { name: "Snake Plant", latin: "Sansevieria trifasciata", intro: "Architectural upright leaves that ask for almost nothing.", why: "As indoor humidity drops, it settles in perfectly.", benefits: "Purifies air overnight and forgives every mistake.", care: { light: "Any light, low is fine", water: "Every 2–3 weeks", upkeep: "Wipe dust off leaves" }, tip: "If you're not sure whether to water — don't. This plant would rather be thirsty than soggy." },
      { name: "Pothos", latin: "Epipremnum aureum", intro: "The trailing green heart of nearly every Indian home.", why: "Warm, mild September is perfect for propagation.", benefits: "Grows almost anywhere; roots readily in a glass of water.", care: { light: "Anything except harsh sun", water: "When top soil is dry", upkeep: "Trim leggy vines" }, tip: "Take three cuttings this month, root them in water, and gift them by November." },
      { name: "Croton", latin: "Codiaeum variegatum", intro: "Wildly patterned leaves in reds, yellows, and greens.", why: "Post-monsoon light brings out the most saturated leaf colour.", benefits: "Instant tropical drama without waiting for a flower.", care: { light: "Bright indirect to morning sun", water: "Consistently moist", upkeep: "Wipe leaves fortnightly" }, tip: "The more light it gets, the wilder the colours. A dim corner turns it green." },
    ],
  },
  {
    name: "October", season: "Festival light, cool mornings, warm afternoons.",
    epigraph: "The garden dresses up for Diwali without being asked.",
    plants: [
      { name: "Marigold", latin: "Tagetes patula", intro: "Festival gold — practically the official flower of the season.", why: "Peak bloom aligns beautifully with the festival month.", benefits: "Cut for torans, garlands, and rangolis; keeps aphids away.", care: { light: "Full sun", water: "Every 2–3 days", upkeep: "Deadhead constantly" }, tip: "Plant a second batch mid-October — you'll have flowers through Diwali and beyond." },
      { name: "Cosmos", latin: "Cosmos bipinnatus", intro: "Airy daisy-like flowers on tall, swaying stems.", why: "Loves the cooling October weather and long light.", benefits: "Attracts butterflies and self-seeds generously for next year.", care: { light: "Full sun", water: "When soil dries", upkeep: "Stake tall varieties" }, tip: "Let a few flowers go to seed — you'll never have to buy cosmos again." },
      { name: "Hibiscus", latin: "Hibiscus rosa-sinensis", intro: "The temple flower, at its most consistent this month.", why: "Cooler, kinder sun brings flowers without leaf scorch.", benefits: "Traditional offering flower; leaves used in hair oils.", care: { light: "Full sun to filtered", water: "Regular, deep", upkeep: "Feed monthly" }, tip: "A pinch of Epsom salt in October gives you the largest flowers of the year." },
      { name: "Petunia", latin: "Petunia × hybrida", intro: "Trumpets in every colour, spilling gracefully over pot edges.", why: "The cool nights of October let the flowers last for days.", benefits: "Cascading colour without much fuss.", care: { light: "6+ hours sun", water: "Regular, don't wet leaves", upkeep: "Deadhead every few days" }, tip: "Trim the whole plant back by a third mid-month — you'll get a second flush for Diwali." },
    ],
  },
  {
    name: "November", season: "The first properly cool weeks arrive.",
    epigraph: "Turning inward. Plant now for a garden that surprises you in February.",
    plants: [
      { name: "Rose", latin: "Rosa hybrida", intro: "The classic garden queen, at her calm best in cool weather.", why: "Cool nights and mild days give the largest, most fragrant blooms.", benefits: "Cut flowers all winter long with the right pruning.", care: { light: "Full sun, 6+ hours", water: "Deep, twice weekly", upkeep: "Feed with compost monthly" }, tip: "Prune lightly on the first cool morning of November — she'll thank you by January." },
      { name: "Dahlia", latin: "Dahlia pinnata", intro: "Geometric, sculpted blooms in almost every colour there is.", why: "Cool, bright November is exactly when they set their best flowers.", benefits: "Dramatic cut flowers with a long vase life.", care: { light: "Full sun", water: "Deep, twice weekly", upkeep: "Stake tall varieties early" }, tip: "Support them before they need it — a fallen dahlia stem rarely stands up again." },
      { name: "Snapdragon", latin: "Antirrhinum majus", intro: "Tall spires of little dragon-mouthed flowers, playful and elegant.", why: "The cool weeks bring the most saturated colours.", benefits: "Classic cut flower and a favourite of children in the garden.", care: { light: "Full morning sun", water: "Moderate, regular", upkeep: "Cut spent spires low" }, tip: "Squeeze the sides of a bloom gently — the flower opens like a puppet's mouth." },
      { name: "Fenugreek (Methi)", latin: "Trigonella foenum-graecum", intro: "The winter herb that rewards a shallow tray with a month of harvests.", why: "Cool weather keeps it tender and mild.", benefits: "Fresh methi for parathas, dal, and winter tadkas.", care: { light: "4–5 hours of sun", water: "Light, frequent", upkeep: "Harvest at 4 inches" }, tip: "Sow a tray every ten days — you'll have fresh methi all winter." },
    ],
  },
  {
    name: "December", season: "Cool, still, and quietly beautiful.",
    epigraph: "The garden slows down. So do you. Both are better for it.",
    plants: [
      { name: "Poinsettia", latin: "Euphorbia pulcherrima", intro: "The winter classic — great scarlet bracts that behave like flowers.", why: "Short winter days trigger the famous colour change.", benefits: "The most seasonal indoor plant you can bring home this month.", care: { light: "Bright indirect", water: "Only when top soil dries", upkeep: "Keep away from cold drafts" }, tip: "If a leaf drops, it's usually too much water — not too little. Wait, don't rescue." },
      { name: "Cyclamen", latin: "Cyclamen persicum", intro: "Butterfly-like flowers hovering above marbled heart-shaped leaves.", why: "December's cool indoor rooms are exactly where it thrives.", benefits: "Weeks of flowers on a compact, tidy plant.", care: { light: "Bright, cool spot", water: "From the base, not the top", upkeep: "Remove yellow leaves at the base" }, tip: "Never water into the crown of the plant — always around the edge of the pot." },
      { name: "Calendula", latin: "Calendula officinalis", intro: "Cheerful orange and yellow daisies that shrug off the cold.", why: "Cool December is when it flowers most generously.", benefits: "Edible petals for salads and a genuinely healing tradition in balms.", care: { light: "Bright sun", water: "Moderate, let surface dry", upkeep: "Deadhead weekly" }, tip: "Save a handful of petals to dry — they hold their colour beautifully all year." },
      { name: "Rubber Plant", latin: "Ficus elastica", intro: "Glossy, generous leaves and quiet architectural presence indoors.", why: "As outdoor colour fades, this one holds the room together.", benefits: "One of the easiest large statement plants for Indian homes.", care: { light: "Bright indirect", water: "When top 2 inches dry", upkeep: "Wipe leaves monthly" }, tip: "Turn the pot a quarter each month — it'll grow perfectly upright instead of leaning to the light." },
    ],
  },
];

/** Build a flat list of pages: [cover, ...(month intro + plant pages)...] */
type PageKind =
  | { kind: "cover" }
  | { kind: "month-intro"; monthIndex: number }
  | { kind: "plant"; monthIndex: number; plantIndex: number };

function buildPages(): PageKind[] {
  const pages: PageKind[] = [{ kind: "cover" }];
  JOURNAL_MONTHS.forEach((m, mi) => {
    pages.push({ kind: "month-intro", monthIndex: mi });
    m.plants.forEach((_, pi) => pages.push({ kind: "plant", monthIndex: mi, plantIndex: pi }));
  });
  return pages;
}

/** Synthesised paper flip — filtered noise burst played through Web Audio. */
function usePaperFlipSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const ensureCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  };
  return () => {
    const ctx = ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 0.42;
    // Noise buffer
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      // shaped brownish noise — softer than white
      data[i] = (Math.random() * 2 - 1) * (1 - t) * (0.35 + 0.65 * Math.pow(1 - t, 1.5));
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 900;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 4200;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(hp).connect(lp).connect(gain).connect(ctx.destination);
    src.start(now);
    src.stop(now + dur);
  };
}

function BotanicalJournal() {
  const pages = useRef(buildPages()).current;
  const total = pages.length;
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState<null | "next" | "prev">(null);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const playFlip = usePaperFlipSound();
  const touchStartX = useRef<number | null>(null);

  const FLIP_MS = 900;

  const goTo = (target: number) => {
    if (flipping) return;
    const clamped = Math.max(0, Math.min(total - 1, target));
    if (clamped === index) return;
    const dir = clamped > index ? "next" : "prev";
    setFlipping(dir);
    setPendingIndex(clamped);
    playFlip();
    window.setTimeout(() => {
      setIndex(clamped);
      setFlipping(null);
      setPendingIndex(null);
    }, FLIP_MS);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const jumpToMonth = (mi: number) => {
    // first plant of that month = cover(1) + all previous months' (1 intro + plants) + 1 (skip intro)
    let target = 1; // past cover
    for (let i = 0; i < mi; i++) target += 1 + JOURNAL_MONTHS[i].plants.length;
    target += 1; // skip month-intro to first plant
    goTo(target);
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) next(); else prev();
  };

  // Progress used for the "book thickness" illusion
  const progress = total <= 1 ? 0 : index / (total - 1);
  const leftStack = Math.round(4 + progress * 14);
  const rightStack = Math.round(4 + (1 - progress) * 14);

  // Current month index for the tab strip
  const currentPage = pages[index];
  const currentMonth = currentPage.kind === "cover" ? -1 : currentPage.monthIndex;

  // The page we're flipping AWAY from (front of the flipping sheet)
  const flipFrontPage = flipping ? pages[index] : null;
  const flipBackPage = flipping && pendingIndex != null ? pages[pendingIndex] : null;

  return (
    <section id="calendar" className="relative bg-sage py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Seasonal Journal</Eyebrow>
          <h2 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">A Botanical Journal, Kept by Season.</h2>
          <p className="mt-4 text-charcoal/75">
            Turn the pages of our field notebook to find plants that naturally thrive across an Indian year — one carefully chosen companion at a time.
          </p>
        </div>

        {/* Month strip */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-full bg-ivory/70 px-3 py-2 shadow-sm backdrop-blur-sm">
          {JOURNAL_MONTHS.map((m, i) => (
            <button
              key={m.name}
              onClick={() => jumpToMonth(i)}
              className={`rounded-full px-3 py-1.5 text-xs tracking-wide transition md:text-sm ${
                i === currentMonth ? "bg-olive text-ivory shadow-sm" : "text-charcoal/70 hover:text-forest"
              }`}
            >
              {m.name.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Book */}
        <div className="mt-12 flex flex-col items-center">
          <div
            className="relative w-full max-w-[980px] select-none"
            style={{ perspective: "2400px" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Under-book shadow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-8 right-8 h-8 rounded-full bg-forest/25 blur-2xl"
            />

            {/* Book body */}
            <div className="relative mx-auto aspect-[16/10.5] w-full">
              {/* Left stack (finished pages) */}
              <StackEdge side="left" thickness={leftStack} />
              {/* Right stack (remaining pages) */}
              <StackEdge side="right" thickness={rightStack} />

              {/* Inner spread frame */}
              <div className="absolute inset-0 overflow-hidden rounded-[10px] bg-[#f5efdf] shadow-[0_40px_80px_-30px_rgba(30,45,30,0.55)] ring-1 ring-forest/10">
                {/* Static spread — the current visible pages */}
                <StaticSpread page={currentPage} />

                {/* Spine seam */}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[26px] -translate-x-1/2 bg-gradient-to-r from-transparent via-forest/25 to-transparent md:block" />
                <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-forest/25 md:block" />

                {/* Flipping sheet overlay */}
                {flipping && flipFrontPage && flipBackPage && (
                  <FlippingSheet
                    direction={flipping}
                    front={flipFrontPage}
                    back={flipBackPage}
                    durationMs={FLIP_MS}
                  />
                )}

                {/* Edge click zones */}
                <button
                  aria-label="Previous page"
                  onClick={prev}
                  className="absolute inset-y-0 left-0 z-30 w-1/6 cursor-w-resize focus:outline-none"
                />
                <button
                  aria-label="Next page"
                  onClick={next}
                  className="absolute inset-y-0 right-0 z-30 w-1/6 cursor-e-resize focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center gap-4 text-sm text-charcoal/70">
            <button
              onClick={prev}
              disabled={index === 0 || !!flipping}
              className="grid h-10 w-10 place-items-center rounded-full border border-forest/25 text-forest transition hover:bg-forest hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest"
            >‹</button>
            <div className="font-serif italic text-charcoal/60">
              {currentPage.kind === "cover"
                ? "Cover"
                : `${JOURNAL_MONTHS[currentPage.monthIndex].name} · Page ${index} of ${total - 1}`}
            </div>
            <button
              onClick={next}
              disabled={index === total - 1 || !!flipping}
              className="grid h-10 w-10 place-items-center rounded-full border border-forest/25 text-forest transition hover:bg-forest hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest"
            >›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackEdge({ side, thickness }: { side: "left" | "right"; thickness: number }) {
  const layers = Array.from({ length: thickness });
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-1 ${side === "left" ? "left-0" : "right-0"} w-2`}
      style={{ zIndex: 1 }}
    >
      {layers.map((_, i) => (
        <div
          key={i}
          className="absolute inset-y-0 rounded-[2px]"
          style={{
            ...(side === "left" ? { left: `${-i * 1.2}px` } : { right: `${-i * 1.2}px` }),
            width: "3px",
            background: i % 2 === 0 ? "#e8dfc7" : "#efe6cf",
            boxShadow: i === layers.length - 1 ? "0 0 0 1px rgba(60,70,50,0.08)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

/** Two-page spread showing the *current* resting page. */
function StaticSpread({ page }: { page: PageKind }) {
  // For "cover" we render a single-cover treatment across the whole spread.
  if (page.kind === "cover") {
    return <CoverSpread />;
  }
  if (page.kind === "month-intro") {
    const m = JOURNAL_MONTHS[page.monthIndex];
    return (
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        <PaperPage side="left"><MonthIntroLeft month={m} /></PaperPage>
        <PaperPage side="right"><MonthIntroRight month={m} /></PaperPage>
      </div>
    );
  }
  const m = JOURNAL_MONTHS[page.monthIndex];
  const p = m.plants[page.plantIndex];
  return (
    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
      <PaperPage side="left"><PlantPageImage plant={p} month={m} /></PaperPage>
      <PaperPage side="right"><PlantPageText plant={p} month={m} index={page.plantIndex} total={m.plants.length} /></PaperPage>
    </div>
  );
}

/** A single flipping sheet: front face shows the outgoing page-half, back face the incoming one. */
function FlippingSheet({
  direction, front, back, durationMs,
}: {
  direction: "next" | "prev";
  front: PageKind;
  back: PageKind;
  durationMs: number;
}) {
  // Which side of the spread is turning
  const turningRight = direction === "next";
  // Face content — we show just the relevant half of each page
  return (
    <div
      className={`absolute inset-y-0 z-20 ${turningRight ? "right-0 left-1/2" : "left-0 right-1/2"}`}
      style={{ perspective: "2400px" }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: turningRight ? "left center" : "right center",
          animation: `${turningRight ? "egrow-flip-next" : "egrow-flip-prev"} ${durationMs}ms cubic-bezier(0.55, 0.05, 0.35, 1) forwards`,
        }}
      >
        {/* FRONT face (outgoing) */}
        <div
          className="absolute inset-0 overflow-hidden bg-[#f5efdf]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <HalfFace page={front} side={turningRight ? "right" : "left"} />
          {/* travelling shadow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: turningRight
                ? "linear-gradient(to right, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%)"
                : "linear-gradient(to left, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%)",
            }}
          />
        </div>
        {/* BACK face (incoming) */}
        <div
          className="absolute inset-0 overflow-hidden bg-[#f5efdf]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <HalfFace page={back} side={turningRight ? "left" : "right"} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: turningRight
                ? "linear-gradient(to left, rgba(0,0,0,0) 60%, rgba(0,0,0,0.15) 100%)"
                : "linear-gradient(to right, rgba(0,0,0,0) 60%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** Renders just one side (left/right) of a page for the flipping face. */
function HalfFace({ page, side }: { page: PageKind; side: "left" | "right" }) {
  if (page.kind === "cover") {
    return <div className="h-full w-full"><CoverHalf side={side} /></div>;
  }
  if (page.kind === "month-intro") {
    const m = JOURNAL_MONTHS[page.monthIndex];
    return (
      <PaperPage side={side} fill>
        {side === "left" ? <MonthIntroLeft month={m} /> : <MonthIntroRight month={m} />}
      </PaperPage>
    );
  }
  const m = JOURNAL_MONTHS[page.monthIndex];
  const p = m.plants[page.plantIndex];
  return (
    <PaperPage side={side} fill>
      {side === "left"
        ? <PlantPageImage plant={p} month={m} />
        : <PlantPageText plant={p} month={m} index={page.plantIndex} total={m.plants.length} />}
    </PaperPage>
  );
}

function PaperPage({ side, children, fill = false }: { side: "left" | "right"; children: React.ReactNode; fill?: boolean }) {
  return (
    <div
      className={`relative h-full ${fill ? "w-full" : ""} overflow-hidden`}
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #fbf6e6 0%, #f4ecd5 60%, #eee2c2 100%)",
      }}
    >
      {/* subtle paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(120,100,60,0.05) 0 1px, transparent 1px 3px), radial-gradient(circle at 20% 30%, rgba(120,100,60,0.06), transparent 60%), radial-gradient(circle at 80% 70%, rgba(120,100,60,0.05), transparent 55%)",
        }}
      />
      {/* deckled edge */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-2`}
        style={{
          background:
            side === "left"
              ? "linear-gradient(to right, rgba(60,50,30,0.14), transparent)"
              : "linear-gradient(to left, rgba(60,50,30,0.14), transparent)",
        }}
      />
      {/* spine-side gutter shadow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 ${side === "left" ? "right-0" : "left-0"} w-10`}
        style={{
          background:
            side === "left"
              ? "linear-gradient(to right, transparent, rgba(60,50,30,0.16))"
              : "linear-gradient(to left, transparent, rgba(60,50,30,0.16))",
        }}
      />
      {/* Corner sketches */}
      <CornerSketch side={side} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function CornerSketch({ side }: { side: "left" | "right" }) {
  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 60 60"
        className={`pointer-events-none absolute h-16 w-16 text-olive/40 ${side === "left" ? "left-3 top-3" : "right-3 top-3"}`}
        fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"
      >
        <path d="M6 30 C 18 10, 40 8, 54 20" />
        <path d="M14 24 C 20 22, 24 24, 26 30" />
        <path d="M28 18 C 34 18, 38 22, 40 28" />
        <path d="M42 14 C 48 14, 52 18, 54 22" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 60 60"
        className={`pointer-events-none absolute h-14 w-14 text-olive/30 ${side === "left" ? "left-4 bottom-4" : "right-4 bottom-4"}`}
        fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"
      >
        <path d="M8 50 C 20 40, 30 32, 50 20" />
        <path d="M18 46 C 20 42, 24 40, 28 40" />
        <path d="M34 34 C 38 30, 42 30, 46 32" />
      </svg>
    </>
  );
}

function CoverSpread() {
  return (
    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block"><CoverHalf side="left" /></div>
      <CoverHalf side="right" />
    </div>
  );
}

function CoverHalf({ side }: { side: "left" | "right" }) {
  // The right half carries the title; the left half is the inside back-cover flap.
  if (side === "left") {
    return (
      <div
        className="relative h-full w-full"
        style={{
          background:
            "linear-gradient(135deg, #354a35 0%, #2a3d2b 50%, #223022 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 50%), repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 6px)",
          }}
        />
        <div className="absolute inset-0 grid place-items-center p-10 text-center">
          <div className="text-ivory/70">
            <div className="font-serif text-2xl italic">Vol. I</div>
            <div className="mx-auto my-4 h-px w-16 bg-ivory/40" />
            <div className="text-xs tracking-[0.35em]">EGROW · EST. 2018</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="relative h-full w-full"
      style={{
        background:
          "linear-gradient(135deg, #3a5238 0%, #2f4530 55%, #253728 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1), transparent 55%), repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 6px)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center p-8 text-center text-ivory">
        <div>
          <svg viewBox="0 0 120 120" className="mx-auto h-16 w-16 text-ivory/70" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M60 20 C 40 40, 40 80, 60 100 C 80 80, 80 40, 60 20 Z" />
            <path d="M60 20 L 60 100" />
            <path d="M60 40 C 52 45, 48 55, 50 65" />
            <path d="M60 40 C 68 45, 72 55, 70 65" />
            <path d="M60 60 C 52 65, 50 75, 52 85" />
            <path d="M60 60 C 68 65, 70 75, 68 85" />
          </svg>
          <div className="mx-auto my-5 h-px w-20 bg-ivory/40" />
          <div className="text-xs uppercase tracking-[0.4em] text-ivory/70">Egrow</div>
          <div className="mt-3 font-serif text-3xl leading-tight md:text-4xl">Seasonal<br />Plant Journal</div>
          <div className="mx-auto mt-5 h-px w-12 bg-ivory/40" />
          <div className="mt-4 font-serif text-sm italic text-ivory/70">Turn the page to begin →</div>
        </div>
      </div>
    </div>
  );
}

function MonthIntroLeft({ month }: { month: JournalMonth }) {
  return (
    <div className="flex h-full flex-col justify-between p-10 md:p-14">
      <div>
        <div className="text-xs uppercase tracking-[0.4em] text-olive/70">Chapter</div>
        <h3 className="mt-3 font-serif text-6xl leading-none text-forest md:text-7xl">{month.name}</h3>
        <div className="mt-4 max-w-xs text-sm italic text-charcoal/75">{month.season}</div>
      </div>
      <div className="max-w-xs font-serif text-lg italic leading-snug text-charcoal/80">
        “{month.epigraph}”
      </div>
      <div className="text-[10px] uppercase tracking-[0.35em] text-charcoal/50">Egrow Field Notes</div>
    </div>
  );
}

function MonthIntroRight({ month }: { month: JournalMonth }) {
  return (
    <div className="flex h-full flex-col p-10 md:p-14">
      <div className="text-xs uppercase tracking-[0.35em] text-olive/70">In this chapter</div>
      <div className="mt-6 space-y-4">
        {month.plants.map((p, i) => (
          <div key={p.name} className="flex items-baseline gap-4 border-b border-forest/10 pb-3">
            <div className="font-serif text-2xl italic text-forest/70">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className="font-serif text-xl text-forest">{p.name}</div>
              <div className="text-xs italic text-charcoal/60">{p.latin}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6 text-xs italic text-charcoal/60">
        Turn the page for each plant, its ideal moment, and a short note from the nursery.
      </div>
    </div>
  );
}

function PlantPageImage({ plant, month }: { plant: JournalPlant; month: JournalMonth }) {
  const img = JOURNAL_IMAGES[Math.abs((plant.name.length + month.name.length) % JOURNAL_IMAGES.length)];
  return (
    <div className="flex h-full flex-col p-8 md:p-10">
      <div className="mb-4 flex items-baseline justify-between text-[10px] uppercase tracking-[0.35em] text-charcoal/50">
        <span>{month.name}</span>
        <span>Field Plate</span>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-md ring-1 ring-forest/15">
        <img src={img} alt={plant.name} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_60%,rgba(60,50,30,0.18)_100%)]" />
      </div>
      <div className="mt-5">
        <div className="font-serif text-3xl italic text-forest md:text-4xl">{plant.name}</div>
        <div className="mt-1 text-xs italic text-charcoal/60">{plant.latin}</div>
        <div className="mt-3 h-px w-16 bg-olive/40" />
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal/75">{plant.intro}</p>
      </div>
    </div>
  );
}

function PlantPageText({
  plant, month, index, total,
}: { plant: JournalPlant; month: JournalMonth; index: number; total: number }) {
  return (
    <div className="flex h-full flex-col p-8 md:p-10">
      <div className="mb-4 flex items-baseline justify-between text-[10px] uppercase tracking-[0.35em] text-charcoal/50">
        <span>{month.name} — Plate {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span>Notes</span>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-charcoal/80">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-olive/80">Why this month</div>
          <p className="mt-1">{plant.why}</p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-olive/80">Benefits</div>
          <p className="mt-1">{plant.benefits}</p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-olive/80">Care</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <CareChip label="Light" value={plant.care.light} />
            <CareChip label="Water" value={plant.care.water} />
            <CareChip label="Upkeep" value={plant.care.upkeep} />
          </div>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <div className="rounded-md border border-olive/30 bg-ivory/60 p-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-olive">
            <Leaf className="h-3 w-3" /> Egrow Tip
          </div>
          <p
            className="mt-2 text-sm leading-relaxed text-charcoal/85"
            style={{ fontFamily: "'Caveat', 'Segoe Script', cursive" as string }}
          >
            {plant.tip}
          </p>
        </div>
      </div>
    </div>
  );
}

function CareChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-ivory/60 p-2 ring-1 ring-forest/10">
      <div className="text-[10px] uppercase tracking-[0.25em] text-olive/80">{label}</div>
      <div className="mt-1 text-xs leading-snug text-charcoal/80">{value}</div>
    </div>
  );
}
