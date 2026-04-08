import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaExternalLinkAlt,
  FaCode,
  FaLayerGroup,
  FaRocket,
  FaMapMarker,
} from "react-icons/fa";
import "./index.css";

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  blog: string;
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
  blog: "https://github.com/sohel22z",
  login: "sohel22z",
  html_url: "https://github.com/sohel22z",
  public_repos: 15,
};

const services = [
  {
    icon: <FaCode size={24} />,
    title: "Frontend Development",
    description:
      "Building responsive, accessible interfaces with React, TypeScript, and modern CSS. Clean code is my baseline.",
    tags: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    icon: <FaLayerGroup size={24} />,
    title: "UI/UX Implementation",
    description:
      "Translating designs into pixel-perfect, interactive experiences. I pay attention to the details that matter.",
    tags: ["Figma", "Accessibility", "Animation"],
  },
  {
    icon: <FaRocket size={24} />,
    title: "Performance & Optimization",
    description:
      "Making websites fast and smooth. Core Web Vitals aren't just metrics to me—they're requirements.",
    tags: ["Core Web Vitals", "SEO", "Speed"],
  },
];

const timeline = [
  {
    period: "2024 - Present",
    role: "Frontend Developer",
    company: "Learning & Building",
    description:
      "Focused on React ecosystem, TypeScript, and building real-world projects. Expanding into full-stack development.",
  },
  {
    period: "2023 - 2024",
    role: "Started Development",
    company: "Self-taught Journey",
    description:
      "Began with HTML, CSS, and JavaScript. Built first projects and fell in love with creating things for the web.",
  },
];

const skills = {
  frontend: [
    { name: "React / Next.js", level: 92 },
    { name: "TypeScript", level: 88 },
    { name: "TailwindCSS", level: 90 },
    { name: "JavaScript", level: 90 },
  ],
  backend: [
    { name: "Node.js", level: 55 },
    { name: "PostgreSQL", level: 45 },
    { name: "REST APIs", level: 60 },
  ],
};

const defaultRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "portfolio-website",
    description: "My personal portfolio built with React, TypeScript, and TailwindCSS",
    stargazers_count: 5,
    forks_count: 2,
    language: "TypeScript",
    html_url: "https://github.com/sohel22z/portfolio-website",
    homepage: "https://sohel22z.github.io",
    topics: ["react", "typescript", "portfolio"],
  },
  {
    id: 2,
    name: "task-manager",
    description: "A task management app with React and local storage",
    stargazers_count: 3,
    forks_count: 1,
    language: "JavaScript",
    html_url: "https://github.com/sohel22z/task-manager",
    homepage: "",
    topics: ["react", "javascript"],
  },
  {
    id: 3,
    name: "weather-app",
    description: "Weather forecast app using OpenWeatherMap API",
    stargazers_count: 2,
    forks_count: 1,
    language: "TypeScript",
    html_url: "https://github.com/sohel22z/weather-app",
    homepage: "",
    topics: ["react", "api"],
  },
  {
    id: 4,
    name: "todo-app",
    description: "Simple todo app with add, edit, delete functionality",
    stargazers_count: 1,
    forks_count: 0,
    language: "JavaScript",
    html_url: "https://github.com/sohel22z/todo-app",
    homepage: "",
    topics: ["javascript", "dom"],
  },
  {
    id: 5,
    name: "css-snippets",
    description: "Collection of useful CSS snippets and patterns",
    stargazers_count: 8,
    forks_count: 3,
    language: "CSS",
    html_url: "https://github.com/sohel22z/css-snippets",
    homepage: "",
    topics: ["css", "snippets"],
  },
  {
    id: 6,
    name: "javascript-projects",
    description: "Vanilla JavaScript projects for practice",
    stargazers_count: 4,
    forks_count: 2,
    language: "JavaScript",
    html_url: "https://github.com/sohel22z/javascript-projects",
    homepage: "",
    topics: ["javascript", "practice"],
  },
];

