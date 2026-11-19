import React from 'react';
import { Badge } from '../common/Badge';
import { Download, Upload, ArrowUpRight, MessageSquare, FileCheck } from 'lucide-react';
import { formatIndonesianDate } from '../../utils/dateHelpers';

export const WorksheetCard = ({ worksheet, submission, onOpenUpload }) => {
  const isSubmitted = !!submission;

  return (
    <article className="dynamic-glass-card rounded-[22px] p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <Badge status={submission?.status} score={submission?.score} />
          {worksheet.deadline && (
            <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-0.5 rounded-full">
              {worksheet.deadline}
            </span>
          )}
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug">
          {worksheet.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
          {worksheet.instructions}
        </p>

        {isSubmitted && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-900 truncate max-w-[200px] flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                {submission.original_filename}
              </span>
              <a
                href={submission.drive_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                Drive <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-500 text-[11px]">
              Dikirim pada {formatIndonesianDate(submission.submitted_at)}
            </p>

            {submission.feedback && (
              <div className="mt-2 pt-2 border-t border-emerald-200/60 text-emerald-950 flex items-start gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                <p><strong>Feedback Fasilitator:</strong> {submission.feedback}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <a
          href={worksheet.template_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-emerald-800 bg-white hover:bg-emerald-50/50 border border-slate-200 transition"
        >
          <Download className="w-3.5 h-3.5 text-slate-400" />
          <span>Unduh Template</span>
        </a>

        <button
          onClick={() => onOpenUpload(worksheet)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition shadow-sm ${
            isSubmitted
              ? 'border border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{isSubmitted ? 'Unggah Ulang' : 'Kumpulkan Tugas'}</span>
        </button>
      </div>
    </article>
  );
};
