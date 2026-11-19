import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ total, completed }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-semibold text-slate-700">Progres Pengumpulan Lembar Kerja</span>
        <span className="font-bold text-slate-900">{completed} dari {total} Tugas ({percentage}%)</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-slate-900 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
