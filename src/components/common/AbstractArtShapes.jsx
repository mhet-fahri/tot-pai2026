import React from 'react';
import { motion } from 'framer-motion';

/**
 * DeepSeek-style Central Abstract Intelligence Hologram / Neural Orb
 * Menggabungkan perpaduan warna Cyan cerah, Electric Blue, dan Deep Indigo
 * dengan garis-garis rotasi orbital futuristik & partikel mengapung.
 */

export const AbstractArtShapes = () => {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[460px] rounded-[24px] overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/90 flex items-center justify-center p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] select-none">
      {/* Background Neural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic Glowing Radial Center */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-400/30 via-blue-500/25 to-indigo-500/20 blur-2xl pointer-events-none"
      />

      <svg
        viewBox="0 0 600 420"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="deepseek-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <linearGradient id="ring-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer Orbital Orbit Ring 1 */}
        <motion.ellipse
          cx="300"
          cy="210"
          rx="180"
          ry="75"
          stroke="url(#ring-grad-cyan)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "300px", originY: "210px" }}
        />

        {/* Outer Orbital Orbit Ring 2 */}
        <motion.ellipse
          cx="300"
          cy="210"
          rx="150"
          ry="110"
          stroke="#0ea5e9"
          strokeOpacity="0.3"
          strokeWidth="1"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ originX: "300px", originY: "210px" }}
        />

        {/* Inner Morphing DeepSeek Abstract Core Blob */}
        <motion.path
          d="M300,120 C370,120 410,165 390,230 C370,290 320,310 270,290 C210,270 200,210 220,165 C240,125 270,120 300,120 Z"
          fill="url(#deepseek-core-grad)"
          animate={{
            d: [
              "M300,120 C370,120 410,165 390,230 C370,290 320,310 270,290 C210,270 200,210 220,165 C240,125 270,120 300,120 Z",
              "M300,130 C360,110 420,180 380,240 C340,300 290,295 240,275 C190,250 215,185 245,150 C270,120 280,135 300,130 Z",
              "M300,120 C370,120 410,165 390,230 C370,290 320,310 270,290 C210,270 200,210 220,165 C240,125 270,120 300,120 Z"
            ],
            scale: [1, 1.05, 1],
            y: [-5, 5, -5]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Futuristic Geometric Nodes */}
        <motion.circle
          cx="210"
          cy="150"
          r="8"
          fill="#38bdf8"
          animate={{ y: [-10, 10, -10], x: [3, -3, 3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="390"
          cy="280"
          r="6"
          fill="#818cf8"
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="410"
          cy="140"
          r="5"
          fill="#06b6d4"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="190"
          cy="270"
          r="6"
          fill="#6366f1"
          animate={{ y: [-6, 6, -6], x: [-3, 3, -3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Kinetic Light Wave Line */}
        <motion.path
          d="M140,210 Q220,160 300,210 T460,210"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.8"
          fill="none"
          animate={{
            d: [
              "M140,210 Q220,160 300,210 T460,210",
              "M140,210 Q220,240 300,210 T460,210",
              "M140,210 Q220,160 300,210 T460,210"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Floating Status Glass Pill ala DeepSeek */}
      <div className="absolute bottom-5 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-sky-200/80 shadow-sm flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
        <span className="text-xs font-semibold text-slate-800">
          ToT PAI Kemenag RI • AI & Modern Pedagogy
        </span>
      </div>
    </div>
  );
};
