import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatIndonesianDate } from '../../utils/dateHelpers';
import { ExternalLink, Edit3, Search, Download } from 'lucide-react';

export const SubmissionTable = ({ submissions, onSelectGrade }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState('ALL');

  const filtered = submissions.filter(sub => {
    const matchSearch =
      sub.participant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.worksheet_id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDay = filterDay === 'ALL' || String(sub.day) === filterDay;
    return matchSearch && matchDay;
  });

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ['ID Submission', 'Nama Peserta', 'Email', 'Sekolah', 'Hari', 'ID Lembar Kerja', 'URL File', 'Waktu Kumpul', 'Nilai', 'Feedback'];
    const rows = filtered.map(s => [
      `"${s.submission_id}"`,
      `"${s.participant_name}"`,
      `"${s.participant_email}"`,
      `"${s.school}"`,
      s.day,
      `"${s.worksheet_id}"`,
      `"${s.drive_file_url}"`,
      `"${s.submitted_at}"`,
      s.score ?? '',
      `"${(s.feedback || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_tugas_tot_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden">
      {/* Search and Action Bar */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari nama, sekolah, atau LK..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
            />
          </div>

          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">Semua Hari</option>
            <option value="1">Hari 1</option>
            <option value="2">Hari 2</option>
            <option value="3">Hari 3</option>
          </select>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Download}
          onClick={exportCSV}
          className="w-full sm:w-auto"
        >
          Ekspor CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Peserta & Sekolah</th>
              <th className="py-3 px-4">Lembar Kerja</th>
              <th className="py-3 px-4">Waktu Pengumpulan</th>
              <th className="py-3 px-4">Status & Nilai</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-400 font-medium">
                  Belum ada data pengumpulan yang cocok.
                </td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr key={sub.submission_id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{sub.participant_name}</div>
                    <div className="text-[11px] text-slate-400">{sub.school} • {sub.participant_email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-700">{sub.worksheet_id}</span>
                    <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                      Hari {sub.day}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {formatIndonesianDate(sub.submitted_at)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge status={sub.status} score={sub.score} />
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <a
                      href={sub.drive_file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Drive
                    </a>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Edit3}
                      onClick={() => onSelectGrade(sub)}
                      className="py-1 px-2.5 text-[11px]"
                    >
                      Nilai
                    </Button>
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
