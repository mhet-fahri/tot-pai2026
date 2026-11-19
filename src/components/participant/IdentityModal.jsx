import React, { useState } from 'react';
import { useParticipant } from '../../context/ParticipantContext';
import { Modal } from '../common/Modal';
import { AlertCircle } from 'lucide-react';

export const IdentityModal = ({ isOpen, onClose }) => {
  const { participant, saveIdentity } = useParticipant();
  const [formData, setFormData] = useState({
    name: participant?.name || '',
    email: participant?.email || '',
    school: participant?.school || ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.school.trim()) {
      setError('Harap lengkapi semua kolom.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Alamat email tidak valid.');
      return;
    }

    saveIdentity(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={participant ? onClose : null} title="Identitas Peserta">
      <p className="text-sm text-[#5f6368] mb-6 font-normal">
        Masukkan identitas Anda untuk menandai lembar kerja dan portofolio pelatihan.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-[#d93025] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-sm">
        <div>
          <label className="block text-xs font-medium text-[#202124] mb-1.5">
            Nama Lengkap & Gelar
          </label>
          <input
            type="text"
            placeholder="Dra. Siti Aminah, M.Pd."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-sm focus:outline-none focus:border-[#1a73e8] transition"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#202124] mb-1.5">
            Alamat Email
          </label>
          <input
            type="email"
            placeholder="nama@sekolah.sch.id"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-sm focus:outline-none focus:border-[#1a73e8] transition"
            required
          />
          <p className="text-[11px] text-[#5f6368] mt-1">Digunakan untuk sinkronisasi jika berganti perangkat.</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#202124] mb-1.5">
            Asal Sekolah / Lembaga
          </label>
          <input
            type="text"
            placeholder="SMA Negeri 1 Bandung"
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-[#dadce0] rounded-xl text-sm focus:outline-none focus:border-[#1a73e8] transition"
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 px-5 rounded-full font-medium text-sm text-white bg-[#1a73e8] hover:bg-[#1557b0] transition shadow-sm"
          >
            {participant ? 'Perbarui Data' : 'Lanjutkan ke Dashboard'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
