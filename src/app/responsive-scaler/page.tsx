"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaCheckCircle,
  FaCompressAlt,
  FaCopy,
  FaDesktop,
  FaExpandAlt,
  FaExternalLinkAlt,
  FaLaptop,
  FaMobileAlt,
  FaTabletAlt,
  FaTerminal,
  FaTools
} from "react-icons/fa";
import { profile } from "../data";

export default function ResponsiveScalerPage() {
  const [targetBaseWidth, setTargetBaseWidth] = useState<number>(1440);
  const [simulatedWidth, setSimulatedWidth] = useState<number>(768);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"react" | "js" | "css">("react");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const scaleRatio = Number((simulatedWidth / targetBaseWidth).toFixed(3));
  const fontPercent = Math.round(scaleRatio * 100);

  const devicePresets = [
    { name: "Mobile", width: 375, icon: <FaMobileAlt /> },
    { name: "Tablet", width: 768, icon: <FaTabletAlt /> },
    { name: "Laptop", width: 1280, icon: <FaLaptop /> },
    { name: "Desktop", width: 1440, icon: <FaDesktop /> },
    { name: "4K", width: 2560, icon: <FaExpandAlt /> },
  ];

  const codeSnippets = {
    react: `import React, { useEffect, useState, useRef } from "react";

interface ViewportScalerProps {
  baseWidth?: number;   // e.g. 1440 for desktop baseline
  minScale?: number;    // e.g. 0.35
  maxScale?: number;    // e.g. 2.5
  children: React.ReactNode;
}

export function ViewportScaler({
  baseWidth = 1440,
  minScale = 0.35,
  maxScale = 2.5,
  children
}: ViewportScalerProps) {
  const [scale, setScale] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const calculatedScale = Math.min(
        Math.max(currentWidth / baseWidth, minScale),
        maxScale
      );
      setScale(calculatedScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [baseWidth, minScale, maxScale]);

  return (
    <div
      ref={containerRef}
      style={{
        width: \`\${baseWidth}px\`,
        transform: \`scale(\${scale})\`,
        transformOrigin: "top left",
        margin: "0 auto",
        transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {children}
    </div>
  );
}`,
    js: `/**
 * Universal Viewport Auto-Scaler Utility
 * Fits fixed-width layouts to any screen without breaking.
 */
function initViewportScaler(options = {}) {
  const baseWidth = options.baseWidth || 1440;
  const containerSelector = options.container || '#scalable-root';
  const targetElement = document.querySelector(containerSelector);

  if (!targetElement) return;

  function updateScale() {
    const windowWidth = window.innerWidth;
    const scaleFactor = windowWidth / baseWidth;
    
    targetElement.style.transform = \`scale(\${scaleFactor})\`;
    targetElement.style.transformOrigin = 'top left';
    targetElement.style.width = \`\${baseWidth}px\`;
  }

  updateScale();
  window.addEventListener('resize', updateScale, { passive: true });
}`,
    css: `/* Viewport Auto-Fit Root Container CSS */
.scalable-viewport-root {
  --base-width: 1440px;
  width: var(--base-width);
  margin-left: auto;
  margin-right: auto;
  transform-origin: top center;
  will-change: transform;
  backface-visibility: hidden;
}

/* CSS Variable Fluid Scaling Engine */
:root {
  --screen-width: 100vw;
  --base-canvas: 1440;
  --viewport-ratio: calc(var(--screen-width) / var(--base-canvas));
}

body {
  font-size: calc(16px * var(--viewport-ratio));
}`
  };

  const copyCodeToClipboard = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  }, []);

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
                <span className="text-[0.625rem] text-accent font-mono block">{profile.title}</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <span className="tag tag-accent text-xs flex items-center gap-1.5">
                <FaCheckCircle size={11} /> Innovation Lab
              </span>
              <Link href="/#contact" className="btn-secondary !py-1.5 !px-3 text-xs">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="pt-28 pb-20">
        {/* Article Header */}
        <article className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="tag tag-accent text-xs flex items-center gap-1.5">
                <FaTools size={12} /> Technical Article
              </span>
              <span className="font-mono text-xs text-muted">August 2026</span>
              <span className="font-mono text-xs text-muted">•</span>
              <span className="font-mono text-xs text-muted">8 min read</span>
            </div>

            <h1 className="heading-xl text-foreground mb-6">
              Universal <span className="text-accent">Viewport</span> Autoscaler
            </h1>

            <p className="text-large text-muted leading-relaxed max-w-2xl">
              An intelligent ratio-fit architecture designed to render web pages with pixel-perfect proportion across any device screen width—from 320px smartphones to 4K ultra-wide monitors without CSS layout breaks.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-black font-bold font-mono text-sm">
                  {profile.initials}
                </div>
                <div>
                  <p className="font-mono text-sm font-bold text-foreground">{profile.name}</p>
                  <p className="font-mono text-xs text-muted">{profile.title}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prose Content */}
          <div className="prose mb-16">
            <h2>The Problem</h2>
            <p>
              Standard CSS media queries struggle with inconsistent screen aspect ratios and sudden breakpoint shifts. When designing for a 1440px desktop canvas, elements often jump and reflow awkwardly at intermediate widths like 1024px or 768px.
            </p>
            <p>
              This creates a frustrating experience where your carefully crafted layout breaks at seemingly arbitrary widths, requiring endless media query overrides and debugging sessions.
            </p>

            <h2>The Solution</h2>
            <p>
              Universal Viewport Autoscaler enforces proportional spatial integrity by calculating the exact ratio between the device viewport and your design baseline, then applying a hardware-accelerated CSS transform to maintain pixel-perfect proportions at any width.
            </p>
          </div>

          {/* Interactive Demo Simulator */}
          <section id="demo" className="mb-16 scroll-mt-28">
            <div className="glass-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <span className="label">Interactive Workbench</span>
                  <h2 className="heading-md text-foreground mt-1">Live Device Simulator</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {devicePresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setSimulatedWidth(preset.width)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all ${
                        simulatedWidth === preset.width
                          ? "bg-accent text-black font-bold shadow-md shadow-accent/20"
                          : "bg-surface-alt hover:bg-white/5 text-muted border border-white/5"
                      }`}
                    >
                      {preset.icon} {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-surface-alt/60 p-4 rounded-lg border border-white/5">
                <div>
                  <label className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                    <span>Device Width:</span>
                    <span className="text-accent font-bold">{simulatedWidth}px</span>
                  </label>
                  <input
                    type="range"
                    min="320"
                    max="2560"
                    step="10"
                    value={simulatedWidth}
                    onChange={(e) => setSimulatedWidth(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer h-1.5 rounded-lg bg-surface"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                    <span>Base Design Width:</span>
                    <span className="text-foreground font-bold">{targetBaseWidth}px</span>
                  </label>
                  <select
                    value={targetBaseWidth}
                    onChange={(e) => setTargetBaseWidth(Number(e.target.value))}
                    className="w-full bg-surface text-foreground font-mono text-xs p-2 rounded-lg border border-white/10 focus:border-accent outline-none"
                  >
                    <option value={1920}>1920px (Full HD)</option>
                    <option value={1440}>1440px (Standard)</option>
                    <option value={1280}>1280px (Laptop)</option>
                    <option value={1024}>1024px (Tablet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted mb-2">Scale Mode:</label>
                  <button
                    onClick={() => setPreserveAspectRatio(!preserveAspectRatio)}
                    className={`w-full p-2 rounded-lg font-mono text-xs flex items-center justify-center gap-2 border transition-all ${
                      preserveAspectRatio
                        ? "bg-accent/15 text-accent border-accent/40"
                        : "bg-surface text-muted border-white/10"
                    }`}
                  >
                    {preserveAspectRatio ? <FaCompressAlt /> : <FaExpandAlt />}
                    {preserveAspectRatio ? "Proportional Scale" : "Fluid Flex Mode"}
                  </button>
                </div>
              </div>

              {/* Telemetry Dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-surface/80 p-4 rounded-lg border border-white/5">
                  <span className="stat-label block">Scale Factor</span>
                  <span className="stat-number text-2xl md:text-3xl">{scaleRatio}x</span>
                </div>
                <div className="bg-surface/80 p-4 rounded-lg border border-white/5">
                  <span className="stat-label block">Font Ratio</span>
                  <span className="stat-number text-foreground text-2xl md:text-3xl">{fontPercent}%</span>
                </div>
                <div className="bg-surface/80 p-4 rounded-lg border border-white/5">
                  <span className="stat-label block">Baseline</span>
                  <span className="stat-number text-muted text-2xl md:text-3xl">{targetBaseWidth}px</span>
                </div>
                <div className="bg-surface/80 p-4 rounded-lg border border-white/5">
                  <span className="stat-label block">Precision</span>
                  <span className="stat-number text-2xl md:text-3xl">100%</span>
                </div>
              </div>

              {/* Visual Preview Canvas */}
              <div className="bg-black/50 rounded-lg p-4 border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono text-subtle mb-3 pb-2 border-b border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Live Preview ({simulatedWidth}px)
                  </span>
                  <span>scale({scaleRatio})</span>
                </div>

                <div
                  className="mx-auto transition-all duration-200 overflow-hidden rounded-lg bg-surface border border-white/10 p-4 shadow-2xl"
                  style={{ width: `${Math.min(simulatedWidth, 900)}px` }}
                >
                  <div
                    style={{
                      transform: preserveAspectRatio ? `scale(${Math.min(simulatedWidth / targetBaseWidth, 1)})` : "none",
                      transformOrigin: "top center",
                    }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between bg-surface-alt p-3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="font-mono text-xs text-muted ml-2">https://app.demo.internal</span>
                      </div>
                      <span className="font-mono text-[0.625rem] text-accent bg-accent/10 px-2 py-0.5 rounded">
                        FIT ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                        <span className="font-mono text-[0.625rem] text-accent block uppercase">Hero Card</span>
                        <h4 className="font-bold text-xs text-foreground mt-1">Zero Drift</h4>
                        <p className="text-[0.625rem] text-muted mt-1">Pixel-perfect matching.</p>
                      </div>
                      <div className="bg-surface-alt p-3 rounded-lg border border-white/10">
                        <span className="font-mono text-[0.625rem] text-muted block uppercase">Feature B</span>
                        <h4 className="font-bold text-xs text-foreground mt-1">Subpixel</h4>
                        <p className="text-[0.625rem] text-muted mt-1">Proportional fonts.</p>
                      </div>
                      <div className="bg-surface-alt p-3 rounded-lg border border-white/10">
                        <span className="font-mono text-[0.625rem] text-muted block uppercase">Metric C</span>
                        <h4 className="font-bold text-xs text-foreground mt-1">Universal</h4>
                        <p className="text-[0.625rem] text-muted mt-1">All browsers.</p>
                      </div>
                    </div>

                    <div className="bg-surface-alt p-3 rounded-lg border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-muted">Status: Autoscaling Active</span>
                      <span className="font-mono text-accent">Ratio: {scaleRatio}x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why This Works */}
          <section className="mb-16">
            <div className="prose">
              <h2>Why This Engine Solves Viewport Distortion</h2>
              <p>
                Standard CSS media queries struggle with inconsistent screen aspect ratios and sudden breakpoint shifts. Universal Viewport Autoscaler enforces proportional spatial integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                  <FaExpandAlt />
                </div>
                <h3 className="heading-md text-foreground mb-2">Proportional Scaling</h3>
                <p className="text-body text-sm text-muted">
                  Calculates the exact ratio between device resolution and design canvas, applying zero-lag 2D scale matrices.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                  <FaCheckCircle />
                </div>
                <h3 className="heading-md text-foreground mb-2">Zero Text Wrapping</h3>
                <p className="text-body text-sm text-muted">
                  Keeps line breaks, button dimensions, and grid coordinates locked in identical ratios at any width.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                  <FaTerminal />
                </div>
                <h3 className="heading-md text-foreground mb-2">Instant Integration</h3>
                <p className="text-body text-sm text-muted">
                  Requires only a lightweight hook or CSS variable wrapper to transform any existing web app.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-16">
            <div className="glass-card p-6 md:p-8">
              <h3 className="heading-md text-foreground mb-6 flex items-center gap-2">
                <FaTools className="text-accent" /> Comparison Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted font-mono uppercase text-[0.6875rem]">
                      <th className="py-3 px-4">Feature</th>
                      <th className="py-3 px-4 text-red-400">Media Queries</th>
                      <th className="py-3 px-4 text-accent">Viewport Scaler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-muted">
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-foreground">Breakpoints</td>
                      <td className="py-3 px-4 text-red-400/90">5-10 manual queries</td>
                      <td className="py-3 px-4 text-accent font-medium">Single auto-scale</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-foreground">Consistency</td>
                      <td className="py-3 px-4 text-red-400/90">Elements jump at edges</td>
                      <td className="py-3 px-4 text-accent font-medium">100% proportional</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-foreground">Dev Speed</td>
                      <td className="py-3 px-4 text-red-400/90">High debug effort</td>
                      <td className="py-3 px-4 text-accent font-medium">Build once, done</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-foreground">GPU</td>
                      <td className="py-3 px-4 text-red-400/90">Layout recalculations</td>
                      <td className="py-3 px-4 text-accent font-medium">Hardware accelerated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Code Implementation */}
          <section id="code" className="mb-16 scroll-mt-28">
            <div className="glass-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                <div>
                  <span className="label">Integration Code</span>
                  <h2 className="heading-lg text-foreground mt-1">Get The Source</h2>
                </div>

                <div className="flex items-center gap-2 bg-surface-alt p-1 rounded-lg border border-white/10">
                  {(["react", "js", "css"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all ${
                        activeTab === tab ? "bg-accent text-black font-bold" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {tab === "react" ? "React" : tab === "js" ? "Vanilla JS" : "Pure CSS"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative bg-surface-alt rounded-lg border border-white/10 p-4 font-mono text-xs overflow-x-auto text-muted">
                <button
                  onClick={() => copyCodeToClipboard(codeSnippets[activeTab])}
                  className="absolute top-4 right-4 bg-accent/10 hover:bg-accent text-accent hover:text-black border border-accent/40 px-3 py-1.5 rounded-md font-mono text-xs flex items-center gap-1.5 transition-all"
                >
                  {copiedCode ? <FaCheck size={12} /> : <FaCopy size={12} />}
                  {copiedCode ? "Copied!" : "Copy"}
                </button>
                <pre className="pt-8 pb-2 text-foreground/90 leading-relaxed">
                  <code>{codeSnippets[activeTab]}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center mb-8">
            <div className="glass-card p-10">
              <h2 className="heading-lg text-foreground mb-4">Integrate This In Your Project</h2>
              <p className="text-body text-muted max-w-xl mx-auto mb-8">
                Use this scaling architecture in your client or enterprise applications. Have questions? Let&apos;s connect!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/#contact" className="btn-primary">
                  Get In Touch <FaExternalLinkAlt size={12} />
                </Link>
                <Link href="/" className="btn-secondary">
                  Back to Portfolio <FaArrowLeft size={12} />
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
