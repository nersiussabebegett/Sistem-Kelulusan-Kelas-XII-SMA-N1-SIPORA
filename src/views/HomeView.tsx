import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Award,
  Users,
  CheckCircle2,
  Bell,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Quote,
  Sparkles,
  Check,
  FileText,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { SchoolInfo, Student, Announcement } from '../types';
import { parseAnnouncementDate, formatAnnouncementDisplay } from '../utils/dateUtils';

interface HomeViewProps {
  schoolInfo: SchoolInfo;
  students: Student[];
  announcements: Announcement[];
  setActiveTab: (tab: string) => void;
  onSearchDirect: (nisn: string, dob: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  schoolInfo,
  students,
  announcements,
  setActiveTab,
  onSearchDirect,
}) => {
  const [quickNisn, setQuickNisn] = useState('');
  const [quickDob, setQuickDob] = useState('');

  // Countdown calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTimePassed, setIsTimePassed] = useState(false);

  useEffect(() => {
    const targetDate = parseAnnouncementDate(schoolInfo.announcementTime).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsTimePassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsTimePassed(false);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [schoolInfo.announcementTime]);

  const totalSiswa = students.length;
  const totalLulus = students.filter((s) => s.status === 'LULUS').length;
  const passPercentage = totalSiswa > 0 ? Math.round((totalLulus / totalSiswa) * 100) : 0;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNisn || !quickDob) {
      alert('Silakan masukkan NISN dan Tanggal Lahir.');
      return;
    }
    onSearchDirect(quickNisn, quickDob);
    setActiveTab('cek-kelulusan');
  };

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white overflow-hidden pt-12 pb-20 border-b border-slate-800/80">
        {/* Subtle Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 opacity-90"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Hero Text & Countdown */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Portal Kelulusan Resmi SMAN 1 Sipora</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white font-display">
                Pengumuman Kelulusan Siswa Kelas XII <br />
                <span className="text-emerald-400 font-bold">
                  {schoolInfo.name}
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Sistem Layanan Kelulusan Digital Terintegrasi. Cek hasil kelulusan secara mandiri, unduh Surat Keterangan Lulus (SKL) ber-QR Code, dan lakukan verifikasi keabsahan dokumen.
              </p>

              {/* Countdown Card Widget */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 max-w-xl mx-auto lg:mx-0 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3 text-xs font-semibold uppercase tracking-wide text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Clock className="h-4 w-4" />
                    Rilis Pengumuman:
                  </span>
                  <span className="text-emerald-300 font-bold">
                    {formatAnnouncementDisplay(schoolInfo.announcementTime)}
                  </span>
                </div>

                {isTimePassed || schoolInfo.isAnnouncementOpen ? (
                  <div className="flex items-center justify-center gap-2.5 bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30 rounded-xl p-3">
                    <CheckCircle2 className="h-5 w-5 animate-pulse text-emerald-400" />
                    <span className="text-xs sm:text-sm tracking-wide">
                      PENGUMUMAN KELULUSAN RESMI DIBUKA
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/50">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-400">{timeLeft.days}</span>
                      <span className="block text-[10px] uppercase text-slate-400 font-sans mt-0.5 font-medium">Hari</span>
                    </div>
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/50">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-400">{timeLeft.hours}</span>
                      <span className="block text-[10px] uppercase text-slate-400 font-sans mt-0.5 font-medium">Jam</span>
                    </div>
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/50">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-400">{timeLeft.minutes}</span>
                      <span className="block text-[10px] uppercase text-slate-400 font-sans mt-0.5 font-medium">Menit</span>
                    </div>
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/50">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-400">{timeLeft.seconds}</span>
                      <span className="block text-[10px] uppercase text-slate-400 font-sans mt-0.5 font-medium">Detik</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  onClick={() => setActiveTab('cek-kelulusan')}
                  className="bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold px-5 py-3 rounded-xl text-xs transition-all shadow-sm shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Search className="h-4 w-4" /> Cek Hasil Kelulusan
                </button>
                <button
                  onClick={() => setActiveTab('profil')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-5 py-3 rounded-xl text-xs border border-slate-700/80 transition-all flex items-center gap-2"
                >
                  <Building className="h-4 w-4 text-emerald-400" /> Profil Sekolah
                </button>
              </div>
            </div>

            {/* Right Column: Quick Search Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-700/80 text-white relative">
                <div className="mb-5">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">
                    Pencarian Cepat
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display mt-0.5">
                    Cek Kelulusan Siswa
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-normal">
                    Masukkan NISN dan Tanggal Lahir sesuai data dapodik.
                  </p>
                </div>

                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      NISN Siswa <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={quickNisn}
                      onChange={(e) => setQuickNisn(e.target.value)}
                      placeholder="Contoh: 0061234567"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Tanggal Lahir <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={quickDob}
                      onChange={(e) => setQuickDob(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-5 py-3 text-xs font-semibold transition-all shadow-sm shadow-emerald-500/20 active:scale-98"
                  >
                    <Search className="h-4 w-4" />
                    Lihat Status & Unduh SKL
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                  <button
                    onClick={() => setActiveTab('verifikasi')}
                    className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors font-medium"
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-400" /> Verifikasi QR SKL
                  </button>
                  <button
                    onClick={() => setActiveTab('pengumuman')}
                    className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors font-medium"
                  >
                    <Bell className="h-4 w-4 text-emerald-400" /> Info Pengumuman
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="container mx-auto px-4 sm:px-6 max-w-7xl -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 font-semibold group-hover:scale-105 transition-transform">
              <Clock className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm font-display mb-1">
              Pengumuman Realtime
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Pengumuman kelulusan dapat diakses secara instan tepat pada waktu yang telah ditetapkan panitia sekolah.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 font-semibold group-hover:scale-105 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm font-display mb-1">
              Unduh SKL Digital
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Cetak Surat Keterangan Lulus (SKL) resmi dengan cap sekolah digital dan tanda tangan sah.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 font-semibold group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm font-display mb-1">
              Validasi QR Code
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Sistem verifikasi QR Code mencegah pemalsuan dokumen dan memudahkan proses admisi perguruan tinggi.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 font-semibold group-hover:scale-105 transition-transform">
              <Users className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm font-display mb-1">
              Data Dapodik Valid
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Seluruh data kelulusan tersinkronisasi akurat dengan database NISN Kementerian Pendidikan.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="container mx-auto px-4 sm:px-6 max-w-7xl pt-2">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image with Experience Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Siswa SMAN 1 Sipora"
                  className="w-full h-72 sm:h-80 object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -right-2 sm:right-4 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 px-4 py-2.5 rounded-xl border border-emerald-500 dark:border-emerald-400 shadow-md text-center">
                <span className="block text-2xl font-bold font-display leading-none">30+</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider block mt-0.5">Tahun Melayani Mentawai</span>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide block mb-1">
                  Tentang SMAN 1 Sipora
                </span>
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display tracking-tight leading-snug">
                  Mewujudkan Lulusan Berkualitas, Unggul & Berintegritas
                </h2>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                SMA Negeri 1 Sipora merupakan satuan pendidikan menengah atas terkemuka di Kepulauan Mentawai, Sumatera Barat. Kami berkomitmen memberikan layanan pendidikan komprehensif, pembinaan karakter, dan kemudahan administrasi digital bagi seluruh alumni.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-start gap-2">
                  <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Kurikulum Merdeka Belajar Terintegrasi</span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Tenaga Pendidik Bersertifikasi Profesional</span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Fasilitas Lab Komputer & Perpustakaan Digital</span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Layanan Legalisir & Penerbitan SKL Fast-Track</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('profil')}
                  className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all inline-flex items-center gap-1.5 shadow-sm"
                >
                  Selengkapnya Profil Sekolah <ChevronRight className="h-4 w-4 text-emerald-400" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COUNTER STAT BAR */}
      <section className="bg-slate-900 text-white py-10 border-y border-slate-800/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-3 space-y-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-semibold mb-2 border border-emerald-500/20">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">{totalSiswa}</span>
              <p className="text-xs font-medium text-slate-300">Siswa Kelas XII TA {schoolInfo.academicYear}</p>
            </div>

            <div className="p-3 space-y-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-semibold mb-2 border border-emerald-500/20">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">{passPercentage}%</span>
              <p className="text-xs font-medium text-slate-300">Persentase Kelulusan</p>
            </div>

            <div className="p-3 space-y-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-semibold mb-2 border border-emerald-500/20">
                <UserCheck className="h-5 w-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">45+</span>
              <p className="text-xs font-medium text-slate-300">Guru & Staf Pengajar</p>
            </div>

            <div className="p-3 space-y-1">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-semibold mb-2 border border-emerald-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">100%</span>
              <p className="text-xs font-medium text-slate-300">SKL Terverifikasi QR Code</p>
            </div>

          </div>
        </div>
      </section>

      {/* PRINCIPAL MESSAGE / SAMBUTAN */}
      <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-44 h-56 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                  <img
                    src={schoolInfo.principalPhotoUrl}
                    alt={schoolInfo.principalName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-3 -right-2 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 text-[11px] font-semibold px-3 py-1 rounded-lg shadow-sm">
                  Kepala Sekolah
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3.5 text-center lg:text-left">
              <Quote className="h-8 w-8 text-emerald-500/40 mx-auto lg:mx-0" />
              
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide block">
                Amanat & Pesan Kepala Sekolah
              </span>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
                Sambutan Resmi {schoolInfo.name}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic font-normal">
                &ldquo;Puji dan syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas rahmat-Nya, seluruh rangkaian pembelajaran dan penilaian bagi siswa kelas XII Tahun Ajaran {schoolInfo.academicYear} di SMA Negeri 1 Sipora telah terlaksana dengan baik. Kelulusan ini bukanlah akhir dari perjuangan, melainkan gerbang awal menuju perguruan tinggi dan cita-cita mulia di masa depan. Tetaplah menjaga nama baik almamater, berintegritas, dan berkontribusi bagi Kepulauan Mentawai dan Indonesia.&rdquo;
              </p>

              <div className="pt-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm font-display">{schoolInfo.principalName}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">NIP. {schoolInfo.principalNip}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LATEST ANNOUNCEMENTS */}
      <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide block mb-0.5">
              Informasi Terkini
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display tracking-tight flex items-center gap-2">
              <Bell className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Pengumuman Resmi Sekolah
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('pengumuman')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            Lihat Semua Pengumuman <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {announcements.slice(0, 3).map((ann) => (
            <div
              key={ann.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-2.5 py-0.5 font-semibold text-[10px] uppercase">
                    {ann.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{ann.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 line-clamp-2 font-display">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-normal">
                  {ann.content}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('pengumuman')}
                className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 transition-colors"
              >
                Baca Selengkapnya <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
