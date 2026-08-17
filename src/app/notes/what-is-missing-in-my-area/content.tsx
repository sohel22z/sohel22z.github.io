"use client";

import {
  FaBullseye,
  FaChartLine,
  FaCheckCircle,
  FaCompass,
  FaExclamationTriangle,
  FaGem,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
  FaThumbsUp,
  FaTools,
  FaFire,
  FaArrowRight,
  FaLightbulb,
  FaUsers,
  FaStore,
  FaChartBar,
  FaBell,
} from "react-icons/fa";

/* ─── SVG Illustrations ─── */

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto mb-8"
    >
      {/* Map grid background */}
      <rect width="600" height="280" rx="12" fill="#131316" />
      <rect x="1" y="1" width="598" height="278" rx="11" stroke="#222228" strokeWidth="1" />

      {/* Grid lines */}
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="280" stroke="#222228" strokeWidth="0.5" />
      ))}
      {[70, 140, 210].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="600" y2={y} stroke="#222228" strokeWidth="0.5" />
      ))}

      {/* Existing businesses (green dots) */}
      {[
        { x: 100, y: 80 }, { x: 180, y: 120 }, { x: 260, y: 60 },
        { x: 340, y: 140 }, { x: 420, y: 90 }, { x: 140, y: 200 },
        { x: 300, y: 180 }, { x: 460, y: 200 }, { x: 380, y: 240 },
      ].map((pos, i) => (
        <g key={`biz${i}`}>
          <circle cx={pos.x} cy={pos.y} r="6" fill="#22c55e" opacity="0.3" />
          <circle cx={pos.x} cy={pos.y} r="3" fill="#22c55e" />
        </g>
      ))}

      {/* Missing opportunities (accent glow + question mark) */}
      {[
        { x: 200, y: 100 }, { x: 380, y: 160 }, { x: 260, y: 220 },
      ].map((pos, i) => (
        <g key={`opp${i}`}>
          <circle cx={pos.x} cy={pos.y} r="20" fill="#ccff00" opacity="0.08" />
          <circle cx={pos.x} cy={pos.y} r="12" fill="#ccff00" opacity="0.15" />
          <circle cx={pos.x} cy={pos.y} r="4" fill="#ccff00" />
          <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="8" fontWeight="bold">?</text>
        </g>
      ))}

      {/* Labels */}
      <g>
        <rect x="30" y="30" width="140" height="28" rx="6" fill="#1a1a1f" stroke="#222228" strokeWidth="1" />
        <circle cx="48" cy="44" r="4" fill="#22c55e" />
        <text x="58" y="48" fill="#a1a1aa" fontSize="9" fontFamily="monospace">EXISTING BUSINESSES</text>
      </g>
      <g>
        <rect x="30" y="64" width="130" height="28" rx="6" fill="#1a1a1f" stroke="#ccff0033" strokeWidth="1" />
        <circle cx="48" cy="78" r="4" fill="#ccff00" />
        <text x="58" y="82" fill="#ccff00" fontSize="9" fontFamily="monospace">OPPORTUNITIES</text>
      </g>

      {/* Radar sweep */}
      <circle cx="300" cy="140" r="100" fill="none" stroke="#ccff00" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
      <circle cx="300" cy="140" r="60" fill="none" stroke="#ccff00" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 4" />

      {/* Center marker */}
      <polygon points="300,132 306,148 294,148" fill="#ccff00" opacity="0.8" />
    </svg>
  );
}

