"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaCodeBranch,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFolder,
  FaGithub,
  FaLaptopCode,
  FaLinkedin,
  FaMapPin,
  FaRocket,
  FaStar,
} from "react-icons/fa";
import { profile, stats, navItems, defaultRepos, languageColors, siteMetadata } from "./data";

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
  avatar_url: profile.avatarUrl,
  name: profile.name,
  bio: siteMetadata.description,
  followers: 12,
  following: 34,
  location: profile.location,
  login: profile.github,
  html_url: profile.githubUrl,
  public_repos: 15,
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
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-alt border border-white/10 font-mono text-[0.625rem] text-muted">
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
      className="fixed pointer-events-none z-30 transition-transform duration-100 ease-out hidden md:block"
      style={{
        left: `${pos.x - 200}px`,
        top: `${pos.y - 200}px`,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(204, 255, 0, 0.04) 0%, transparent 70%)',
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
  const shouldReduceMotion = useReducedMotion();

  const email = profile.email;

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

  return (
    <div className="min-h-screen bg-bg text-foreground overflow-hidden font-sans relative">
      
      {/* Interactive Cursor Spotlight */}
      <CursorSpotlight />

      {/* Background Ambient Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-150px] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Glass Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className={`header-glass flex items-center justify-between px-4 sm:px-5 h-14 ${scrolled ? "scrolled" : ""}`}>
            
            {/* Logo */}
            <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 shrink-0 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-black font-mono text-xs font-black uppercase">
                {profile.initials}
              </span>
              <span className="hidden sm:flex flex-col leading-none text-start">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  {profile.name}
                </span>
                <span className="font-mono text-[0.625rem] text-accent mt-0.5">{profile.title}</span>
              </span>
            </button>

            {/* Center Nav */}
            <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) =>
                "href" in item && item.href ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted hover:text-foreground px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted hover:text-foreground px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${profile.email}?subject=Project Consultation`}
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-wider text-black bg-accent hover:bg-accent-dark px-3 py-1.5 rounded-lg transition-colors"
              >
                <FaEnvelope size={11} /> Contact
              </a>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  {isMenuOpen ? (
                    <path d="M6 6L18 18M6 18L18 6" strokeWidth="2" strokeLinecap="round" />
                  ) : (
                    <path d="M4 7H20M4 12H20M4 17H20" strokeWidth="2" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>

          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden container mx-auto px-4 mt-2"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <div className="header-glass scrolled p-3 space-y-1">
                {navItems.map((item) =>
                  "href" in item && item.href ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center w-full font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center w-full font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </button>
                  )
                )}
                <a
                  href={`mailto:${profile.email}?subject=Project Consultation`}
                  className="flex items-center gap-2 w-full font-mono text-xs uppercase tracking-wider text-black bg-accent hover:bg-accent-dark px-4 py-2.5 rounded-lg transition-colors mt-2"
                >
                  <FaEnvelope size={12} /> Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" tabIndex={-1} className="outline-none">
        
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center pt-32 md:pt-36 pb-20 tech-grid">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-8 text-left">
                
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light border border-accent/30 text-accent font-mono text-xs max-w-full leading-tight">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping shrink-0" />
                    <span>Available for Senior / Lead Roles • {profile.location}</span>
                  </div>
                </Reveal>

                <h1 className="heading-xl tracking-tight text-foreground font-black uppercase">
                  {profile.tagline} <span className="text-accent">{profile.headline}</span>
                </h1>

                <Reveal delay={0.1}>
                  <p className="text-large max-w-xl font-sans text-muted leading-relaxed">
                    {profile.bio}
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
                    <button onClick={() => scrollTo("repos")} className="btn-primary w-full sm:w-auto">
                      <span>Explore Work</span> <FaArrowRight size={12} aria-hidden="true" />
                    </button>
                    <a
                      href={`mailto:${email}?subject=Project Consultation`}
                      className="btn-secondary w-full sm:w-auto"
                    >
                      <FaEnvelope size={14} className="text-accent" aria-hidden="true" /> <span>Get In Touch</span>
                    </a>
                  </div>
                </Reveal>

                {/* Stats Grid */}
                <Reveal delay={0.2}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border">
                    {stats.map((stat) => (
                      <div key={stat.label} className="glass-card p-4 text-center sm:text-left">
                        <p className="stat-number tabular-nums"><CountUp end={stat.value} suffix={stat.suffix} /></p>
                        <p className="stat-label">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Profile Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <Reveal delay={0.1}>
                  <div className="w-full max-w-sm glass-card p-6 space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex justify-between items-center border-b border-border pb-4 font-mono text-xs">
                      <span className="text-accent font-bold tracking-widest uppercase flex items-center gap-2">
                        <FaLaptopCode size={14} /> Developer Specs
                      </span>
                      <span className="text-muted text-[0.6875rem]">2026.2</span>
                    </div>

                    <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-white/10 bg-surface-alt">
                      <img
                        src={user.avatar_url}
                        alt={`${profile.name} — ${profile.title}`}
                        width={360}
                        height={360}
                        fetchPriority="high"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-mono text-[0.6875rem] text-accent font-bold">
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
                        <span className="text-accent font-bold">{profile.title}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1.5">
                        <span>LOCATION:</span>
                        <span className="text-foreground font-bold flex items-center gap-1">
                          <FaMapPin size={10} className="text-accent" /> {profile.location}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1.5">
                        <span>CORE STACK:</span>
                        <span className="text-foreground font-bold">Python • Django • React</span>
                      </div>
                    </div>

                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-secondary !py-2.5 text-xs flex items-center justify-center gap-2"
                    >
                      <FaGithub size={13} aria-hidden="true" /> <span>View GitHub</span>
                    </a>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* GitHub Repos Section */}
        <section id="repos" className="section bg-surface/50">
          <div className="container">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <span className="label">OPEN SOURCE MODULES</span>
                  <h2 className="heading-lg mt-2 text-foreground">Active GitHub Repositories</h2>
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
                        {repo.description || "Production-ready open source module."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/5">
                      {repo.language && (
                        <span className="tag tag-accent flex items-center gap-2 text-[0.6875rem]">
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

        {/* Contact Section */}
        <section id="contact" className="section bg-bg tech-grid">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-6 text-left">
                <Reveal>
                  <span className="label">GET IN TOUCH</span>
                  <h2 className="heading-lg mt-3 text-foreground">Let&apos;s Build Something Exceptional.</h2>
                  <p className="text-body font-mono text-sm leading-relaxed mt-4">
                    Whether you are hiring for a Senior Developer, seeking a specialist to architect your next platform, or looking for expert advice—I&apos;d love to connect.
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <a
                    href={`mailto:${email}?subject=Project Consultation`}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 text-xs"
                  >
                    <FaEnvelope size={14} aria-hidden="true" /> <span>Send Direct Email</span>
                  </a>
                </Reveal>
              </div>

              {/* Contact Cards */}
              <div className="lg:col-span-7">
                <Reveal delay={0.15}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Email Card */}
                    <div className="glass-card p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[0.625rem] text-accent tracking-widest font-black uppercase">
                        <span>NODE // EMAIL</span>
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[0.5625rem] text-subtle uppercase">EMAIL ADDRESS:</span>
                        <p className="font-mono text-xs font-bold text-foreground break-all select-all">{email}</p>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="w-full btn-primary !py-2 text-[0.625rem] font-mono flex items-center justify-center gap-2"
                      >
                        <FaEnvelope size={11} aria-hidden="true" /> Copy Address
                      </button>
                    </div>

                    {/* Location Card */}
                    <div className="glass-card p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[0.625rem] text-accent tracking-widest font-black uppercase">
                        <span>NODE // LOCATION</span>
                        <FaMapPin size={11} className="text-accent" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[0.5625rem] text-subtle uppercase">CURRENT BASE:</span>
                        <p className="font-mono text-xs font-bold text-foreground">{profile.location}</p>
                      </div>
                      <a
                        href={`mailto:${email}?subject=Project Consultation`}
                        className="w-full btn-secondary !py-2 text-[0.625rem] font-mono flex items-center justify-center gap-2"
                      >
                        <FaEnvelope size={10} aria-hidden="true" /> Send Direct Email
                      </a>
                    </div>

                    {/* GitHub Card */}
                    <div className="glass-card p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[0.625rem] text-accent tracking-widest font-black uppercase">
                        <span>LINK // GITHUB</span>
                        <FaGithub size={12} className="text-muted" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[0.5625rem] text-subtle uppercase">REPOSITORY ROOT:</span>
                        <p className="font-mono text-xs font-bold text-foreground">github.com/{user.login}</p>
                      </div>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-secondary !py-2 text-[0.625rem] font-mono flex items-center justify-center gap-2"
                      >
                        <FaRocket size={10} aria-hidden="true" /> Open GitHub Console
                      </a>
                    </div>

                    {/* LinkedIn Card */}
                    <div className="glass-card p-5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[0.625rem] text-accent tracking-widest font-black uppercase">
                        <span>LINK // LINKEDIN</span>
                        <FaLinkedin size={12} className="text-muted" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[0.5625rem] text-subtle uppercase">PROFILE NODE:</span>
                        <p className="font-mono text-xs font-bold text-foreground">linkedin.com/in/{profile.linkedin}</p>
                      </div>
                      <a
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-secondary !py-2 text-[0.625rem] font-mono flex items-center justify-center gap-2"
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
      <footer className="py-6 bg-surface border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left font-mono text-xs text-muted">
              <p>&copy; {new Date().getFullYear()} {profile.name.toUpperCase()}. ALL SYSTEMS OPERATIONAL.</p>
              <p className="text-[0.625rem] text-subtle mt-0.5">{profile.location.toUpperCase()} • {profile.title.toUpperCase()}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <VisitorCounter username={user.login || profile.github} />
              <button
                onClick={() => scrollTo("home")}
                className="font-mono text-xs text-muted hover:text-accent uppercase tracking-widest transition-colors"
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
