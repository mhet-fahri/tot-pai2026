import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Abstract Green-White Background Canvas
 * Menghasilkan visualisasi gelombang hijau zamrud (emerald), mint, dan putih
 * yang mengalir dinamis di seluruh latar belakang halaman.
 */

export const GreenAbstractBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Subtle Elegant Matrix Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#10b981 1.2px, transparent 1.2px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* 2. Flowing Kinetic Aurora Wave Ribbons (Emerald & Mint) */}
      <svg
        className="absolute w-[180%] h-[180%] -top-[35%] -left-[35%] opacity-[0.65]"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="emerald-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#059669" stopOpacity="0.32" />
            <stop offset="85%" stopColor="#a7f3d0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="emerald-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#2dd4bf" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#d1fae5" stopOpacity="0.1" />
          </linearGradient>

          <filter id="green-blur-wave" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="75" />
          </filter>
        </defs>

        {/* Ambient Wave Ribbons 1 */}
        <motion.path
          d="M-100,280 C320,130 650,580 1150,220 C1450,40 1620,440 1850,280 L1850,920 L-100,920 Z"
          fill="url(#emerald-grad-1)"
          filter="url(#green-blur-wave)"
          animate={{
            d: [
              "M-100,280 C320,130 650,580 1150,220 C1450,40 1620,440 1850,280 L1850,920 L-100,920 Z",
              "M-100,340 C420,290 720,180 1020,440 C1320,680 1520,190 1850,360 L1850,920 L-100,920 Z",
              "M-100,280 C320,130 650,580 1150,220 C1450,40 1620,440 1850,280 L1850,920 L-100,920 Z"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ambient Wave Ribbons 2 */}
        <motion.path
          d="M0,480 C420,220 820,640 1220,320 C1520,80 1720,380 1920,420 L1920,1020 L0,1020 Z"
          fill="url(#emerald-grad-2)"
          filter="url(#green-blur-wave)"
          animate={{
            d: [
              "M0,480 C420,220 820,640 1220,320 C1520,80 1720,380 1920,420 L1920,1020 L0,1020 Z",
              "M0,400 C360,520 760,260 1160,480 C1460,620 1680,280 1920,380 L1920,1020 L0,1020 Z",
              "M0,480 C420,220 820,640 1220,320 C1520,80 1720,380 1920,420 L1920,1020 L0,1020 Z"
            ]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 3. Floating Kinetic Organic Shapes */}
        <motion.ellipse
          cx="450"
          cy="260"
          rx="180"
          ry="120"
          fill="#34d399"
          fillOpacity="0.2"
          filter="url(#green-blur-wave)"
          animate={{
            scale: [1, 1.25, 1],
            x: [-30, 40, -30],
            y: [20, -30, 20],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.ellipse
          cx="1050"
          cy="520"
          rx="220"
          ry="150"
          fill="#10b981"
          fillOpacity="0.18"
          filter="url(#green-blur-wave)"
          animate={{
            scale: [1.2, 0.95, 1.2],
            x: [30, -40, 30],
            y: [-25, 35, -25],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};
