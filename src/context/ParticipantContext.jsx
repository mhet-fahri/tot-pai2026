import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/appsScriptClient';
import { INITIAL_MATERIALS, INITIAL_WORKSHEETS } from '../data/mockData';
import { fileToBase64 } from '../utils/fileHelpers';

const ParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
  // 1. Identitas Peserta di LocalStorage
  const [participant, setParticipant] = useState(() => {
    try {
      const saved = localStorage.getItem('tot_participant');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeDay, setActiveDay] = useState(1);
  
  const [materials, setMaterials] = useState(() => {
    try {
      const saved = localStorage.getItem('tot_materials');
      return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
    } catch {
      return INITIAL_MATERIALS;
    }
  });

  const [worksheets, setWorksheets] = useState(() => {
    try {
      const saved = localStorage.getItem('tot_worksheets');
      return saved ? JSON.parse(saved) : INITIAL_WORKSHEETS;
    } catch {
      return INITIAL_WORKSHEETS;
    }
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('tot_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    if (participant) {
      localStorage.setItem('tot_participant', JSON.stringify(participant));
    } else {
      localStorage.removeItem('tot_participant');
    }
  }, [participant]);

  useEffect(() => {
    localStorage.setItem('tot_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('tot_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('tot_worksheets', JSON.stringify(worksheets));
  }, [worksheets]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const res = await api.getBootstrapData(participant?.email || '');
        if (res && res.data) {
          if (res.data.materials?.length) setMaterials(res.data.materials);
          if (res.data.worksheets?.length) setWorksheets(res.data.worksheets);
          if (res.data.userSubmissions?.length) {
            setSubmissions(res.data.userSubmissions);
          }
        }
      } catch (err) {
        console.error('Error bootstrapping data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [participant?.email]);

  // Action: Update Materi dari Admin (Simpan ke State Lokal & Google Sheets)
  const updateMaterial = async (materialId, updatedData, adminKey) => {
    setMaterials(prev =>
      prev.map(item =>
        item.material_id === materialId ? { ...item, ...updatedData } : item
      )
    );
    showToast('Tautan bahan tayang berhasil diperbarui!');

    if (adminKey) {
      try {
        await api.updateMaterialLink(adminKey, materialId, updatedData);
      } catch (err) {
        console.warn('Gagal sync ke Google Sheets:', err);
      }
    }
  };

  // Action: Update Lembar Kerja / Pretest dari Admin (Simpan ke State Lokal & Google Sheets)
  const updateWorksheet = async (worksheetId, updatedData, adminKey) => {
    setWorksheets(prev =>
      prev.map(item =>
        item.worksheet_id === worksheetId ? { ...item, ...updatedData } : item
      )
    );
    showToast('Tautan pretest / lembar kerja berhasil diperbarui!');

    if (adminKey) {
      try {
        await api.updateWorksheetLink(adminKey, worksheetId, updatedData);
      } catch (err) {
        console.warn('Gagal sync ke Google Sheets:', err);
      }
    }
  };

  const saveIdentity = async (identityData) => {
    const formatted = {
      ...identityData,
      registered_at: new Date().toISOString()
    };
    setParticipant(formatted);
    showToast(`Selamat datang, ${formatted.name}! Identitas berhasil disimpan.`);

    try {
      await api.registerParticipant(formatted);
    } catch (err) {
      console.warn('Gagal sync registrasi ke backend:', err);
    }
  };

  const restoreIdentity = async (email) => {
    setIsLoading(true);
    try {
      const res = await api.getBootstrapData(email);
      if (res && res.data && res.data.userSubmissions && res.data.userSubmissions.length > 0) {
        const latestSub = res.data.userSubmissions[0];
        const restoredParticipant = {
          name: latestSub.participant_name,
          email: email,
          school: latestSub.school,
          registered_at: latestSub.submitted_at
        };
        setParticipant(restoredParticipant);
        setSubmissions(res.data.userSubmissions);
        showToast(`Sesi berhasil dipulihkan untuk ${restoredParticipant.name}.`);
        return true;
      } else {
        showToast('Tidak ditemukan riwayat pelatihan untuk email tersebut.', 'error');
        return false;
      }
    } catch {
      showToast('Gagal memulihkan sesi. Periksa koneksi internet Anda.', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearIdentity = () => {
    setParticipant(null);
    setSubmissions([]);
    localStorage.removeItem('tot_participant');
    localStorage.removeItem('tot_submissions');
    showToast('Identitas telah dihapus. Silakan isi kembali identitas Anda.', 'info');
  };

  const submitWorksheet = async (worksheetId, day, file) => {
    if (!participant) {
      showToast('Silakan lengkapi identitas Anda terlebih dahulu.', 'error');
      return false;
    }

    try {
      const base64Content = await fileToBase64(file);

      const payload = {
        email: participant.email,
        name: participant.name,
        school: participant.school,
        worksheetId,
        day,
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        base64File: base64Content
      };

      const res = await api.submitWorksheet(payload);

      if (res.status === 'success') {
        const newSub = res.data;
        setSubmissions(prev => {
          const filtered = prev.filter(s => s.worksheet_id !== worksheetId);
          return [...filtered, newSub];
        });
        showToast('Lembar kerja berhasil dikumpulkan!');
        return true;
      } else {
        throw new Error(res.message || 'Gagal mengirim');
      }
    } catch (err) {
      console.error('Submission error:', err);
      showToast(err.message || 'Gagal mengunggah lembar kerja. Coba lagi.', 'error');
      return false;
    }
  };

  return (
    <ParticipantContext.Provider
      value={{
        participant,
        activeDay,
        setActiveDay,
        materials,
        worksheets,
        submissions,
        isLoading,
        toast,
        setToast,
        showToast,
        updateMaterial,
        updateWorksheet,
        saveIdentity,
        restoreIdentity,
        clearIdentity,
        submitWorksheet
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};

export const useParticipant = () => {
  const context = useContext(ParticipantContext);
  if (!context) {
    throw new Error('useParticipant must be used within a ParticipantProvider');
  }
  return context;
};
