import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Star } from 'lucide-react';

export const GradeModal = ({ isOpen, onClose, submission, onSaveGrade }) => {
  const [score, setScore] = useState(submission?.score || '');
  const [feedback, setFeedback] = useState(submission?.feedback || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!submission) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSaveGrade(submission.submission_id, Number(score), feedback);
    setIsSaving(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Penilaian: ${submission.worksheet_id}`}>
      <div className="mb-4 p-3 bg-slate-50 rounded-xl text-xs space-y-1">
        <p className="font-semibold text-slate-800">{submission.participant_name}</p>
        <p className="text-slate-500">{submission.school}</p>
        <p className="text-blue-600 font-semibold">
          <a href={submission.drive_file_url} target="_blank" rel="noreferrer" className="underline">
            Lihat File Berkas ({submission.original_filename}) ↗
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Nilai Skor (0 - 100)
          </label>
          <div className="relative">
            <Star className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
            <input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Contoh: 85"
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Catatan / Evaluasi Fasilitator
          </label>
          <textarea
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tuliskan umpan balik atau saran konstruktif..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition"
          />
        </div>

        <Button
          type="submit"
          disabled={isSaving}
          variant="primary"
          className="w-full py-2.5"
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Penilaian'}
        </Button>
      </form>
    </Modal>
  );
};
