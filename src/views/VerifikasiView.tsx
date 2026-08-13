import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, CheckCircle2, XCircle, FileText, QrCode } from 'lucide-react';
import { Student, SchoolInfo } from '../types';
import { notify } from '../services/toastService';

interface VerifikasiViewProps {
  students: Student[];
  schoolInfo: SchoolInfo;
}

export const VerifikasiView: React.FC<VerifikasiViewProps> = ({ students, schoolInfo }) => {
  const [queryInput, setQueryInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedStudent, setMatchedStudent] = useState<Student | null>(null);

  useEffect(() => {
    // Check URL parameters for sk or nisn
    const params = new URLSearchParams(window.location.search);
    const skParam = params.get('sk');
    const nisnParam = params.get('nisn');

    if (skParam) {
      setQueryInput(skParam);
      verifyQuery(skParam);
    } else if (nisnParam) {
      setQueryInput(nisnParam);
      verifyQuery(nisnParam);
    }
  }, [students]);

  const verifyQuery = (queryStr: string) => {
    const q = queryStr.trim().toLowerCase();
    if (!q) return;

    const found = students.find(
      (s) =>
        s.skNumber.toLowerCase().includes(q) ||
        s.nisn.toLowerCase() === q ||
        s.nis.toLowerCase() === q
    );

    setHasSearched(true);
    setMatchedStudent(found || null);

    if (found) {
      notify('add', 'Dokumen Terverifikasi Sah', `SKL Digital atas nama ${found.name} (NISN: ${found.nisn}) terdaftar resmi di database sekolah.`);
    } else {
      notify('delete', 'Dokumen Tidak Ditemukan', `Nomor SKL/NISN "${queryStr}" tidak cocok dengan data siswa manapun.`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyQuery(queryInput);
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8 space-y-8 font-sans">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider inline-block">
          Modul Keabsahan Dokumen
        </span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-display">
          Verifikasi Legalitas SKL Digital
        </h1>
        <p className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400">
          Masukkan Nomor Surat Keterangan Lulus (SKL) atau NISN untuk menguji keaslian dokumen.
        </p>
      </div>

      {/* Verification Search Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Masukkan No. SK (e.g. 421.3/089/SMAN1-SIP/2026/001) atau NISN..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white dark:text-slate-950 shadow-sm transition"
          >
            <ShieldCheck className="h-4 w-4" />
            Verifikasi SKL
          </button>
        </form>
      </div>

      {/* Output Result */}
      {hasSearched && (
        <div className="animate-fade-in">
          {matchedStudent ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-emerald-400 uppercase tracking-wide font-display">
                      STATUS: DOKUMEN VALID & RESMI
                    </h3>
                    <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
                      Surat Keterangan Lulus ini terdaftar di Database Resmi {schoolInfo.name}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 uppercase tracking-wider">
                  <QrCode className="h-4 w-4" /> Terverifikasi QR
                </span>
              </div>

              {/* Student Details Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-2 bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">Data Pemilik Dokumen:</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white uppercase font-display">{matchedStudent.name}</p>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">NISN: <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{matchedStudent.nisn}</span> | NIS: <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{matchedStudent.nis}</span></p>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">Kelas & Jurusan: <strong className="text-slate-900 dark:text-white font-semibold">{matchedStudent.class} ({matchedStudent.major})</strong></p>
                </div>

                <div className="space-y-2 bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">Legalitas Surat:</p>
                  <p className="font-mono text-sm font-bold text-slate-900 dark:text-white">{matchedStudent.skNumber}</p>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">Status Siswa: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase">{matchedStudent.status}</strong></p>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">Penerbit: <strong className="text-slate-900 dark:text-white font-semibold">Kepala {schoolInfo.name} ({schoolInfo.principalName})</strong></p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 rounded-2xl p-8 text-center space-y-3">
              <XCircle className="h-12 w-12 text-rose-500 mx-auto" />
              <h3 className="text-base font-bold text-rose-900 dark:text-rose-200 uppercase font-display">
                STATUS: DOKUMEN TIDAK VALID / UNREGISTERED
              </h3>
              <p className="text-xs text-rose-700 dark:text-rose-300 max-w-md mx-auto leading-relaxed">
                Nomor Surat atau identitas yang Anda masukkan tidak tercatat dalam arsip kelulusan resmi SMAN 1 Sipora. Harap mewaspadai indikasi pemalsuan SKL.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
