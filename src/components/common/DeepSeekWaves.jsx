import React from 'react';
import { motion } from 'framer-motion';

/**
 * DeepSeek-style Ambient Flowing Particle & Wave Canvas
 * Menghasilkan visualisasi gelombang abstrak dinamis, partikel neon lembut,
 * dan perpaduan gradasi Cyan, Royal Blue, Indigo & Purple khas DeepSeek.
 */

export const DeepSeekWaves = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Subtle Fine Dot Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* 2. Flowing Kinetic Aurora Wave Curves */}
      <svg
        className="absolute w-[180%] h-[180%] -top-[40%] -left-[40%] opacity-[0.55]"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* DeepSeek Signature Gradients */}
          <linearGradient id="deepseek-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="deepseek-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.08" />
          </linearGradient>

          <filter id="blur-wave" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>

        {/* Ambient Wave Ribbons */}
        <motion.path
          d="M-100,300 C300,150 600,600 1100,250 C1400,50 1600,450 1800,300 L1800,900 L-100,900 Z"
          fill="url(#deepseek-grad-1)"
          filter="url(#blur-wave)"
          animate={{
            d: [
              "M-100,300 C300,150 600,600 1100,250 C1400,50 1600,450 1800,300 L1800,900 L-100,900 Z",
              "M-100,350 C400,300 700,200 1000,450 C1300,700 1500,200 1800,380 L1800,900 L-100,900 Z",
              "M-100,300 C300,150 600,600 1100,250 C1400,50 1600,450 1800,300 L1800,900 L-100,900 Z"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.path
          d="M0,500 C400,250 800,650 1200,350 C1500,100 1700,400 1900,450 L1900,1000 L0,1000 Z"
          fill="url(#deepseek-grad-2)"
          filter="url(#blur-wave)"
          animate={{
            d: [
              "M0,500 C400,250 800,650 1200,350 C1500,100 1700,400 1900,450 L1900,1000 L0,1000 Z",
              "M0,420 C350,550 750,280 1150,500 C1450,650 1650,300 1900,400 L1900,1000 L0,1000 Z",
              "M0,500 C400,250 800,650 1200,350 C1500,100 1700,400 1900,450 L1900,1000 L0,1000 Z"
            ]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};
