import React, { useState } from 'react';
import { useParticipant } from '../context/ParticipantContext';
import { Navbar } from '../components/common/Navbar';
import { Toast } from '../components/common/Toast';
import { DayTabs } from '../components/participant/DayTabs';
import { AgendaTimeline } from '../components/participant/AgendaTimeline';
import { MaterialCard } from '../components/participant/MaterialCard';
import { WorksheetCard } from '../components/participant/WorksheetCard';
import { IdentityModal } from '../components/participant/IdentityModal';
import { RestoreModal } from '../components/participant/RestoreModal';
import { UploadModal } from '../components/participant/UploadModal';
import { GreenAbstractBackground } from '../components/common/GreenAbstractBackground';
import { SCHEDULE_DAYS } from '../data/mockData';
import { ArrowRight, BookOpen, FileCheck2, Sparkles } from 'lucide-react';

export const ParticipantDashboard = () => {
  const {
    participant,
    activeDay,
    setActiveDay,
    materials,
    worksheets,
    submissions,
    toast,
    setToast
  } = useParticipant();

  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(!participant);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedWorksheet, setSelectedWorksheet] = useState(null);

  const currentDayConfig = SCHEDULE_DAYS.find(d => d.id === activeDay) || SCHEDULE_DAYS[0];
  const currentMaterials = materials.filter(m => m.day === activeDay);
  const currentWorksheets = worksheets.filter(w => w.day === activeDay);

  const totalWorksheets = worksheets.length;
  const completedCount = submissions.length;

  return (
    <div className="green-abstract-canvas min-h-screen flex flex-col font-sans relative selection:bg-emerald-100 selection:text-emerald-900">
      {/* Background Gambar Abstrak Bergerak Penuh (Hijau & Putih) */}
      <GreenAbstractBackground />

      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Navbar */}
      <Navbar
        onOpenIdentityModal={() => setIsIdentityModalOpen(true)}
        onOpenRestoreModal={() => setIsRestoreModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 relative z-10">
        
        {/* HEADER HERO DENGAN IDENTITAS RESMI */}
        <section className="dynamic-glass-card rounded-[26px] p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-900 leading-[1.25]">
                <span className="block text-slate-900">
                  Pelatihan Guru PAI
                </span>
                <span className="block text-emerald-800 text-2xl sm:text-3xl lg:text-[32px] font-semibold mt-1">
                  Penguatan Kompetensi & Transformasi Pedagogi Digital
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                Platform terpadu pembelajaran mendalam: slide materi esensial, pedagogi inovatif berbasis STREAM dan AI, penyusunan instrumen evaluasi kurikulum, hingga pelaksanaan microteaching serta sertifikasi BNSP.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                {participant ? (
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-200/80 text-slate-800 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                    <span><strong>{participant.name}</strong> • {participant.school}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsIdentityModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 transition hover:shadow-lg"
                  >
                    <span>Mulai Akses Pelatihan</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                )}

                <div className="text-xs text-slate-600 font-semibold px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200 shadow-sm">
                  Portofolio Terkumpul: <strong className="text-emerald-700">{completedCount} dari {totalWorksheets} LK</strong>
                </div>
              </div>
            </div>

            {/* Logo Penyelenggara Resmi di Sisi Kanan Hero */}
            <div className="hidden lg:flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-emerald-100 shadow-sm min-w-[240px] text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <img
                  src="/assets/kemenag.png"
                  alt="Kementerian Agama Republik Indonesia"
                  className="h-14 w-auto object-contain drop-shadow-sm"
                />
                <div className="h-10 w-px bg-slate-200" />
                <img
                  src="/assets/uin.png"
                  alt="UIN Syarif Hidayatullah Jakarta"
                  className="h-14 w-auto object-contain drop-shadow-sm"
                />
              </div>
              <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                Penyelenggara
              </p>
              <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                Direktorat PAI Kementerian Agama RI <br />
                Fakultas Ilmu Tarbiyah dan Keguruan <br />
                UIN Syarif Hidayatullah Jakarta
              </p>
            </div>
          </div>
        </section>

        {/* TATA LETAK UTAMA: DUA KOLOM
            KIRI (WIDGET SIDEBAR): Pilihan Hari Vertikal & Widget Rundown Jam Sesi
            KANAN (MAIN CONTENT): Bahan Tayang (PPTX) & Lembar Kerja (Worksheet) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: SIDEBAR WIDGET (HARI VERTIKAL + RUNDOWN JADWAL) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* 1. Navigasi Hari Vertikal */}
            <DayTabs activeDay={activeDay} onSelectDay={setActiveDay} />

            {/* 2. Widget Rundown Jadwal Jam per Jam */}
            <AgendaTimeline
              agenda={currentDayConfig.agenda}
              dayTitle={currentDayConfig.title}
            />
          </aside>

          {/* SISI KANAN: KONTEN BAHAN TAYANG & LEMBAR KERJA */}
          <section className="lg:col-span-8 space-y-8">
            
            {/* Header Informasi Hari Aktif */}
            <div className="dynamic-glass-card rounded-[22px] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                  {currentDayConfig.title} • {currentDayConfig.date}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  {currentDayConfig.theme}
                </h2>
              </div>
              <div className="text-xs text-slate-500 font-medium px-3 py-1.5 rounded-full bg-emerald-50/70 border border-emerald-200/50 self-start sm:self-center">
                {currentMaterials.length} Bahan Tayang • {currentWorksheets.length} LK
              </div>
            </div>

            {/* Bagian: Bahan Tayang Pelatihan (Presentasi PPTX) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Bahan Tayang & Slide Presentasi — {currentDayConfig.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Slide PPTX materi narasumber resmi Pelatihan Guru PAI
                  </p>
                </div>
              </div>

              {currentMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {currentMaterials.map((mat) => (
                    <MaterialCard key={mat.material_id} material={mat} />
                  ))}
                </div>
              ) : (
                <div className="dynamic-glass-card rounded-[20px] p-8 text-center text-xs text-slate-500">
                  Belum ada bahan tayang presentasi yang disematkan untuk sesi {currentDayConfig.title}.
                </div>
              )}
            </div>

            {/* Bagian: Lembar Kerja (Worksheet) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-3">
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Lembar Kerja (Worksheet) — {currentDayConfig.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Unduh template dan kumpulkan portofolio tugas Anda
                  </p>
                </div>
              </div>

              {currentWorksheets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {currentWorksheets.map((ws) => {
                    const submission = submissions.find(s => s.worksheet_id === ws.worksheet_id);
                    return (
                      <WorksheetCard
                        key={ws.worksheet_id}
                        worksheet={ws}
                        submission={submission}
                        onOpenUpload={(item) => {
                          if (!participant) {
                            setIsIdentityModalOpen(true);
                          } else {
                            setSelectedWorksheet(item);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="dynamic-glass-card rounded-[20px] p-8 text-center text-xs text-slate-500">
                  Tidak ada lembar kerja tertulis yang wajib diunggah pada sesi {currentDayConfig.title}.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer Resmi */}
      <footer className="border-t border-slate-200/80 bg-white/85 backdrop-blur-md mt-20 py-8 text-xs text-slate-600 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
              <img src="/assets/kemenag.png" alt="Kementerian Agama Republik Indonesia" className="h-7 w-auto" />
              <img src="/assets/uin.png" alt="UIN Syarif Hidayatullah Jakarta" className="h-7 w-auto" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">
                Pelatihan Guru PAI
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Direktorat PAI Kementerian Agama Republik Indonesia - Fakultas Ilmu Tarbiyah dan Keguruan UIN Syarif Hidayatullah Jakarta.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right shrink-0">
            © 2026 Pelatihan Guru PAI • Hak Cipta Dilindungi
          </div>
        </div>
      </footer>

      {/* Modals */}
      <IdentityModal
        isOpen={isIdentityModalOpen}
        onClose={() => setIsIdentityModalOpen(false)}
      />

      <RestoreModal
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
      />

      <UploadModal
        isOpen={!!selectedWorksheet}
        worksheet={selectedWorksheet}
        onClose={() => setSelectedWorksheet(null)}
      />
    </div>
  );
};
