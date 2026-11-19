import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useParticipant } from '../context/ParticipantContext';
import { AdminAuthGate } from '../components/admin/AdminAuthGate';
import { SubmissionTable } from '../components/admin/SubmissionTable';
import { GradeModal } from '../components/admin/GradeModal';
import { ManageLinksTable } from '../components/admin/ManageLinksTable';
import { EditLinksModal } from '../components/admin/EditLinksModal';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { Shield, Users, FileCheck, Award, RefreshCw, LogOut, ArrowLeft, Link2, FileSpreadsheet } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export const AdminDashboard = () => {
  const {
    adminKey,
    isAuthenticated,
    authenticate,
    logout,
    allSubmissions,
    isLoading,
    refreshSubmissions,
    updateGrade
  } = useAdmin();

  const {
    materials,
    worksheets,
    updateMaterial,
    updateWorksheet,
    toast,
    setToast
  } = useParticipant();

  const [searchParams] = useSearchParams();
  const [activeView, setActiveView] = useState('submissions');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState('material');

  useEffect(() => {
    const keyFromUrl = searchParams.get('key');
    if (keyFromUrl && !isAuthenticated) {
      authenticate(keyFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams, isAuthenticated, authenticate]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshSubmissions();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <AdminAuthGate />;
  }

  const totalSubmissions = allSubmissions.length;
  const uniqueParticipants = new Set(allSubmissions.map(s => s.participant_email)).size;
  const reviewedCount = allSubmissions.filter(s => s.status === 'reviewed').length;

  const handleSaveLink = (id, data) => {
    if (editingType === 'material') {
      updateMaterial(id, data, adminKey);
    } else {
      updateWorksheet(id, data, adminKey);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header Admin */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition"
              title="Ke Dashboard Peserta"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-sm leading-none">
                  Panel Fasilitator & Evaluasi
                </h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pelatihan Guru PAI • Kemenag RI & FITK UIN Jakarta
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={refreshSubmissions}
              disabled={isLoading}
            >
              Segarkan
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={LogOut}
              onClick={logout}
            >
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* KPI Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5 flex items-center gap-4 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Peserta Terdaftar</p>
              <p className="text-2xl font-bold text-slate-900">{uniqueParticipants} Guru</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tugas Masuk</p>
              <p className="text-2xl font-bold text-slate-900">{totalSubmissions} Berkas</p>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sudah Dinilai</p>
              <p className="text-2xl font-bold text-slate-900">{reviewedCount} / {totalSubmissions}</p>
            </div>
          </Card>
        </div>

        {/* Tab Navigasi Panel: [Tabel Submission Tugas] vs [Kelola Tautan Materi & Pretest] */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveView('submissions')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'submissions'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Rekap Pengumpulan Tugas Peserta</span>
          </button>

          <button
            onClick={() => setActiveView('links')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'links'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            <Link2 className="w-4 h-4 text-emerald-600" />
            <span>Kelola Tautan Materi (PPT) & Pretest</span>
          </button>
        </div>

        {/* Kondisional View */}
        {activeView === 'submissions' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Rekap Pengumpulan Lembar Kerja Peserta
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Pembaruan Realtime
              </span>
            </div>

            <SubmissionTable
              submissions={allSubmissions}
              onSelectGrade={(item) => setSelectedSubmission(item)}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Pengaturan Tautan Bahan Tayang & Lembar Kerja
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Klik tombol <strong>"Edit Tautan"</strong> pada sesi yang Anda kehendaki untuk mengubah tautan Google Drive PPT atau Google Form Pretest.
                </p>
              </div>
            </div>

            <ManageLinksTable
              materials={materials}
              worksheets={worksheets}
              onEditItem={(item, type) => {
                setEditingItem(item);
                setEditingType(type);
              }}
            />
          </div>
        )}
      </main>

      {/* Modal Penilaian Skor & Feedback */}
      <GradeModal
        isOpen={!!selectedSubmission}
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        onSaveGrade={updateGrade}
      />

      {/* Modal Edit Link Materi / Pretest */}
      <EditLinksModal
        isOpen={!!editingItem}
        item={editingItem}
        type={editingType}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveLink}
      />
    </div>
  );
};
