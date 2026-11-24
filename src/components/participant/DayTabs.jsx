import React from 'react';
import { motion } from 'framer-motion';
import { SCHEDULE_DAYS } from '../../data/mockData';
import { Calendar, ChevronRight } from 'lucide-react';

export const DayTabs = ({ activeDay, onSelectDay }) => {
  return (
    <div className="dynamic-glass-card rounded-[22px] p-4 space-y-2">
      <div className="px-2 py-1 flex items-center justify-between border-b border-slate-100/80 pb-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          Agenda Pelatihan
        </span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
          ToT PAI
        </span>
      </div>

      <div className="space-y-1.5 pt-1">
        {SCHEDULE_DAYS.map((day) => {
          const isActive = activeDay === day.id;
          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className={`relative w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                isActive
                  ? 'text-emerald-950 font-bold'
                  : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/50 font-medium'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeVerticalDayPill"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-100/90 to-teal-50/80 border border-emerald-300/80 rounded-xl shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex-1 pr-2">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {day.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {day.date}
                  </span>
                </div>
                <h4 className="text-xs font-medium text-slate-800 line-clamp-1 mt-1 leading-snug">
                  {day.theme}
                </h4>
              </div>

              <ChevronRight className={`w-4 h-4 transition-transform relative z-10 shrink-0 ${
                isActive ? 'text-emerald-700 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
