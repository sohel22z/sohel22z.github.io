"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaChartLine,
  FaCheck,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaCode,
  FaCodeBranch,
  FaCogs,
  FaDatabase,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFilePdf,
  FaFolder,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaLayerGroup,
  FaLinkedin,
  FaMapPin,
  FaMedal,
  FaRocket,
  FaStar,
  FaToolbox
} from "react-icons/fa";

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  login: string;
  html_url: string;
  public_repos: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  homepage: string;
  topics: string[];
}

const defaultUser: GitHubUser = {
  avatar_url: "https://avatars.githubusercontent.com/u/90556891?v=4",
  name: "Sohel Ansari",
  bio: "Frontend Developer with 4+ years of experience building scalable, performant web applications using Next.js, React, and TypeScript.",
  followers: 12,
  following: 34,
  location: "Ahmedabad, India",
  login: "sohel22z",
  html_url: "https://github.com/sohel22z",
  public_repos: 15,
};

const enterpriseProjects = [
  {
    id: "bookmyescape",
    title: "BookMyEscape",
    subtitle: "Enterprise Travel & Flight Booking Engine",
    badge: "Flagship OTA Platform",
    tags: ["Next.js (App Router)", "TypeScript", "Zustand", "TailwindCSS", "REST APIs", "Gitlab CI/CD"],
    description:
      "Architected a high-converting OTA travel platform unifying 100+ global supplier APIs into a single, type-safe booking engine designed for sub-second search rendering.",
    bullets: [
      "Engineered type-safe booking workflows using Next.js App Router and TypeScript, eliminating runtime data mismatches across flight/hotel availability pipelines.",
      "Leveraged Next.js SSR and SSG to achieve top-tier Lighthouse SEO scores and sub-second page load times for high-traffic search queries.",
      "Integrated REST APIs for real-time inventory checking with clean async state management (loading, error, fallback), reducing perceived latency for end users.",
      "Designed mobile-first, WCAG 2.1 AA accessible booking interfaces with Tailwind CSS, delivering a flawless user experience across all devices.",
    ],
  },
  {
    id: "uworld-suite",
    title: "uWorld Suite",
    subtitle: "Multi-Tenant Analytics & Dashboard System",
    badge: "Enterprise SaaS",
    tags: ["Vite JS", "React", "Redux", "Bootstrap", "ChartJS", "Bitbucket"],
    description:
      "Designed a white-label UI framework enabling multi-tenant enterprise rebranding without code duplication, paired with interactive real-time business intelligence dashboards.",
    bullets: [
      "Architected a dynamic multi-brand white-label system, enabling seamless rebranding and theme switches across client deployments without duplicating UI code.",
      "Built interactive data visualization dashboards using ChartJS, empowering enterprise clients with real-time analytics on key business performance metrics.",
      "Implemented advanced performance strategies—including code splitting, lazy loading, and WebP compression—reducing overall bundle size and accelerating load times by 35%.",
    ],
  },
];

