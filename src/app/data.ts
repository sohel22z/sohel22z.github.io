export const profile = {
  name: "Sohel Ansari",
  initials: "SA",
  title: "Full Stack Developer",
  subtitle: "Full Stack Architect",
  tagline: "Full Stack",
  headline: "Developer",
  bio: "Full Stack Developer with <strong>4+ years of industry experience</strong> building high-performance, enterprise web applications using <strong>Python, Django, React, Next.js, and TypeScript</strong>. Specialized in complex booking engines, multi-tier agent dashboards, and Core Web Vitals optimization.",
  email: "sohelansarii@outlook.com",
  location: "Ahmedabad, India",
  github: "sohel22z",
  githubUrl: "https://github.com/sohel22z",
  linkedin: "sohelansarii",
  linkedinUrl: "https://linkedin.com/in/sohelansarii",
  avatarUrl: "https://avatars.githubusercontent.com/u/90556891?v=4",
  siteUrl: "https://sohel22z.github.io",
};

export const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Prod Web Apps" },
  { value: 35, suffix: "%", label: "TTFB Optimization" },
  { value: 100, suffix: "+", label: "Supplier APIs" },
];

export const navItems = [
  { id: "repos", label: "Projects" },
  { id: "blog", label: "Blog", href: "/notes" },
  { id: "contact", label: "Contact" },
];

export const defaultRepos = [
  { id: 1, name: "portfolio-website", description: "Personal portfolio built with Next.js, React, TypeScript, and TailwindCSS", stargazers_count: 5, forks_count: 2, language: "TypeScript", html_url: "https://github.com/sohel22z/portfolio-website", homepage: "https://sohel22z.github.io", topics: ["nextjs", "typescript", "portfolio"] },
  { id: 2, name: "task-manager", description: "Task management application with React and local storage state persistence", stargazers_count: 3, forks_count: 1, language: "JavaScript", html_url: "https://github.com/sohel22z/task-manager", homepage: "", topics: ["react", "javascript"] },
  { id: 3, name: "weather-app", description: "Weather forecast web application using OpenWeatherMap REST API", stargazers_count: 2, forks_count: 1, language: "TypeScript", html_url: "https://github.com/sohel22z/weather-app", homepage: "", topics: ["react", "api"] },
  { id: 4, name: "todo-app", description: "Clean todo application with reactive CRUD workflows", stargazers_count: 1, forks_count: 0, language: "JavaScript", html_url: "https://github.com/sohel22z/todo-app", homepage: "", topics: ["javascript", "dom"] },
  { id: 5, name: "css-snippets", description: "Curated collection of responsive CSS layout snippets and micro-animations", stargazers_count: 8, forks_count: 3, language: "CSS", html_url: "https://github.com/sohel22z/css-snippets", homepage: "", topics: ["css", "snippets"] },
  { id: 6, name: "javascript-projects", description: "Vanilla JavaScript algorithms and practical web projects", stargazers_count: 4, forks_count: 2, language: "JavaScript", html_url: "https://github.com/sohel22z/javascript-projects", homepage: "", topics: ["javascript", "practice"] },
];

export const languageColors: Record<string, string> = {
  TypeScript: "#ccff00",
  JavaScript: "#f7df1e",
  CSS: "#8b5cf6",
  HTML: "#f97316",
};

export const siteMetadata = {
  title: "Full Stack Developer | Python, Django, React, Next.js | Sohel Ansari",
  description: "Full Stack Developer specializing in Python, Django, React, Next.js, and TypeScript. 4+ years experience delivering high-performance web applications.",
  keywords: [
    "Sohel Ansari",
    "Full Stack Developer",
    "Python Developer",
    "Django Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Portfolio",
  ],
  ogImage: "https://avatars.githubusercontent.com/u/90556891?v=4",
  schema: {
    jobTitle: "Full Stack Developer",
    worksFor: "Traveltekpro IT Solutions",
    description: "Full Stack Developer specializing in Python, Django, React, Next.js, and TypeScript with 4+ years of industry experience.",
    knowsAbout: [
      "Python",
      "Django",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "REST APIs",
      "Web Performance",
    ],
  },
};
