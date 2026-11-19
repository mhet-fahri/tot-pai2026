import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { ExternalLink, Link2, FileText, CheckCircle2 } from 'lucide-react';

export const EditLinksModal = ({ isOpen, onClose, item, type, onSave }) => {
  if (!item) return null;

  const isMaterial = type === 'material';
  const [title, setTitle] = useState(item.title || '');
  const [url, setUrl] = useState(isMaterial ? (item.url || '') : (item.template_url || ''));
  const [deadline, setDeadline] = useState(item.deadline || '');
  const [fileSize, setFileSize] = useState(item.file_size || '10.5 MB');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMaterial) {
      onSave(item.material_id, {
        title,
        url,
        file_size: fileSize
      });
    } else {
      onSave(item.worksheet_id, {
        title,
        template_url: url,
        deadline
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isMaterial ? 'Edit Tautan Bahan Tayang (PPT)' : 'Edit Tautan Pretest / Lembar Kerja'}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Judul Sesi / Dokumen
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-emerald-500 font-medium"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>{isMaterial ? 'Tautan File PPT (Google Drive / Publik)' : 'Tautan Form Pretest / Template (Google Form / Docs)'}</span>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1 normal-case"
              >
                Uji Tautan <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </label>
          <div className="relative">
            <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              placeholder={isMaterial ? 'https://drive.google.com/file/d/.../view' : 'https://forms.gle/... atau https://docs.google.com/...'}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-emerald-500 font-mono"
              required
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {isMaterial
              ? 'Pastikan setelan Google Drive: "Siapa saja yang memiliki tautan dapat melihat (Viewer)".'
              : 'Dapat berupa link kuesioner Google Form pretest atau dokumen Google Docs/Drive.'}
          </p>
        </div>

        {!isMaterial ? (
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Batas Waktu / Jadwal Sesi (Deadline)
            </label>
            <input
              type="text"
              placeholder="Contoh: Hari Ke-1 • 17.30 WIB"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        ) : (
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Estimasi Ukuran File
            </label>
            <input
              type="text"
              placeholder="Contoh: 14.5 MB"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-medium transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </Modal>
  );
};
