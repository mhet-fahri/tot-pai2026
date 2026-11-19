import React, { useState } from 'react';
import { useParticipant } from '../../context/ParticipantContext';
import { Icon } from './Icon';
import { Link } from 'react-router-dom';

export const Navbar = ({ onOpenIdentityModal, onOpenRestoreModal }) => {
  const { participant, clearIdentity } = useParticipant();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-emerald-100/80 shadow-[0_2px_12px_rgba(5,150,105,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-2.5 flex items-center justify-between">
        {/* Brand: Logo Kemenag & UIN + Judul Resmi */}
        <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
          <div className="flex items-center gap-2 bg-white/95 p-1.5 rounded-xl border border-emerald-100 shadow-sm">
            <img
              src="/assets/kemenag.png"
              alt="Logo Kementerian Agama RI"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="h-6 w-px bg-slate-200" />
            <img
              src="/assets/uin.png"
              alt="Logo UIN Syarif Hidayatullah Jakarta"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors leading-none">
              Pelatihan Guru PAI
            </h1>
            <p className="text-[11px] text-slate-500 font-normal mt-0.5 hidden sm:block">
              Direktorat PAI Kemenag RI & FITK UIN Syarif Hidayatullah Jakarta
            </p>
          </div>
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center gap-3">
          {participant ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 bg-white transition text-sm shadow-sm"
                aria-expanded={showDropdown}
                aria-haspopup="true"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold uppercase" aria-hidden="true">
                  {participant.name.charAt(0)}
                </div>
                <span className="font-semibold text-slate-800 text-xs max-w-[130px] truncate hidden sm:inline">
                  {participant.name}
                </span>
                <Icon id="icon-chevron-down" className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Peserta */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 text-xs">
                  <div className="p-3 border-b border-slate-100">
                    <p className="font-bold text-slate-900 truncate">{participant.name}</p>
                    <p className="text-slate-500 truncate mt-0.5">{participant.email}</p>
                    <p className="text-emerald-700 font-semibold truncate mt-0.5">{participant.school}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onOpenIdentityModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-emerald-50 flex items-center gap-2 transition"
                    >
                      <Icon id="icon-user" className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ubah Identitas</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        clearIdentity();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition font-medium"
                    >
                      <Icon id="icon-logout" className="w-3.5 h-3.5 text-rose-500" />
                      <span>Keluar / Ganti Akun</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenRestoreModal}
                className="text-xs font-semibold text-slate-600 hover:text-emerald-700 px-3 py-2 rounded-full hover:bg-emerald-50/50 border border-slate-200 transition"
              >
                Pulihkan Sesi
              </button>
              <button
                onClick={onOpenIdentityModal}
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full transition shadow-sm"
              >
                Mulai
              </button>
            </div>
          )}

          <Link
            to="/admin"
            title="Panel Fasilitator"
            className="p-2 rounded-full text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
          >
            <Icon id="icon-shield" className="w-4 h-4" />
            <span className="glue-visually-hidden">Masuk ke Panel Fasilitator</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
