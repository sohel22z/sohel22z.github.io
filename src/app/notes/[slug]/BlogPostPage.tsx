"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { profile } from "../../data";
import { BlogPost } from "../data";

interface BlogPostPageProps {
  post: BlogPost;
  ContentComponent: React.ComponentType;
}

export function BlogPostPage({ post, ContentComponent }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-bg text-foreground overflow-x-hidden font-sans relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="glass-card flex items-center justify-between px-5 py-3 bg-surface/95 backdrop-blur-xl border-white/5">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-mono text-sm font-black bg-accent text-black px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                <FaArrowLeft size={12} /> PORTFOLIO
              </span>
              <div className="text-left hidden sm:block">
                <span className="font-mono font-bold text-xs uppercase block tracking-wider text-foreground">
                  {profile.name}
                </span>
                <span className="text-[0.625rem] text-accent font-mono block">
                  {profile.title}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <span className="tag tag-accent text-xs flex items-center gap-1.5">
                <FaCheckCircle size={11} /> {post.category}
              </span>
              <Link
                href="/#contact"
                className="btn-secondary !py-1.5 !px-3 text-xs"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="pt-28 pb-20">
        <article className="container max-w-4xl mx-auto px-4">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="tag tag-accent text-xs flex items-center gap-1.5">
                <FaCheckCircle size={12} /> {post.category}
              </span>
              <span className="font-mono text-xs text-muted">
                {post.date}
              </span>
              <span className="font-mono text-xs text-muted">•</span>
              <span className="font-mono text-xs text-muted">
                {post.readingTime}
              </span>
            </div>

            <h1 className="heading-xl text-foreground mb-6">
              {post.title.split(" ").map((word, i) => {
                const accentWords = ["Missing", "Could"];
                return accentWords.includes(word) ? (
                  <span key={i} className="text-accent">
                    {word}{" "}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                );
              })}
            </h1>

            <p className="text-large text-muted leading-relaxed max-w-2xl">
              {post.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-black font-bold font-mono text-sm">
                  {profile.initials}
                </div>
                <div>
                  <p className="font-mono text-sm font-bold text-foreground">
                    {profile.name}
                  </p>
                  <p className="font-mono text-xs text-muted">
                    {profile.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Content */}
          <ContentComponent />

          {/* CTA */}
          <section className="text-center mb-8 mt-16">
            <div className="glass-card p-10">
              <h2 className="heading-lg text-foreground mb-4">
                Interested in This Idea?
              </h2>
              <p className="text-body text-muted max-w-xl mx-auto mb-8">
                Have thoughts on local opportunity discovery? Let&apos;s
                connect and discuss!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="btn-primary"
                >
                  Get In Touch <FaExternalLinkAlt size={12} />
                </Link>
                <Link href="/notes" className="btn-secondary">
                  <FaArrowLeft size={12} /> All Posts
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
