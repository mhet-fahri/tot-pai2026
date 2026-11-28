import React from 'react';
import { Clock, UserCheck, Users, School } from 'lucide-react';

export const AgendaTimeline = ({ agenda, dayTitle, worksheets = [] }) => {
  if (!agenda || agenda.length === 0) return null;

  return (
    <div className="dynamic-glass-card rounded-[22px] p-4 sm:p-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100/90 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Rundown — {dayTitle}
            </h3>
            <p className="text-[11px] text-slate-500">
              Jadwal sesi waktu WIB
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-emerald-200/60 max-h-[560px] overflow-y-auto pr-1">
        {agenda.map((item, index) => {
          const isBreak = item.type === 'break';
          const isTest = item.type === 'test';
          const isPractice = item.type === 'practice';

          let dotBg = 'bg-emerald-600 ring-emerald-100';
          let borderAccent = 'border-l-2 border-emerald-500';

          if (isBreak) {
            dotBg = 'bg-slate-400 ring-slate-100';
            borderAccent = 'border-l-2 border-slate-300';
          } else if (isTest) {
            dotBg = 'bg-amber-500 ring-amber-100';
            borderAccent = 'border-l-2 border-amber-400';
          } else if (isPractice) {
            dotBg = 'bg-teal-600 ring-teal-100';
            borderAccent = 'border-l-2 border-teal-500';
          }

          return (
            <div key={index} className="relative flex items-start gap-3 pl-7 group">
              <div
                className={`absolute left-1.5 top-2 w-2.5 h-2.5 rounded-full ${dotBg} ring-4 transition-transform group-hover:scale-125`}
              />

              <div className={`flex-1 p-2.5 rounded-xl bg-white/70 hover:bg-white border border-slate-100 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${borderAccent}`}>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[11px] text-emerald-700 font-mono">
                      {item.time}
                    </span>
                    {item.jp && (
                      <span className="text-[10px] font-semibold text-slate-400">
                        ({item.jp} JP)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {item.materialId === 'MAT-H3-01' && (
                      <a
                        href="https://drive.google.com/file/d/1p-JOi0030WErZewDluue7z7DuFYjukBe/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-0.5 shadow-sm"
                      >
                        CPL Terbaru ↗
                      </a>
                    )}
                    {item.worksheetId && (() => {
                      const linkedWs = worksheets.find(w => w.worksheet_id === item.worksheetId);
                      if (item.worksheetId === 'LK-H1-01') {
                        return (
                          <a
                            href={linkedWs?.template_url || 'https://exampro-7xj.pages.dev/'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500 hover:bg-amber-600 text-white transition flex items-center gap-0.5 shadow-sm"
                          >
                            Buka Pretest ↗
                          </a>
                        );
                      }
                      if (item.worksheetId === 'LK-H3-03') {
                        return (
                          <a
                            href={linkedWs?.template_url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500 hover:bg-amber-600 text-white transition flex items-center gap-0.5 shadow-sm"
                          >
                            Buka Post Test ↗
                          </a>
                        );
                      }
                      return (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                          Tugas LK
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <h4 className={`text-xs ${isBreak ? 'font-normal text-slate-500 italic' : 'font-semibold text-slate-800'} leading-snug`}>
                  {item.title}
                </h4>

                {/* Info Narasumber & Fasilitator */}
                {item.narasumber && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[11px] space-y-0.5">
                    <p className="text-emerald-900 font-medium flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span><strong>Narsum:</strong> {item.narasumber}</span>
                    </p>
                    {item.fasilitator && item.fasilitator.length > 0 && (
                      <p className="text-slate-500 flex items-start gap-1">
                        <Users className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                        <span><strong>Fasilitator:</strong> {item.fasilitator.join(', ')}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Khusus Microteaching Tim Penguji */}
                {item.timPenguji && (
                  <div className="mt-2 pt-1.5 border-t border-slate-100 text-[10.5px] space-y-1 text-slate-600">
                    <p className="font-semibold text-teal-800 flex items-center gap-1">
                      <School className="w-3 h-3 text-teal-600" />
                      Tim Penguji & Asesor Microteaching:
                    </p>
                    <div className="pl-3 space-y-0.5 text-[10px]">
                      <p><strong>Kelas 1:</strong> {item.timPenguji.kelas1.join(', ')}</p>
                      <p><strong>Kelas 2:</strong> {item.timPenguji.kelas2.join(', ')}</p>
                      <p className="text-slate-400 italic">Didampingi tim fasilitator ToT PAI</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
