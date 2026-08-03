"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaCheckCircle,
  FaCode,
  FaCompressAlt,
  FaCopy,
  FaDesktop,
  FaExpandAlt,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaLaptop,
  FaMobileAlt,
  FaSlidersH,
  FaTabletAlt,
  FaTerminal,
  FaTools
} from "react-icons/fa";

export default function ResponsiveScalerPage() {
  const [targetBaseWidth, setTargetBaseWidth] = useState<number>(1440);
  const [simulatedWidth, setSimulatedWidth] = useState<number>(768);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"react" | "js" | "css">("react");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Math scale ratio calculation for the simulator
  const scaleRatio = Number((simulatedWidth / targetBaseWidth).toFixed(3));
  const fontPercent = Math.round(scaleRatio * 100);

  const devicePresets = [
    { name: "Mobile", width: 375, icon: <FaMobileAlt /> },
    { name: "Tablet", width: 768, icon: <FaTabletAlt /> },
    { name: "Laptop", width: 1280, icon: <FaLaptop /> },
    { name: "Desktop", width: 1440, icon: <FaDesktop /> },
    { name: "4K Display", width: 2560, icon: <FaExpandAlt /> },
  ];

  const codeSnippets = {
    react: `import React, { useEffect, useState, useRef } from "react";

interface ViewportScalerProps {
  baseWidth?: number; // e.g. 1440 for 1440px desktop design baseline
  minScale?: number;  // e.g. 0.4
  maxScale?: number;  // e.g. 2.0
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
 * Seamlessly fits fixed-width layout designs to any screen resolution without breaking layout rules.
 */
function initViewportScaler(options = {}) {
  const baseWidth = options.baseWidth || 1440;
  const containerSelector = options.container || '#scalable-root';
  const targetElement = document.querySelector(containerSelector);

  if (!targetElement) return;

  function updateScale() {
    const windowWidth = window.innerWidth;
    const scaleFactor = windowWidth / baseWidth;
    
    // Apply transform matrix scale preserving baseline layout
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

/* Optional CSS Variable Fluid Scaling Engine */
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
      <div className="glow-spot top-[-100px] left-[-100px]" />
      <div className="glow-spot top-[50%] right-[-150px] opacity-70" />

      {/* Floating Glass Navigation Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="glass-card flex items-center justify-between px-5 py-3 bg-surface/90 shadow-2xl border-white/10">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-mono text-sm font-black bg-accent text-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                <FaArrowLeft size={12} /> PORTFOLIO
              </span>
              <div className="text-left hidden sm:block">
                <span className="font-mono font-bold text-xs uppercase block tracking-wider text-foreground">
                  Sohel Ansari
                </span>
                <span className="text-[10px] text-accent font-mono block">Frontend Architect</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <span className="tag tag-accent text-xs flex items-center gap-1.5">
                <FaCheckCircle size={11} /> Innovation Lab
              </span>
              <Link href="/#contact" className="btn-secondary text-xs px-3.5 py-1.5">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="pt-28 pb-20">
        {/* HERO SECTION */}
        <section className="container max-w-5xl mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-wider mb-6">
              <FaTools size={12} /> Layout Innovation & Auto-Fit Engine
            </div>

            <h1 className="heading-xl text-foreground mb-6">
              Universal <span className="text-accent">Viewport</span> Autoscaler
            </h1>

            <p className="text-large text-muted mb-8 leading-relaxed">
              An intelligent ratio-fit architecture designed to render web pages with pixel-perfect proportion across any device screen width—from 320px smartphones to 4K ultra-wide monitors without CSS layout breaks or awkward line wraps.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#demo-simulator" className="btn-primary">
                Try Live Simulator <FaSlidersH size={14} />
              </a>
              <a href="#code-implementation" className="btn-secondary">
                View Source Code <FaCode size={14} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* INTERACTIVE DEMO SIMULATOR */}
        <section id="demo-simulator" className="container max-w-5xl mx-auto px-4 mb-20 scroll-mt-28">
          <div className="glass-card p-6 md:p-8 relative overflow-hidden border-accent/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <span className="label">Interactive Workbench</span>
                <h2 className="heading-md text-foreground mt-1">Live Device Resolution Simulator</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-muted mr-1">Device Presets:</span>
                {devicePresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setSimulatedWidth(preset.width)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all ${
                      simulatedWidth === preset.width
                        ? "bg-accent text-black font-bold shadow-md"
                        : "bg-surface-alt hover:bg-white/10 text-muted"
                    }`}
                  >
                    {preset.icon} {preset.name} ({preset.width}px)
                  </button>
                ))}
              </div>
            </div>

            {/* CONTROLS BAR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-surface-alt/60 p-4 rounded-xl border border-white/5">
              <div>
                <label className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                  <span>Simulated Device Width:</span>
                  <span className="text-accent font-bold">{simulatedWidth}px</span>
                </label>
                <input
                  type="range"
                  min="320"
                  max="2560"
                  step="10"
                  value={simulatedWidth}
                  onChange={(e) => setSimulatedWidth(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer h-2 rounded-lg bg-surface"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                  <span>Target Base Design Width:</span>
                  <span className="text-foreground font-bold">{targetBaseWidth}px</span>
                </label>
                <select
                  value={targetBaseWidth}
                  onChange={(e) => setTargetBaseWidth(Number(e.target.value))}
                  className="w-full bg-surface text-foreground font-mono text-xs p-2 rounded-lg border border-white/10 focus:border-accent outline-none"
                >
                  <option value={1920}>1920px (Desktop Full HD)</option>
                  <option value={1440}>1440px (Standard Desktop)</option>
                  <option value={1280}>1280px (MacBook / Laptop)</option>
                  <option value={1024}>1024px (Tablet Landscape)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-2">Mode & Aspect Lock:</label>
                <button
                  onClick={() => setPreserveAspectRatio(!preserveAspectRatio)}
                  className={`w-full p-2 rounded-lg font-mono text-xs flex items-center justify-center gap-2 border transition-all ${
                    preserveAspectRatio
                      ? "bg-accent/15 text-accent border-accent/40"
                      : "bg-surface text-muted border-white/10"
                  }`}
                >
                  {preserveAspectRatio ? <FaCompressAlt /> : <FaExpandAlt />}
                  {preserveAspectRatio ? "Lock Proportional Scale" : "Fluid Flex Mode"}
                </button>
              </div>
            </div>

            {/* LIVE TELEMETRY DASHBOARD */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface/80 p-4 rounded-xl border border-white/5">
                <span className="stat-label block">Calculated Scale Factor</span>
                <span className="stat-number text-accent text-2xl md:text-3xl">{scaleRatio}x</span>
              </div>
              <div className="bg-surface/80 p-4 rounded-xl border border-white/5">
                <span className="stat-label block">Font & UI Ratio</span>
                <span className="stat-number text-foreground text-2xl md:text-3xl">{fontPercent}%</span>
              </div>
              <div className="bg-surface/80 p-4 rounded-xl border border-white/5">
                <span className="stat-label block">Target Baseline</span>
                <span className="stat-number text-muted text-2xl md:text-3xl">{targetBaseWidth}px</span>
              </div>
              <div className="bg-surface/80 p-4 rounded-xl border border-white/5">
                <span className="stat-label block">Layout Precision</span>
                <span className="stat-number text-accent text-2xl md:text-3xl">100%</span>
              </div>
            </div>

            {/* VISUAL PREVIEW CANVAS */}
            <div className="bg-black/80 rounded-xl p-4 border border-white/10 overflow-hidden relative">
              <div className="flex items-center justify-between text-xs font-mono text-subtle mb-3 pb-2 border-b border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  Live Preview Viewport Stage ({simulatedWidth}px)
                </span>
                <span>Transform: scale({scaleRatio})</span>
              </div>

              {/* Scalable Container Frame */}
              <div
                className="mx-auto transition-all duration-200 overflow-hidden rounded-lg bg-surface border border-white/15 p-4 shadow-2xl relative"
                style={{
                  width: `${Math.min(simulatedWidth, 900)}px`,
                }}
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
                    <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">
                      FIT ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                      <span className="font-mono text-[10px] text-accent block uppercase">Hero Card A</span>
                      <h4 className="font-bold text-xs text-foreground mt-1">Zero Breakpoint Drift</h4>
                      <p className="text-[10px] text-muted mt-1">Layout stays 100% pixel matching.</p>
                    </div>
                    <div className="bg-surface-alt p-3 rounded-lg border border-white/10">
                      <span className="font-mono text-[10px] text-muted block uppercase">Feature B</span>
                      <h4 className="font-bold text-xs text-foreground mt-1">Subpixel Precision</h4>
                      <p className="text-[10px] text-muted mt-1">Font rendering stays proportional.</p>
                    </div>
                    <div className="bg-surface-alt p-3 rounded-lg border border-white/10">
                      <span className="font-mono text-[10px] text-muted block uppercase">Metric C</span>
                      <h4 className="font-bold text-xs text-foreground mt-1">Universal Compatibility</h4>
                      <p className="text-[10px] text-muted mt-1">Works across all browser engines.</p>
                    </div>
                  </div>

                  <div className="bg-surface-alt p-3 rounded-lg border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-muted">Status: Autoscaling Engine Active</span>
                    <span className="font-mono text-accent">Ratio: {scaleRatio}x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL ARCHITECTURE & DEEP DIVE */}
        <section className="container max-w-5xl mx-auto px-4 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="label">Core Architecture</span>
            <h2 className="heading-lg text-foreground mt-2">Why This Engine Solves Viewport Distortion</h2>
            <p className="text-body text-muted mt-3">
              Standard CSS media queries struggle with inconsistent screen aspect ratios and sudden breakpoint shifts. Universal Viewport Autoscaler enforces proportional spatial integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 border-white/10">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                <FaExpandAlt />
              </div>
              <h3 className="heading-md text-foreground mb-2">1. Proportional Matrix Scaling</h3>
              <p className="text-body text-sm text-muted">
                Calculates the exact ratio between device resolution and design canvas, applying zero-lag 2D scale matrices without causing reflow loops.
              </p>
            </div>

            <div className="glass-card p-6 border-white/10">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                <FaCheckCircle />
              </div>
              <h3 className="heading-md text-foreground mb-2">2. Zero Text Wrapping Shifts</h3>
              <p className="text-body text-sm text-muted">
                Keeps line breaks, button dimensions, and grid coordinates locked in identical ratios regardless of whether viewed on mobile or desktop.
              </p>
            </div>

            <div className="glass-card p-6 border-white/10">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4">
                <FaTerminal />
              </div>
              <h3 className="heading-md text-foreground mb-2">3. Subsecond Integration</h3>
              <p className="text-body text-sm text-muted">
                Requires only a lightweight custom hook or CSS variable root wrapper to transform any existing standard web app instantly.
              </p>
            </div>
          </div>

          {/* COMPARISON MATRIX */}
          <div className="glass-card p-6 md:p-8 border-white/10">
            <h3 className="heading-md text-foreground mb-6 flex items-center gap-2">
              <FaInfoCircle className="text-accent" /> Comparison Matrix: Traditional vs Viewport Autoscaler
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-muted font-mono uppercase text-[11px]">
                    <th className="py-3 px-4">Feature Metric</th>
                    <th className="py-3 px-4 text-red-400">Traditional Media Queries</th>
                    <th className="py-3 px-4 text-accent">Universal Viewport Scaler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-muted">
                  <tr>
                    <td className="py-3 px-4 font-mono font-bold text-foreground">Layout Breakpoints</td>
                    <td className="py-3 px-4 text-red-400/90">Requires 5-10 manual media query sets</td>
                    <td className="py-3 px-4 text-accent font-medium">Single baseline layout auto-scales</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-bold text-foreground">Visual Consistency</td>
                    <td className="py-3 px-4 text-red-400/90">Elements jump & reflow at breakpoint edges</td>
                    <td className="py-3 px-4 text-accent font-medium">100% proportional pixel match everywhere</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-bold text-foreground">Development Speed</td>
                    <td className="py-3 px-4 text-red-400/90">High effort debugging per device width</td>
                    <td className="py-3 px-4 text-accent font-medium">Build once for target canvas, done</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono font-bold text-foreground">GPU Acceleration</td>
                    <td className="py-3 px-4 text-red-400/90">Standard layout recalculations</td>
                    <td className="py-3 px-4 text-accent font-medium">Hardware transform matrix accelerated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CODE IMPLEMENTATION SECTION */}
        <section id="code-implementation" className="container max-w-5xl mx-auto px-4 mb-20 scroll-mt-28">
          <div className="glass-card p-6 md:p-8 border-accent/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="label">Integration Code</span>
                <h2 className="heading-lg text-foreground mt-1">Get The Source Snippet</h2>
              </div>

              <div className="flex items-center gap-2 bg-surface-alt p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setActiveTab("react")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                    activeTab === "react" ? "bg-accent text-black font-bold" : "text-muted hover:text-foreground"
                  }`}
                >
                  React / Next.js
                </button>
                <button
                  onClick={() => setActiveTab("js")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                    activeTab === "js" ? "bg-accent text-black font-bold" : "text-muted hover:text-foreground"
                  }`}
                >
                  Vanilla JS
                </button>
                <button
                  onClick={() => setActiveTab("css")}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                    activeTab === "css" ? "bg-accent text-black font-bold" : "text-muted hover:text-foreground"
                  }`}
                >
                  Pure CSS
                </button>
              </div>
            </div>

            <div className="relative bg-surface-alt rounded-xl border border-white/10 p-4 font-mono text-xs overflow-x-auto text-muted">
              <button
                onClick={() => copyCodeToClipboard(codeSnippets[activeTab])}
                className="absolute top-4 right-4 bg-accent/10 hover:bg-accent text-accent hover:text-black border border-accent/40 px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                {copiedCode ? <FaCheck size={12} /> : <FaCopy size={12} />}
                {copiedCode ? "Copied!" : "Copy Snippet"}
              </button>
              <pre className="pt-8 pb-2 text-foreground/90 leading-relaxed">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="container max-w-5xl mx-auto px-4 text-center">
          <div className="glass-card p-10 border-accent/30 relative overflow-hidden">
            <h2 className="heading-lg text-foreground mb-4">Want To Integrate This In Your Project?</h2>
            <p className="text-body text-muted max-w-xl mx-auto mb-8">
              Feel free to use this scaling architecture in your client or enterprise applications. Have questions or custom layout challenges? Let&apos;s connect!
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
      </main>
    </div>
  );
}