function OpportunityScoreFormula() {
  return (
    <svg
      viewBox="0 0 600 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto my-8"
    >
      <rect width="600" height="120" rx="12" fill="#131316" />
      <rect x="1" y="1" width="598" height="118" rx="11" stroke="#222228" strokeWidth="1" />

      {/* Formula: Opportunity = Demand + Growth − Competition */}
      <text x="300" y="30" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">THE CORE FORMULA</text>

      <g transform="translate(60, 70)">
        {/* Opportunity */}
        <rect x="0" y="-18" width="110" height="36" rx="8" fill="#ccff00" opacity="0.15" stroke="#ccff00" strokeWidth="1" />
        <text x="55" y="0" textAnchor="middle" fill="#ccff00" fontSize="11" fontWeight="bold" fontFamily="monospace">OPPORTUNITY</text>

        {/* = */}
        <text x="130" y="0" fill="#52525b" fontSize="16" fontFamily="monospace">=</text>

        {/* Demand */}
        <rect x="150" y="-18" width="90" height="36" rx="8" fill="#22c55e" opacity="0.15" stroke="#22c55e" strokeWidth="1" />
        <text x="195" y="0" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="monospace">DEMAND</text>

        {/* + */}
        <text x="260" y="0" fill="#52525b" fontSize="16" fontFamily="monospace">+</text>

        {/* Growth */}
        <rect x="280" y="-18" width="90" height="36" rx="8" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="1" />
        <text x="325" y="0" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="monospace">GROWTH</text>

        {/* − */}
        <text x="390" y="0" fill="#52525b" fontSize="16" fontFamily="monospace">−</text>

        {/* Competition */}
        <rect x="410" y="-18" width="120" height="36" rx="8" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
        <text x="470" y="0" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">COMPETITION</text>
      </g>
    </svg>
  );
}

function TwoUsersIllustration() {
  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto my-8"
    >
      <rect width="600" height="200" rx="12" fill="#131316" />
      <rect x="1" y="1" width="598" height="198" rx="11" stroke="#222228" strokeWidth="1" />

      {/* Divider */}
      <line x1="300" y1="20" x2="300" y2="180" stroke="#222228" strokeWidth="1" strokeDasharray="4 4" />

      {/* Left: Business Owner */}
      <g transform="translate(150, 60)">
        <circle cx="0" cy="0" r="24" fill="#ccff00" opacity="0.1" stroke="#ccff00" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fill="#ccff00" fontSize="20">🏢</text>
      </g>
      <text x="150" y="100" textAnchor="middle" fill="#fafafa" fontSize="12" fontWeight="bold" fontFamily="monospace">BUSINESS OWNER</text>
      <text x="150" y="118" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">What opportunities</text>
      <text x="150" y="132" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">exist around me?</text>

      {/* Right: Explorer */}
      <g transform="translate(450, 60)">
        <circle cx="0" cy="0" r="24" fill="#3b82f6" opacity="0.1" stroke="#3b82f6" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fill="#3b82f6" fontSize="20">🧭</text>
      </g>
      <text x="450" y="100" textAnchor="middle" fill="#fafafa" fontSize="12" fontWeight="bold" fontFamily="monospace">EXPLORER</text>
      <text x="450" y="118" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">What is trending,</text>
      <text x="450" y="132" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">new, or hidden here?</text>

      {/* VS */}
      <text x="300" y="105" textAnchor="middle" fill="#52525b" fontSize="14" fontWeight="bold" fontFamily="monospace">VS</text>
    </svg>
  );
}

