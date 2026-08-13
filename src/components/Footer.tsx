import React from 'react';
import { SchoolInfo } from '../types';
import { MapPin, Phone, Mail, Globe, ShieldCheck, GraduationCap, ChevronRight, Award } from 'lucide-react';

interface FooterProps {
  schoolInfo: SchoolInfo;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ schoolInfo, setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs font-sans border-t border-slate-800/80 overflow-hidden">
      {/* Top Banner Notice */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-6 px-4">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 font-semibold">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm tracking-tight font-display">
                Portal Pengumuman Kelulusan Resmi
              </h4>
              <p className="text-slate-400 text-xs font-medium">
                Sistem Informasi Kelulusan {schoolInfo.name} • Tahun Ajaran {schoolInfo.academicYear}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cek-kelulusan')}
              className="bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-sm"
            >
              Cek Status Kelulusan
            </button>
            <button
              onClick={() => setActiveTab('verifikasi')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-3.5 py-2 rounded-xl text-xs border border-slate-700/80 transition-all"
            >
              Verifikasi SKL
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer 4 Columns */}
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: School Identity */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm font-display tracking-tight">{schoolInfo.name}</h3>
                <p className="text-[11px] font-semibold text-emerald-400 font-mono">NPSN: {schoolInfo.npsn}</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs font-normal">
              Lembaga pendidikan menengah atas terpercaya di Kepulauan Mentawai. Berkomitmen mencetak lulusan berkarakter, unggul secara akademis, dan siap bersaing di perguruan tinggi nasional.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg text-[11px] font-semibold border border-emerald-500/20">
                <Award className="h-3.5 w-3.5" /> Akreditasi A (Unggul)
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-wide uppercase font-display border-b border-slate-800 pb-2 inline-block">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setActiveTab('beranda')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500" /> Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profil')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500" /> Profil & Visi Misi Sekolah
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pengumuman')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500" /> Pengumuman Resmi Kelulusan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cek-kelulusan')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500" /> Portal Cek Kelulusan Siswa
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('verifikasi')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500" /> Layanan Verifikasi SKL Digital
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('kontak')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500" /> Hubungi Layanan Kelulusan
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-wide uppercase font-display border-b border-slate-800 pb-2 inline-block">
              Alamat & Sekretariat
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{schoolInfo.address}, {schoolInfo.subdistrict}, {schoolInfo.district}, {schoolInfo.province} {schoolInfo.postalCode}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{schoolInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{schoolInfo.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>{schoolInfo.website}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Keamanan SKL */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs tracking-wide uppercase font-display border-b border-slate-800 pb-2 inline-block">
              Keabsahan Dokumen Digital
            </h4>
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-3.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-[11px]">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                QR Code & Pengesahan Resmi
              </div>
              <p className="text-slate-400 leading-normal text-[11px] font-normal">
                Surat Keterangan Lulus (SKL) dilengkapi dengan Tanda Tangan Elektronik Kepala Sekolah & QR Code pengesahan otomatis.
              </p>
            </div>
            <div className="pt-1">
              <p className="text-[11px] text-slate-400 font-normal">
                Jam Layanan Legalisir: <br />
                <span className="text-white font-medium">Senin - Jumat (08.00 - 15.00 WIB)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar Footer */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 font-normal gap-3">
          <p>© {new Date().getFullYear()} {schoolInfo.name}. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setActiveTab('login')} className="text-emerald-400 hover:underline font-semibold">
              Portal Login Staff
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
