// App.tsx
import { motion } from "framer-motion";
import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  FaCode,
  FaCodeBranch,
  FaCss3Alt, FaDatabase,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJsSquare,
  FaLinkedin,
  FaNode,
  FaPython,
  FaReact,
  FaStar,
  FaTwitter
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
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  open_issues_count: number;
  license: { name: string } | null;
  html_url: string;
  updated_at: string;
  topics: string[];
}

export default function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const skillIconMap: Record<string, JSX.Element> = {
    JavaScript: <FaJsSquare className="text-yellow-500" size={20} />,
    TypeScript: <FaJsSquare className="text-blue-400" size={20} />,
    React: <FaReact className="text-blue-600" size={20} />,
    "Node.js": <FaNode className="text-green-600" size={20} />,
    TailwindCSS: <FaCss3Alt className="text-blue-300" size={20} />,
    PostgreSQL: <FaDatabase className="text-blue-800" size={20} />,
    HTML5: <FaHtml5 className="text-red-600" size={20} />,
    Git: <FaGitAlt className="text-gray-700" size={20} />,
    Python: <FaPython className="text-blue-400" size={20} />,
  };

  useEffect(() => {
    const fetchData = async () => {
      const username = import.meta.env.VITE_GITHUB_USERNAME;
      const key = import.meta.env.VITE_GITHUB_TOKEN;

      // Build headers including Authorization
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.mercy-preview+json",
      };
      if (key) {
        headers["Authorization"] = `token ${key}`;
      }

      try {
        // 1. Fetch user profile
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userResponse.ok) {
          console.error("GitHub user fetch error:", userResponse.status);
        } else {
          const userData: GitHubUser = await userResponse.json();
          setUser(userData);
        }

        // 2. Fetch repos
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=6&sort=updated`,
          { headers }
        );
        if (!reposResponse.ok) {
          console.error("GitHub repos fetch error:", reposResponse.status);
        } else {
          const data = await reposResponse.json();

          if (Array.isArray(data)) {
            const sorted = (data as GitHubRepo[]).sort(
              (a, b) => b.stargazers_count - a.stargazers_count
            );
            setRepos(sorted.slice(0, 6));
          } else {
            console.error("Unexpected response from GitHub API:", data);
            setRepos([]);
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching GitHub data:", err);
      }
    };

    fetchData();
  }, []);

  const aggregatedSkills = useMemo(() => {
    const skillCounts: Record<string, number> = {};

    repos.forEach((repo) => {
      // Count primary language
      if (repo.language) {
        skillCounts[repo.language] = (skillCounts[repo.language] || 0) + 1;
      }
      // Count each topic
      repo.topics.forEach((topic) => {
        skillCounts[topic] = (skillCounts[topic] || 0) + 1;
      });
    });

    // Convert to array of { name, count } and sort descending
    return Object.entries(skillCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [repos]);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <motion.section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-indigo-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {user && (
          <motion.img
            src={user.avatar_url}
            alt="avatar"
            className="w-32 h-32 rounded-full mb-4 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-2"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {user ? user.name : "Sohel Ansari"}
        </motion.h1>
        {user && (
          <motion.p
            className="text-md text-gray-600 mb-6 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {user.bio}
          </motion.p>
        )}
        <motion.div
          className="space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition"
          >
            Explore Projects
          </button>
          <button
            onClick={() => {
              document.getElementById("social")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-indigo-600 hover:border-indigo-500 text-indigo-600 hover:text-indigo-500 py-3 px-8 rounded-full font-semibold transition"
          >
            Social Links
          </button>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section
        id="about"
        className="px-6 py-16 max-w-3xl mx-auto text-center bg-white"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          {user
            ? user.bio
            : "I’m a frontend developer specializing in crafting engaging, accessible, and intuitive user interfaces. With a focus on React, TypeScript, and TailwindCSS, I turn ideas into polished products that users love."}
        </p>
        {user && user.blog && (
          <a
            href={
              user.blog.startsWith("http")
                ? user.blog
                : `https://${user.blog}`
            }
            target="_blank"
            className="text-indigo-600 hover:underline text-sm mt-2 inline-block"
          >
            My Blog
          </a>
        )}
      </section>

      {/* Skills Section (static examples) */}

      <section id="skills" className="bg-gray-50 px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Skills</h2>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {(() => {
            const aggregatedSet = new Set(aggregatedSkills.map((s) => s.name));

            const mostUsedSkills = aggregatedSkills.map((s) => ({
              name: s.name,
              icon: skillIconMap[s.name] || <FaCode className="text-gray-700" size={20} />,
            }));

            const remainingSkills = Object.entries(skillIconMap)
              .filter(([name]) => !aggregatedSet.has(name))
              .map(([name, icon]) => ({ name, icon }));

            const finalSkills = [...mostUsedSkills, ...remainingSkills];

            return finalSkills.map(({ name, icon }) => (
              <motion.div
                key={name}
                className="flex items-center bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm text-gray-800"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {icon}
                <span className="ml-2">{name}</span>
              </motion.div>
            ));
          })()}
        </div>
      </section>

      {/* Projects Section: Fetched from GitHub */}
      <section
        id="projects"
        className="px-6 py-16 max-w-6xl mx-auto bg-white"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {repo.name}
                </h3>
                {repo.description && (
                  <p className="text-gray-600 text-sm mb-2">
                    {repo.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center space-x-2 text-gray-500 text-sm mb-2">
                  {repo.language && (
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded-full">
                      {repo.language}
                    </span>
                  )}
                  {repo.license && (
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded-full">
                      {repo.license.name}
                    </span>
                  )}
                  <span className="flex items-center">
                    <FaStar className="mr-1" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center">
                    <FaCodeBranch className="mr-1" /> {repo.forks_count}
                  </span>
                  <span className="flex items-center">
                    Issues: {repo.open_issues_count}
                  </span>
                </div>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-400">
                  Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </p>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                className="mt-4 inline-block bg-indigo-100 text-indigo-700 py-2 px-4 rounded-full font-medium hover:bg-indigo-200 transition text-center"
              >
                View Repo →
              </a>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button onClick={() => window.open("https://github.com/sohel22z?tab=repositories", "_blank")} className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition">View All</button>
        </div>
      </section>

      {/* Social Section */}
      <section
        id="social"
        className="px-6 py-16 bg-gradient-to-r from-indigo-50 via-white to-green-50"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Connect with Me
        </h2>
        <div className="flex justify-center space-x-8 flex-wrap">
          <motion.a
            href="https://linkedin.com/in/sohelansarii"
            target="_blank"
            className="text-gray-700 hover:text-indigo-600 text-5xl transition"
            whileHover={{ scale: 1.1 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com/sohel22z"
            target="_blank"
            className="text-gray-700 hover:text-indigo-600 text-5xl transition"
            whileHover={{ scale: 1.1 }}
            aria-label="GitHub"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://twitter.com/sohelansarii"
            target="_blank"
            className="text-gray-700 hover:text-indigo-600 text-5xl transition"
            whileHover={{ scale: 1.1 }}
            aria-label="Twitter"
          >
            <FaTwitter />
          </motion.a>
          {/* <motion.a
            href="/resume.pdf"
            target="_blank"
            className="text-gray-700 hover:text-indigo-600 text-5xl transition"
            whileHover={{ scale: 1.1 }}
            aria-label="Resume"
          >
            <FaDownload />
          </motion.a> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 bg-gray-50">
        © {new Date().getFullYear()}  {user ? user.name : "Sohel Ansari"}. All rights reserved.
      </footer>
    </div>
  );
}
