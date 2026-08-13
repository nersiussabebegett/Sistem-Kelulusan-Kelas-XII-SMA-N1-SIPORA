import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Clock, Building2, CheckCircle2, Upload, User, Image, Sparkles, Award } from 'lucide-react';
import { SchoolInfo } from '../../types';
import { formatToDatetimeLocal, formatAnnouncementDisplay } from '../../utils/dateUtils';
import { MentawaiLogo } from '../../components/MentawaiLogo';
import { TutWuriLogo } from '../../components/TutWuriLogo';

interface SettingsViewProps {
  schoolInfo: SchoolInfo;
  onSaveSchoolInfo: (info: SchoolInfo) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  schoolInfo,
  onSaveSchoolInfo,
  onResetData,
}) => {
  const [formData, setFormData] = useState<SchoolInfo>({ ...schoolInfo });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('Ukuran file foto maksimal 3MB!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          principalPhotoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSchoolInfo(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl font-sans text-slate-800 dark:text-slate-100">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Pengaturan Sistem & Identitas Sekolah
          </h2>
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
            Kelola data profil {formData.name}, format nomor SK, dan status pengumuman kelulusan.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span>Pengaturan sistem dan profil sekolah berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Toggle Announcement Status */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wide font-display text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Status Pengumuman Kelulusan Online
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Akses Pengumuman Publik
              </label>
              <select
                value={formData.isAnnouncementOpen ? 'open' : 'closed'}
                onChange={(e) =>
                  setFormData({ ...formData, isAnnouncementOpen: e.target.value === 'open' })
                }
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              >
                <option value="open">DIBUKA (Siswa dapat langsung cek hasil)</option>
                <option value="closed">DITUTUP / TERKUNCI (Menunggu hitung mundur)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Jadwal Rilis Otomatis (Tanggal & Jam)</span>
              </label>
              <input
                type="datetime-local"
                value={formatToDatetimeLocal(formData.announcementTime)}
                onChange={(e) =>
                  setFormData({ ...formData, announcementTime: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              />
              <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span>Tampilan Publik: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{formatAnnouncementDisplay(formData.announcementTime)}</strong></span>
                <span className="font-mono text-slate-400 text-[10px]">ISO: {formData.announcementTime}</span>
              </p>
            </div>
          </div>
        </div>

        {/* School Profile Info */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wide font-display text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Data Identitas & Kepala Sekolah
          </h3>

          {/* Section Logo Kop Surat SKL Siswa */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/60 pb-2">
              <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Logo Resmi Kop Surat Dokumen SKL Siswa
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                Kop Surat Resmi SKL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tut Wuri Handayani (Logo Kiri) */}
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-16 h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-1">
                  {formData.logoUrl && (formData.logoUrl.startsWith('data:image') || formData.logoUrl.startsWith('http')) ? (
                    <img src={formData.logoUrl} alt="Logo Kiri Custom" className="w-full h-full object-contain" />
                  ) : (
                    <TutWuriLogo className="w-14 h-14" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Logo Kiri SKL</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {formData.logoUrl ? 'Logo Kustom Aktif' : 'Official Tut Wuri Handayani (Default)'}
                  </p>
                  <label className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 cursor-pointer hover:underline">
                    <Upload className="w-3 h-3" /> Ganti Logo Kiri
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, logoUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {formData.logoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, logoUrl: '' })}
                      className="ml-3 text-[10px] font-semibold text-rose-500 hover:underline"
                    >
                      Reset Default
                    </button>
                  )}
                </div>
              </div>

              {/* Mentawai Logo (Logo Kanan) */}
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-16 h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-1">
                  <MentawaiLogo className="w-12 h-14" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Logo Kanan SKL</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Lambang Kab. Kepulauan Mentawai (Resmi)
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    ✓ Terverifikasi Vektor Presisi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Foto Kepala Sekolah */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/60 pb-2">
              <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Foto Profil Kepala Sekolah
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                Tampil di Beranda & SKL
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Image Preview */}
              <div className="relative group flex-shrink-0">
                <div className="w-28 h-36 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-sm">
                  {formData.principalPhotoUrl ? (
                    <img
                      src={formData.principalPhotoUrl}
                      alt="Foto Kepala Sekolah"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                      <User className="w-8 h-8 mb-1 text-emerald-600" />
                      <span className="text-[10px] font-medium">Belum ada foto</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload & Input URL Controls */}
              <div className="space-y-3 flex-1 w-full">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Unggah Foto Baru (HP / Laptop)
                  </label>
                  <label className="flex items-center justify-center gap-2 cursor-pointer w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold text-xs rounded-xl shadow-sm transition">
                    <Upload className="h-4 w-4" />
                    Pilih File Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-normal">
                    Format: JPG, PNG, WEBP. Maksimal 3MB.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Atau Masukkan URL Foto
                  </label>
                  <input
                    type="url"
                    value={formData.principalPhotoUrl}
                    onChange={(e) => setFormData({ ...formData, principalPhotoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section Foto Gedung / Apel Sekolah */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/60 pb-2">
              <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Image className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Foto Gedung & Kegiatan Sekolah
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                Tampil di Menu Profil Sekolah
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Image Preview */}
              <div className="relative group flex-shrink-0">
                <div className="w-36 h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-sm">
                  <img
                    src={formData.schoolPhotoUrl || "/sma-sipora.svg"}
                    alt="Foto Gedung SMA"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Upload & Input URL Controls */}
              <div className="space-y-3 flex-1 w-full">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Unggah Foto Kegiatan / Gedung Sekolah
                  </label>
                  <label className="flex items-center justify-center gap-2 cursor-pointer w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold text-xs rounded-xl shadow-sm transition">
                    <Upload className="h-4 w-4" />
                    Pilih Foto Sekolah
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, schoolPhotoUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Atau Masukkan URL Foto Sekolah
                  </label>
                  <input
                    type="text"
                    value={formData.schoolPhotoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, schoolPhotoUrl: e.target.value })}
                    placeholder="/sma-sipora.svg atau https://..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Sekolah</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">NPSN</label>
              <input
                type="text"
                required
                value={formData.npsn}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tahun Ajaran Aktif</label>
              <input
                type="text"
                required
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Kepala Sekolah</label>
              <input
                type="text"
                required
                value={formData.principalName}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">NIP Kepala Sekolah</label>
              <input
                type="text"
                required
                value={formData.principalNip}
                onChange={(e) => setFormData({ ...formData, principalNip: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Prefix Format No. SK</label>
              <input
                type="text"
                required
                value={formData.skNumberPrefix}
                onChange={(e) => setFormData({ ...formData, skNumberPrefix: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset seluruh data ke pengaturan awal pabrik (Siswa demo SMAN 1 Sipora)?')) {
                onResetData();
              }
            }}
            className="flex items-center gap-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 border border-rose-200 dark:border-rose-800 px-4 py-2.5 text-xs font-semibold transition"
          >
            <RefreshCw className="h-4 w-4" /> Reset Data Demo Pabrik
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 shadow-sm px-6 py-2.5 text-xs font-semibold transition"
          >
            <Save className="h-4 w-4" /> Simpan Pengaturan
          </button>
        </div>
      </form>
    </div>
  );
};
