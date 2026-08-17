"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaPen,
} from "react-icons/fa";
import { profile } from "../data";
import { blogPosts } from "./data";

export default function NotesPage() {
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
        <div className="container max-w-4xl mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="label mb-4 block">BLOG</span>
            <h1 className="heading-xl text-foreground mb-4">
              Ideas & <span className="text-accent">Explorations</span>
            </h1>
            <p className="text-large text-muted leading-relaxed max-w-2xl">
              Product ideas, technical deep-dives, and thoughts on building
              things that matter.
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/notes/${post.slug}`} className="block group">
                  <div className="glass-card p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="tag tag-accent text-xs flex items-center gap-1.5">
                        <FaCheckCircle size={11} /> {post.category}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {post.date}
                      </span>
                      <span className="font-mono text-xs text-muted">•</span>
                      <span className="font-mono text-xs text-muted">
                        {post.readingTime}
                      </span>
                    </div>

                    <h2 className="heading-lg text-foreground mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-body text-muted mb-6 max-w-2xl">
                      {post.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                      Read Article <FaArrowRight size={10} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty state if no posts */}
          {blogPosts.length === 0 && (
            <div className="glass-card p-12 text-center">
              <FaPen className="text-muted mx-auto mb-4" size={24} />
              <p className="text-muted font-mono text-sm">
                No posts yet. Check back soon!
              </p>
            </div>
          )}

          {/* CTA */}
          <section className="text-center mt-16">
            <div className="glass-card p-10">
              <h2 className="heading-lg text-foreground mb-4">
                Enjoyed Reading?
              </h2>
              <p className="text-body text-muted max-w-xl mx-auto mb-8">
                Have thoughts on these ideas? Let&apos;s connect and discuss!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/#contact" className="btn-primary">
                  Get In Touch <FaExternalLinkAlt size={12} />
                </Link>
                <Link href="/" className="btn-secondary">
                  <FaArrowLeft size={12} /> Back to Portfolio
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
