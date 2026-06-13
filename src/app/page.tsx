"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaLayerGroup,
  FaToolbox,
  FaDatabase,
  FaCogs,
  FaChartLine,
  FaEnvelope,
  FaCheck,
  FaFolder,
  FaStar,
  FaCodeBranch,
  FaMedal,
  FaSearch,
  FaPencilRuler,
  FaRocket,
  FaMapPin,
  FaCalendarAlt,
  FaHandPointer,
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
  avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
  name: "Sohel Ansari",
  bio: "Frontend Developer | React, TypeScript, TailwindCSS | Building for the web",
  followers: 25,
  following: 50,
  location: "India",
  login: "sohel22z",
  html_url: "https://github.com/sohel22z",
  public_repos: 15,
};

const techStack = [
  { icon: <FaCode size={18} aria-hidden="true" />, title: "Frontend", tags: ["ReactJS", "NextJS", "TypeScript", "HTML5", "CSS3", "JavaScript"] },
  { icon: <FaLayerGroup size={18} aria-hidden="true" />, title: "Styling", tags: ["TailwindCSS", "Styled-Components", "Bootstrap", "Sass"] },
  { icon: <FaToolbox size={18} aria-hidden="true" />, title: "State & Data", tags: ["Redux Toolkit", "Context API", "React Query", "REST APIs"] },
  { icon: <FaDatabase size={18} aria-hidden="true" />, title: "Performance", tags: ["PWA", "Lazy Loading", "Code Splitting", "Lighthouse"] },
  { icon: <FaCogs size={18} aria-hidden="true" />, title: "Tools", tags: ["Git", "GitHub", "Bitbucket", "VS Code", "Agile/Scrum"] },
  { icon: <FaChartLine size={18} aria-hidden="true" />, title: "Other", tags: ["ChartJS", "Responsive Design", "Cross-Browser", "Figma"] },
];

const timeline = [
  { period: "Dec 2021 – Mar 2022", role: "Front-End Developer", company: "Impero IT Services Pvt. Ltd.", description: "Built responsive layouts and UI components in React. Learned fundamentals of state management, mobile-first design, and cross-browser compatibility." },
  { period: "Apr 2022 – Mar 2025", role: "React Developer", company: "Traveltekpro IT Solutions", description: "Enhanced frontend performance through code splitting and lazy loading, reducing load times by 35%. Delivered 15+ web applications for diverse clients." },
  { period: "Apr 2025 – Present", role: "Trainee Front-End Developer", company: "Impero IT Services Pvt. Ltd.", description: "Developing and maintaining core modules for a travel booking platform using ReactJS and RESTful APIs." },
];

const skills = {
  frontend: [
    { name: "ReactJS / NextJS", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "TailwindCSS", level: 88 },
    { name: "JavaScript (ES6+)", level: 92 },
    { name: "Redux Toolkit", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 60 },
    { name: "Express.js", level: 55 },
    { name: "MongoDB", level: 50 },
    { name: "REST APIs", level: 70 },
  ],
};

const certifications = [
  "One Million Prompters - DFF (2025)",
  "React Native by Meta - Coursera (2024)",
  "Advanced React by Meta - Coursera (2023)",
  "JavaScript Algorithms - FreeCodeCamp (2023)",
  "Responsive Web Design - FreeCodeCamp (2021)",
];

const defaultRepos: GitHubRepo[] = [
  { id: 1, name: "portfolio-website", description: "My personal portfolio built with React, TypeScript, and TailwindCSS", stargazers_count: 5, forks_count: 2, language: "TypeScript", html_url: "https://github.com/sohel22z/portfolio-website", homepage: "https://sohel22z.github.io", topics: ["react", "typescript", "portfolio"] },
  { id: 2, name: "task-manager", description: "A task management app with React and local storage", stargazers_count: 3, forks_count: 1, language: "JavaScript", html_url: "https://github.com/sohel22z/task-manager", homepage: "", topics: ["react", "javascript"] },
  { id: 3, name: "weather-app", description: "Weather forecast app using OpenWeatherMap API", stargazers_count: 2, forks_count: 1, language: "TypeScript", html_url: "https://github.com/sohel22z/weather-app", homepage: "", topics: ["react", "api"] },
  { id: 4, name: "todo-app", description: "Simple todo app with add, edit, delete functionality", stargazers_count: 1, forks_count: 0, language: "JavaScript", html_url: "https://github.com/sohel22z/todo-app", homepage: "", topics: ["javascript", "dom"] },
  { id: 5, name: "css-snippets", description: "Collection of useful CSS snippets and patterns", stargazers_count: 8, forks_count: 3, language: "CSS", html_url: "https://github.com/sohel22z/css-snippets", homepage: "", topics: ["css", "snippets"] },
  { id: 6, name: "javascript-projects", description: "Vanilla JavaScript projects for practice", stargazers_count: 4, forks_count: 2, language: "JavaScript", html_url: "https://github.com/sohel22z/javascript-projects", homepage: "", topics: ["javascript", "practice"] },
];

