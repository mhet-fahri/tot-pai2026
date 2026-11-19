import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Subtle Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#202124]/40"
          aria-hidden="true"
        />

        {/* Minimal Google-style Dialog */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`relative w-full ${maxWidth} bg-white rounded-2xl border border-[#dadce0] shadow-xl overflow-hidden z-50 p-6 sm:p-8`}
        >
          <div className="flex items-center justify-between mb-4">
            {title && (
              <h3 id="modal-headline" className="text-lg font-bold text-[#202124] tracking-tight">{title}</h3>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#5f6368] hover:text-[#202124] hover:bg-[#f8f9fa] transition"
                aria-label="Tutup dialog"
              >
                <Icon id="icon-x" className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