function MVPFlowDiagram() {
  return (
    <svg
      viewBox="0 0 600 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto my-8"
    >
      <rect width="600" height="100" rx="12" fill="#131316" />
      <rect x="1" y="1" width="598" height="98" rx="11" stroke="#222228" strokeWidth="1" />

      {/* Step 1 */}
      <g transform="translate(60, 50)">
        <circle r="20" fill="#ccff00" opacity="0.15" stroke="#ccff00" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fill="#ccff00" fontSize="12" fontWeight="bold" fontFamily="monospace">1</text>
        <text x="0" y="40" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">SELECT AREA</text>
      </g>

      {/* Arrow 1 */}
      <line x1="90" y1="50" x2="150" y2="50" stroke="#52525b" strokeWidth="1" />
      <polygon points="150,46 158,50 150,54" fill="#52525b" />

      {/* Step 2 */}
      <g transform="translate(190, 50)">
        <circle r="20" fill="#ccff00" opacity="0.15" stroke="#ccff00" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fill="#ccff00" fontSize="12" fontWeight="bold" fontFamily="monospace">2</text>
        <text x="0" y="40" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">ANALYZE</text>
      </g>

      {/* Arrow 2 */}
      <line x1="220" y1="50" x2="280" y2="50" stroke="#52525b" strokeWidth="1" />
      <polygon points="280,46 288,50 280,54" fill="#52525b" />

      {/* Step 3 */}
      <g transform="translate(320, 50)">
        <circle r="20" fill="#ccff00" opacity="0.15" stroke="#ccff00" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fill="#ccff00" fontSize="12" fontWeight="bold" fontFamily="monospace">3</text>
        <text x="0" y="40" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">FIND GAPS</text>
      </g>

      {/* Arrow 3 */}
      <line x1="350" y1="50" x2="410" y2="50" stroke="#52525b" strokeWidth="1" />
      <polygon points="410,46 418,50 410,54" fill="#52525b" />

      {/* Step 4 */}
      <g transform="translate(450, 50)">
        <circle r="20" fill="#ccff00" opacity="0.15" stroke="#ccff00" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fill="#ccff00" fontSize="12" fontWeight="bold" fontFamily="monospace">4</text>
        <text x="0" y="40" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">EXPLAIN</text>
      </g>
    </svg>
  );
}

function CustomerTravelGapIllustration() {
  return (
    <svg
      viewBox="0 0 600 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto my-8"
    >
      <rect width="600" height="160" rx="12" fill="#131316" />
      <rect x="1" y="1" width="598" height="158" rx="11" stroke="#222228" strokeWidth="1" />

      {/* User location */}
      <g transform="translate(80, 80)">
        <circle r="8" fill="#ccff00" />
        <circle r="16" fill="#ccff00" opacity="0.1" />
        <text x="0" y="30" textAnchor="middle" fill="#ccff00" fontSize="9" fontWeight="bold" fontFamily="monospace">YOU</text>
      </g>

      {/* Travel path (dashed) */}
      <path d="M 100 80 Q 200 40 300 80 Q 400 120 500 80" fill="none" stroke="#ccff00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />

      {/* Distance labels */}
      <text x="200" y="55" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">3 km</text>
      <text x="400" y="105" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">5 km</text>

      {/* Service locations (far away) */}
      <g transform="translate(300, 80)">
        <circle r="6" fill="#ef4444" opacity="0.3" />
        <circle r="3" fill="#ef4444" />
        <text x="0" y="18" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">SALON</text>
      </g>
      <g transform="translate(500, 80)">
        <circle r="6" fill="#ef4444" opacity="0.3" />
        <circle r="3" fill="#ef4444" />
        <text x="0" y="18" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">VET</text>
      </g>

      {/* Gap indicator */}
      <g transform="translate(200, 80)">
        <circle r="12" fill="#ccff00" opacity="0.08" stroke="#ccff00" strokeWidth="1" strokeDasharray="3 3" />
        <text x="0" y="4" textAnchor="middle" fill="#ccff00" fontSize="10" fontWeight="bold">?</text>
        <text x="0" y="30" textAnchor="middle" fill="#ccff00" fontSize="7" fontFamily="monospace">GAP</text>
      </g>

      {/* Legend */}
      <g transform="translate(30, 140)">
        <circle cx="0" cy="0" r="3" fill="#ccff00" />
        <text x="10" y="3" fill="#a1a1aa" fontSize="7" fontFamily="monospace">YOUR LOCATION</text>
        <circle cx="120" cy="0" r="3" fill="#ef4444" />
        <text x="130" y="3" fill="#a1a1aa" fontSize="7" fontFamily="monospace">EXISTING SERVICE</text>
        <circle cx="260" cy="0" r="6" fill="none" stroke="#ccff00" strokeWidth="1" strokeDasharray="3 3" />
        <text x="272" y="3" fill="#a1a1aa" fontSize="7" fontFamily="monospace">POTENTIAL GAP</text>
      </g>
    </svg>
  );
}

