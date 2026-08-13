import React from 'react';
import { SchoolInfo } from '../types';
import { Building2, Target, Award, CheckCircle2, MapPin } from 'lucide-react';

interface ProfileViewProps {
  schoolInfo: SchoolInfo;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ schoolInfo }) => {
  return (
    <div className="container mx-auto px-4 max-w-5xl py-8 space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-4 py-1 text-xs font-bold uppercase tracking-wider inline-block">
          Profil Lengkap Sekolah
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          {schoolInfo.name}
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Kabupaten Kepulauan Mentawai • Provinsi Sumatera Barat
        </p>
      </div>

      {/* School Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-100 dark:border-purple-800/40 shadow-eclipse grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-display">
            <Building2 className="h-5 w-5 text-purple-600" />
            Tentang SMAN 1 Sipora
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify font-normal">
            SMA Negeri 1 Sipora merupakan salah satu sekolah menengah atas unggulan di Kabupaten Kepulauan Mentawai yang berkomitmen mencetak generasi berkarakter, cerdas, berilmu pengetahuan, dan berdaya saing global.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs pt-2">
            <div className="bg-purple-50/50 dark:bg-purple-950/30 p-3 rounded-2xl border border-purple-100 dark:border-purple-900/40">
              <span className="block font-semibold text-slate-500 dark:text-slate-400">NPSN Sekolah</span>
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{schoolInfo.npsn}</span>
            </div>
            <div className="bg-purple-50/50 dark:bg-purple-950/30 p-3 rounded-2xl border border-purple-100 dark:border-purple-900/40">
              <span className="block font-semibold text-slate-500 dark:text-slate-400">Status Akreditasi</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-300">A (Unggul)</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-800/50 shadow-eclipse bg-slate-100 dark:bg-slate-800">
          <img
            src={schoolInfo.schoolPhotoUrl || "/sma-sipora.svg"}
            alt="Kegiatan Apel & Gedung SMAN 1 Sipora"
            className="w-full h-72 object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visi */}
        <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 shadow-eclipse border border-purple-800/50">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-6 w-6 text-amber-300" />
            <h3 className="text-lg font-bold uppercase tracking-wide font-display">Visi Sekolah</h3>
          </div>
          <p className="text-sm leading-relaxed text-purple-200/90 italic font-normal">
            &ldquo;Terwujudnya Peserta Didik SMA Negeri 1 Sipora yang Unggul dalam Prestasi Akademik dan Non-Akademik, Berkarakter Pancasila, Berwawasan Lingkungan, dan Mampu Bersaing di Era Digital.&rdquo;
          </p>
        </div>

        {/* Misi */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-purple-100 dark:border-purple-800/40 shadow-eclipse">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900 dark:text-white font-display">Misi Utama</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-normal">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <span>Menyelenggarakan pembelajaran berkualitas berbasis teknologi dan kurikulum merdeka.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <span>Menumbuhkan pembiasaan akhlak mulia, disiplin, dan jiwa kepemimpinan siswa.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <span>Memfasilitasi potensi bakat, sains, olah raga, seni, dan bahasa daerah Mentawai.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
