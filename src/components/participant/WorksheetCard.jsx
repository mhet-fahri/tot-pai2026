import React from 'react';
import { Badge } from '../common/Badge';
import { Download, Upload, ArrowUpRight, MessageSquare, FileCheck, UserCheck, Users } from 'lucide-react';
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

        {(worksheet.narasumber || worksheet.fasilitator) && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-[11px] space-y-1">
            {worksheet.narasumber && (
              <p className="text-emerald-900 font-semibold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Narasumber: {worksheet.narasumber}</span>
              </p>
            )}
            {worksheet.fasilitator && (
              <p className="text-slate-600 flex items-start gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Fasilitator: {worksheet.fasilitator}</span>
              </p>
            )}
          </div>
        )}

        <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
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
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 transition shadow-sm"
        >
          {worksheet.worksheet_id === 'LK-H1-01' ? (
            <>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mulai Pretest Online</span>
            </>
          ) : worksheet.worksheet_id === 'LK-H3-03' ? (
            <>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mulai Post Test Online</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Unduh Template LK</span>
            </>
          )}
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