/* ─── Main Content ─── */

export function WhatIsMissingContent() {
  return (
    <div className="prose mb-16">
      {/* Hero SVG */}
      <HeroIllustration />

      <h2>The Problem</h2>
      <p>
        When we open Google Maps, we can easily find restaurants, cafés, shops,
        gyms, hotels, and other businesses around us.
      </p>
      <p>
        But I started thinking about a different question:
      </p>

      <blockquote>
        What if I don&apos;t want to know only what already exists? What if I
        want to know what is missing?
      </blockquote>

      <p>
        This thought led me to a product idea: a platform that helps people
        understand their local area from two perspectives:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <FaStore className="text-accent" size={16} />
            <span className="font-mono text-xs font-bold text-foreground uppercase">
              For Business Owners
            </span>
          </div>
          <p className="text-sm text-muted">
            What business opportunities exist around me?
          </p>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <FaCompass className="text-accent" size={16} />
            <span className="font-mono text-xs font-bold text-foreground uppercase">
              For Explorers
            </span>
          </div>
          <p className="text-sm text-muted">
            What is popular, trending, new, or interesting around me?
          </p>
        </div>
      </div>

      <p>
        The goal is not to build another map application. The goal is to build a{" "}
        <strong>local opportunity intelligence platform</strong>.
      </p>

      <h2>How the Product Works</h2>
      <p>
        The platform analyzes a selected area and identifies{" "}
        <strong>gaps, trends, competition, and opportunities</strong>.
      </p>
      <p>
        Instead of simply saying: &ldquo;There are 20 cafés in this
        area.&rdquo; It could say:
      </p>

      <div className="glass-card p-5 my-6 not-prose">
        <p className="text-sm text-accent font-medium">
          &ldquo;This area has strong café demand but relatively low competition
          compared with nearby areas.&rdquo;
        </p>
      </div>

      <p>Or:</p>

      <div className="glass-card p-5 my-6 not-prose">
        <p className="text-sm text-accent font-medium">
          &ldquo;Customers may be traveling several kilometers to find pet
          grooming services, while there are no direct providers
          nearby.&rdquo;
        </p>
      </div>

      <p>The key difference is:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
        <div className="glass-card p-4 border-white/10">
          <span className="font-mono text-[0.625rem] text-muted uppercase block mb-2">
            Traditional Maps
          </span>
          <p className="text-sm text-foreground font-medium">
            Show what exists
          </p>
        </div>
        <div className="glass-card p-4 border-accent/30">
          <span className="font-mono text-[0.625rem] text-accent uppercase block mb-2">
            This Platform
          </span>
          <p className="text-sm text-foreground font-medium">
            Helps identify what could exist
          </p>
        </div>
      </div>

      <TwoUsersIllustration />

      <h2>Two Main Users</h2>

      <h3>1. Business Owners</h3>
      <p>
        Business owners could use the platform before opening a new business,
        launching a service, or choosing a new location.
      </p>

      <div className="glass-card p-6 my-6 not-prose">
        <div className="flex items-center gap-2 mb-4">
          <FaBullseye className="text-accent" size={16} />
          <span className="font-mono text-xs font-bold text-foreground uppercase">
            Example: Kids Activity Center
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-mono text-[0.625rem] text-muted uppercase block">
              Opportunity Score
            </span>
            <span className="stat-number text-2xl">82</span>
            <span className="font-mono text-xs text-muted"> /100</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted">
            <FaCheckCircle size={12} className="text-green-500 shrink-0" />
            Large residential population
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <FaCheckCircle size={12} className="text-green-500 shrink-0" />
            Many families nearby
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <FaCheckCircle size={12} className="text-green-500 shrink-0" />
            Limited direct competition
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <FaCheckCircle size={12} className="text-green-500 shrink-0" />
            Schools in the surrounding area
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <FaCheckCircle size={12} className="text-green-500 shrink-0" />
            Growing local activity
          </div>
        </div>
      </div>

      <p>
        The platform would not promise that the business will succeed. Instead,
        it would provide useful data to support better decisions.
      </p>

      <h3>2. Explorers</h3>
      <p>
        The same platform could help normal users discover their area. Instead of
        only showing highly rated businesses, it could highlight:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 not-prose">
        {[
          { icon: <FaFire size={14} />, label: "Trending", desc: "Places becoming more popular" },
          { icon: <FaStar size={14} />, label: "Local Favorites", desc: "Strong reviews and engagement" },
          { icon: <FaCheckCircle size={14} />, label: "New", desc: "Recently opened businesses" },
          { icon: <FaGem size={14} />, label: "Hidden Gems", desc: "Good places not yet widely known" },
          { icon: <FaChartLine size={14} />, label: "Rising", desc: "Increasing interest" },
        ].map((item) => (
          <div key={item.label} className="glass-card p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-foreground block">
                {item.label}
              </span>
              <span className="text-xs text-muted">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <h2>The Core Feature: Opportunity Detection</h2>
      <p>
        The most important feature would be an <strong>Opportunity Score</strong>.
      </p>

      <OpportunityScoreFormula />

      <p>A simple version could consider:</p>

      <div className="glass-card p-4 my-6 text-center not-prose">
        <span className="font-mono text-sm text-foreground">
          <span className="text-accent font-bold">Opportunity</span> = Demand + Growth − Competition
        </span>
      </div>

      <p>For example:</p>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="w-full text-left font-sans text-xs">
          <thead>
            <tr className="border-b border-border text-muted font-mono uppercase text-[0.6875rem]">
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Demand</th>
              <th className="py-3 px-4">Competition</th>
              <th className="py-3 px-4 text-accent">Opportunity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-muted">
            <tr>
              <td className="py-3 px-4 font-mono font-bold text-foreground">Café</td>
              <td className="py-3 px-4">High</td>
              <td className="py-3 px-4">High</td>
              <td className="py-3 px-4 text-yellow-400 font-medium">Medium</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono font-bold text-foreground">Gym</td>
              <td className="py-3 px-4">High</td>
              <td className="py-3 px-4">Medium</td>
              <td className="py-3 px-4 text-green-400 font-medium">High</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono font-bold text-foreground">Pet Grooming</td>
              <td className="py-3 px-4">Medium</td>
              <td className="py-3 px-4">Low</td>
              <td className="py-3 px-4 text-green-400 font-medium">High</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono font-bold text-foreground">Luxury Store</td>
              <td className="py-3 px-4">Low</td>
              <td className="py-3 px-4">Low</td>
              <td className="py-3 px-4 text-red-400 font-medium">Low</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The important point is that <strong>absence does not automatically mean
        opportunity</strong>. If an area has no luxury watch store, that does
        not mean people want one. The platform needs to understand both{" "}
        <strong>demand and supply</strong>.
      </p>

      <h2>Features</h2>

      <h3>1. Local Opportunity Map</h3>
      <p>
        A map showing areas with different opportunity levels. Users could
        quickly identify:
      </p>
      <div className="flex flex-wrap gap-3 my-4 not-prose">
        <span className="tag flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" /> High opportunity
        </span>
        <span className="tag flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-500" /> Potential opportunity
        </span>
        <span className="tag flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" /> Strong existing market
        </span>
      </div>

      <h3>2. Business Gap Finder</h3>
      <p>
        A user could select a category such as: &ldquo;Show me underserved food
        businesses.&rdquo; The platform could identify areas where demand
        appears stronger than existing supply.
      </p>

      <h3>3. Competitor Analysis</h3>
      <p>
        Business owners could see competitor density by location. For example:
      </p>
      <div className="grid grid-cols-3 gap-3 my-4 not-prose">
        <div className="glass-card p-3 text-center">
          <span className="font-mono text-xs text-muted block">Area A</span>
          <span className="font-mono text-sm font-bold text-red-400">18</span>
          <span className="font-mono text-[0.625rem] text-muted block">competitors</span>
        </div>
        <div className="glass-card p-3 text-center">
          <span className="font-mono text-xs text-muted block">Area B</span>
          <span className="font-mono text-sm font-bold text-yellow-400">7</span>
          <span className="font-mono text-[0.625rem] text-muted block">competitors</span>
        </div>
        <div className="glass-card p-3 text-center">
          <span className="font-mono text-xs text-muted block">Area C</span>
          <span className="font-mono text-sm font-bold text-green-400">2</span>
          <span className="font-mono text-[0.625rem] text-muted block">competitors</span>
        </div>
      </div>

      <h3>4. Why Is This an Opportunity?</h3>
      <p>
        Instead of simply showing &ldquo;Opportunity Score: 87&rdquo;, the
        platform should explain the result:
      </p>
      <div className="glass-card p-5 my-6 not-prose">
        <div className="flex items-center gap-2 mb-3">
          <FaLightbulb className="text-accent" size={14} />
          <span className="font-mono text-xs font-bold text-foreground uppercase">
            Why?
          </span>
        </div>
        <div className="space-y-2 text-sm text-muted">
          <p>High residential density</p>
          <p>Strong demand signals</p>
          <p>Low direct competition</p>
          <p>Customers traveling outside the area for the service</p>
        </div>
      </div>

      <h3>5. Location Comparison</h3>
      <p>Business owners could compare two potential locations:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
        <div className="glass-card p-5">
          <span className="font-mono text-xs font-bold text-foreground block mb-3">
            Location A
          </span>
          <div className="space-y-2 text-sm text-muted">
            <p>High traffic</p>
            <p>High competition</p>
            <p>Higher cost</p>
          </div>
        </div>
        <div className="glass-card p-5 border-accent/30">
          <span className="font-mono text-xs font-bold text-accent block mb-3">
            Location B
          </span>
          <div className="space-y-2 text-sm text-muted">
            <p>Medium traffic</p>
            <p>Low competition</p>
            <p>Lower cost</p>
          </div>
        </div>
      </div>

      <h3>6. Customer Travel Gap</h3>
      <p>
        This could be one of the most useful features. If customers need to
        travel 5–8 km to find a particular service, the platform could identify
        that as a potential <strong>service gap</strong>.
      </p>

      <CustomerTravelGapIllustration />

      <div className="glass-card p-5 my-6 not-prose">
        <div className="flex items-center gap-2 mb-3">
          <FaMapMarkerAlt className="text-accent" size={14} />
          <span className="font-mono text-xs font-bold text-foreground uppercase">
            Pet Grooming Opportunity
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted block">Nearby providers:</span>
            <span className="text-foreground font-bold">1</span>
          </div>
          <div>
            <span className="text-muted block">Competition:</span>
            <span className="text-green-400 font-bold">Low</span>
          </div>
          <div>
            <span className="text-muted block">Customer travel:</span>
            <span className="text-yellow-400 font-bold">High</span>
          </div>
          <div>
            <span className="text-muted block">Opportunity:</span>
            <span className="text-accent font-bold">Strong</span>
          </div>
        </div>
      </div>

      <h3>7. Local Demand Requests</h3>
      <p>
        Users could directly tell the platform what they want. For example:
        &ldquo;I wish there was a healthy meal service in my area.&rdquo; Other
        users could upvote the request.
      </p>
      <div className="glass-card p-5 my-6 not-prose">
        <div className="flex items-center gap-2 mb-3">
          <FaThumbsUp className="text-accent" size={14} />
          <span className="font-mono text-xs font-bold text-foreground uppercase">
            127 local users are interested in this service
          </span>
        </div>
        <p className="text-sm text-muted">
          This creates a direct connection between local demand and potential
          businesses.
        </p>
      </div>

      <h3>8. Trends and Alerts</h3>
      <p>The platform could track changes over time:</p>
      <div className="space-y-3 my-6 not-prose">
        <div className="glass-card p-4 flex items-center gap-3">
          <FaChartLine className="text-green-400" size={14} />
          <span className="text-sm text-muted">
            Fitness interest is increasing in this area.
          </span>
        </div>
        <div className="glass-card p-4 flex items-center gap-3 border-yellow-500/30">
          <FaExclamationTriangle className="text-yellow-400" size={14} />
          <span className="text-sm text-muted">
            Competition in your selected category has increased.
          </span>
        </div>
      </div>

      <h2>AI-Powered Search</h2>
      <p>AI could make the platform much easier to use. Instead of using many filters, users could simply ask:</p>

      <div className="space-y-3 my-6 not-prose">
        <div className="glass-card p-4">
          <span className="text-sm text-accent font-mono">
            &ldquo;What businesses are missing within 5 km of me?&rdquo;
          </span>
        </div>
        <div className="glass-card p-4">
          <span className="text-sm text-accent font-mono">
            &ldquo;Find a good area to open a bakery with low competition.&rdquo;
          </span>
        </div>
        <div className="glass-card p-4">
          <span className="text-sm text-accent font-mono">
            &ldquo;Why is this area a good location for a gym?&rdquo;
          </span>
        </div>
      </div>

      <p>
        The AI would analyze the available data and explain the reasoning behind
        its recommendations. The important part is that AI should{" "}
        <strong>show the evidence</strong>, rather than simply generate a score.
      </p>

      <h2>Data Behind the Product</h2>
      <p>The platform could combine different signals:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-6 not-prose">
        {[
          "Business categories and locations",
          "Ratings and reviews",
          "Competitor density",
          "Population and residential density",
          "Schools and offices",
          "Local development",
          "Search and demand trends",
          "New and closed businesses",
          "Customer requests",
          "Aggregated activity signals",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-muted">
            <FaCheckCircle size={10} className="text-accent shrink-0" />
            {item}
          </div>
        ))}
      </div>

      <p>
        Privacy would be an important part of the product. Individual
        people&apos;s locations or personal information should never be exposed.
      </p>

      <h2>MVP</h2>
      <p>I would keep the first version simple.</p>

      <MVPFlowDiagram />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { num: "1", title: "Select an Area", desc: "Choose a location and radius" },
          { num: "2", title: "Analyze the Area", desc: "Show businesses, categories, competition, and basic demand signals" },
          { num: "3", title: "Find Gaps", desc: "Identify categories that appear underserved" },
          { num: "4", title: "Explain Opportunities", desc: "Show the opportunity score and why the opportunity exists" },
        ].map((step) => (
          <div key={step.num} className="glass-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-mono text-xs font-bold">
                {step.num}
              </div>
              <span className="font-mono text-xs font-bold text-foreground uppercase">
                {step.title}
              </span>
            </div>
            <p className="text-xs text-muted">{step.desc}</p>
          </div>
        ))}
      </div>

      <p>
        This would be enough to test whether the idea provides real value before
        building a much larger platform.
      </p>

      <h2>Final Thought</h2>
      <p>
        The interesting part of this idea is not the map.{" "}
        <strong>
          The map is only the interface. The real product is the intelligence
          behind it.
        </strong>
      </p>
      <p>
        I started with a simple question: &ldquo;Can an app tell me what is
        missing around me?&rdquo; That question became a bigger idea: a platform
        that helps people understand not only what exists in an area, but also{" "}
        <strong>
          what people need, what is changing, and what opportunities may be
          emerging.
        </strong>
      </p>
      <p>
        For explorers, it could help them discover their city. For business
        owners, it could help them discover opportunities.
      </p>

      <div className="glass-card p-6 my-8 text-center not-prose">
        <p className="text-sm text-foreground font-medium">
          Don&apos;t just explore what your area has.{" "}
          <span className="text-accent font-bold">
            Discover what your area could have.
          </span>
        </p>
      </div>
    </div>
  );
}
