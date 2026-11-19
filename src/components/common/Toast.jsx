import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-white text-emerald-900',
    error: 'border-rose-200 bg-white text-rose-900',
    info: 'border-blue-200 bg-white text-blue-900'
  };

  return (
    <AnimatePresence>
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`pointer-events-auto p-4 rounded-2xl border shadow-lg flex items-start gap-3 ${borders[toast.type] || borders.info}`}
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 text-xs font-semibold leading-relaxed">{toast.message}</div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
