import React from 'react';
import { Presentation, ArrowUpRight, UserCheck, FileText } from 'lucide-react';

const CPL_TERBARU_URL = 'https://drive.google.com/file/d/1p-JOi0030WErZewDluue7z7DuFYjukBe/view?usp=sharing';

export const MaterialCard = ({ material }) => {
  const cplUrl = material.cpl_url || (material.material_id === 'MAT-H3-01' ? CPL_TERBARU_URL : null);

  return (
    <article className="dynamic-glass-card rounded-[22px] p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3.5">
          <span className="inline-flex items-center gap-1.5 font-bold tracking-wider uppercase text-[11px] text-amber-700 bg-amber-50/90 px-3 py-1 rounded-full border border-amber-200/80 shadow-sm">
            <Presentation className="w-3.5 h-3.5 text-amber-600" />
            Slide Presentasi PPTX
          </span>
          <span className="font-medium text-slate-400">{material.file_size}</span>
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
          {material.title}
        </h3>
        
        {material.narasumber && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/60 px-2.5 py-1 rounded-lg w-fit">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Narasumber: {material.narasumber}</span>
          </div>
        )}

        <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-2 font-normal">
          {material.description}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
          Microsoft PowerPoint
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {cplUrl && (
            <a
              href={cplUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-600 hover:text-white border border-amber-200/80 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CPL Terbaru</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={material.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
          >
            <span>Buka PPT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