const workExperience = [
  {
    period: "Apr 2025 – Present",
    role: "Next JS Developer",
    company: "Traveltekpro IT Solutions",
    location: "Ahmedabad, India",
    type: "Full-Time",
    highlights: [
      "Architected the frontend for an enterprise OTA platform integrating 100+ global hotel and flight supplier APIs into a single unified booking interface, cutting integration overhead for operations.",
      "Developed a multi-module UI covering flight search, hotel booking, DMC itinerary builder, and instant quote generation using Next.js App Router and TypeScript, enabling type-safe feature delivery.",
      "Designed a multi-tier agent management dashboard featuring role-based controls for credit limits, commission tracking, and booking oversight, reducing B2B client onboarding friction.",
      "Built responsive B2B and B2C booking flows with Tailwind CSS across devices, supporting dual user journeys on a single platform and eliminating cross-device layout bugs.",
      "Leveraged Next.js SSR and SSG to optimize high-traffic search and listing pages, significantly improving Time to First Byte (TTFB) and overall Lighthouse performance scores.",
    ],
  },
  {
    period: "Apr 2022 – Mar 2025",
    role: "Front-End Developer",
    company: "Impero IT Services Pvt. Ltd.",
    location: "Ahmedabad, India",
    type: "Full-Time",
    highlights: [
      "Successfully shipped 15+ production web applications for diverse client sectors using ReactJS, maintaining zero critical rollbacks across all client deployments.",
      "Spearheaded mobile responsiveness and accessibility audits across 8+ projects, elevating average Lighthouse performance scores by 30% and achieving WCAG 2.1 AA compliance.",
      "Optimized asset delivery pipelines using WebP compression, lazy loading, and bundle optimization, driving measurable improvements in Core Web Vitals.",
      "Collaborated actively in Agile/Scrum environments, participating in sprint planning, peer code reviews, and retrospectives to ensure consistent on-time deliverables.",
    ],
  },
  {
    period: "Dec 2021 – Mar 2022",
    role: "Trainee Front-End Developer",
    company: "Impero IT Services Pvt. Ltd.",
    location: "Ahmedabad, India",
    type: "Trainee",
    highlights: [
      "Constructed responsive UI layouts and reusable component libraries in React under senior mentorship, contributing to 3 live client projects within the first 90 days.",
      "Mastered Redux state management patterns, mobile-first design methodologies, and cross-browser debugging, establishing a strong foundation for rapid career growth.",
    ],
  },
];

const skillCategories = [
  {
    icon: <FaCode className="text-accent" size={16} aria-hidden="true" />,
    title: "Frontend Core",
    tags: ["Next.js (App Router)", "ReactJS", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    icon: <FaLayerGroup className="text-accent" size={16} aria-hidden="true" />,
    title: "Styling & UI",
    tags: ["TailwindCSS", "Styled-Components", "Bootstrap", "SASS/SCSS"],
  },
  {
    icon: <FaToolbox className="text-accent" size={16} aria-hidden="true" />,
    title: "State & Data",
    tags: ["Redux Toolkit (RTK)", "Zustand", "Context API", "React Query", "REST APIs"],
  },
  {
    icon: <FaDatabase className="text-accent" size={16} aria-hidden="true" />,
    title: "Performance",
    tags: ["SSR / SSG", "Core Web Vitals", "PWA", "Lazy Loading", "Code Splitting"],
  },
  {
    icon: <FaCogs className="text-accent" size={16} aria-hidden="true" />,
    title: "Dev Tools",
    tags: ["Git", "GitHub", "Gitlab CI/CD", "Bitbucket", "VS Code", "React DevTools"],
  },
  {
    icon: <FaChartLine className="text-accent" size={16} aria-hidden="true" />,
    title: "Full-Stack Expansion",
    tags: ["Node.js", "Express.js", "MongoDB", "ChartJS", "Agile/Scrum"],
  },
];

const coreCompetencies = [
  { name: "Next.js / ReactJS Architecture", level: 95 },
  { name: "TypeScript & Async Data Patterns", level: 92 },
  { name: "Tailwind CSS & Mobile-First Layouts", level: 94 },
  { name: "State Management (Redux RTK / Zustand)", level: 90 },
  { name: "Core Web Vitals & TTFB Optimization", level: 92 },
  { name: "Full-Stack Development (Node / Express / Mongo)", level: 75 },
];

const certificationsList = [
  { name: "One Million Prompters", issuer: "DFF", year: "2025" },
  { name: "React Native", issuer: "Meta (Coursera)", year: "2024" },
  { name: "Advanced React", issuer: "Meta (Coursera)", year: "2023" },
  { name: "JavaScript Algorithms & Data Structures", issuer: "FreeCodeCamp", year: "2023" },
  { name: "Responsive Web Design", issuer: "FreeCodeCamp", year: "2021" },
];

const defaultRepos: GitHubRepo[] = [
  { id: 1, name: "portfolio-website", description: "Personal portfolio built with Next.js, React, TypeScript, and TailwindCSS", stargazers_count: 5, forks_count: 2, language: "TypeScript", html_url: "https://github.com/sohel22z/portfolio-website", homepage: "https://sohel22z.github.io", topics: ["nextjs", "typescript", "portfolio"] },
  { id: 2, name: "task-manager", description: "Task management application with React and local storage state persistence", stargazers_count: 3, forks_count: 1, language: "JavaScript", html_url: "https://github.com/sohel22z/task-manager", homepage: "", topics: ["react", "javascript"] },
  { id: 3, name: "weather-app", description: "Weather forecast web application using OpenWeatherMap REST API", stargazers_count: 2, forks_count: 1, language: "TypeScript", html_url: "https://github.com/sohel22z/weather-app", homepage: "", topics: ["react", "api"] },
  { id: 4, name: "todo-app", description: "Clean todo application with reactive CRUD workflows", stargazers_count: 1, forks_count: 0, language: "JavaScript", html_url: "https://github.com/sohel22z/todo-app", homepage: "", topics: ["javascript", "dom"] },
  { id: 5, name: "css-snippets", description: "Curated collection of responsive CSS layout snippets and micro-animations", stargazers_count: 8, forks_count: 3, language: "CSS", html_url: "https://github.com/sohel22z/css-snippets", homepage: "", topics: ["css", "snippets"] },
  { id: 6, name: "javascript-projects", description: "Vanilla JavaScript algorithms and practical web projects", stargazers_count: 4, forks_count: 2, language: "JavaScript", html_url: "https://github.com/sohel22z/javascript-projects", homepage: "", topics: ["javascript", "practice"] },
];

const languageColors: Record<string, string> = {
  TypeScript: "#ccff00", JavaScript: "#f7df1e", CSS: "#8b5cf6", HTML: "#f97316",
};

function CountUp({ end, suffix = "", duration = 1200 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const raf = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between font-mono text-xs text-muted">
        <span>{name}</span>
        <span className="text-accent tabular-nums font-bold">{level}%</span>
      </div>
      <div className="h-2 bg-surface-alt rounded-full overflow-hidden border border-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-dark to-accent rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function VisitorCounter({ username }: { username: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-alt border border-white/10 font-mono text-[10px] text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-foreground font-bold">CONSOLE VIEWS</span>
        <span className="text-accent font-bold">ACTIVE</span>
      </div>
    );
  }

  return (
    <img
      src={`https://api.visitorbadge.io/api/visitors?path=${username}.github.io&label=CONSOLE%20VIEWS&labelColor=%23181820&countColor=%23ccff00&style=flat-square`}
      alt="Console Views Counter"
      width={140}
      height={20}
      onError={() => setHasError(true)}
      className="h-5 rounded opacity-90 hover:opacity-100 transition-opacity"
    />
  );
}

