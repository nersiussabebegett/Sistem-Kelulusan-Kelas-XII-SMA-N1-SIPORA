import React from 'react';
import {
  Users,
  Award,
  XCircle,
  TrendingUp,
  BarChart2,
  Printer,
  Activity,
  ArrowRight,
  FileText,
  Clock,
  Settings
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Student, SchoolInfo, AuditLog } from '../../types';

interface AdminDashboardProps {
  students: Student[];
  schoolInfo: SchoolInfo;
  auditLogs: AuditLog[];
  setActiveAdminTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  schoolInfo,
  auditLogs,
  setActiveAdminTab,
}) => {
  const totalSiswa = students.length;
  const totalLulus = students.filter((s) => s.status === 'LULUS').length;
  const totalTidakLulus = students.filter((s) => s.status === 'TIDAK_LULUS').length;
  const passPercentage = totalSiswa > 0 ? Math.round((totalLulus / totalSiswa) * 100) : 0;

  // Chart Data: Per Jurusan
  const mipaSiswa = students.filter((s) => s.major === 'MIPA');
  const mipaLulus = mipaSiswa.filter((s) => s.status === 'LULUS').length;

  const ipsSiswa = students.filter((s) => s.major === 'IPS');
  const ipsLulus = ipsSiswa.filter((s) => s.status === 'LULUS').length;

  const jurusanData = [
    { name: 'MIPA', Total: mipaSiswa.length, Lulus: mipaLulus },
    { name: 'IPS', Total: ipsSiswa.length, Lulus: ipsLulus },
  ];

  // Chart Data: Per Kelas
  const classesList = Array.from(new Set(students.map((s) => s.class)));
  const classData = classesList.map((cls) => {
    const list = students.filter((s) => s.class === cls);
    const passed = list.filter((s) => s.status === 'LULUS').length;
    return { name: cls, Total: list.length, Lulus: passed };
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Welcome Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wide mb-1">
            <Clock className="h-3.5 w-3.5" /> Dashboard Staff Administrator
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
            Sistem Informasi Kelulusan {schoolInfo.name}
          </h2>
          <p className="text-xs text-slate-400 font-normal">
            Tahun Ajaran <span className="text-emerald-400 font-semibold">{schoolInfo.academicYear}</span> • Status Pengumuman Publik:{' '}
            <strong className={schoolInfo.isAnnouncementOpen ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
              {schoolInfo.isAnnouncementOpen ? 'DIBUKA' : 'TERKUNCI / MENUNGGU'}
            </strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5 z-10">
          <button
            onClick={() => setActiveAdminTab('kelulusan')}
            className="bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm shadow-emerald-500/20 flex items-center gap-2"
          >
            <Award className="h-4 w-4" /> Penetapan Kelulusan
          </button>
          <button
            onClick={() => setActiveAdminTab('laporan')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-4 py-2.5 rounded-xl text-xs border border-slate-700 transition flex items-center gap-2"
          >
            <Printer className="h-4 w-4 text-emerald-400" /> Cetak Laporan
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Siswa */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Total Siswa XII
            </span>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {totalSiswa} <span className="text-xs text-slate-500 font-normal">Siswa</span>
            </div>
            <p className="text-[11px] font-normal text-slate-500">MIPA & IPS Terdaftar</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 flex items-center justify-center font-bold">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2: Siswa Lulus */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Siswa Lulus
            </span>
            <div className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">
              {totalLulus} <span className="text-xs text-slate-500 font-normal">Siswa</span>
            </div>
            <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {passPercentage}% Tingkat Kelulusan
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center font-bold">
            <Award className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Belum / Tidak Lulus */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Belum / Tidak Lulus
            </span>
            <div className="text-2xl font-bold font-display text-rose-600 dark:text-rose-400">
              {totalTidakLulus} <span className="text-xs text-slate-500 font-normal">Siswa</span>
            </div>
            <p className="text-[11px] font-normal text-slate-500">Memerlukan Evaluasi</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60 flex items-center justify-center font-bold">
            <XCircle className="h-5 w-5" />
          </div>
        </div>

        {/* Card 4: Surat Keterangan Lulus */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              SKL Siap Cetak
            </span>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {totalLulus} <span className="text-xs text-slate-500 font-normal">Berkas</span>
            </div>
            <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">QR Verification Ready</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 flex items-center justify-center font-bold">
            <FileText className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Jurusan Breakdown Chart */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide font-display flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-emerald-500" />
              Rekap Kelulusan Berdasarkan Jurusan
            </h3>
          </div>
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jurusanData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontWeight: '500',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="Total" fill="#64748b" radius={[6, 6, 0, 0]} barSize={28} />
                <Bar dataKey="Lulus" fill="#10b981" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class Breakdown Chart */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide font-display flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-emerald-500" />
              Rincian Siswa Per Kelas (XII)
            </h3>
          </div>
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontWeight: '500',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="Total" fill="#94a3b8" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="Lulus" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts & Recent Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Menu Actions */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide font-display border-b border-slate-100 dark:border-slate-800 pb-3">
            Akses Pintar Modul Admin
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveAdminTab('data-siswa')}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/60 transition text-left space-y-1 group"
            >
              <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform" />
              <div className="font-semibold text-xs text-slate-900 dark:text-white">Kelola Data Siswa</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Tambah, Edit, Import Excel</p>
            </button>

            <button
              onClick={() => setActiveAdminTab('skl')}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/60 transition text-left space-y-1 group"
            >
              <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform" />
              <div className="font-semibold text-xs text-slate-900 dark:text-white">Cetak SKL Digital</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Penerbitan Surat Keterangan Lulus</p>
            </button>

            <button
              onClick={() => setActiveAdminTab('settings')}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/60 transition text-left space-y-1 group"
            >
              <Settings className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform" />
              <div className="font-semibold text-xs text-slate-900 dark:text-white">Pengaturan Pengumuman</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Buka/Kunci pengumuman publik</p>
            </button>

            <button
              onClick={() => setActiveAdminTab('laporan')}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/60 transition text-left space-y-1 group"
            >
              <BarChart2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform" />
              <div className="font-semibold text-xs text-slate-900 dark:text-white">Laporan & Rekap</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Export PDF & Excel Berita Acara</p>
            </button>
          </div>
        </div>

        {/* Audit Log Activity Feed */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide font-display flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />
                Aktivitas Audit Log Sistem
              </h3>
              <button
                onClick={() => setActiveAdminTab('audit-log')}
                className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                Lihat Semua <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {auditLogs.slice(0, 5).map((log, index) => (
                <div key={`${log.id}-${index}`} className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{log.user}</span>
                      <span className="rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 text-[9px] font-semibold font-mono uppercase">
                        {log.action}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{log.details}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{log.timestamp.split(' ')[1] || log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveAdminTab('audit-log')}
            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold py-2.5 rounded-xl text-xs transition text-center"
          >
            Buka Riwayat Log Lengkap
          </button>
        </div>
      </div>
    </div>
  );
};