export default function App() {
  const [user, setUser] = useState<GitHubUser>(defaultUser);
  const [repos, setRepos] = useState<GitHubRepo[]>(defaultRepos);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const username = import.meta.env.VITE_GITHUB_USERNAME || "sohel22z";
      const key = import.meta.env.VITE_GITHUB_TOKEN;

      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
      };
      if (key) {
        headers["Authorization"] = `Bearer ${key}`;
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=public`,
            { headers }
          ),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser({
            ...userData,
            public_repos: userData.public_repos || 0,
          });
        }

        if (reposRes.ok) {
          const data = await reposRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setRepos(
              data
                .filter((r: GitHubRepo) => !r.name.startsWith("."))
                .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
            );
          }
        }
      } catch (err) {
        console.log("Using default data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.querySelectorAll(".fade-in").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-xl tracking-tight"
            >
              SA
            </a>

            <div className="desktop-only flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="mobile-only p-2 -mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {isMenuOpen ? (
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-only bg-surface border-t border-border">
            <div className="container py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left py-3 text-base font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <p className="label fade-in">
                <span className="flex items-center gap-2">
                  <FaMapMarker size={12} />
                  Available for Projects
                </span>
              </p>
              <h1 className="heading-xl mb-6 fade-in text-foreground" style={{ transitionDelay: "0.1s" }}>
                I turn ideas
                <br />
                <span className="text-accent">into interfaces</span>
                <br />
                that users love.
              </h1>
              <p
                className="text-large mb-8 fade-in"
                style={{ transitionDelay: "0.2s" }}
              >
                Frontend developer specializing in React & TypeScript. 
                I build fast, accessible, and visually polished web applications 
                that help businesses grow.
              </p>
              <div
                className="flex flex-wrap gap-4 fade-in"
                style={{ transitionDelay: "0.3s" }}
              >
                <button onClick={() => scrollTo("work")} className="btn-primary">
                  See My Work <FaArrowRight size={16} />
                </button>
                <button onClick={() => scrollTo("contact")} className="btn-secondary">
                  Start a Project
                </button>
              </div>

              <div
                className="flex gap-8 mt-12 pt-8 border-t border-border fade-in"
                style={{ transitionDelay: "0.4s" }}
              >
                <div>
                  <p className="stat-number">{user.public_repos}</p>
                  <p className="text-sm mt-1">Projects</p>
                </div>
                <div>
                  <p className="stat-number">{user.followers}</p>
                  <p className="text-sm mt-1">Followers</p>
                </div>
                <div>
                  <p className="stat-number">2+</p>
                  <p className="text-sm mt-1">Years</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end fade-in">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block"
              >
                <img
                  src={user.avatar_url}
                  alt={user.name || ""}
                  className="w-56 h-56 md:w-72 md:h-72 rounded-2xl object-cover"
                  style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)" }}
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <FaGithub className="text-white" size={18} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section bg-surface">
        <div className="container">
          <div className="mb-12">
            <p className="label fade-in">What I Do</p>
            <h2 className="heading-lg fade-in">Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="card-service fade-in"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent-light flex items-center justify-center text-accent mb-5">
                  {service.icon}
                </div>
                <h3 className="heading-md mb-3">{service.title}</h3>
                <p className="text-body mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="section bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="label fade-in">Portfolio</p>
              <h2 className="heading-lg fade-in">Selected Work</h2>
            </div>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-text fade-in"
            >
              View GitHub <FaExternalLinkAlt size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.slice(0, 6).map((repo, index) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card fade-in group"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-hover flex items-center justify-center group-hover:bg-accent-light group-hover:text-accent transition-colors">
                    <FaGithub size={18} />
                  </div>
                  <div className="flex gap-4 text-muted-foreground text-sm font-mono">
                    <span>{repo.stargazers_count} ★</span>
                    <span>{repo.forks_count}</span>
                  </div>
                </div>

                <h3 className="heading-md mb-2 group-hover:text-accent transition-colors">
                  {repo.name}
                </h3>
                <p className="text-body mb-4 line-clamp-2">
                  {repo.description || "View project on GitHub"}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <span className="skill-tag skill-tag-accent">{repo.language}</span>
                  )}
                  {repo.topics?.slice(0, 2).map((topic) => (
                    <span key={topic} className="skill-tag">
                      {topic}
                    </span>
                  ))}
                </div>

                {repo.homepage && (
                  <div className="pt-4 border-t border-border">
                    <span className="text-sm font-medium text-accent flex items-center gap-1">
                      Live Demo <FaExternalLinkAlt size={12} />
                    </span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="label fade-in">The Story</p>
              <h2 className="heading-lg mb-6 fade-in">Who I Am</h2>
              <div className="space-y-4 fade-in">
                <p className="text-large">
                  I'm a frontend developer who believes great software starts with great interfaces.
                </p>
                <p className="text-body">
                  My journey began with curiosity about how websites work. That curiosity grew into 
                  a passion for building them. Today, I specialize in React and TypeScript, 
                  crafting applications that are fast, accessible, and easy to use.
                </p>
                <p className="text-body">
                  Beyond frontend, I'm expanding into full-stack development—learning how to 
                  build complete solutions. From database design to API development, I'm 
                  committed to understanding the entire picture.
                </p>
                <p className="text-body">
                  When I'm not coding, you'll find me exploring new technologies, contributing 
                  to open source, or sharing what I've learned with the community.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border fade-in">
                <div>
                  <p className="stat-number">{user.public_repos}</p>
                  <p className="text-sm mt-1">Projects</p>
                </div>
                <div>
                  <p className="stat-number">2+</p>
                  <p className="text-sm mt-1">Years</p>
                </div>
                <div>
                  <p className="stat-number">100%</p>
                  <p className="text-sm mt-1">Dedication</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1" />

            <div className="lg:col-span-6">
              <p className="label fade-in">Skills</p>

              <div className="space-y-8 fade-in">
                <div>
                  <h3 className="heading-sm mb-5">Frontend</h3>
                  <div className="space-y-4">
                    {skills.frontend.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-foreground rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="heading-sm mb-5">Backend (Learning)</h3>
                  <div className="space-y-4">
                    {skills.backend.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-muted-foreground rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-12 pt-8 border-t border-border fade-in">
                <h3 className="heading-sm mb-6">Timeline</h3>
                <div>
                  {timeline.map((item) => (
                    <div key={item.period} className="timeline-item">
                      <p className="text-sm text-muted-foreground font-mono mb-1">
                        {item.period}
                      </p>
                      <h4 className="heading-sm mb-1">{item.role}</h4>
                      <p className="text-sm text-accent mb-2">{item.company}</p>
                      <p className="text-body">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-background">
        <div className="container">
          <div className="max-w-2xl">
            <p className="label fade-in">Let's Connect</p>
            <h2 className="heading-lg mb-4 fade-in">Have a project in mind?</h2>
            <p className="text-large mb-6 fade-in">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <p className="text-body mb-10 fade-in">
              Whether you need a landing page, a web application, or want to discuss
              how I can help bring your ideas to life—let's talk.
            </p>

            <a
              href="mailto:sohelansarii@gmail.com"
              className="btn-primary mb-6 fade-in"
            >
              sohelansarii@gmail.com <FaArrowRight size={16} />
            </a>

            <p className="text-sm text-muted-foreground mb-8 fade-in">
              Or find me on
            </p>

            <div className="flex gap-6 fade-in">
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground transition-all"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/sohelansarii"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground transition-all"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com/sohelansarii"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground transition-all"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {user.name}
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              Built with React + TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
