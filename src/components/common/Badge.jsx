import React from 'react';
import { Icon } from './Icon';

export const Badge = ({ status, score }) => {
  if (status === 'reviewed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e6f4ea] text-[#137333]">
        <Icon id="icon-check-circle" className="w-3.5 h-3.5" />
        <span>Sudah Dinilai {score !== null && score !== undefined ? `(${score})` : ''}</span>
      </span>
    );
  }

  if (status === 'submitted') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e8f0fe] text-[#1a73e8]">
        <Icon id="icon-clock" className="w-3.5 h-3.5" />
        <span>Terkumpul</span>
      </span>
    );
  }

  if (status === 'revision_needed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#fef7e0] text-[#b06000]">
        <Icon id="icon-alert-circle" className="w-3.5 h-3.5" />
        <span>Perlu Revisi</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f1f3f4] text-[#5f6368]">
      <span>Belum Selesai</span>
    </span>
  );
};
