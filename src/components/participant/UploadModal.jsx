import React, { useState, useRef } from 'react';
import { useParticipant } from '../../context/ParticipantContext';
import { Modal } from '../common/Modal';
import { Icon } from '../common/Icon';
import { validateFile, formatBytes } from '../../utils/fileHelpers';
import { Loader2 } from 'lucide-react';

export const UploadModal = ({ isOpen, onClose, worksheet }) => {
  const { participant, submitWorksheet } = useParticipant();
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!worksheet) return null;

  const handleFileChange = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    const validation = validateFile(selectedFile, 15);
    if (!validation.isValid) {
      setError(validation.error);
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Silakan pilih berkas lembar kerja terlebih dahulu.');
      return;
    }

    setIsUploading(true);
    setError('');

    const success = await submitWorksheet(worksheet.worksheet_id, worksheet.day, file);
    setIsUploading(false);

    if (success) {
      setFile(null);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={isUploading ? null : onClose} title={`Kumpulkan ${worksheet.title}`}>
      <p className="text-sm text-[#5f6368] mb-4 font-normal">
        Unggah berkas tugas Anda. Berkas akan otomatis disimpan ke Google Drive panitia.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-[#d93025] text-xs flex items-center gap-2">
          <Icon id="icon-alert-circle" className="w-4 h-4 shrink-0 text-[#d93025]" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* Simple Clean Drag Drop Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
            dragOver
              ? 'border-[#1a73e8] bg-[#e8f0fe]/30'
              : 'border-[#dadce0] hover:border-[#80868b] bg-white'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files[0])}
            accept=".pdf,.docx,.xlsx,.pptx,.zip"
            className="glue-visually-hidden"
          />

          <div className="w-10 h-10 rounded-full bg-[#f8f9fa] text-[#1a73e8] flex items-center justify-center mx-auto mb-2">
            <Icon id="icon-upload-cloud" className="w-5 h-5 text-[#1a73e8]" />
          </div>

          <p className="font-medium text-[#202124] text-sm">
            Pilih berkas dari komputer atau tarik ke sini
          </p>
          <p className="text-xs text-[#5f6368] mt-1">
            PDF, DOCX, XLSX, PPTX, atau ZIP (Maksimal 15 MB)
          </p>
        </div>

        {file && (
          <div className="p-3.5 bg-[#f8f9fa] border border-[#dadce0] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5 truncate">
              <Icon id="icon-file" className="w-4 h-4 text-[#1a73e8] shrink-0" />
              <div className="truncate">
                <p className="text-xs font-medium text-[#202124] truncate">{file.name}</p>
                <p className="text-[11px] text-[#5f6368]">{formatBytes(file.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="text-xs text-[#d93025] hover:underline"
            >
              Hapus
            </button>
          </div>
        )}

        <div className="text-xs text-[#5f6368]">
          Pengunggah: <strong>{participant?.name}</strong> ({participant?.school})
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isUploading || !file}
            className="w-full py-2.5 px-5 rounded-full font-medium text-sm text-white bg-[#1a73e8] hover:bg-[#1557b0] transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mengunggah ke Drive...
              </>
            ) : (
              'Kirimkan Tugas'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