const approachSteps = [
  { icon: <FaSearch size={20} aria-hidden="true" />, title: "Analyze", description: "Diving into technical parameters, client objectives, and target metrics before writing any code." },
  { icon: <FaPencilRuler size={20} aria-hidden="true" />, title: "Engineer", description: "Crafting bulletproof frontend systems utilizing modular, type-safe structures and modern patterns." },
  { icon: <FaRocket size={20} aria-hidden="true" />, title: "Launch", description: "Optimizing bundle size, caching headers, and Lighthouse scores for extreme rendering speeds." },
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
        <span className="text-accent tabular-nums">{level}%</span>
      </div>
      <div className="h-[6px] bg-border border border-border/10 overflow-hidden">
        <motion.div
          className="h-full bg-accent"
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
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: shouldReduceMotion ? 0.25 : 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [user, setUser] = useState<GitHubUser>(defaultUser);
  const [repos, setRepos] = useState<GitHubRepo[]>(defaultRepos);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const email = "sohelansarii@outlook.com";

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
          setUser({ ...d, public_repos: d.public_repos || 0 }); 
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
        console.log("Using default fallback data"); 
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  }, []);

  const navItems = [
    { id: "work", label: "Selected Work" },
    { id: "about", label: "Developer Specs" },
    { id: "contact", label: "Connect Desk" },
  ];

  return (
    <div className="min-h-screen bg-bg text-foreground overflow-hidden font-sans">
      
      {/* Navigation: Sharp Neo-Brutalist Border */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 border-b ${
          scrolled ? "bg-bg/95 backdrop-blur-md border-border py-4" : "bg-transparent border-transparent py-6"
        }`}
        initial={shouldReduceMotion ? { opacity: 0 } : { y: -50, opacity: 0 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
              <span className="font-mono text-lg font-black bg-accent text-black px-2 py-0.5 border border-black uppercase tracking-wider">
                SA
              </span>
              <span className="font-mono font-bold text-sm tracking-widest uppercase hidden sm:block">
                Sohel Ansari
              </span>
            </button>

            <div className="desktop-only flex items-center gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent px-3 py-1.5 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="w-[1px] h-4 bg-border mx-2" />
              <button 
                onClick={() => scrollTo("contact")} 
                className="btn-primary !py-2 !px-5 text-xs"
              >
                Connect Desk
              </button>
            </div>

            <button
              className="mobile-only p-2 text-muted hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-current">
                {isMenuOpen ? (
                  <path d="M6 6L18 18M6 18L18 6" strokeWidth="2.5" strokeLinecap="round" />
                ) : (
                  <path d="M4 6H20M4 12H20M4 18H20" strokeWidth="2.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-only overflow-hidden bg-surface border-t border-border mt-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="container py-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block w-full text-left font-mono py-3 px-4 text-sm uppercase tracking-widest text-muted hover:text-accent hover:bg-surface-alt transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 px-4">
                  <button onClick={() => scrollTo("contact")} className="w-full btn-primary text-xs">
                    Connect Desk <FaArrowRight size={10} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero: Asymmetric typographic, technical grid, overlapping draggable ID card */}
        <section id="home" className="relative min-h-screen flex items-center pt-24 md:pt-32 tech-grid border-b border-border">
        <div className="container w-full relative z-10 py-12">
          
          {/* Background watermark text removed */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              
              <Reveal>
                <span className="label">PORTFOLIO V2026</span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="heading-lg tracking-tighter text-left mb-6 font-extrabold uppercase leading-[0.9] select-none">
                  Redefining <br className="hidden md:inline" />
                  <span className="text-accent">digital</span> interfaces <br />
                  with speed.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-large max-w-xl font-mono text-sm leading-relaxed text-muted">
                  I am a React Developer specializing in highly optimized rendering pipelines, clean structures, and dynamic web interfaces. Building fast, responsive systems that increase conversion rates and build trust.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => scrollTo("work")} className="btn-primary">
                    Verify Portfolio <FaArrowRight size={12} aria-hidden="true" />
                  </button>
                  <button onClick={() => scrollTo("contact")} className="btn-secondary">
                    Launch Interactive Connect
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-border max-w-lg">
                  <div>
                    <p className="stat-number font-bold tabular-nums"><CountUp end={user.public_repos || 15} /></p>
                    <p className="stat-label">REPOSITORIES</p>
                  </div>
                  <div>
                    <p className="stat-number font-bold tabular-nums"><CountUp end={user.followers} /></p>
                    <p className="stat-label">GITHUB FOLLOWERS</p>
                  </div>
                  <div>
                    <p className="stat-number font-bold tabular-nums"><CountUp end={3} suffix="+" /></p>
                    <p className="stat-label">YEARS DEV SPECS</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ID Card on Desktop */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <Reveal delay={0.1}>
                <motion.div
                  className="w-72 md:w-80 brutalist-card bg-surface p-6 space-y-6 border-2 border-border"
                >
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <span className="font-mono text-xs font-bold text-accent tracking-widest">ID CARD // REQ: 2026</span>
                  </div>

                  <div className="relative aspect-square w-full border border-border bg-black overflow-hidden group">
                    <img
                      src={user.avatar_url}
                      alt={user.name}
                      width={320}
                      height={320}
                      fetchPriority="high"
                      className="w-full h-full object-cover contrast-115 transition-all duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 border border-border/20 text-[10px] font-mono text-accent uppercase tracking-wider">
                      {user.login}
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-xs text-muted">
                    <div className="flex justify-between border-b border-border/20 py-1">
                      <span>DEV NAME:</span>
                      <span className="text-foreground font-bold">{user.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/20 py-1">
                      <span>SECTOR:</span>
                      <span className="text-foreground font-bold">FRONTEND ARCH</span>
                    </div>
                    <div className="flex justify-between border-b border-border/20 py-1">
                      <span>LOCATION:</span>
                      <span className="text-foreground font-bold flex items-center gap-1">
                        <FaMapPin size={10} className="text-accent" aria-hidden="true" /> {user.location || "India"}
                      </span>
                    </div>
                    <div className="pt-2 font-sans italic text-center text-[11px] leading-snug">
                      "{user.bio || "Crafting reliable, accessible client solutions."}"
                    </div>
                  </div>
                  
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work: Brutalist Grid Cards with offset structures */}
      <section id="work" className="section bg-surface-alt">
        <div className="container">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div className="max-w-xl">
                <span className="label">SELECTED CODE MODULES</span>
                <h2 className="heading-lg mt-3">Featured Projects</h2>
                <p className="text-body font-mono text-sm mt-3">
                  A verification of codebase modules built directly in React, Next.js, and TypeScript, fetched straight from active repositories.
                </p>
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2.5 !px-6 text-xs flex items-center gap-2"
              >
                <FaGithub size={14} aria-hidden="true" /> VIEW GITHUB CONSOLE
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {repos.slice(0, 6).map((repo, index) => (
              <Reveal key={repo.id} delay={index * 0.05}>
                <div className="brutalist-card bg-surface flex flex-col justify-between h-full min-h-[260px] border-2 border-border p-6">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-border bg-surface-alt flex items-center justify-center text-accent">
                          <FaFolder size={18} aria-hidden="true" />
                        </div>
                        <h3 className="font-mono font-bold text-base tracking-tight text-foreground hover:text-accent">
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                          </a>
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs text-muted">
                        <span className="flex items-center gap-1"><FaStar size={11} className="text-accent" aria-hidden="true" /> {repo.stargazers_count}</span>
                        <span className="flex items-center gap-1"><FaCodeBranch size={11} aria-hidden="true" /> {repo.forks_count}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted font-sans leading-relaxed mb-6 line-clamp-3">
                      {repo.description || "Production-ready repository module. Explore variables, branches, and code architecture inside the GitHub repo."}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/20">
                    <div className="flex flex-wrap gap-1.5">
                      {repo.language && (
                        <span className="tag tag-accent flex items-center gap-2">
                          <span className="w-1.5 h-1.5" style={{ backgroundColor: languageColors[repo.language] || "#4b5563" }} />
                          {repo.language}
                        </span>
                      )}
                      {repo.topics?.slice(0, 3).map((topic) => (
                        <span key={topic} className="tag">{topic}</span>
                      ))}
                    </div>
                    
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-accent hover:underline flex items-center gap-1 uppercase"
                    >
                      Inspect Source <FaArrowRight size={10} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Experience / Methodology: Staggered columns */}
      <section className="section bg-bg tech-grid">
        <div className="container">
          <Reveal>
            <div className="max-w-xl mb-16">
              <span className="label">ENGINEERING PROTOCOL</span>
              <h2 className="heading-lg mt-3">Methodology</h2>
              <p className="text-body font-mono text-sm mt-3">
                How I coordinate visual architecture and technical specifications to ensure stable frontend deployments.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approachSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="brutalist-card bg-surface p-8 border-2 border-border relative">
                  <span className="font-mono text-5xl font-black text-border absolute top-4 right-4 select-none opacity-50">
                    0{i + 1}
                  </span>
                  <div className="w-12 h-12 border border-accent bg-accent-light flex items-center justify-center text-accent mb-6">
                    {step.icon}
                  </div>
                  <h3 className="font-mono font-bold text-lg uppercase tracking-tight mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specs / Profile Info & Technical Skills */}
      <section id="about" className="section bg-surface-alt">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Biography */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <span className="label">ABOUT_DEV // SPECS</span>
                <h2 className="heading-lg mt-3 mb-6">Profile</h2>
              </Reveal>

              <div className="space-y-4 font-sans text-sm leading-relaxed text-muted">
                <Reveal delay={0.05}>
                  <p className="text-base text-foreground font-bold font-mono">
                    High-performance React architect with over 3 years of production-proven industry metrics.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p>
                    Throughout my engineering stints at Traveltekpro IT Solutions and Impero IT Services, I’ve optimized application delivery networks, reduced load latencies by 35%, and deployed over 15 distinct production assets.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <p>
                    My core competence centers on React/NextJS architectures, state management patterns (Redux/Zustand), and building bulletproof responsive pipelines. I focus on reducing initial page size burdens, improving Core Web Vitals, and writing self-documenting code.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4 pt-4">Certificates Received:</h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, i) => (
                    <span key={i} className="tag tag-accent text-[11px] font-mono flex items-center gap-2">
                      <FaMedal size={11} className="text-accent" aria-hidden="true" />
                      {cert}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-1" />

            {/* Performance Indicators / Skill Matrix */}
            <div className="lg:col-span-6 space-y-10">
              <Reveal>
                <span className="label">SKILL_MATRIX // RENDERING_SPEEDS</span>
                <h2 className="heading-lg mt-3 mb-8">Metrics</h2>
              </Reveal>

              <div className="space-y-8">
                <Reveal delay={0.05}>
                  <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">Core Competencies</h3>
                  <div className="grid grid-cols-1 gap-5">
                    {skills.frontend.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">Supporting Specs</h3>
                  <div className="grid grid-cols-1 gap-5">
                    {skills.backend.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Technical Experience Timeline */}
              <Reveal delay={0.15}>
                <div className="mt-12 pt-8 border-t border-border">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-6">Experience History</h3>
                  <div className="space-y-2">
                    {[...timeline].reverse().map((item) => (
                      <div key={item.period} className="timeline-item">
                        <span className="font-mono text-xs text-accent">{item.period}</span>
                        <h4 className="font-mono font-bold text-sm text-foreground">{item.role}</h4>
                        <p className="font-mono text-xs text-muted mb-2">{item.company}</p>
                        <p className="text-xs text-muted font-sans leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="section bg-bg border-b border-border">
        <div className="container">
          <Reveal>
            <div className="max-w-xl mb-16">
              <span className="label">TECHNOLOGY_INDEX // UTILITIES</span>
              <h2 className="heading-lg mt-3">Libraries</h2>
              <p className="text-body font-mono text-sm mt-3">
                Languages, packaging systems, and utilities integrated on client applications.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {techStack.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="brutalist-card bg-surface p-6 border-2 border-border">
                  <div className="flex items-center gap-3 border-b border-border/20 pb-4 mb-4">
                    <div className="w-8 h-8 border border-accent bg-accent-light flex items-center justify-center text-accent">
                      {item.icon}
                    </div>
                    <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-foreground">{item.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag text-xs font-mono">{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact: Redesigned as the Connect Desk draggable interface */}
      <section id="contact" className="section bg-surface relative overflow-hidden tech-grid">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                 {/* Explanatory text */}
            <div className="lg:col-span-4 space-y-6">
              <Reveal>
                <span className="label">CONNECT INTERFACE</span>
                <h2 className="heading-lg mt-3">Connect Desk</h2>
                <p className="text-body font-mono text-sm leading-relaxed mt-4">
                  Interact with the index cards below to copy details, view source repositories, connect on socials, or schedule consultations.
                </p>
              </Reveal>
            </div>

            {/* Canvas / Mobile grid */}
            <div className="lg:col-span-8">
              <Reveal delay={0.15}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card 1: Email Card */}
                    <div className="brutalist-card bg-surface border-2 border-border p-5 text-left space-y-3">
                      <div className="flex justify-between items-center border-b border-border pb-2">
                        <span className="font-mono text-[10px] text-accent tracking-widest font-black uppercase">PASS // EMAIL NODE</span>
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-subtle uppercase">ADDRESS:</span>
                        <p className="font-mono text-xs font-bold text-foreground break-all select-all">{email}</p>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="w-full btn-primary !py-2 text-[10px] tracking-wider font-mono flex items-center justify-center gap-2"
                      >
                        <FaEnvelope size={11} aria-hidden="true" /> Copy Address
                      </button>
                    </div>

                    {/* Card 2: GitHub Link */}
                    <div className="brutalist-card bg-surface border-2 border-border p-5 text-left space-y-3">
                      <div className="flex justify-between items-center border-b border-border pb-2">
                        <span className="font-mono text-[10px] text-accent tracking-widest font-black uppercase">LINK // GITHUB</span>
                        <FaGithub size={12} className="text-muted" aria-hidden="true" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-subtle uppercase">REPOSITORY ROOT:</span>
                        <p className="font-mono text-xs font-bold text-foreground">github.com/{user.login}</p>
                      </div>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-secondary !py-2 text-[10px] tracking-wider font-mono flex items-center justify-center gap-2"
                      >
                        <FaRocket size={10} aria-hidden="true" /> Open Console
                      </a>
                    </div>

                    {/* Card 3: LinkedIn Link */}
                    <div className="brutalist-card bg-surface border-2 border-border p-5 text-left space-y-3">
                      <div className="flex justify-between items-center border-b border-border pb-2">
                        <span className="font-mono text-[10px] text-accent tracking-widest font-black uppercase">LINK // LINKEDIN</span>
                        <FaLinkedin size={12} className="text-muted" aria-hidden="true" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-subtle uppercase">CONNECT NODE:</span>
                        <p className="font-mono text-xs font-bold text-foreground">linkedin.com/in/sohelansarii</p>
                      </div>
                      <a
                        href="https://linkedin.com/in/sohelansarii"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-secondary !py-2 text-[10px] tracking-wider font-mono flex items-center justify-center gap-2"
                      >
                        <FaRocket size={10} aria-hidden="true" /> Open Profile
                      </a>
                    </div>

                    {/* Card 4: Book Chat Sticker */}
                    <div className="brutalist-card bg-accent border-2 border-black p-5 text-left space-y-3">
                      <div className="flex justify-between items-center border-b border-black pb-2">
                        <span className="font-mono text-[9px] text-black font-black uppercase tracking-wider">BOOK // CHAT</span>
                        <FaCalendarAlt size={10} className="text-black" aria-hidden="true" />
                      </div>
                      <p className="text-[10px] font-sans text-black leading-snug">
                        Schedule a quick meeting to review project requirements.
                      </p>
                      <a
                        href={`mailto:${email}?subject=Project Consultation`}
                        className="w-full bg-black text-accent border border-black text-center block font-mono text-[10px] font-bold py-2 uppercase hover:bg-neutral-900 transition-colors"
                      >
                        Schedule Session
                      </a>
                    </div>
                  </div>

              </Reveal>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer: Tech log details */}
      <footer className="py-10 bg-bg border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left font-mono text-xs text-muted">
              <p>&copy; {new Date().getFullYear()} SOHEL ANSARI. ALL SYSTEMS VERIFIED.</p>
              <p className="text-[10px] text-subtle mt-0.5">LATENCY: 0.04s // VER: 2026.2.7</p>
            </div>
            
            <div className="flex items-center gap-6">
              <img
                src={`https://komarev.com/ghpvc/?username=${user.login}&label=CONSOLE_VIEWS&color=ff0000&style=flat-square`}
                alt="Profile Views"
                width={140}
                height={20}
                loading="lazy"
                className="opacity-100 transition-opacity h-5"
              />
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

      {/* Copy Toast */}
      <div className={`copy-toast ${copied ? "visible" : ""}`} aria-live="polite">
        <FaCheck size={12} className="inline mr-2" aria-hidden="true" />
        Email copied to clipboard!
      </div>
    </div>
  );
}
