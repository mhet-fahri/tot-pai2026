import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Presentation, FileText, Edit, ExternalLink, Link2 } from 'lucide-react';

export const ManageLinksTable = ({ materials, worksheets, onEditItem }) => {
  const [activeTab, setActiveTab] = useState('materials');

  return (
    <Card className="overflow-hidden border border-slate-200 shadow-sm">
      {/* Sub Tabs */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'materials'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Tautan Bahan Tayang (PPTX) ({materials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('worksheets')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'worksheets'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tautan Pretest & Lembar Kerja ({worksheets.length})</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Perubahan langsung aktif di dashboard peserta
        </span>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Hari / Sesi</th>
              <th className="py-3 px-4">Judul Dokumen</th>
              <th className="py-3 px-4">Tautan URL Saat Ini</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {activeTab === 'materials' ? (
              materials.map((mat) => (
                <tr key={mat.material_id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px]">
                      Hari Ke-{mat.day}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800 leading-snug">{mat.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{mat.file_type} • {mat.file_size}</div>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={mat.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline font-mono text-[11px] flex items-center gap-1 max-w-[280px] truncate"
                    >
                      <Link2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{mat.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onEditItem(mat, 'material')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Tautan</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              worksheets.map((ws) => (
                <tr key={ws.worksheet_id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-extrabold px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px]">
                      Hari Ke-{ws.day}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800 leading-snug">{ws.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{ws.deadline || 'Batas Waktu Reguler'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={ws.template_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-700 hover:underline font-mono text-[11px] flex items-center gap-1 max-w-[280px] truncate"
                    >
                      <Link2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{ws.template_url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onEditItem(ws, 'worksheet')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white transition shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Tautan</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
