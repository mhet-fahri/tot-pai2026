import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Shield, Key, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminAuthGate = () => {
  const { authenticate, isLoading, error } = useAdmin();
  const [keyInput, setKeyInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    authenticate(keyInput.trim());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border border-slate-200">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Dashboard Peserta
        </Link>

        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4 shadow-sm">
          <Shield className="w-6 h-6 text-emerald-400" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-1">
          Panel Fasilitator
        </h2>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Masukkan kunci rahasia (Secret Key) fasilitator untuk mengakses rekap evaluasi dan penilaian tugas peserta.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Secret Key Fasilitator
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                placeholder="Masukkan secret key..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Kunci default demo: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">tot-admin-2026</code>
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="w-full py-2.5"
          >
            {isLoading ? 'Memverifikasi...' : 'Buka Panel Evaluasi'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
