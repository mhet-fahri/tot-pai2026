import React, { useState } from 'react';
import { useParticipant } from '../../context/ParticipantContext';
import { Modal } from '../common/Modal';
import { AlertCircle } from 'lucide-react';

export const RestoreModal = ({ isOpen, onClose }) => {
  const { restoreIdentity } = useParticipant();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleRestore = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan format email yang valid.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    const success = await restoreIdentity(email.trim());
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pulihkan Sesi Portofolio">
      <p className="text-sm text-[#5f6368] mb-6 font-normal">
        Masukkan email terdaftar untuk menarik kembali riwayat lembar kerja yang pernah Anda kumpulkan.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-[#d93025] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleRestore} className="space-y-5 text-sm">
        <div>
          <label className="block text-xs font-medium text-[#202124] mb-1.5">
            Alamat Email
          </label>
          <input
            type="email"
            placeholder="nama@sekolah.sch.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-sm focus:outline-none focus:border-[#1a73e8] transition"
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-5 rounded-full font-medium text-sm text-white bg-[#1a73e8] hover:bg-[#1557b0] transition shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Memuat Riwayat...' : 'Tarik Data Portofolio'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