function RoleTyping() {
  const roles = ["Architect", "Next.js Specialist", "React Engineer", "TypeScript Expert"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const interval = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(interval);
  }, [subIndex, index, reverse, roles]);

  return (
    <span className="text-accent inline-block min-w-[200px]">
      {roles[index].substring(0, subIndex)}
      <span className="inline-block w-2.5 h-8 ml-1 bg-accent animate-pulse align-middle" />
    </span>
  );
}

function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-30 transition-transform duration-75 ease-out hidden md:block"
      style={{
        left: `${pos.x - 200}px`,
        top: `${pos.y - 200}px`,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(204, 255, 0, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}

export default function HomePage() {
  const [user, setUser] = useState<GitHubUser>(defaultUser);
  const [repos, setRepos] = useState<GitHubRepo[]>(defaultRepos);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"experience" | "skills">("experience");
  const [expandedExperience, setExpandedExperience] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const email = "sohelansarii@outlook.com";
  const resumePath = "/Sohel_Ansari_Resume.pdf";

  useEffect(() => {
    const fetchData = async () => {
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "sohel22z";
      const key = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const headers: Record<string, string> = { Accept: "application/vnd.github.v3+json" };
      if (key) headers["Authorization"] = `Bearer ${key}`;

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8&type=public`, { headers }),
        ]);
        if (userRes.ok) {
          const d = await userRes.json();
          setUser((prev) => ({ ...prev, ...d, public_repos: d.public_repos || 15 }));
        }
        if (reposRes.ok) {
          const d = await reposRes.json();
          if (Array.isArray(d) && d.length > 0) {
            setRepos(
              d.filter((r: GitHubRepo) => !r.name.startsWith("."))
               .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
            );
          }
        }
      } catch {
        console.log("Using fallback profile data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [email]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  }, []);

  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "experience-skills", label: "Experience & Skills" },
    { id: "about", label: "Profile" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-bg text-foreground overflow-hidden font-sans relative">
      
      {/* Interactive Cursor Spotlight */}
      <CursorSpotlight />

      {/* Background Ambient Glows */}
      <div className="glow-spot top-[-100px] left-[-100px]" />
      <div className="glow-spot top-[40%] right-[-150px] opacity-70" />

      {/* Floating Glass Navigation */}
      <motion.header
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4`}
        initial={shouldReduceMotion ? { opacity: 0 } : { y: -30, opacity: 0 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container max-w-5xl mx-auto">
          <div className={`glass-card flex items-center justify-between px-5 py-3 ${scrolled ? "bg-surface/90 shadow-2xl border-white/10" : ""}`}>
            
            <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
              <span className="font-mono text-sm font-black bg-accent text-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                SA
              </span>
              <div className="text-left hidden sm:block">
                <span className="font-mono font-bold text-xs uppercase block tracking-wider text-foreground">
                  Sohel Ansari
                </span>
                <span className="text-[10px] text-accent font-mono block">Frontend Architect</span>
              </div>
            </button>

            {/* Desktop Nav Items */}
            <nav className="desktop-only flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent px-3 py-1.5 rounded-full hover:bg-white/5 transition-all"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2 !px-4 text-xs flex items-center gap-2"
              >
                <FaDownload size={11} aria-hidden="true" /> Resume
              </a>

              {/* Mobile Hamburger */}
              <button
                className="mobile-only p-2 text-muted hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  {isMenuOpen ? (
                    <path d="M6 6L18 18M6 18L18 6" strokeWidth="2.5" strokeLinecap="round" />
                  ) : (
                    <path d="M4 6H20M4 12H20M4 18H20" strokeWidth="2.5" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-only max-w-5xl mx-auto mt-2 overflow-hidden glass-card bg-surface/95 border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block w-full text-left font-mono py-2.5 px-4 text-xs uppercase tracking-widest text-muted hover:text-accent hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-2">
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary text-xs flex items-center justify-center gap-2"
                  >
                    <FaFilePdf size={12} aria-hidden="true" /> Download Resume PDF
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main id="main-content" tabIndex={-1} className="outline-none">
        
        {/* Restructured Executive Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center pt-32 md:pt-36 pb-20 tech-grid">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-8 text-left">
                
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light border border-accent/30 text-accent font-mono text-xs max-w-full leading-tight">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping shrink-0" />
                    <span>Available for Senior / Lead Frontend Roles • Ahmedabad, India</span>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <h1 className="heading-xl tracking-tight text-foreground font-black uppercase">
                    Frontend <RoleTyping />
                  </h1>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="text-large max-w-xl font-sans text-muted leading-relaxed">
                    Frontend Developer with <strong className="text-foreground">4+ years of industry experience</strong> building high-performance, enterprise web applications using <strong className="text-foreground">Next.js, React, and TypeScript</strong>. Specialized in complex booking engines, multi-tier agent dashboards, and Core Web Vitals optimization.
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
                    <button onClick={() => scrollTo("projects")} className="btn-primary w-full sm:w-auto">
                      Explore Selected Work <FaArrowRight size={12} aria-hidden="true" />
                    </button>
                    <a
                      href={resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full sm:w-auto"
                    >
                      <FaFilePdf size={14} className="text-accent" aria-hidden="true" /> Download Resume PDF
                    </a>
                  </div>
                </Reveal>

                {/* Sleek Metrics Grid */}
                <Reveal delay={0.2}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border">
                    <div className="glass-card p-4 text-center sm:text-left">
                      <p className="stat-number tabular-nums"><CountUp end={4} suffix="+" /></p>
                      <p className="stat-label">Years Experience</p>
                    </div>
                    <div className="glass-card p-4 text-center sm:text-left">
                      <p className="stat-number tabular-nums"><CountUp end={15} suffix="+" /></p>
                      <p className="stat-label">Prod Web Apps</p>
                    </div>
                    <div className="glass-card p-4 text-center sm:text-left">
                      <p className="stat-number tabular-nums"><CountUp end={35} suffix="%" /></p>
                      <p className="stat-label">TTFB Optimization</p>
                    </div>
                    <div className="glass-card p-4 text-center sm:text-left">
                      <p className="stat-number tabular-nums"><CountUp end={100} suffix="+" /></p>
                      <p className="stat-label">Supplier APIs</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Glass Profile Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <Reveal delay={0.1}>
                  <div className="w-full max-w-sm glass-card p-6 space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex justify-between items-center border-b border-border pb-4 font-mono text-xs">
                      <span className="text-accent font-bold tracking-widest uppercase flex items-center gap-2">
                        <FaLaptopCode size={14} /> Developer Specs
                      </span>
                      <span className="text-muted text-[11px]">2026.2</span>
                    </div>

                    <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/10 bg-surface-alt">
                      <img
                        src={user.avatar_url}
                        alt="Sohel Ansari — Frontend Architect"
                        width={360}
                        height={360}
                        fetchPriority="high"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-mono text-[11px] text-accent font-bold">
                        @{user.login}
                      </div>
                    </div>

                    <div className="space-y-2.5 font-mono text-xs text-muted">
                      <div className="flex justify-between border-b border-white/5 pb-1.5">
                        <span>NAME:</span>
                        <span className="text-foreground font-bold">{user.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1.5">
                        <span>ROLE:</span>
                        <span className="text-accent font-bold">Frontend Developer</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1.5">
                        <span>LOCATION:</span>
                        <span className="text-foreground font-bold flex items-center gap-1">
                          <FaMapPin size={10} className="text-accent" /> Ahmedabad, India
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1.5">
                        <span>CORE STACK:</span>
                        <span className="text-foreground font-bold">Next.js • React • TS</span>
                      </div>
                    </div>

                    <a
                      href={resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-primary !py-2.5 text-xs flex items-center justify-center gap-2"
                    >
                      <FaDownload size={11} aria-hidden="true" /> Download Resume PDF
                    </a>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* Featured Enterprise Platforms Section */}
        <section id="projects" className="section bg-surface-alt/50">
          <div className="container">
            
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-xl">
                  <span className="label">FEATURED ENTERPRISE SYSTEMS</span>
                  <h2 className="heading-lg mt-3">Production Platforms</h2>
                  <p className="text-body font-mono text-sm mt-3">
                    Complex travel engines and white-label SaaS systems built with type-safe architectures and performance optimizations.
                  </p>
                </div>
                <a
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-2.5 !px-5 text-xs flex items-center gap-2"
                >
                  <FaFilePdf size={13} className="text-accent" aria-hidden="true" /> View Resume Details
                </a>
              </div>
            </Reveal>

            {/* Enterprise Platform Cards */}
            <div className="grid grid-cols-1 gap-8 mb-16">
              {enterpriseProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.1}>
                  <div className="glass-card p-6 md:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <div>
                        <span className="tag tag-accent text-xs font-mono uppercase tracking-wider mb-2">
                          {project.badge}
                        </span>
                        <h3 className="font-mono text-2xl font-extrabold uppercase text-foreground mt-1">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-accent mt-0.5">{project.subtitle}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-w-md sm:justify-end">
                        {project.tags.map((t) => (
                          <span key={t} className="tag text-xs font-mono">{t}</span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted font-sans leading-relaxed">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                      {project.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-muted bg-surface/60 p-3 rounded-lg border border-white/5">
                          <FaCheckCircle className="text-accent shrink-0 mt-0.5" size={13} />
                          <span className="leading-relaxed">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Open Source / GitHub Repos Section */}
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-8 border-t border-border">
                <div>
                  <span className="label">OPEN SOURCE MODULES</span>
                  <h3 className="heading-md mt-2">Active GitHub Repositories</h3>
                </div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-accent hover:underline flex items-center gap-1 uppercase"
                >
                  <FaGithub size={14} /> View GitHub Console ({user.public_repos} repos) <FaArrowRight size={10} />
                </a>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.slice(0, 6).map((repo, index) => (
                <Reveal key={repo.id} delay={index * 0.05}>
                  <div className="glass-card p-6 flex flex-col justify-between h-full min-h-[220px]">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg border border-white/10 bg-surface-alt flex items-center justify-center text-accent">
                            <FaFolder size={16} />
                          </div>
                          <h4 className="font-mono font-bold text-sm tracking-tight text-foreground hover:text-accent">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              {repo.name}
                            </a>
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-muted">
                          <span className="flex items-center gap-1"><FaStar size={11} className="text-accent" /> {repo.stargazers_count}</span>
                          <span className="flex items-center gap-1"><FaCodeBranch size={11} /> {repo.forks_count}</span>
                        </div>
                      </div>

                      <p className="text-xs text-muted font-sans leading-relaxed mb-6 line-clamp-3">
                        {repo.description || "Production-ready open source module. Check repository code for setup instructions and variable architecture."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/5">
                      {repo.language && (
                        <span className="tag tag-accent flex items-center gap-2 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] || "#ccff00" }} />
                          {repo.language}
                        </span>
                      )}
                      
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-accent hover:underline flex items-center gap-1 uppercase"
                      >
                        Source <FaArrowRight size={10} />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* Restructured Interactive Career & Skills Hub */}
        <section id="experience-skills" className="section bg-bg tech-grid">
          <div className="container">
            
            <Reveal>
              <div className="max-w-2xl mb-12">
                <span className="label">TECHNICAL BACKGROUND // CREDENTIALS</span>
                <h2 className="heading-lg mt-3">Experience & Skills Hub</h2>
                <p className="text-body font-mono text-sm mt-3">
                  Toggle between detailed work history achievements and technical performance metrics.
                </p>
              </div>
            </Reveal>

            {/* Interactive Tab Controls */}
            <div className="flex justify-center sm:justify-start gap-3 mb-10 border-b border-border pb-4">
              <button
                onClick={() => setActiveTab("experience")}
                className={`font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full font-bold transition-all ${
                  activeTab === "experience"
                    ? "bg-accent text-black shadow-lg shadow-accent/25"
                    : "bg-surface text-muted hover:text-foreground border border-white/10"
                }`}
              >
                <FaBriefcase className="inline mr-2" /> Work Experience ({workExperience.length})
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full font-bold transition-all ${
                  activeTab === "skills"
                    ? "bg-accent text-black shadow-lg shadow-accent/25"
                    : "bg-surface text-muted hover:text-foreground border border-white/10"
                }`}
              >
                <FaCode className="inline mr-2" /> Technical Skills & Metrics
              </button>
            </div>

            {/* Tab 1: Work Experience Timeline */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                {workExperience.map((exp, index) => {
                  const isExpanded = expandedExperience === index;
                  return (
                    <Reveal key={exp.company + exp.period} delay={index * 0.08}>
                      <div className="glass-card p-6 md:p-8">
                        <div
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                          onClick={() => setExpandedExperience(isExpanded ? null : index)}
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="font-mono text-xs font-bold text-accent px-3 py-1 rounded-full bg-accent-light border border-accent/30 uppercase">
                                {exp.period}
                              </span>
                              <span className="font-mono text-xs text-muted uppercase flex items-center gap-1">
                                <FaMapPin size={10} className="text-accent" /> {exp.location}
                              </span>
                            </div>
                            <h3 className="font-mono font-extrabold text-xl text-foreground uppercase mt-2">
                              {exp.role} <span className="text-accent font-normal">@ {exp.company}</span>
                            </h3>
                          </div>

                          <button className="flex items-center gap-2 font-mono text-xs text-accent uppercase font-bold self-start md:self-center">
                            {isExpanded ? "Collapse Details" : "View Achievements"}
                            {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                          </button>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pt-6 mt-6 border-t border-white/10"
                            >
                              <ul className="space-y-3 font-mono text-xs text-muted leading-relaxed">
                                {exp.highlights.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-3 bg-surface-alt/40 p-3 rounded-lg border border-white/5">
                                    <span className="text-accent shrink-0 mt-0.5">⚡</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Technical Skills Matrix */}
            {activeTab === "skills" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Skill Bars */}
                <div className="lg:col-span-6 space-y-6">
                  <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4 font-bold">
                    Core Technical Scorecard
                  </h3>
                  <div className="glass-card p-6 space-y-5">
                    {coreCompetencies.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </div>

                {/* Categorized Pill Grid */}
                <div className="lg:col-span-6 space-y-6">
                  <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4 font-bold">
                    Tooling & Library Index
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillCategories.map((cat) => (
                      <div key={cat.title} className="glass-card p-4 space-y-3">
                        <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase border-b border-white/10 pb-2">
                          {cat.icon}
                          <span>{cat.title}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.tags.map((tag) => (
                            <span key={tag} className="tag text-[11px] font-mono">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </section>

        {/* Profile Overview, Education & Certifications */}
        <section id="about" className="section bg-surface-alt/50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Profile Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <Reveal>
                  <span className="label">EXECUTIVE SUMMARY</span>
                  <h2 className="heading-lg mt-3">Engineering Philosophy</h2>
                </Reveal>

                <div className="space-y-4 font-sans text-sm leading-relaxed text-muted glass-card p-6 border-white/10">
                  <p className="text-base text-foreground font-bold font-mono">
                    Driven Frontend Architect specializing in building web platforms that balance sub-second speed with scalable, maintainable architectures.
                  </p>
                  <p>
                    Over 4+ years of engineering experience across <strong className="text-foreground">Traveltekpro IT Solutions</strong> and <strong className="text-foreground">Impero IT Services</strong>, I have specialized in transforming complex business specifications—such as multi-supplier travel API orchestration and white-label SaaS dashboards—into sleek, type-safe Next.js and React applications.
                  </p>
                  <p>
                    My technical philosophy centers on strict type safety, modular state management (Zustand & Redux RTK), mobile-first responsiveness, and uncompromising Core Web Vitals performance standards.
                  </p>
                </div>
              </div>

              {/* Education & Certifications Grid */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Education */}
                <Reveal>
                  <div className="glass-card p-6 space-y-3">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2 font-bold">
                      <FaGraduationCap size={15} /> Education Background
                    </h3>
                    <div className="border-t border-white/10 pt-3 space-y-1 font-mono text-xs">
                      <p className="font-bold text-foreground text-sm">Gujarat University</p>
                      <p className="text-accent">Bachelor of Commerce — Advanced Accounting & Statistics</p>
                      <p className="text-muted text-[11px]">Ahmedabad, Gujarat, India • Jul 2017 – Aug 2020</p>
                    </div>
                  </div>
                </Reveal>

                {/* Verified Certifications */}
                <Reveal delay={0.1}>
                  <div className="glass-card p-6 space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2 font-bold">
                      <FaMedal size={14} /> Verified Certifications ({certificationsList.length})
                    </h3>
                    <div className="space-y-2">
                      {certificationsList.map((cert) => (
                        <div key={cert.name} className="flex justify-between items-center font-mono text-xs border border-white/5 p-2.5 rounded-lg bg-surface/50">
                          <span className="text-foreground font-bold">{cert.name}</span>
                          <span className="text-accent text-[11px]">{cert.issuer} ({cert.year})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

              </div>

            </div>
          </div>
        </section>

        {/* Interactive Connect Desk */}
        <section id="contact" className="section bg-bg relative overflow-hidden tech-grid">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-6 text-left">
                <Reveal>
                  <span className="label">GET IN TOUCH</span>
                  <h2 className="heading-lg mt-3">Let's Build Something Exceptional.</h2>
                  <p className="text-body font-mono text-sm leading-relaxed mt-4">
                    Whether you are hiring for a Senior Frontend Developer, seeking a Next.js Specialist to architect your next platform, or looking for expert advice on Core Web Vitals optimization—I'd love to connect.
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 text-xs"
                  >
                    <FaFilePdf size={14} aria-hidden="true" /> Download Full Resume PDF
                  </a>
                </Reveal>
              </div>

              {/* 4 Interactive Contact Cards */}
              <div className="lg:col-span-7">
                <Reveal delay={0.15}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Email Card */}
                    <div className="glass-card p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[10px] text-accent tracking-widest font-black uppercase">
                        <span>NODE // EMAIL</span>
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-subtle uppercase">EMAIL ADDRESS:</span>
                        <p className="font-mono text-xs font-bold text-foreground break-all select-all">{email}</p>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="w-full btn-primary !py-2 text-[10px] font-mono flex items-center justify-center gap-2"
                      >
                        <FaEnvelope size={11} aria-hidden="true" /> Copy Address
                      </button>
                    </div>

                    {/* Location Node Card */}
                    <div className="glass-card p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[10px] text-accent tracking-widest font-black uppercase">
                        <span>NODE // LOCATION</span>
                        <FaMapPin size={11} className="text-accent" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-subtle uppercase">CURRENT BASE:</span>
                        <p className="font-mono text-xs font-bold text-foreground">Ahmedabad, Gujarat, India</p>
                      </div>
                      <a
                        href={`mailto:${email}?subject=Project Consultation`}
                        className="w-full btn-secondary !py-2 text-[10px] font-mono flex items-center justify-center gap-2"
                      >
                        <FaEnvelope size={10} aria-hidden="true" /> Send Direct Email
                      </a>
                    </div>

                    {/* GitHub Card */}
                    <div className="glass-card p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[10px] text-accent tracking-widest font-black uppercase">
                        <span>LINK // GITHUB</span>
                        <FaGithub size={12} className="text-muted" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-subtle uppercase">REPOSITORY ROOT:</span>
                        <p className="font-mono text-xs font-bold text-foreground">github.com/{user.login}</p>
                      </div>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-secondary !py-2 text-[10px] font-mono flex items-center justify-center gap-2"
                      >
                        <FaRocket size={10} aria-hidden="true" /> Open GitHub Console
                      </a>
                    </div>

                    {/* LinkedIn Card */}
                    <div className="glass-card p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[10px] text-accent tracking-widest font-black uppercase">
                        <span>LINK // LINKEDIN</span>
                        <FaLinkedin size={12} className="text-muted" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-subtle uppercase">PROFILE NODE:</span>
                        <p className="font-mono text-xs font-bold text-foreground">linkedin.com/in/sohelansarii</p>
                      </div>
                      <a
                        href="https://linkedin.com/in/sohelansarii"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-secondary !py-2 text-[10px] font-mono flex items-center justify-center gap-2"
                      >
                        <FaExternalLinkAlt size={10} aria-hidden="true" /> Connect Profile
                      </a>
                    </div>

                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 bg-surface border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left font-mono text-xs text-muted">
              <p>&copy; {new Date().getFullYear()} SOHEL ANSARI. ALL SYSTEMS OPERATIONAL.</p>
              <p className="text-[10px] text-subtle mt-0.5">AHMEDABAD, INDIA • FRONTEND ARCHITECT</p>
            </div>
            
            <div className="flex items-center gap-6">
              <VisitorCounter username={user.login || "sohel22z"} />
              <button
                onClick={() => scrollTo("home")}
                className="font-mono text-xs text-muted hover:text-accent uppercase tracking-widest"
              >
                Back to top &uarr;
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`copy-toast ${copied ? "visible" : ""}`} aria-live="polite">
        <FaCheck size={12} className="inline mr-2" aria-hidden="true" />
        Email copied to clipboard!
      </div>
    </div>
  );
}
