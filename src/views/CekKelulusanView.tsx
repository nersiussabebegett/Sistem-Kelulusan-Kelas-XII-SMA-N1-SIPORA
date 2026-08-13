import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Search,
  CheckCircle2,
  XCircle,
  Download,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Lock,
} from 'lucide-react';
import { Student, SchoolInfo } from '../types';
import { Captcha } from '../components/Captcha';
import { SklPrintModal } from '../components/SklPrintModal';
import { parseAnnouncementDate, formatAnnouncementDisplay } from '../utils/dateUtils';

interface CekKelulusanViewProps {
  students: Student[];
  schoolInfo: SchoolInfo;
  initialNisn?: string;
  initialDob?: string;
}

export const CekKelulusanView: React.FC<CekKelulusanViewProps> = ({
  students,
  schoolInfo,
  initialNisn = '',
  initialDob = '',
}) => {
  const [nisnInput, setNisnInput] = useState(initialNisn);
  const [dobInput, setDobInput] = useState(initialDob);
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean | null>(null);

  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<Student | null>(null);
  const [isSklModalOpen, setIsSklModalOpen] = useState(false);

  // Override mode for testing if user wants to bypass timer
  const [forceOpenAnnouncement, setForceOpenAnnouncement] = useState(false);

  useEffect(() => {
    if (initialNisn && initialDob) {
      setNisnInput(initialNisn);
      setDobInput(initialDob);
    }
  }, [initialNisn, initialDob]);

  const isAnnouncementAllowed =
    schoolInfo.isAnnouncementOpen ||
    forceOpenAnnouncement ||
    new Date().getTime() >= parseAnnouncementDate(schoolInfo.announcementTime).getTime();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      alert('Silakan isi kode CAPTCHA dengan benar terlebih dahulu.');
      return;
    }

    if (!nisnInput || !dobInput) {
      alert('Silakan lengkapi NISN dan Tanggal Lahir.');
      return;
    }

    // Find student
    const found = students.find(
      (s) => s.nisn.trim() === nisnInput.trim() && s.dob.trim() === dobInput.trim()
    );

    setHasSearched(true);
    setSearchResult(found || null);

    if (found && found.status === 'LULUS') {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#f59e0b', '#3b82f6'],
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8 space-y-8 font-sans">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-3.5 py-1 text-xs font-semibold inline-block">
          Modul Cek Kelulusan Online
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight font-display">
          Pengumuman Hasil Kelulusan Kelas XII
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
          {schoolInfo.name} • Tahun Ajaran {schoolInfo.academicYear}
        </p>
      </div>

      {/* Announcement Locked State Warning */}
      {!isAnnouncementAllowed ? (
        <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
            <Lock className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-400 font-display">
              PENGUMUMAN KELULUSAN BELUM DIBUKA
            </h3>
            <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-300 mt-1.5 max-w-lg mx-auto leading-relaxed">
              Sesuai jadwal resmi, pengumuman kelulusan akan dibuka secara serentak pada tanggal <strong className="text-slate-900 dark:text-white font-semibold">{formatAnnouncementDisplay(schoolInfo.announcementTime)}</strong>.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setForceOpenAnnouncement(true)}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              [ Mode Simulasi / Preview Pengujian ]
            </button>
          </div>
        </div>
      ) : (
        /* Form Search Section */
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  1. NISN (Nomor Induk Siswa Nasional)
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={nisnInput}
                  onChange={(e) => setNisnInput(e.target.value)}
                  placeholder="Contoh: 0061234567"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3.5 py-2.5 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/80 focus:outline-none transition-all"
                />
                <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-1 block">
                  Periksa NISN pada kartu siswa atau rapor
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  2. Tanggal Lahir Siswa
                </label>
                <input
                  type="date"
                  required
                  value={dobInput}
                  onChange={(e) => setDobInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/80 focus:outline-none transition-all"
                />
                <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-1 block">
                  Format tanggal lahir sesuai data dapodik
                </span>
              </div>
            </div>

            {/* Captcha Block */}
            <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/60">
              <Captcha onVerify={setIsCaptchaValid} isValid={isCaptchaValid} />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-6 py-3.5 text-xs font-semibold shadow-sm shadow-emerald-500/20 transition-all active:scale-98"
            >
              <Search className="h-4 w-4" />
              Tampilkan Hasil Kelulusan Saya
            </button>
          </form>
        </div>
      )}

      {/* SEARCH RESULTS OUTPUT SECTION */}
      {hasSearched && (
        <div className="animate-fade-in space-y-6">
          {!searchResult ? (
            /* DATA NOT FOUND RESULT */
            <div className="bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/60 rounded-2xl p-6 sm:p-8 text-center space-y-3">
              <XCircle className="h-10 w-10 text-rose-500 mx-auto" />
              <h3 className="text-base font-bold text-rose-900 dark:text-rose-300">
                DATA SISWA TIDAK DITEMUKAN
              </h3>
              <p className="text-xs text-rose-700 dark:text-rose-300 max-w-md mx-auto leading-relaxed">
                Kombinasi NISN (<strong>{nisnInput}</strong>) dan Tanggal Lahir (<strong>{dobInput}</strong>) tidak ditemukan. Pastikan entri data sudah benar atau hubungi panitia kelulusan sekolah.
              </p>
            </div>
          ) : searchResult.status === 'LULUS' ? (
            /* PASSED RESULT BADGE */
            <div className="bg-slate-900 dark:bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-white shadow-md text-center space-y-6 relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-400 px-3.5 py-1 text-xs font-semibold border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>SURAT KETERANGAN LULUS DITERBITKAN</span>
              </div>

              <div className="space-y-1.5">
                <h2 className="text-3xl sm:text-4xl font-bold text-emerald-400 tracking-tight font-display">
                  SELAMAT, ANDA DINYATAKAN LULUS!
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-300">
                  {schoolInfo.name} • Tahun Ajaran {schoolInfo.academicYear}
                </p>
              </div>

              {/* Student Summary Card */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 text-left max-w-lg mx-auto text-xs space-y-2 text-slate-200">
                <div className="flex justify-between border-b border-slate-700/60 pb-2">
                  <span className="text-slate-400 font-medium">Nama Siswa:</span>
                  <span className="font-semibold text-white">{searchResult.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/60 pb-2">
                  <span className="text-slate-400 font-medium">NISN / NIS:</span>
                  <span className="font-mono font-semibold text-emerald-400">{searchResult.nisn} / {searchResult.nis}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/60 pb-2">
                  <span className="text-slate-400 font-medium">Kelas / Jurusan:</span>
                  <span className="font-semibold text-white">{searchResult.class} ({searchResult.major})</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/60 pb-2">
                  <span className="text-slate-400 font-medium">Nomor SK Kelulusan:</span>
                  <span className="font-mono font-semibold text-slate-300">{searchResult.skNumber}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400 font-medium">Rata-Rata Nilai Ujian:</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{searchResult.averageScore.toFixed(1)}</span>
                </div>
              </div>

              {/* Actions for SKL PDF */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <button
                  onClick={() => setIsSklModalOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-xs font-semibold transition-all shadow-sm shadow-emerald-500/20"
                >
                  <Download className="h-4 w-4" />
                  Cetak & Unduh SKL (PDF)
                </button>
              </div>
            </div>
          ) : (
            /* NOT PASSED RESULT BADGE */
            <div className="bg-slate-900 border border-rose-800/60 rounded-2xl p-6 sm:p-8 text-white shadow-md text-center space-y-5">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-bold text-rose-400 font-display">
                  MOHON MAAF, ANDA BELUM LULUS
                </h2>
                <p className="text-xs font-normal text-slate-300 max-w-md mx-auto leading-relaxed">
                  {searchResult.notes ||
                    'Syarat kriteria ketuntasan minimal dan kehadiran belum terpenuhi.'}
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 text-xs text-slate-300 max-w-md mx-auto space-y-1.5 text-left">
                <p className="font-semibold text-rose-400">Konsultasi Sekolah:</p>
                <p className="font-normal leading-relaxed text-slate-300">
                  Silakan mendampingi orang tua/wali siswa untuk berkonsultasi dengan Tim Bimbingan Konseling (BK) SMAN 1 Sipora pada jam kerja.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SKL Modal */}
      {searchResult && (
        <SklPrintModal
          student={searchResult}
          schoolInfo={schoolInfo}
          isOpen={isSklModalOpen}
          onClose={() => setIsSklModalOpen(false)}
        />
      )}
    </div>
  );
};
